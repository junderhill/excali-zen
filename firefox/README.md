# Excali-Zen Firefox Extension

A zen mode extension for [Excalidraw.com](https://excalidraw.com) that hides clutter and forces fullscreen mode for distraction-free drawing.

## Features

🧘 **Zen Mode**: Hide all UI elements and focus purely on your drawings  
📺 **Auto Fullscreen**: Automatically enters fullscreen mode for maximum canvas space  
🎯 **Focus Mode**: Removes distracting elements like menus, toolbars, and buttons  
⌨️ **Keyboard Shortcut**: Quick toggle with `Ctrl+Shift+Z` (or `Cmd+Shift+Z` on Mac)  
🎨 **Clean Canvas**: Provides a distraction-free drawing environment  
🌙 **Auto Cursor Hide**: Cursor automatically hides after 3 seconds of inactivity  

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
1. Visit [Excalidraw.com](https://excalidraw.com)
2. Click the 🧘 extension icon in the toolbar, or
3. Press `Ctrl+Shift+Z` (Windows/Linux) or `Cmd+Shift+Z` (Mac)
4. Enjoy distraction-free drawing!

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

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+Z` (Windows/Linux)<br>`Cmd+Shift+Z` (Mac) | Toggle Zen Mode |

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
- Some browsers require user interaction for fullscreen
- Try clicking the extension icon instead of using keyboard shortcut
- Check browser fullscreen permissions

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
