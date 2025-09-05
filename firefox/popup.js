// Popup Script
class PopupController {
  constructor() {
    this.statusElement = document.getElementById('status');
    this.statusText = document.getElementById('statusText');
    this.toggleButton = document.getElementById('toggleButton');
    this.buttonIcon = document.getElementById('buttonIcon');
    this.buttonText = document.getElementById('buttonText');
    
    this.init();
  }

  async init() {
    // Add event listeners
    this.toggleButton.addEventListener('click', () => this.toggleZenMode());
    
    // Add options page link
    document.getElementById('optionsLink').addEventListener('click', (e) => {
      e.preventDefault();
      browser.runtime.openOptionsPage();
      window.close();
    });
    
    // Check if we're on a supported Excalidraw domain
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const activeTab = tabs[0];
    
    if (!activeTab) {
      this.showError('Unable to access current tab');
      return;
    }
    
    const isSupported = await this.isSupportedDomain(activeTab.url);
    if (!isSupported) {
      this.showError('This extension only works on Excalidraw domains. Add custom domains in options.');
      return;
    }
    
    // Get current zen mode state
    await this.updateStatus();
  }

  async isSupportedDomain(url) {
    if (!url) return false;
    
    // Always support excalidraw.com
    if (url.includes('excalidraw.com')) {
      return true;
    }
    
    // Check custom domains
    try {
      const result = await browser.storage.local.get(['customDomains']);
      const customDomains = result.customDomains || [];
      
      return customDomains.some(domain => {
        try {
          const domainUrl = new URL(domain);
          const tabUrl = new URL(url);
          return tabUrl.hostname === domainUrl.hostname && 
                 tabUrl.port === domainUrl.port &&
                 tabUrl.protocol === domainUrl.protocol;
        } catch (error) {
          return false;
        }
      });
    } catch (error) {
      console.error('Error checking custom domains:', error);
      return false;
    }
  }

  async updateStatus() {
    try {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      const activeTab = tabs[0];
      
      const response = await browser.tabs.sendMessage(activeTab.id, { 
        action: 'getZenState' 
      });
      
      this.setZenModeState(response.zenMode);
      
    } catch (error) {
      console.error('Error getting zen state:', error);
      this.showError('Unable to connect to Excalidraw');
    }
  }

  async toggleZenMode() {
    this.setLoading(true);
    
    try {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      const activeTab = tabs[0];
      
      const response = await browser.tabs.sendMessage(activeTab.id, { 
        action: 'toggleZenMode' 
      });
      
      this.setZenModeState(response.zenMode);
      
      // Close popup after a short delay
      setTimeout(() => {
        window.close();
      }, 500);
      
    } catch (error) {
      console.error('Error toggling zen mode:', error);
      this.showError('Failed to toggle zen mode');
    } finally {
      this.setLoading(false);
    }
  }

  setZenModeState(isActive) {
    this.toggleButton.disabled = false;
    
    if (isActive) {
      this.statusElement.className = 'status active';
      this.statusText.textContent = '🧘 Zen Mode Active';
      
      this.toggleButton.className = 'zen-button active';
      this.buttonIcon.textContent = '🌅';
      this.buttonText.textContent = 'Exit Zen Mode';
      
    } else {
      this.statusElement.className = 'status inactive';
      this.statusText.textContent = 'Ready to Focus';
      
      this.toggleButton.className = 'zen-button';
      this.buttonIcon.textContent = '🧘';
      this.buttonText.textContent = 'Enter Zen Mode';
    }
  }

  setLoading(loading) {
    if (loading) {
      this.toggleButton.className += ' loading';
      this.toggleButton.disabled = true;
    } else {
      this.toggleButton.className = this.toggleButton.className.replace(' loading', '');
      this.toggleButton.disabled = false;
    }
  }

  showError(message) {
    this.statusElement.className = 'status error';
    this.statusText.textContent = message;
    
    this.toggleButton.disabled = true;
    this.buttonText.textContent = 'Unavailable';
    this.buttonIcon.textContent = '⚠️';
  }
}

// Initialize popup when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});

