/* ============================================================
   NEXUS ROBOTICS ACADEMY v6.0
   ARQUIVO: js/modules/academy.js
   DESCRIÇÃO: Sistema de cursos — trilhas, progresso, quizzes,
              certificação e tracking de aprendizado
   ============================================================ */

class NexusAcademy {
  constructor(app) {
    this.app = app;
    this.tracks = [];
    this.activeTrack = null;
    this.activeModule = null;
    this.activeLesson = null;
    this.completedLessons = new Set();
    this.quizResults = new Map();
    this.bookmarks = new Set();
    this.notes = new Map();
    this.totalXP = 0;
    this.streak = 0;
    this.lastActivityDate = null;
    this.subscribers = new Set();
  }

  /**
   * Inicializa a academy
   */
  init() {
    this._loadTracks();
    this._loadProgress();
    this._checkStreak();
    console.log(`🎓 Academy inicializada: ${this.tracks.length} trilhas, ${this._getTotalLessons()} aulas`);
  }

  /**
   * Carrega trilhas do currículo
   */
  _loadTracks() {
    if (typeof NEXUS_COURSES_CURRICULUM !== 'undefined') {
      this.tracks = NEXUS_COURSES_CURRICULUM.tracks || [];
    } else {
      this.tracks = this._getMockTracks();
    }
  }

  /**
   * Carrega progresso salvo
   */
  _loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem('nexus-academy-progress') || '{}');
      if (saved.completedLessons) {
        this.completedLessons = new Set(saved.completedLessons);
      }
      if (saved.quizResults) {
        this.quizResults = new Map(Object.entries(saved.quizResults));
      }
      if (saved.bookmarks) {
        this.bookmarks = new Set(saved.bookmarks);
      }
      if (saved.totalXP) this.totalXP = saved.totalXP;
      if (saved.streak) this.streak = saved.streak;
      if (saved.lastActivityDate) this.lastActivityDate = new Date(saved.lastActivityDate);
    } catch (e) {
      console.warn('Falha ao carregar progresso:', e);
    }
  }

  /**
   * Salva progresso
   */
  _saveProgress() {
    try {
      localStorage.setItem('nexus-academy-progress', JSON.stringify({
        completedLessons: Array.from(this.completedLessons),
        quizResults: Object.fromEntries(this.quizResults),
        bookmarks: Array.from(this.bookmarks),
        notes: Object.fromEntries(this.notes),
        totalXP: this.totalXP,
        streak: this.streak,
        lastActivityDate: this.lastActivityDate?.toISOString(),
      }));
    } catch (e) {
      console.warn('Falha ao salvar progresso:', e);
    }
  }

  /**
   * Verifica streak diário
   */
  _checkStreak() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.lastActivityDate) {
      const lastDate = new Date(this.lastActivityDate);
      lastDate.setHours(0, 0, 0, 0);

      const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        // Já teve atividade hoje — mantém streak
      } else if (diffDays === 1) {
        // Atividade ontem — incrementa streak
        this.streak++;
      } else {
        // Perdeu streak
        this.streak = 0;
      }
    }

    this._saveProgress();
  }

  /**
   * Abre uma trilha
   */
  openTrack(trackId) {
    const track = this.tracks.find(t => t.id === trackId);
    if (!track) return;

    this.activeTrack = track;
    this.activeModule = null;
    this.activeLesson = null;
    this._notifySubscribers();

    this.app?.eventBus?.emit('academy:trackOpened', { track });
  }

  /**
   * Abre um módulo
   */
  openModule(moduleId) {
    if (!this.activeTrack) return;

    const module = this.activeTrack.modules?.find(m => m.id === moduleId);
    if (!module) return;

    this.activeModule = module;
    this.activeLesson = null;
    this._notifySubscribers();
  }

  /**
   * Abre uma aula
   */
  openLesson(lessonId) {
    if (!this.activeTrack) return;

    for (const mod of this.activeTrack.modules || []) {
      const lesson = mod.lessons?.find(l => l.id === lessonId);
      if (lesson) {
        this.activeModule = mod;
        this.activeLesson = lesson;
        this._recordActivity();
        this._notifySubscribers();
        return;
      }
    }
  }

  /**
   * Marca aula como concluída
   */
  completeLesson(lessonId) {
    this.completedLessons.add(lessonId);

    // Ganha XP
    const lesson = this._findLessonById(lessonId);
    if (lesson) {
      const xpGain = this._calculateXP(lesson);
      this.totalXP += xpGain;

      this.app?.showToast(
        `+${xpGain} XP — Aula concluída!`,
        'success',
        'fa-check-circle'
      );
    }

    this._recordActivity();
    this._saveProgress();
    this._notifySubscribers();

    // Verifica se completou o módulo
    this._checkModuleCompletion();
  }

  /**
   * Calcula XP ganho por aula
   */
  _calculateXP(lesson) {
    const baseXP = {
      'video': 50,
      'hands-on': 75,
      'project': 150,
      'quiz': 30,
    };
    return baseXP[lesson.type] || 50;
  }

  /**
   * Registra atividade (para streak)
   */
  _recordActivity() {
    const today = new Date();
    if (!this.lastActivityDate ||
        today.toDateString() !== new Date(this.lastActivityDate).toDateString()) {
      this.lastActivityDate = today;
      this._checkStreak();
    }
    this._saveProgress();
  }

  /**
   * Verifica se módulo foi completado
   */
  _checkModuleCompletion() {
    if (!this.activeModule) return;

    const allLessons = this.activeModule.lessons || [];
    const completed = allLessons.filter(l => this.completedLessons.has(l.id));

    if (completed.length === allLessons.length && allLessons.length > 0) {
      this.app?.showToast(
        `🎉 Módulo "${this.activeModule.name}" concluído!`,
        'success',
        'fa-trophy'
      );
      this.totalXP += 200; // Bônus por módulo
    }
  }

  /**
   * Adiciona/remove bookmark
   */
  toggleBookmark(lessonId) {
    if (this.bookmarks.has(lessonId)) {
      this.bookmarks.delete(lessonId);
    } else {
      this.bookmarks.add(lessonId);
    }
    this._saveProgress();
    this._notifySubscribers();
  }

  /**
   * Salva nota em uma aula
   */
  saveNote(lessonId, note) {
    if (note.trim()) {
      this.notes.set(lessonId, note);
    } else {
      this.notes.delete(lessonId);
    }
    this._saveProgress();
  }

  /**
   * Submete quiz
   */
  submitQuiz(lessonId, answers) {
    const lesson = this._findLessonById(lessonId);
    if (!lesson?.quiz) return null;

    const correct = lesson.quiz.questions.filter((q, i) =>
      q.correctAnswer === answers[i]
    ).length;

    const total = lesson.quiz.questions.length;
    const score = Math.round((correct / total) * 100);

    this.quizResults.set(lessonId, {
      score,
      correct,
      total,
      date: new Date().toISOString(),
      answers,
    });

    if (score >= 70) {
      this.completeLesson(lessonId);
      this.totalXP += 30;
    }

    this._saveProgress();
    this._notifySubscribers();

    return { score, correct, total, passed: score >= 70 };
  }

  /**
   * Calcula progresso de uma trilha
   */
  getTrackProgress(trackId) {
    const track = this.tracks.find(t => t.id === trackId);
    if (!track) return 0;

    let total = 0;
    let completed = 0;

    track.modules?.forEach(mod => {
      mod.lessons?.forEach(lesson => {
        total++;
        if (this.completedLessons.has(lesson.id)) completed++;
      });
    });

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  /**
   * Calcula progresso de um módulo
   */
  getModuleProgress(moduleId) {
    if (!this.activeTrack) return 0;

    const module = this.activeTrack.modules?.find(m => m.id === moduleId);
    if (!module) return 0;

    const total = module.lessons?.length || 0;
    const completed = module.lessons?.filter(l => this.completedLessons.has(l.id)).length || 0;

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  /**
   * Obtém nível do usuário baseado em XP
   */
  getUserLevel() {
    const levels = [
      { name: 'Iniciante', minXP: 0, icon: 'fa-seedling' },
      { name: 'Aprendiz', minXP: 500, icon: 'fa-leaf' },
      { name: 'Intermediário', minXP: 2000, icon: 'fa-tree' },
      { name: 'Avançado', minXP: 5000, icon: 'fa-star' },
      { name: 'Especialista', minXP: 10000, icon: 'fa-crown' },
      { name: 'Arquiteto', minXP: 25000, icon: 'fa-gem' },
      { name: 'Lendário', minXP: 50000, icon: 'fa-dragon' },
    ];

    let currentLevel = levels[0];
    for (const level of levels) {
      if (this.totalXP >= level.minXP) {
        currentLevel = level;
      }
    }
    return currentLevel;
  }

  /**
   * Busca aula por ID
   */
  _findLessonById(lessonId) {
    for (const track of this.tracks) {
      for (const mod of track.modules || []) {
        const lesson = mod.lessons?.find(l => l.id === lessonId);
        if (lesson) return lesson;
      }
    }
    return null;
  }

  /**
   * Total de aulas
   */
  _getTotalLessons() {
    return this.tracks.reduce((sum, track) => {
      return sum + (track.modules || []).reduce((s, m) => s + (m.lessons?.length || 0), 0);
    }, 0);
  }

  /**
   * Inscreve para atualizações
   */
  subscribe(callback) {
    this.subscribers.add(callback);
    callback(this.getState());
    return () => this.subscribers.delete(callback);
  }

  /**
   * Notifica assinantes
   */
  _notifySubscribers() {
    const state = this.getState();
    this.subscribers.forEach(cb => {
      try { cb(state); } catch (e) { console.error('Subscriber error:', e); }
    });
  }

  /**
   * Retorna estado atual
   */
  getState() {
    return {
      tracks: this.tracks,
      activeTrack: this.activeTrack,
      activeModule: this.activeModule,
      activeLesson: this.activeLesson,
      completedLessons: this.completedLessons,
      bookmarks: this.bookmarks,
      notes: this.notes,
      quizResults: this.quizResults,
      totalXP: this.totalXP,
      streak: this.streak,
      userLevel: this.getUserLevel(),
      totalLessons: this._getTotalLessons(),
      completedCount: this.completedLessons.size,
      progressPercent: this._getTotalLessons() > 0
        ? Math.round((this.completedLessons.size / this._getTotalLessons()) * 100)
        : 0,
    };
  }

  /**
   * Trilhas mockadas (fallback)
   */
  _getMockTracks() {
    return [
      {
        id: "track-mock-iot",
        name: "IoT & Sensores Inteligentes",
        icon: "fa-microchip",
        totalHours: 80,
        level: "Fundamentals → Associate",
        description: "Do LED piscante à rede de sensores com MQTT.",
        modules: [
          {
            id: "iot-mock-01",
            name: "Eletrônica Básica",
            hours: 10,
            lessons: [
              { id: "iot-mock-01-01", title: "Lei de Ohm na prática", duration: "45min", type: "video" },
              { id: "iot-mock-01-02", title: "GPIO, PWM e ADC", duration: "60min", type: "hands-on" },
            ],
          },
        ],
      },
    ];
  }

  /**
   * Destrói o módulo
   */
  destroy() {
    this.subscribers.clear();
  }
}

// Exportação
export default NexusAcademy;

/* ============================================================
   FIM DO ARQUIVO: js/modules/academy.js
   PRÓXIMO: index.html (SHELL PRINCIPAL)
   ============================================================ */
