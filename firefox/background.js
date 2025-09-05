// Excali-Zen Background Script

// Check if URL is a supported Excalidraw domain
async function isSupportedDomain(url) {
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

// Inject content script into custom domains
async function injectContentScript(tabId, url) {
  try {
    // Check if content script is already injected
    try {
      await browser.tabs.sendMessage(tabId, { action: 'ping' });
      return; // Already injected
    } catch (error) {
      // Not injected, proceed to inject
    }
    
    // Inject CSS first
    await browser.tabs.insertCSS(tabId, {
      file: 'zen-mode.css'
    });
    
    // Then inject JavaScript
    await browser.tabs.executeScript(tabId, {
      file: 'content.js'
    });
    
    console.log('Content script injected for:', url);
  } catch (error) {
    console.error('Error injecting content script:', error);
  }
}

// Handle extension icon click
browser.browserAction.onClicked.addListener(async (tab) => {
  // Check if this is a supported Excalidraw domain
  const isSupported = await isSupportedDomain(tab.url);
  
  if (!isSupported) {
    browser.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon-48.png',
      title: 'Excali-Zen',
      message: 'This extension only works on Excalidraw domains. Add custom domains in the options page.'
    });
    return;
  }
  
  // Inject content script for custom domains
  if (!tab.url.includes('excalidraw.com')) {
    await injectContentScript(tab.id, tab.url);
  }

  // Toggle zen mode
  try {
    const response = await browser.tabs.sendMessage(tab.id, { action: 'toggleZenMode' });
    updateBrowserActionIcon(tab.id, response.zenMode);
  } catch (error) {
    console.error('Error toggling zen mode:', error);
  }
});

// Update icon based on zen mode state
function updateBrowserActionIcon(tabId, isZenMode) {
  const iconPath = isZenMode ? {
    '16': 'icons/icon-zen-16.png',
    '32': 'icons/icon-zen-32.png',
    '48': 'icons/icon-zen-48.png',
    '128': 'icons/icon-zen-128.png'
  } : {
    '16': 'icons/icon-16.png',
    '32': 'icons/icon-32.png',
    '48': 'icons/icon-48.png',
    '128': 'icons/icon-128.png'
  };

  browser.browserAction.setIcon({
    tabId: tabId,
    path: iconPath
  });

  browser.browserAction.setTitle({
    tabId: tabId,
    title: isZenMode ? 'Exit Zen Mode' : 'Enter Zen Mode'
  });
}

// Handle tab updates to check if we're on Excalidraw
browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const isSupported = await isSupportedDomain(tab.url);
    
    if (isSupported) {
      // Inject content script for custom domains
      if (!tab.url.includes('excalidraw.com')) {
        await injectContentScript(tabId, tab.url);
      }
      
      // Check zen mode state and update icon accordingly
      try {
        const response = await browser.tabs.sendMessage(tabId, { action: 'getZenState' });
        updateBrowserActionIcon(tabId, response.zenMode);
      } catch (error) {
        // Content script not ready yet, use default icon
        updateBrowserActionIcon(tabId, false);
      }
    }
  }
});

// Handle keyboard shortcuts
browser.commands.onCommand.addListener(async (command) => {
  if (command === 'toggle-zen-mode') {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const activeTab = tabs[0];
    
    if (activeTab) {
      const isSupported = await isSupportedDomain(activeTab.url);
      
      if (isSupported) {
        // Inject content script for custom domains
        if (!activeTab.url.includes('excalidraw.com')) {
          await injectContentScript(activeTab.id, activeTab.url);
        }
        
        try {
          const response = await browser.tabs.sendMessage(activeTab.id, { action: 'toggleZenMode' });
          updateBrowserActionIcon(activeTab.id, response.zenMode);
        } catch (error) {
          console.error('Error toggling zen mode via keyboard:', error);
        }
      }
    }
  }
});

// Handle messages from options page
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateCustomDomains') {
    // Options page is notifying us of domain changes
    console.log('Custom domains updated:', message.domains);
    sendResponse({ success: true });
  }
});

// Handle installation
browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Show welcome notification
    browser.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon-48.png',
      title: 'Excali-Zen Installed!',
      message: 'Visit Excalidraw.com and click the extension icon to enter zen mode. Add custom domains in options!'
    });
    
    // Open options page on first install
    browser.runtime.openOptionsPage();
  }
});

