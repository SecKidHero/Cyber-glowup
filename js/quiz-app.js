/* ========================================
   CYBER GLOW-UP CHALLENGE v2.1
   Quiz Application Logic - Fixed
   ======================================== */

const app = {
  // State management
  state: {
    currentPage: 'registration',
    userName: '',
    gamingTag: '',
    teamName: '',
    onlineSafetyAnswers: [],
    aiRealityAnswers: [],
    strengthQuizAnswers: [],
    matchedArchetype: null,
    pageHistory: [], // Track navigation for back button
    currentQuiz: null, // Which quiz we're on
    currentQuestionIndex: 0, // Which question in the quiz
    selectedAnswer: null, // Currently selected answer
    currentShuffle: null // Store current shuffle for consistency
  },

  // Initialize app
  init() {
    this.bindEvents();
    this.showPage('registration');
  },

  // Bind events
  bindEvents() {
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
      registrationForm.addEventListener('submit', (e) => this.handleRegistration(e));
    }
  },

  // PAGE NAVIGATION
  showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    
    // Show requested page
    const page = document.getElementById(`page-${pageId}`);
    if (page) {
      page.classList.add('active');
      this.state.currentPage = pageId;
      
      // Track in history for back button
      if (!this.state.pageHistory.includes(pageId)) {
        this.state.pageHistory.push(pageId);
      }
    }
  },

  goBack() {
    if (this.state.pageHistory.length > 1) {
      this.state.pageHistory.pop(); // Remove current page
      const previousPage = this.state.pageHistory[this.state.pageHistory.length - 1];
      
      // If going back during a quiz, go to previous question
      if (this.state.currentPage.includes('quiz') && this.state.currentQuestionIndex > 0) {
        this.state.currentQuestionIndex--;
        this.state.selectedAnswer = null;
        this.renderCurrentQuestion();
      } else {
        this.showPage(previousPage);
      }
    }
  },

  goHome() {
    this.state.pageHistory = [];
    this.state.userName = '';
    this.state.gamingTag = '';
    this.state.teamName = '';
    this.state.onlineSafetyAnswers = [];
    this.state.aiRealityAnswers = [];
    this.state.strengthQuizAnswers = [];
    this.state.matchedArchetype = null;
    this.state.currentQuiz = null;
    this.state.currentQuestionIndex = 0;
    this.state.selectedAnswer = null;
    this.showPage('registration');
  },

  // REGISTRATION
  handleRegistration(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const gamingTag = document.getElementById('gaming-tag').value;
    const teamName = document.getElementById('team-name').value;

    if (name && teamName) {
      this.state.userName = name;
      this.state.gamingTag = gamingTag || name;
      this.state.teamName = teamName;
      
      // Start first quiz
      this.startOnlineSafetyQuiz();
    }
  },

  // ONLINE SAFETY QUIZ
  startOnlineSafetyQuiz() {
    this.state.onlineSafetyAnswers = [];
    this.state.currentQuiz = 'online-safety';
    this.state.currentQuestionIndex = 0;
    this.state.selectedAnswer = null;
    this.renderCurrentQuestion();
    this.showPage('online-safety-quiz');
  },

  // AI REALITY QUIZ
  startAIRealityQuiz() {
    this.state.aiRealityAnswers = [];
    this.state.currentQuiz = 'ai-reality';
    this.state.currentQuestionIndex = 0;
    this.state.selectedAnswer = null;
    this.renderCurrentQuestion();
    this.showPage('ai-reality-quiz');
  },

  // STRENGTH QUIZ
  startStrengthQuiz() {
    this.state.strengthQuizAnswers = [];
    this.state.currentQuiz = 'strength';
    this.state.currentQuestionIndex = 0;
    this.state.selectedAnswer = null;
    this.renderCurrentQuestion();
    this.showPage('strength-quiz');
  },

  // RENDER CURRENT QUESTION
  renderCurrentQuestion() {
    const quiz = this.state.currentQuiz;
    const questionIndex = this.state.currentQuestionIndex;

    let questionData, containerId, progressId, progressFillId, nextBtnId;

    if (quiz === 'online-safety') {
      questionData = QuizData.onlineSafety[questionIndex];
      containerId = 'safety-quiz-content';
      progressId = 'safety-progress';
      progressFillId = 'safety-progress-fill';
      nextBtnId = 'safety-next-btn';
    } else if (quiz === 'ai-reality') {
      questionData = QuizData.aiReality[questionIndex];
      containerId = 'ai-quiz-content';
      progressId = 'ai-progress';
      progressFillId = 'ai-progress-fill';
      nextBtnId = 'ai-next-btn';
    } else if (quiz === 'strength') {
      questionData = QuizData.strengthQuiz[questionIndex];
      containerId = 'strength-quiz-content';
      progressId = 'strength-progress';
      progressFillId = 'strength-progress-fill';
      nextBtnId = 'strength-next-btn';
    }

    const container = document.getElementById(containerId);

    // Update progress
    document.getElementById(progressId).textContent = `Question ${questionIndex + 1} of 5`;
    const progress = ((questionIndex + 1) / 5) * 100;
    document.getElementById(progressFillId).style.width = progress + '%';

    // Randomize answers and store shuffle
    this.state.currentShuffle = this.shuffleAnswers(questionData.answers, questionData.correct);

    let html = `
      <div class="quiz-question">
        <h2>${questionData.question}</h2>
        <div class="quiz-answers">
    `;

    this.state.currentShuffle.forEach((answer, idx) => {
      html += `
        <button class="quiz-answer-btn" data-index="${idx}" onclick="app.selectAnswer(${idx})">
          <span class="answer-letter">${String.fromCharCode(65 + idx)}</span>
          <span class="answer-text">${answer}</span>
        </button>
      `;
    });

    html += `</div></div>`;
    container.innerHTML = html;

    // Hide next button initially
    const nextBtn = document.getElementById(nextBtnId);
    if (nextBtn) {
      nextBtn.style.display = 'none';
    }
  },

  // SELECT ANSWER
  selectAnswer(selectedIndex) {
    this.state.selectedAnswer = selectedIndex;

    // Highlight selected answer
    document.querySelectorAll('.quiz-answer-btn').forEach((btn, idx) => {
      if (idx === selectedIndex) {
        btn.style.borderColor = '#FF007A';
        btn.style.background = 'rgba(255, 0, 122, 0.2)';
        btn.style.boxShadow = '0 0 16px rgba(255, 0, 122, 0.3)';
      } else {
        btn.style.borderColor = '#00F0FF';
        btn.style.background = 'rgba(22, 28, 45, 0.6)';
        btn.style.boxShadow = 'none';
      }
    });

    // Show next button
    const quiz = this.state.currentQuiz;
    let nextBtnId;
    if (quiz === 'online-safety') nextBtnId = 'safety-next-btn';
    else if (quiz === 'ai-reality') nextBtnId = 'ai-next-btn';
    else if (quiz === 'strength') nextBtnId = 'strength-next-btn';

    const nextBtn = document.getElementById(nextBtnId);
    if (nextBtn) {
      nextBtn.style.display = 'block';
    }
  },

  // NEXT QUESTION
  nextQuestion() {
    if (this.state.selectedAnswer === null) return;

    const quiz = this.state.currentQuiz;
    const questionIndex = this.state.currentQuestionIndex;
    let questionData;

    if (quiz === 'online-safety') {
      questionData = QuizData.onlineSafety[questionIndex];
      const shuffledAnswers = this.state.currentShuffle;
      const correctIndex = shuffledAnswers.findIndex(a => a === questionData.answers[questionData.correct]);
      this.state.onlineSafetyAnswers[questionIndex] = this.state.selectedAnswer === correctIndex;
    } else if (quiz === 'ai-reality') {
      questionData = QuizData.aiReality[questionIndex];
      const shuffledAnswers = this.state.currentShuffle;
      const correctIndex = shuffledAnswers.findIndex(a => a === questionData.answers[questionData.correct]);
      this.state.aiRealityAnswers[questionIndex] = this.state.selectedAnswer === correctIndex;
    } else if (quiz === 'strength') {
      questionData = QuizData.strengthQuiz[questionIndex];
      this.state.strengthQuizAnswers[questionIndex] = questionData.answers[this.state.selectedAnswer].archetype;
    }

    this.state.currentQuestionIndex++;
    this.state.selectedAnswer = null;

    // Check if we're done with this quiz
    if (this.state.currentQuestionIndex >= 5) {
      if (quiz === 'online-safety') {
        this.startAIRealityQuiz();
      } else if (quiz === 'ai-reality') {
        this.startStrengthQuiz();
      } else if (quiz === 'strength') {
        // Calculate archetype match
        this.calculateArchetypeMatch();
        this.showCareerReveal();
      }
    } else {
      this.renderCurrentQuestion();
    }
  },

  // CALCULATE ARCHETYPE MATCH
  calculateArchetypeMatch() {
    // Count archetype occurrences from strength quiz
    const archetypeCounts = {};
    
    this.state.strengthQuizAnswers.forEach(archetype => {
      archetypeCounts[archetype] = (archetypeCounts[archetype] || 0) + 1;
    });

    // Find the archetype with the most matches
    let maxCount = 0;
    let matchedArchetype = null;

    for (const [archetype, count] of Object.entries(archetypeCounts)) {
      if (count > maxCount) {
        maxCount = count;
        matchedArchetype = archetype;
      }
    }

    this.state.matchedArchetype = matchedArchetype;
  },

  // SHOW CAREER REVEAL
  showCareerReveal() {
    const archetype = QuizData.archetypeProfiles[this.state.matchedArchetype];
    const container = document.getElementById('career-reveal-content');
    const cardsContainer = document.getElementById('archetype-cards-display');

    // Display user name
    document.getElementById('reveal-name').textContent = this.state.userName;

    // Display all archetype cards (with matched one highlighted)
    let cardsHtml = '';
    const archetypeOrder = ['investigator', 'builder', 'protector', 'strategist', 'connector'];
    
    archetypeOrder.forEach(id => {
      const arch = QuizData.archetypeProfiles[id];
      const isMatched = id === this.state.matchedArchetype;
      const iconEmoji = {
        'investigator': '🔍',
        'builder': '🔧',
        'protector': '🛡️',
        'strategist': '♞',
        'connector': '🎯'
      }[id];

      cardsHtml += `
        <div class="archetype-card" style="${isMatched ? 'border-color: #FF007A; box-shadow: 0 0 30px rgba(255, 0, 122, 0.5);' : ''}">
          <div class="card-icon">${iconEmoji}</div>
          <div class="card-name">${arch.name}</div>
          <div class="card-stars">${'⭐'.repeat(id === this.state.matchedArchetype ? 3 : 2)}</div>
        </div>
      `;
    });

    cardsContainer.innerHTML = cardsHtml;

    // Display matched archetype details
    const html = `
      <div class="archetype-reveal">
        <div class="archetype-icon">${this.getArchetypeEmoji()}</div>
        
        <h2>${archetype.name}</h2>
        <p class="archetype-tagline">"${archetype.tagline}"</p>
        
        <p class="archetype-description">${archetype.description}</p>
        
        <div class="archetype-roles">
          <h3>Roles You Might Love:</h3>
          <ul>
            ${archetype.roles.map(role => `<li>${role}</li>`).join('')}
          </ul>
        </div>
        
        <div class="archetype-skills">
          <h3>Key Skills:</h3>
          <div class="skills-list">
            ${archetype.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        </div>
        
        <div class="archetype-user-info">
          <p><strong>Player:</strong> ${this.state.userName}</p>
          <p><strong>Team:</strong> ${this.state.teamName}</p>
          <p><strong>Gaming Tag:</strong> ${this.state.gamingTag}</p>
        </div>
        
        <div class="niccs-explore">
          <p>If you want to explore these careers further, please click here:</p>
          <a href="https://niccs.cisa.gov/tools/cyber-career-pathways-tool" target="_blank" class="niccs-link">
            NICCS Cyber Career Pathways Tool →
          </a>
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.showPage('career-reveal');
  },

  // GET ARCHETYPE EMOJI
  getArchetypeEmoji() {
    const emojis = {
      'investigator': '🔍',
      'builder': '🔧',
      'protector': '🛡️',
      'strategist': '♞',
      'connector': '🎯',
      'explorer': '🌍'
    };
    return emojis[this.state.matchedArchetype] || '🎯';
  },

  // UTILITY FUNCTIONS
  shuffleAnswers(answers, correctIndex) {
    // Create array with original indices
    const indexed = answers.map((answer, idx) => ({
      answer: answer.text || answer,
      originalIndex: idx
    }));

    // Shuffle
    const shuffled = indexed.sort(() => Math.random() - 0.5);

    // Return just the answers in shuffled order
    return shuffled.map(item => item.answer);
  },

  takeScreenshot() {
    // Browser's built-in screenshot functionality
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      // Fallback: just print to user
      alert('📸 Use your browser\'s screenshot tool (Print Screen or Shift+S on Windows) to capture your results!\n\nOr right-click and select "Take a screenshot"');
    } else {
      alert('📸 Use your browser\'s screenshot tool to capture your results!');
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => app.init());
