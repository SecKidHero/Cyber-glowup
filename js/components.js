/* ========================================
   CYBER GLOW-UP CHALLENGE v2.0
   Component Logic & Interactions
   ======================================== */

const Components = {
  
  // Navigation
  initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        AppState.setActiveTab(link.textContent.trim());
      });
    });
    
    // Set Mission Control as active by default
    document.querySelector('.nav-link')?.classList.add('active');
  },
  
  // Archetype Cards Interaction
  initArchetypeCards() {
    const cards = document.querySelectorAll('.archetype-card');
    cards.forEach(card => {
      card.addEventListener('click', function() {
        cards.forEach(c => c.style.transform = '');
        this.style.transform = 'translateY(-20px) scale(1.08)';
      });
      
      card.addEventListener('mouseenter', function() {
        this.style.zIndex = 10;
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.zIndex = 'auto';
      });
    });
  },
  
  // CTA Button Interaction
  initCTAButton() {
    const ctaButton = document.querySelector('.hero-cta');
    if (ctaButton) {
      ctaButton.addEventListener('click', () => {
        console.log('Starting the Challenge!');
        // Animate transition
        ctaButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
          ctaButton.style.transform = '';
          // Could redirect to missions page
        }, 200);
      });
    }
  },
  
  // Dashboard Updates (for future API integration)
  updateDashboard(userUpdates) {
    AppState.updateUser(userUpdates);
    this.renderDashboard();
  },
  
  renderDashboard() {
    const xpPercentage = AppState.getXpPercentage();
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
      progressFill.style.width = xpPercentage + '%';
    }
    
    // Update XP display in navbar
    const xpDisplay = document.querySelector('.xp-display');
    if (xpDisplay) {
      xpDisplay.textContent = `⚡ ${AppState.user.xp}`;
    }
  },
  
  // Initialize all components
  initAll() {
    this.initNavigation();
    this.initArchetypeCards();
    this.initCTAButton();
    this.renderDashboard();
    this.initScrollAnimations();
  },
  
  // Scroll animations for elements
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Components;
}
