// Excali-Zen Content Script
class ExcaliZen {
  constructor() {
    this.isZenMode = false;
    this.originalTitle = document.title;
    this.init();
  }

  init() {
    // Listen for messages from popup and background script
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'toggleZenMode') {
        this.toggleZenMode(message.fromKeyboard || false);
        sendResponse({ zenMode: this.isZenMode });
      } else if (message.action === 'getZenState') {
        sendResponse({ zenMode: this.isZenMode });
      } else if (message.action === 'ping') {
        // Used by background script to check if content script is injected
        sendResponse({ injected: true });
      }
    });

    // Check for saved zen mode state
    this.loadZenState();
    
    // Add keyboard shortcut (Ctrl/Cmd + Shift + Z)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z') {
        e.preventDefault();
        this.toggleZenMode(true); // fromKeyboard = true
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

  async shouldEnterFullscreen() {
    try {
      const result = await browser.storage.local.get(['enableFullscreen']);
      // Default to true if not set
      const shouldEnter = result.enableFullscreen !== undefined ? result.enableFullscreen : true;
      console.log('Fullscreen setting:', shouldEnter, 'Raw result:', result);
      return shouldEnter;
    } catch (error) {
      console.log('Could not load fullscreen setting:', error);
      // Default to true on error
      return true;
    }
  }

  toggleZenMode(fromKeyboard = false) {
    if (this.isZenMode) {
      this.disableZenMode();
    } else {
      this.enableZenMode(fromKeyboard);
    }
  }

  async enableZenMode(fromKeyboard = false) {
    this.isZenMode = true;
    document.body.classList.add('excali-zen-mode');
    
    // Check if fullscreen should be enabled and if we can request it
    const shouldEnterFullscreen = await this.shouldEnterFullscreen();
    let notificationMessage = 'Zen mode enabled';
    
    if (shouldEnterFullscreen && fromKeyboard) {
      // Only request fullscreen if triggered by keyboard (proper user gesture)
      this.requestFullscreen();
    } else if (shouldEnterFullscreen && !fromKeyboard) {
      // Show a helpful message if fullscreen is enabled but triggered from popup
      notificationMessage = 'Zen mode enabled. Use Ctrl+Shift+Z for fullscreen.';
    }
    
    // Update page title
    document.title = '🧘 Zen Mode - ' + this.originalTitle;
    
    // Hide cursor after inactivity
    this.setupCursorHiding();
    
    this.saveZenState();
    this.showZenNotification(notificationMessage);
  }

  async disableZenMode() {
    this.isZenMode = false;
    document.body.classList.remove('excali-zen-mode');
    
    // Exit fullscreen only if we're currently in fullscreen
    if (document.fullscreenElement) {
      this.exitFullscreen();
    }
    
    // Restore original title
    document.title = this.originalTitle;
    
    // Clear cursor hiding
    this.clearCursorHiding();
    
    this.saveZenState();
    this.showZenNotification('Zen mode disabled');
  }

  requestFullscreen() {
    const element = document.documentElement;
    try {
      if (element.requestFullscreen) {
        element.requestFullscreen().catch(error => {
          console.log('Fullscreen request failed:', error);
          this.showZenNotification('Fullscreen blocked - try using Ctrl+Shift+Z instead');
        });
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } catch (error) {
      console.log('Fullscreen request failed:', error);
      this.showZenNotification('Fullscreen blocked - try using Ctrl+Shift+Z instead');
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

