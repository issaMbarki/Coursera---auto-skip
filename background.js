chrome.storage.local.get("currentAction", function (result) {
  var currentAction = result.currentAction;
  if (currentAction === "start") {
    chrome.action.setIcon({ path: "./assets/online-icon.png" });
  }
});

chrome.storage.onChanged.addListener(function (changes) {
  var currentAction = changes.currentAction.newValue;
  if (currentAction === "start") {
    chrome.action.setIcon({ path: "./assets/online-icon.png" });
  } else if (currentAction === "stop") {
    chrome.action.setIcon({ path: "./assets/icon-48.png" });
  }
});
