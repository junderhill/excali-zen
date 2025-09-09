// Options page script for managing custom domains
class OptionsManager {
  constructor() {
    this.domainInput = document.getElementById('domainInput');
    this.addDomainBtn = document.getElementById('addDomainBtn');
    this.domainList = document.getElementById('domainList');
    this.statusMessage = document.getElementById('statusMessage');
    this.enableFullscreenCheckbox = document.getElementById('enableFullscreen');
    
    this.init();
  }

  async init() {
    // Add event listeners
    this.addDomainBtn.addEventListener('click', () => this.addDomain());
    this.domainInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addDomain();
      }
    });
    
    // Add fullscreen setting listener
    this.enableFullscreenCheckbox.addEventListener('change', () => this.saveFullscreenSetting());
    
    // Load settings and domains
    await this.loadSettings();
    await this.loadDomains();
  }

  async loadSettings() {
    try {
      const result = await browser.storage.local.get(['enableFullscreen']);
      // Default to true if not set
      const enableFullscreen = result.enableFullscreen !== undefined ? result.enableFullscreen : true;
      this.enableFullscreenCheckbox.checked = enableFullscreen;
    } catch (error) {
      console.error('Error loading settings:', error);
      // Default to true on error
      this.enableFullscreenCheckbox.checked = true;
    }
  }

  async saveFullscreenSetting() {
    try {
      await browser.storage.local.set({ 
        enableFullscreen: this.enableFullscreenCheckbox.checked 
      });
      
      this.showStatus('Settings saved successfully!', 'success');
    } catch (error) {
      console.error('Error saving fullscreen setting:', error);
      this.showStatus('Error saving settings', 'error');
    }
  }

  async loadDomains() {
    try {
      const result = await browser.storage.local.get(['customDomains']);
      const customDomains = result.customDomains || [];
      
      this.renderDomainList(customDomains);
    } catch (error) {
      console.error('Error loading domains:', error);
      this.showStatus('Error loading domains', 'error');
    }
  }

  renderDomainList(customDomains) {
    // Always include the default domain
    const allDomains = [
      { url: 'https://excalidraw.com', isDefault: true },
      ...customDomains.map(domain => ({ url: domain, isDefault: false }))
    ];

    if (allDomains.length === 1) {
      this.domainList.innerHTML = `
        <div class="domain-item default">
          <span class="domain-url">https://excalidraw.com</span>
          <span class="domain-badge">Default</span>
        </div>
        <div class="empty-state">
          No custom domains added yet. Add your self-hosted Excalidraw domains above.
        </div>
      `;
      return;
    }

    this.domainList.innerHTML = allDomains.map(domain => `
      <div class="domain-item ${domain.isDefault ? 'default' : ''}">
        <span class="domain-url">${domain.url}</span>
        <div>
          ${domain.isDefault 
            ? '<span class="domain-badge">Default</span>' 
            : `<button class="btn btn-danger btn-small" onclick="optionsManager.removeDomain('${domain.url}')">Remove</button>`
          }
        </div>
      </div>
    `).join('');
  }

  async addDomain() {
    const domainUrl = this.domainInput.value.trim();
    
    if (!domainUrl) {
      this.showStatus('Please enter a domain URL', 'error');
      return;
    }

    // Validate URL format
    try {
      const url = new URL(domainUrl);
      
      // Only allow http and https
      if (!['http:', 'https:'].includes(url.protocol)) {
        throw new Error('Only HTTP and HTTPS protocols are supported');
      }
    } catch (error) {
      this.showStatus('Please enter a valid URL (e.g., https://draw.example.com)', 'error');
      return;
    }

    // Check if domain already exists
    const result = await browser.storage.local.get(['customDomains']);
    const customDomains = result.customDomains || [];
    
    if (customDomains.includes(domainUrl)) {
      this.showStatus('Domain already exists', 'error');
      return;
    }

    // Check if it's the default domain
    if (domainUrl.includes('excalidraw.com')) {
      this.showStatus('excalidraw.com is already supported by default', 'error');
      return;
    }

    try {
      // Add domain to storage
      const updatedDomains = [...customDomains, domainUrl];
      await browser.storage.local.set({ customDomains: updatedDomains });
      
      // Update content script registration
      await this.updateContentScripts(updatedDomains);
      
      // Clear input and refresh list
      this.domainInput.value = '';
      await this.loadDomains();
      
      this.showStatus('Domain added successfully! Reload any open tabs with this domain to activate zen mode.', 'success');
      
    } catch (error) {
      console.error('Error adding domain:', error);
      this.showStatus('Error adding domain', 'error');
    }
  }

  async removeDomain(domainUrl) {
    if (!confirm(`Remove ${domainUrl} from custom domains?`)) {
      return;
    }

    try {
      const result = await browser.storage.local.get(['customDomains']);
      const customDomains = result.customDomains || [];
      
      const updatedDomains = customDomains.filter(domain => domain !== domainUrl);
      await browser.storage.local.set({ customDomains: updatedDomains });
      
      // Update content script registration
      await this.updateContentScripts(updatedDomains);
      
      await this.loadDomains();
      this.showStatus('Domain removed successfully', 'success');
      
    } catch (error) {
      console.error('Error removing domain:', error);
      this.showStatus('Error removing domain', 'error');
    }
  }

  async updateContentScripts(customDomains) {
    // Note: In Manifest V2, we can't dynamically register content scripts
    // The background script will handle checking domains dynamically
    // This method is here for future compatibility with Manifest V3
    
    // Send message to background script to update domain list
    try {
      await browser.runtime.sendMessage({
        action: 'updateCustomDomains',
        domains: customDomains
      });
    } catch (error) {
      // Background script might not be ready, that's ok
      console.log('Could not notify background script:', error);
    }
  }

  showStatus(message, type) {
    this.statusMessage.innerHTML = `
      <div class="status-message status-${type}">
        ${message}
      </div>
    `;
    
    // Auto-hide success messages
    if (type === 'success') {
      setTimeout(() => {
        this.statusMessage.innerHTML = '';
      }, 5000);
    }
  }
}

// Initialize options manager when DOM is ready
let optionsManager;
document.addEventListener('DOMContentLoaded', () => {
  optionsManager = new OptionsManager();
});
