
chrome.runtime.sendMessage(document.getElementsByClassName("SelectedApp")[0].href.split('/db/')[1], function(response) {
  console.log('from gs', response);
});
