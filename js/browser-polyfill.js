// Cross-browser compatibility layer
// This file provides a unified API that works in both Chrome and Firefox

(function() {
  'use strict';

  // Use browser API if available (Firefox), otherwise fall back to chrome API
  window.browserAPI = (function() {
    if (typeof browser !== 'undefined') {
      // Firefox uses the browser namespace
      return browser;
    } else if (typeof chrome !== 'undefined') {
      // Chrome uses the chrome namespace
      // Wrap chrome APIs to return promises like Firefox does
      return {
        tabs: {
          query: function(queryInfo) {
            return new Promise(function(resolve, reject) {
              chrome.tabs.query(queryInfo, function(tabs) {
                if (chrome.runtime.lastError) {
                  reject(chrome.runtime.lastError);
                } else {
                  resolve(tabs);
                }
              });
            });
          },
          create: function(createProperties) {
            return new Promise(function(resolve, reject) {
              chrome.tabs.create(createProperties, function(tab) {
                if (chrome.runtime.lastError) {
                  reject(chrome.runtime.lastError);
                } else {
                  resolve(tab);
                }
              });
            });
          },
          executeScript: function(tabId, details) {
            return new Promise(function(resolve, reject) {
              if (chrome.scripting && chrome.scripting.executeScript) {
                // Manifest V3 Chrome
                chrome.scripting.executeScript({
                  target: { tabId: tabId },
                  files: details.file ? [details.file] : undefined,
                  func: details.code ? new Function(details.code) : undefined
                }, function(results) {
                  if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                  } else {
                    resolve(results);
                  }
                });
              } else if (chrome.tabs.executeScript) {
                // Manifest V2 Chrome (legacy)
                chrome.tabs.executeScript(tabId, details, function(results) {
                  if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                  } else {
                    resolve(results);
                  }
                });
              } else {
                reject(new Error('No script execution API available'));
              }
            });
          }
        },
        runtime: {
          onMessage: chrome.runtime.onMessage,
          onInstalled: chrome.runtime.onInstalled,
          sendMessage: function(message) {
            return new Promise(function(resolve, reject) {
              chrome.runtime.sendMessage(message, function(response) {
                if (chrome.runtime.lastError) {
                  reject(chrome.runtime.lastError);
                } else {
                  resolve(response);
                }
              });
            });
          }
        },
        declarativeContent: chrome.declarativeContent
      };
    } else {
      throw new Error('No browser extension API found');
    }
  })();

})();
