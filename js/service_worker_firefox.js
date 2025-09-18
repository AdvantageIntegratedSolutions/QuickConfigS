// Firefox-compatible background script
// Use browser API for Firefox compatibility
var api = (typeof browser !== 'undefined') ? browser : chrome;

// Firefox doesn't support declarativeContent in the same way as Chrome
// The extension will be available on all pages, but the popup will only work on QuickBase pages
api.runtime.onInstalled.addListener(() => {
  console.log('QuickConfigS Firefox extension installed');
  
  // In Firefox, we can't conditionally show the browser action based on page URL
  // The extension icon will always be visible, but functionality is limited to QuickBase pages
  // This is a limitation of Firefox's WebExtensions API compared to Chrome's declarativeContent
});
