/* ========================================
   CYBER GLOW-UP CHALLENGE v2.0
   Main Application Entry Point
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the application
  if (typeof Components !== 'undefined') {
    Components.initAll();
  }
  
  // Add page visibility event for optimization
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      console.log('App backgrounded');
    } else {
      console.log('App resumed');
    }
  });
  
  // Log app readiness
  console.log('Cyber Glow-Up Challenge v2.0 - Ready');
  console.log('User Level:', AppState.user.level);
  console.log('Archetypes:', AppState.archetypes.length);
});

// Handle errors gracefully
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});
