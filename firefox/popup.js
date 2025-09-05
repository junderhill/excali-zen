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
    
    // Check if we're on Excalidraw
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const activeTab = tabs[0];
    
    if (!activeTab || !activeTab.url.includes('excalidraw.com')) {
      this.showError('Please visit Excalidraw.com to use this extension');
      return;
    }
    
    // Get current zen mode state
    await this.updateStatus();
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
