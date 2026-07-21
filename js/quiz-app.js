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
    
    const isCorrect = selectedIndex === correctIndex;
    this.state.onlineSafetyAnswers[questionIndex] = isCorrect;
    this.state.currentQuizType = 'onlineSafety';
    this.state.currentQuestionIndex = questionIndex;

    // Disable all buttons
    document.querySelectorAll('.quiz-answer-btn').forEach(btn => btn.disabled = true);
    
    // Highlight correct/incorrect
    const buttons = document.querySelectorAll('.quiz-answer-btn');
    buttons[correctIndex].classList.add('correct-answer');
    if (!isCorrect) {
      buttons[selectedIndex].classList.add('incorrect-answer');
    }
    
    // Show explanation
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'answer-explanation';
    explanationDiv.innerHTML = `
      <p class="explanation-label">${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</p>
      <p class="correct-answer-text">The correct answer is: <strong>${question.answers[question.correct]}</strong></p>
      <p class="explanation-text">${question.explanation}</p>
    `;
    
    const container = document.getElementById('safety-quiz-content');
    const questionDiv = container.querySelector('.quiz-question');
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
    
    console.log('🔍 DEBUG AI Reality Question:', {
      questionIndex,
      selectedIndex,
      question: question.question,
      correct: question.correct,
      shuffledAnswers,
      correctIndex: shuffledAnswers.findIndex(a => a === question.answers[question.correct])
    });
    
    const correctIndex = shuffledAnswers.findIndex(a => a === question.answers[question.correct]);
    
    const isCorrect = selectedIndex === correctIndex;
    console.log('📊 AI Reality Result:', { isCorrect, correctIndex, selectedIndex });
    
    this.state.aiRealityAnswers[questionIndex] = isCorrect;
    this.state.currentQuizType = 'aiReality';
    this.state.currentQuestionIndex = questionIndex;

    // Disable all buttons
    const buttons = document.querySelectorAll('.quiz-answer-btn');
    console.log('🔘 Found buttons:', buttons.length);
    buttons.forEach(btn => btn.disabled = true);
    
    // Highlight correct/incorrect
    buttons[correctIndex].classList.add('correct-answer');
    console.log('✅ Added correct-answer class to button', correctIndex);
    
    if (!isCorrect) {
      buttons[selectedIndex].classList.add('incorrect-answer');
      console.log('❌ Added incorrect-answer class to button', selectedIndex);
    }
    
    // Show explanation
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'answer-explanation';
    explanationDiv.innerHTML = `
      <p class="explanation-label">${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</p>
      <p class="correct-answer-text">The correct answer is: <strong>${question.answers[question.correct]}</strong></p>
      <p class="explanation-text">${question.explanation}</p>
    `;
    
    const container = document.getElementById('ai-quiz-content');
    console.log('📦 Container found:', container ? 'YES' : 'NO');
    
    const questionDiv = container.querySelector('.quiz-question');
    console.log('❓ Question div found:', questionDiv ? 'YES' : 'NO');
    
    if (questionDiv) {
      questionDiv.appendChild(explanationDiv);
      console.log('📝 Explanation div appended');
    }
    
    // Add next button
    const nextBtn = document.getElementById('ai-next-btn');
    console.log('🔘 Next button found:', nextBtn ? 'YES' : 'NO');
    
    if (nextBtn) {
      nextBtn.style.display = 'block';
      nextBtn.onclick = () => {
        if (questionIndex < 4) {
          this.renderAIRealityQuestion(questionIndex + 1);
        } else {
          this.startStrengthQuiz();
        }
      };
      console.log('✨ Next button configured');
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
    this.state.currentQuizType = 'strength';
    this.state.currentQuestionIndex = questionIndex;

    // Disable all buttons
    document.querySelectorAll('.quiz-answer-btn').forEach(btn => btn.disabled = true);
    
    // Highlight selected answer
    const buttons = document.querySelectorAll('.quiz-answer-btn');
    buttons[selectedIndex].classList.add('correct-answer');
    
    // Show confirmation message
    const confirmDiv = document.createElement('div');
    confirmDiv.className = 'answer-explanation';
    confirmDiv.innerHTML = `
      <p class="explanation-label">✓ Got it!</p>
      <p class="explanation-text">You selected: <strong>${selectedAnswer.text}</strong></p>
    `;
    
    const container = document.getElementById('strength-quiz-content');
    const questionDiv = container.querySelector('.quiz-question');
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
