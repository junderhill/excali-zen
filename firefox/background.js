// Excali-Zen Background Script

// Handle extension icon click
browser.browserAction.onClicked.addListener(async (tab) => {
  // Only work on Excalidraw pages
  if (!tab.url.includes('excalidraw.com')) {
    browser.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon-48.png',
      title: 'Excali-Zen',
      message: 'This extension only works on Excalidraw.com'
    });
    return;
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
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('excalidraw.com')) {
    // Check zen mode state and update icon accordingly
    try {
      const response = await browser.tabs.sendMessage(tabId, { action: 'getZenState' });
      updateBrowserActionIcon(tabId, response.zenMode);
    } catch (error) {
      // Content script not ready yet, use default icon
      updateBrowserActionIcon(tabId, false);
    }
  }
});

// Handle keyboard shortcuts
browser.commands.onCommand.addListener(async (command) => {
  if (command === 'toggle-zen-mode') {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const activeTab = tabs[0];
    
    if (activeTab && activeTab.url.includes('excalidraw.com')) {
      try {
        const response = await browser.tabs.sendMessage(activeTab.id, { action: 'toggleZenMode' });
        updateBrowserActionIcon(activeTab.id, response.zenMode);
      } catch (error) {
        console.error('Error toggling zen mode via keyboard:', error);
      }
    }
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
      message: 'Visit Excalidraw.com and click the extension icon to enter zen mode. Use Ctrl+Shift+Z as a shortcut!'
    });
  }
});
