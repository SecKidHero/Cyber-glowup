/* ========================================
   CYBER GLOW-UP CHALLENGE v2.2
   Quiz Application Logic
   ======================================== */

const app = {
  // State management
  state: {
    currentPage: 'registration',
    userName: '',
    gamingTag: '',
    teamName: '',

    // Quiz answer records
    onlineSafetyAnswers: [],
    aiRealityAnswers: [],
    strengthQuizAnswers: [],

    // Persisted answer ordering per question (prevents re-shuffle grading bugs)
    onlineSafetyShuffledAnswers: [],
    aiRealityShuffledAnswers: [],
    strengthShuffledAnswers: [],

    matchedArchetype: null,
    pageHistory: [] // Track navigation for back button
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
      this.showPage(previousPage);
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

    this.state.onlineSafetyShuffledAnswers = [];
    this.state.aiRealityShuffledAnswers = [];
    this.state.strengthShuffledAnswers = [];

    this.state.matchedArchetype = null;
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
    this.state.onlineSafetyShuffledAnswers = [];
    this.renderOnlineSafetyQuestion(0);
    this.showPage('online-safety-quiz');
  },

  renderOnlineSafetyQuestion(questionIndex) {
    const question = QuizData.onlineSafety[questionIndex];
    const container = document.getElementById('safety-quiz-content');

    // Update progress
    document.getElementById('safety-progress').textContent = `Question ${questionIndex + 1} of 5`;
    const progress = ((questionIndex + 1) / 5) * 100;
    document.getElementById('safety-progress-fill').style.width = progress + '%';

    // Randomize answers ONCE and persist order for this question
    const shuffledAnswers = this.shuffleAnswers(question.answers);
    this.state.onlineSafetyShuffledAnswers[questionIndex] = shuffledAnswers;

    let html = `
      <div class="quiz-question">
        <h2>${question.question}</h2>
        <div class="quiz-answers">
    `;

    shuffledAnswers.forEach((answer, idx) => {
      html += `
        <button class="quiz-answer-btn" data-index="${idx}" onclick="app.answerOnlineSafetyQuestion(${questionIndex}, ${idx})">
          <span class="answer-letter">${String.fromCharCode(65 + idx)}</span>
          <span class="answer-text">${answer}</span>
        </button>
      `;
    });

    html += `</div></div>`;
    container.innerHTML = html;

    const nextBtn = document.getElementById('safety-next-btn');
    if (nextBtn) {
      nextBtn.style.display = 'none';
    }
  },

  answerOnlineSafetyQuestion(questionIndex, selectedIndex) {
    const question = QuizData.onlineSafety[questionIndex];
    const shuffledAnswers = this.state.onlineSafetyShuffledAnswers[questionIndex] || this.shuffleAnswers(question.answers);
    const correctAnswerText = question.answers[question.correct];

    // Find correct answer in THE SAME shuffled array used for rendering
    const correctIndex = shuffledAnswers.findIndex(a => a === correctAnswerText);
    const selectedAnswerText = shuffledAnswers[selectedIndex];
    const isCorrect = selectedIndex === correctIndex;

    // Persist rich answer record
    this.state.onlineSafetyAnswers[questionIndex] = {
      question: question.question,
      selectedIndex,
      selectedAnswer: selectedAnswerText,
      correctIndex,
      correctAnswer: correctAnswerText,
      isCorrect,
      explanation: question.explanation
    };

    this.state.currentQuizType = 'onlineSafety';
    this.state.currentQuestionIndex = questionIndex;

    // Disable all buttons in this question block
    const questionDiv = document.getElementById('safety-quiz-content').querySelector('.quiz-question');
    const buttons = questionDiv.querySelectorAll('.quiz-answer-btn');
    buttons.forEach(btn => (btn.disabled = true));

    // Highlight correct/incorrect
    if (buttons[correctIndex]) {
      buttons[correctIndex].classList.add('correct-answer');
    }
    if (!isCorrect && buttons[selectedIndex]) {
      buttons[selectedIndex].classList.add('incorrect-answer');
    }

    // Show explanation
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'answer-explanation';
    explanationDiv.innerHTML = `
      <p class="explanation-label">${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</p>
      <p class="correct-answer-text">The correct answer is: <strong>${correctAnswerText}</strong></p>
      <p class="explanation-text">${question.explanation}</p>
    `;

    questionDiv.appendChild(explanationDiv);

    // Add next button
    const nextBtn = document.getElementById('safety-next-btn');
    nextBtn.style.display = 'block';
    nextBtn.onclick = () => {
      if (questionIndex < 4) {
        this.renderOnlineSafetyQuestion(questionIndex + 1);
      } else {
        this.startAIRealityQuiz();
      }
    };
  },

  // AI REALITY QUIZ
  startAIRealityQuiz() {
    this.state.aiRealityAnswers = [];
    this.state.aiRealityShuffledAnswers = [];
    this.renderAIRealityQuestion(0);
    this.showPage('ai-reality-quiz');
  },

  renderAIRealityQuestion(questionIndex) {
    const question = QuizData.aiReality[questionIndex];
    const container = document.getElementById('ai-quiz-content');

    // Update progress
    document.getElementById('ai-progress').textContent = `Question ${questionIndex + 1} of 5`;
    const progress = ((questionIndex + 1) / 5) * 100;
    document.getElementById('ai-progress-fill').style.width = progress + '%';

    // Randomize answers ONCE and persist order for this question
    const shuffledAnswers = this.shuffleAnswers(question.answers);
    this.state.aiRealityShuffledAnswers[questionIndex] = shuffledAnswers;

    let html = `
      <div class="quiz-question">
        <h2>${question.question}</h2>
        <div class="quiz-answers">
    `;

    shuffledAnswers.forEach((answer, idx) => {
      html += `
        <button class="quiz-answer-btn" data-index="${idx}" onclick="app.answerAIRealityQuestion(${questionIndex}, ${idx})">
          <span class="answer-letter">${String.fromCharCode(65 + idx)}</span>
          <span class="answer-text">${answer}</span>
        </button>
      `;
    });

    html += `</div></div>`;
    container.innerHTML = html;

    const nextBtn = document.getElementById('ai-next-btn');
    if (nextBtn) {
      nextBtn.style.display = 'none';
    }
  },

  answerAIRealityQuestion(questionIndex, selectedIndex) {
    const question = QuizData.aiReality[questionIndex];
    const shuffledAnswers = this.state.aiRealityShuffledAnswers[questionIndex] || this.shuffleAnswers(question.answers);
    const correctAnswerText = question.answers[question.correct];

    const correctIndex = shuffledAnswers.findIndex(a => a === correctAnswerText);
    const selectedAnswerText = shuffledAnswers[selectedIndex];
    const isCorrect = selectedIndex === correctIndex;

    // Persist rich answer record
    this.state.aiRealityAnswers[questionIndex] = {
      question: question.question,
      selectedIndex,
      selectedAnswer: selectedAnswerText,
      correctIndex,
      correctAnswer: correctAnswerText,
      isCorrect,
      explanation: question.explanation
    };

    this.state.currentQuizType = 'aiReality';
    this.state.currentQuestionIndex = questionIndex;

    // Disable all buttons in this question block
    const questionDiv = document.getElementById('ai-quiz-content').querySelector('.quiz-question');
    const buttons = questionDiv.querySelectorAll('.quiz-answer-btn');
    buttons.forEach(btn => (btn.disabled = true));

    // Highlight correct/incorrect
    if (buttons[correctIndex]) {
      buttons[correctIndex].classList.add('correct-answer');
    }
    if (!isCorrect && buttons[selectedIndex]) {
      buttons[selectedIndex].classList.add('incorrect-answer');
    }

    // Show explanation
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'answer-explanation';
    explanationDiv.innerHTML = `
      <p class="explanation-label">${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</p>
      <p class="correct-answer-text">The correct answer is: <strong>${correctAnswerText}</strong></p>
      <p class="explanation-text">${question.explanation}</p>
    `;

    questionDiv.appendChild(explanationDiv);

    // Add next button
    const nextBtn = document.getElementById('ai-next-btn');
    nextBtn.style.display = 'block';
    nextBtn.onclick = () => {
      if (questionIndex < 4) {
        this.renderAIRealityQuestion(questionIndex + 1);
      } else {
        this.startStrengthQuiz();
      }
    };
  },

  // STRENGTH/CAREER APTITUDE QUIZ
  startStrengthQuiz() {
    this.state.strengthQuizAnswers = [];
    this.state.strengthShuffledAnswers = [];
    this.renderStrengthQuestion(0);
    this.showPage('strength-quiz');
  },

  renderStrengthQuestion(questionIndex) {
    const question = QuizData.strengthQuiz[questionIndex];
    const container = document.getElementById('strength-quiz-content');

    // Update progress
    document.getElementById('strength-progress').textContent = `Question ${questionIndex + 1} of 5`;
    const progress = ((questionIndex + 1) / 5) * 100;
    document.getElementById('strength-progress-fill').style.width = progress + '%';

    // Shuffle ONCE and persist
    const shuffledAnswers = [...question.answers].sort(() => Math.random() - 0.5);
    this.state.strengthShuffledAnswers[questionIndex] = shuffledAnswers;

    let html = `
      <div class="quiz-question">
        <h2>${question.question}</h2>
        <div class="quiz-answers">
    `;

    shuffledAnswers.forEach((answer, idx) => {
      html += `
        <button class="quiz-answer-btn" data-index="${idx}" onclick="app.answerStrengthQuestion(${questionIndex}, ${idx})">
          <span class="answer-letter">${String.fromCharCode(65 + idx)}</span>
          <span class="answer-text">${answer.text}</span>
        </button>
      `;
    });

    html += `</div></div>`;
    container.innerHTML = html;

    const nextBtn = document.getElementById('strength-next-btn');
    if (nextBtn) {
      nextBtn.style.display = 'none';
      nextBtn.textContent = questionIndex === 4 ? '🎯 Reveal Results →' : 'Next Question →';
    }
  },

  answerStrengthQuestion(questionIndex, selectedIndex) {
    const question = QuizData.strengthQuiz[questionIndex];
    const shuffledAnswers = this.state.strengthShuffledAnswers[questionIndex] || [...question.answers];

    const selectedAnswer = shuffledAnswers[selectedIndex];

    this.state.strengthQuizAnswers[questionIndex] = {
      question: question.question,
      selectedIndex,
      selectedAnswer: selectedAnswer ? selectedAnswer.text : '',
      archetype: selectedAnswer ? selectedAnswer.archetype : 'none'
    };

    this.state.currentQuizType = 'strength';
    this.state.currentQuestionIndex = questionIndex;

    // Disable all buttons in this question block
    const questionDiv = document.getElementById('strength-quiz-content').querySelector('.quiz-question');
    const buttons = questionDiv.querySelectorAll('.quiz-answer-btn');
    buttons.forEach(btn => (btn.disabled = true));

    // Highlight selected answer
    if (buttons[selectedIndex]) {
      buttons[selectedIndex].classList.add('correct-answer');
    }

    // Show confirmation message
    const confirmDiv = document.createElement('div');
    confirmDiv.className = 'answer-explanation';
    confirmDiv.innerHTML = `
      <p class="explanation-label">✓ Saved!</p>
      <p class="explanation-text">You selected: <strong>${selectedAnswer ? selectedAnswer.text : 'No answer selected'}</strong></p>
    `;

    questionDiv.appendChild(confirmDiv);

    // Add next button
    const nextBtn = document.getElementById('strength-next-btn');
    nextBtn.style.display = 'block';
    nextBtn.textContent = questionIndex === 4 ? '🎯 Reveal Results →' : 'Next Question →';
    nextBtn.onclick = () => {
      if (questionIndex < 4) {
        this.renderStrengthQuestion(questionIndex + 1);
      } else {
        this.calculateArchetype();
        this.showCareerReveal();
      }
    };
  },

  // ARCHETYPE MATCHING
  calculateArchetype() {
    // Count responses per archetype
    const archetypeCounts = {
      investigator: 0,
      builder: 0,
      protector: 0,
      strategist: 0,
      connector: 0,
      none: 0
    };

    this.state.strengthQuizAnswers.forEach(answerRecord => {
      if (!answerRecord) return;
      const archetype = answerRecord.archetype;
      if (archetypeCounts.hasOwnProperty(archetype)) {
        archetypeCounts[archetype]++;
      }
    });

    // Find the best match (highest count)
    let bestMatch = 'investigator';
    let maxCount = 0;

    for (const [archetype, count] of Object.entries(archetypeCounts)) {
      if (count > maxCount) {
        maxCount = count;
        bestMatch = archetype;
      }
    }

    this.state.matchedArchetype = bestMatch;
  },

  getQuizScore(answersArray) {
    return answersArray.reduce((score, record) => {
      if (record && record.isCorrect) return score + 1;
      return score;
    }, 0);
  },

  // CAREER + QUIZ REVEAL
  showCareerReveal() {
    const archetype = QuizData.archetypeProfiles[this.state.matchedArchetype];
    const container = document.getElementById('career-reveal-content');

    document.getElementById('reveal-name').textContent = this.state.userName;

    const safetyScore = this.getQuizScore(this.state.onlineSafetyAnswers);
    const aiScore = this.getQuizScore(this.state.aiRealityAnswers);

    let html = `
      <div class="archetype-reveal">
        <div class="archetype-icon">${archetype.icon}</div>
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

        <div class="quiz-results-summary">
          <h3>Your Quiz Results</h3>
          <p><strong>Online Safety Quiz:</strong> ${safetyScore}/5 correct</p>
          <p><strong>AI Reality Check:</strong> ${aiScore}/5 correct</p>
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

  // UTILITY FUNCTIONS
  shuffleAnswers(answers) {
    // Create copy and shuffle
    const shuffled = [...answers].sort(() => Math.random() - 0.5);
    return shuffled;
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
