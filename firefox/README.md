# Excali-Zen Firefox Extension

A zen mode extension for [Excalidraw.com](https://excalidraw.com) that hides clutter and forces fullscreen mode for distraction-free drawing.

## Features

🧘 **Zen Mode**: Hide all UI elements and focus purely on your drawings  
📺 **Smart Fullscreen**: Configurable fullscreen mode with browser-friendly behavior  
🎯 **Focus Mode**: Removes distracting elements like menus, toolbars, and buttons  
⌨️ **Keyboard Shortcut**: Quick toggle with `Ctrl+Shift+Z` for full zen experience  
🎨 **Clean Canvas**: Provides a distraction-free drawing environment  
🌙 **Auto Cursor Hide**: Cursor automatically hides after 3 seconds of inactivity  
⚙️ **Customizable**: Configure fullscreen behavior and add custom domains  

## Installation

### From Source (Development)

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
   - Navigate to the extension folder
   - Select the `manifest.json` file

### From Firefox Add-ons Store
*Coming soon - extension will be submitted to Mozilla Add-ons store*

## Usage

### Quick Start
1. Visit [Excalidraw.com](https://excalidraw.com) or your custom domain
2. **For full zen experience**: Press `Ctrl+Shift+Z` (includes fullscreen)
3. **For windowed zen**: Click the 🧘 extension icon in the toolbar
4. Enjoy distraction-free drawing!

### Features in Detail

**Zen Mode Activation**:
- **Keyboard shortcut (`Ctrl+Shift+Z`)**: Full zen mode with fullscreen (recommended)
- **Extension icon**: Zen mode without fullscreen (browser limitation)
- Icon changes to 🌅 when zen mode is active

**What Gets Hidden**:
- Top menu bar and all menus
- Toolbar and tool panels
- Bottom status bar
- Library panel
- Collaboration UI
- Zoom controls
- Help dialogs
- All floating UI elements

**Smart Fullscreen Mode**:
- **Configurable**: Enable/disable in popup or options page
- **Keyboard activation**: `Ctrl+Shift+Z` enables fullscreen (browser allows this)
- **Icon activation**: Shows helpful message about using keyboard shortcut
- **Auto-exit**: Exits fullscreen when zen mode is disabled

**Cursor Auto-Hide**:
- Cursor automatically hides after 3 seconds of no movement
- Reappears immediately when you move the mouse
- Only active during zen mode

### Customization

**Fullscreen Toggle**:
- **Location**: Available in both popup and options page
- **Default**: Enabled (maintains original behavior)
- **When enabled**: Fullscreen works with keyboard shortcut, helpful message shown for icon clicks
- **When disabled**: No fullscreen attempts, zen mode works in windowed mode

**Custom Domains**:
- Add your self-hosted Excalidraw instances via options page
- Extension works seamlessly across all configured domains
- Supports HTTP/HTTPS and custom ports

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+Z` | Toggle Zen Mode (with fullscreen if enabled) |

*Note: All existing Excalidraw shortcuts continue to work in zen mode*

## Compatibility

- **Firefox**: 57+ (Quantum and later)
- **Excalidraw**: Works with excalidraw.com
- **Platforms**: Windows, macOS, Linux

## Privacy & Permissions

This extension:
- ✅ Only works on excalidraw.com
- ✅ Stores zen mode preference locally
- ✅ No data collection or tracking
- ✅ No network requests
- ✅ Open source code

### Required Permissions:
- `activeTab`: To interact with the current Excalidraw tab
- `tabs`: To manage fullscreen and tab state
- `excalidraw.com`: To inject zen mode functionality

## Troubleshooting

**Extension not working?**
- Make sure you're on excalidraw.com
- Refresh the page and try again
- Check that the extension is enabled in Firefox

**Fullscreen not working?**
- **Use keyboard shortcut**: `Ctrl+Shift+Z` (browsers allow fullscreen from keyboard)
- **From extension icon**: Shows message "Use Ctrl+Shift+Z for fullscreen" (browser limitation)
- **Disable if not needed**: Toggle off fullscreen in popup or options page
- Check browser fullscreen permissions if keyboard shortcut still fails

**Zen mode stuck on?**
- Press `Ctrl+Shift+Z` again to toggle off
- Click the extension icon to disable
- Refresh the page as a last resort

## Development

### File Structure
```
firefox/
├── manifest.json          # Extension manifest
├── content.js            # Main content script
├── background.js         # Background script
├── popup.html           # Extension popup UI
├── popup.js             # Popup functionality
├── popup.css            # Popup styles
├── zen-mode.css         # Zen mode styles
└── icons/               # Extension icons
    ├── icon-16.png
    ├── icon-32.png
    ├── icon-48.png
    ├── icon-128.png
    ├── icon-zen-16.png
    ├── icon-zen-32.png
    ├── icon-zen-48.png
    └── icon-zen-128.png
```

### Building
No build process required - this is a pure web extension that can be loaded directly into Firefox.

## Contributing

Feel free to:
- Report bugs and issues
- Suggest new features
- Submit pull requests
- Improve documentation

## License

MIT License - feel free to use and modify as needed.

## Changelog

### v1.0.0
- Initial release
- Basic zen mode functionality
- Fullscreen support
- Keyboard shortcuts
- Auto cursor hiding
- Beautiful popup UI

---

**Made with ❤️ for the Excalidraw community**

Enjoy distraction-free drawing! 🎨✨
