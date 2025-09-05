// Excali-Zen Content Script
class ExcaliZen {
  constructor() {
    this.isZenMode = false;
    this.originalTitle = document.title;
    this.init();
  }

  init() {
    // Listen for messages from popup
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'toggleZenMode') {
        this.toggleZenMode();
        sendResponse({ zenMode: this.isZenMode });
      } else if (message.action === 'getZenState') {
        sendResponse({ zenMode: this.isZenMode });
      }
    });

    // Check for saved zen mode state
    this.loadZenState();
    
    // Add keyboard shortcut (Ctrl/Cmd + Shift + Z)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z') {
        e.preventDefault();
        this.toggleZenMode();
      }
    });
  }

  async loadZenState() {
    try {
      const result = await browser.storage.local.get(['zenMode']);
      if (result.zenMode) {
        this.enableZenMode();
      }
    } catch (error) {
      console.log('Could not load zen state:', error);
    }
  }

  async saveZenState() {
    try {
      await browser.storage.local.set({ zenMode: this.isZenMode });
    } catch (error) {
      console.log('Could not save zen state:', error);
    }
  }

  toggleZenMode() {
    if (this.isZenMode) {
      this.disableZenMode();
    } else {
      this.enableZenMode();
    }
  }

  enableZenMode() {
    this.isZenMode = true;
    document.body.classList.add('excali-zen-mode');
    
    // Request fullscreen
    this.requestFullscreen();
    
    // Update page title
    document.title = '🧘 Zen Mode - ' + this.originalTitle;
    
    // Hide cursor after inactivity
    this.setupCursorHiding();
    
    this.saveZenState();
    this.showZenNotification('Zen mode enabled');
  }

  disableZenMode() {
    this.isZenMode = false;
    document.body.classList.remove('excali-zen-mode');
    
    // Exit fullscreen
    this.exitFullscreen();
    
    // Restore original title
    document.title = this.originalTitle;
    
    // Clear cursor hiding
    this.clearCursorHiding();
    
    this.saveZenState();
    this.showZenNotification('Zen mode disabled');
  }

  requestFullscreen() {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  setupCursorHiding() {
    let cursorTimeout;
    const hideCursor = () => {
      document.body.style.cursor = 'none';
    };
    
    const showCursor = () => {
      document.body.style.cursor = '';
      clearTimeout(cursorTimeout);
      cursorTimeout = setTimeout(hideCursor, 3000);
    };

    document.addEventListener('mousemove', showCursor);
    cursorTimeout = setTimeout(hideCursor, 3000);
    
    this.cursorHideCleanup = () => {
      clearTimeout(cursorTimeout);
      document.removeEventListener('mousemove', showCursor);
      document.body.style.cursor = '';
    };
  }

  clearCursorHiding() {
    if (this.cursorHideCleanup) {
      this.cursorHideCleanup();
      this.cursorHideCleanup = null;
    }
  }

  showZenNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.excali-zen-notification');
    if (existing) {
      existing.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'excali-zen-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Auto remove after 2 seconds
    setTimeout(() => {
      notification.remove();
    }, 2000);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ExcaliZen();
  });
} else {
  new ExcaliZen();
}
