/* ========================================
   CYBER GLOW-UP CHALLENGE v2.0
   State Management
   ======================================== */

const AppState = {
  user: {
    level: 12,
    xp: 620,
    maxXp: 900,
    streak: 7,
    powerPoints: 620,
    glowSquad: 24318,
    badge: 'Rising Star'
  },
  
  archetypes: [
    {
      id: 'investigator',
      name: 'Investigator',
      icon: '🔍',
      stars: 2,
      class: 'investigator'
    },
    {
      id: 'builder',
      name: 'Builder',
      icon: '🔧',
      stars: 2,
      class: 'builder'
    },
    {
      id: 'protector',
      name: 'Protector',
      icon: '🛡️',
      stars: 3,
      class: 'protector'
    },
    {
      id: 'strategist',
      name: 'Strategist',
      icon: '♞',
      stars: 2,
      class: 'strategist'
    },
    {
      id: 'connector',
      name: 'Connector',
      icon: '🕸️',
      stars: 1,
      class: 'connector'
    }
  ],
  
  missions: [
    {
      id: 1,
      step: '01',
      title: 'AI Reality Check',
      description: 'Explore how AI shows up in your world—and what\'s real.',
      icon: '🤖',
      completed: true
    },
    {
      id: 2,
      step: '02',
      title: 'Strength Quiz',
      description: 'Answer fun questions to discover your top strengths.',
      icon: '✓',
      completed: true
    },
    {
      id: 3,
      step: '03',
      title: 'Career Reveal',
      description: 'Unlock careers that match your strengths and goals.',
      icon: '🚀',
      completed: false
    }
  ],
  
  activeTab: 'Mission Control',
  currentMissionStep: 2,
  
  // Methods
  updateUser(updates) {
    this.user = { ...this.user, ...updates };
  },
  
  setActiveTab(tab) {
    this.activeTab = tab;
  },
  
  setCurrentMissionStep(step) {
    this.currentMissionStep = step;
  },
  
  getXpPercentage() {
    return (this.user.xp / this.user.maxXp) * 100;
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppState;
}
