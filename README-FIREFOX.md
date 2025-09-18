# QuickConfigS Firefox Extension

This is the Firefox-compatible version of the QuickConfigS extension for QuickBase developers.

## Firefox Installation

### Method 1: Developer Installation (Recommended for testing)

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on"
4. Navigate to the extension folder and select `manifest-firefox.json`
5. The extension will be loaded temporarily (until Firefox restart)

### Method 2: Permanent Installation

1. Package the extension as a ZIP file:
   - Include all files except the Chrome-specific `manifest.json`
   - Rename `manifest-firefox.json` to `manifest.json` in the ZIP
   - The ZIP should contain: `manifest.json`, `index.html`, `js/`, `images/` folders

2. Sign the extension (for permanent installation):
   - Go to [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/)
   - Create an account and submit your extension for signing
   - Download the signed XPI file

3. Install the signed XPI:
   - Open Firefox
   - Drag the XPI file to Firefox or use File > Open File

## Key Differences from Chrome Version

### Manifest Changes
- Uses Manifest V2 (Firefox doesn't fully support V3 yet)
- `browser_action` instead of `action`
- `scripts` array in background instead of `service_worker`
- Added `applications.gecko` section for Firefox-specific settings
- Removed `declarativeContent` permission (not supported in Firefox)

### API Changes
- Uses `browser.*` API namespace (with fallback to `chrome.*`)
- Promise-based APIs instead of callback-based
- Different script injection method for content scripts

### Behavior Differences
- **Extension Icon**: In Chrome, the extension icon only appears on QuickBase sites. In Firefox, the icon is always visible due to API limitations.
- **Error Handling**: Firefox version includes better error messages when not on a QuickBase page.
- **Page Detection**: The extension will show an error message if opened on non-QuickBase pages.

### Files
- `manifest-firefox.json`: Firefox-specific manifest
- `js/browser-polyfill.js`: Cross-browser compatibility layer
- `js/service_worker_firefox.js`: Firefox-compatible background script

## Development

To develop for both Chrome and Firefox:

1. Use `manifest.json` for Chrome (Manifest V3)
2. Use `manifest-firefox.json` for Firefox (Manifest V2)
3. The JavaScript code uses the browser polyfill for cross-compatibility

## Building for Firefox

Run the build script to create a Firefox-ready package:

```bash
./build-firefox.sh
```

This will create `quickconfigs-firefox.zip` ready for Firefox installation.

## Permissions

The Firefox version requires these permissions:
- `activeTab`: Access the current tab's URL and content
- `clipboardWrite`: Copy configuration data to clipboard
- `tabs`: Query and create new tabs
- Host permissions for `https://*.quickbase.com/*` and `<all_urls>`

Note: Unlike Chrome, Firefox doesn't support `declarativeContent` permission, so the extension icon is always visible.

## Troubleshooting

### Extension not showing
- Ensure you're on a `*.quickbase.com` URL
- Check that the extension is enabled in `about:addons`

### Script injection errors
- Firefox may have stricter content security policies
- Check the browser console for detailed error messages

### API errors
- Ensure the polyfill is loaded before other scripts
- Check that all required permissions are granted
