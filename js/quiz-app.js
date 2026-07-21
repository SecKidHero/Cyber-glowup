/* ========================================
   CYBER GLOW-UP CHALLENGE v2.1
   Quiz Application Logic
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

    // Randomize answers
    const shuffledAnswers = this.shuffleAnswers(question.answers, question.correct);

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
  },

  answerOnlineSafetyQuestion(questionIndex, selectedIndex) {
    const question = QuizData.onlineSafety[questionIndex];
    const shuffledAnswers = this.shuffleAnswers(question.answers, question.correct);
    
    // Find correct answer in shuffled array
    const correctIndex = shuffledAnswers.findIndex(a => a === question.answers[question.correct]);
    
    this.state.onlineSafetyAnswers[questionIndex] = selectedIndex === correctIndex;

    if (questionIndex < 4) {
      // Next question
      this.renderOnlineSafetyQuestion(questionIndex + 1);
    } else {
      // Move to AI Reality Check
      this.startAIRealityQuiz();
    }
  },

  // AI REALITY QUIZ
  startAIRealityQuiz() {
    this.state.aiRealityAnswers = [];
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

    // Randomize answers
    const shuffledAnswers = this.shuffleAnswers(question.answers, question.correct);

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
  },

  answerAIRealityQuestion(questionIndex, selectedIndex) {
    const question = QuizData.aiReality[questionIndex];
    const shuffledAnswers = this.shuffleAnswers(question.answers, question.correct);
    
    const correctIndex = shuffledAnswers.findIndex(a => a === question.answers[question.correct]);
    
    this.state.aiRealityAnswers[questionIndex] = selectedIndex === correctIndex;

    if (questionIndex < 4) {
      // Next question
      this.renderAIRealityQuestion(questionIndex + 1);
    } else {
      // Move to Strength Quiz
      this.startStrengthQuiz();
    }
  },

  // STRENGTH/CAREER APTITUDE QUIZ
  startStrengthQuiz() {
    this.state.strengthQuizAnswers = [];
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

    // Shuffle answers
    const shuffledAnswers = [...question.answers].sort(() => Math.random() - 0.5);

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
  },

  answerStrengthQuestion(questionIndex, selectedIndex) {
    const question = QuizData.strengthQuiz[questionIndex];
    const shuffledAnswers = [...question.answers].sort(() => Math.random() - 0.5);
    
    const selectedAnswer = shuffledAnswers[selectedIndex];
    this.state.strengthQuizAnswers.push(selectedAnswer.archetype);

    if (questionIndex < 4) {
      // Next question
      this.renderStrengthQuestion(questionIndex + 1);
    } else {
      // Calculate archetype and show career reveal
      this.calculateArchetype();
      this.showCareerReveal();
    }
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

    this.state.strengthQuizAnswers.forEach(archetype => {
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

  // CAREER REVEAL
  showCareerReveal() {
    const archetype = QuizData.archetypeProfiles[this.state.matchedArchetype];
    const container = document.getElementById('career-reveal-content');

    document.getElementById('reveal-name').textContent = this.state.userName;

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
        
        <div class="archetype-user-info">
          <p><strong>Player:</strong> ${this.state.userName}</p>
          <p><strong>Team:</strong> ${this.state.teamName}</p>
          <p><strong>Gaming Tag:</strong> ${this.state.gamingTag}</p>
        </div>
        
        <a href="${archetype.niccsLink}" target="_blank" class="niccs-link">
          Explore Cyber Career Pathways →
        </a>
      </div>
    `;

    container.innerHTML = html;
    this.showPage('career-reveal');
  },

  // UTILITY FUNCTIONS
  shuffleAnswers(answers, correctIndex) {
    // Create array with original indices
    const indexed = answers.map((answer, idx) => ({
      answer: answer,
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
