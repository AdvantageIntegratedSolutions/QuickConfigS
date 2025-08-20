chrome.runtime.onInstalled.addListener(() => {
  if (chrome.declarativeContent && chrome.declarativeContent.onPageChanged) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { urlMatches: '.*\\.quickbase.com\\.*' }
            })
          ],
          actions: [new chrome.declarativeContent.ShowAction()]
        }
      ]);
    });
  } else {
    console.error('chrome.declarativeContent.onPageChanged is not available. Ensure the declarativeContent permission is in the manifest and this is running in a supported context.');
  }
}); 