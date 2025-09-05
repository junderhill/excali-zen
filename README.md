# Excali-Zen

A zen mode browser extension for [Excalidraw](https://excalidraw.com) that hides clutter and provides a distraction-free drawing experience. Works with both the official Excalidraw.com and your self-hosted instances.

## 🌟 Features

🧘 **Zen Mode**: Hide all UI elements and focus purely on your drawings  
📺 **Auto Fullscreen**: Automatically enters fullscreen mode for maximum canvas space  
🎯 **Focus Mode**: Removes distracting elements like menus, toolbars, and buttons  
⌨️ **Keyboard Shortcut**: Quick toggle with `Ctrl+Shift+Z`  
🎨 **Clean Canvas**: Provides a distraction-free drawing environment  
🌙 **Auto Cursor Hide**: Cursor automatically hides after 3 seconds of inactivity  
🏠 **Custom Domains**: Add your self-hosted Excalidraw instances  

## 🦊 Browser Support

**Currently Supported:**
- **Firefox** 57+ (Quantum and later) ✅

**Future Support:**
- **Chrome** (Coming soon) 🔄
- **Safari** (Planned) 📋

## 🚀 Installation

### Firefox

#### From Source (Development)
1. **Clone or Download**: Get the extension files to your computer
2. **Open Firefox**: Launch Firefox browser
3. **Open Add-ons Manager**: 
   - Type `about:addons` in the address bar, or
   - Press `Ctrl+Shift+A` (Windows/Linux) or `Cmd+Shift+A` (Mac)
4. **Enable Developer Mode**: 
   - Click the gear icon ⚙️ in the top right
   - Select "Debug Add-ons"
5. **Load Extension**:
   - Click "This Firefox" in the sidebar
   - Click "Load Temporary Add-on..."
   - Navigate to the `firefox/` folder
   - Select the `manifest.json` file

#### From Firefox Add-ons Store
*Coming soon - extension will be submitted to Mozilla Add-ons store*

## 📖 Usage

### Quick Start
1. Visit [Excalidraw.com](https://excalidraw.com) or your self-hosted instance
2. Click the 🧘 extension icon in the toolbar, or
3. Press `Ctrl+Shift+Z`
4. Enjoy distraction-free drawing!

### Adding Custom Domains
1. Click the extension icon
2. Click "Custom Domains" link in the popup
3. Add your self-hosted Excalidraw URL (e.g., `https://draw.mycompany.com`)
4. Visit your custom domain and use zen mode normally!

### Features in Detail

**Zen Mode Toggle**:
- Click the extension icon to toggle zen mode on/off
- Icon changes to 🌅 when zen mode is active
- Use keyboard shortcut for quick access

**What Gets Hidden**:
- Top menu bar and all menus
- Toolbar and tool panels
- Bottom status bar
- Library panel
- Collaboration UI
- Zoom controls
- Help dialogs
- All floating UI elements

**Fullscreen Mode**:
- Automatically requests fullscreen when zen mode is activated
- Exits fullscreen when zen mode is disabled
- Works across all modern browsers

**Cursor Auto-Hide**:
- Cursor automatically hides after 3 seconds of no movement
- Reappears immediately when you move the mouse
- Only active during zen mode

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+Z` | Toggle Zen Mode |

*Note: All existing Excalidraw shortcuts continue to work in zen mode*

## 🔒 Privacy & Permissions

This extension:
- ✅ Works with excalidraw.com and your custom domains
- ✅ Stores preferences locally (no cloud sync)
- ✅ No data collection or tracking
- ✅ No network requests
- ✅ Open source code

### Required Permissions:
- `activeTab`: To interact with the current Excalidraw tab
- `tabs`: To manage fullscreen and tab state
- `storage`: To save custom domains and preferences
- `*://*/*`: To support custom self-hosted domains

## 🛠️ Troubleshooting

**Extension not working?**
- Make sure you're on excalidraw.com or a configured custom domain
- Refresh the page and try again
- Check that the extension is enabled in Firefox

**Custom domain not working?**
- Ensure the domain is properly added in the options page
- Make sure the URL includes the protocol (https:// or http://)
- Reload the page after adding a new domain

**Fullscreen not working?**
- Some browsers require user interaction for fullscreen
- Try clicking the extension icon instead of using keyboard shortcut
- Check browser fullscreen permissions

**Zen mode stuck on?**
- Press `Ctrl+Shift+Z` again to toggle off
- Click the extension icon to disable
- Refresh the page as a last resort

## 🏗️ Project Structure

```
excali-zen/
├── firefox/                 # Firefox extension
│   ├── manifest.json        # Extension manifest
│   ├── content.js           # Main content script
│   ├── background.js        # Background script
│   ├── popup.html          # Extension popup UI
│   ├── popup.js            # Popup functionality
│   ├── popup.css           # Popup styles
│   ├── options.html        # Options page for custom domains
│   ├── options.js          # Options page functionality
│   ├── zen-mode.css        # Zen mode styles
│   └── icons/              # Extension icons
├── chrome/                  # Chrome extension (coming soon)
└── safari/                  # Safari extension (planned)
```

## 🤝 Contributing

Feel free to:
- Report bugs and issues
- Suggest new features
- Submit pull requests
- Improve documentation
- Add support for other browsers

## 📄 License

MIT License - feel free to use and modify as needed.

## 📋 Changelog

### v1.1.0
- ✨ Added custom domain support for self-hosted Excalidraw instances
- 🎨 Enhanced options page for domain management
- 🔧 Improved error handling and user feedback

### v1.0.0
- 🎉 Initial release
- 🧘 Basic zen mode functionality
- 📺 Fullscreen support
- ⌨️ Keyboard shortcuts
- 🌙 Auto cursor hiding
- 💫 Beautiful popup UI

---

**Made with ❤️ for the Excalidraw community**

Enjoy distraction-free drawing! 🎨✨
