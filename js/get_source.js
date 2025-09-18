
// Use the browser API for cross-browser compatibility
var api = (typeof browser !== 'undefined') ? browser : chrome;

api.runtime.sendMessage(document.getElementsByClassName("SelectedApp")[0].href.split('/db/')[1], function(response) {
  console.log('from gs', response);
});
