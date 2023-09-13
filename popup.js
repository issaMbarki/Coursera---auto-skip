document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let url = tabs[0].url;

    if (url&&!url.startsWith("https://www.coursera.org/")) {
      document.querySelector(".title-header").innerHTML =
        "This extension works only on coursera website";
      document.querySelector("main").remove();
    } else {
      var startButton = document.getElementById("start");
      var stopButton = document.getElementById("stop");
      var statusLabel = document.getElementById("status");

      // Function to update the button visibility and status label based on the stored value
      function updateButtonsAndStatus() {
        chrome.storage.local.get("currentAction", function (result) {
          var currentAction = result.currentAction;
          if (currentAction === "start") {
            startButton.classList.add("hidden-button");
            stopButton.classList.remove("hidden-button");
            statusLabel.innerHTML = "Status: skipping";
          } else {
            startButton.classList.remove("hidden-button");
            stopButton.classList.add("hidden-button");
            statusLabel.innerHTML = "Status: not working";
          }
        });
      }

      // Call the updateButtonsAndStatus function initially to set the initial state
      updateButtonsAndStatus();

      startButton.addEventListener("click", function () {
        chrome.storage.local.set({ currentAction: "start" }, function () {
          updateButtonsAndStatus();
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, { todo: "start" });
            }
          );
        });
      });

      stopButton.addEventListener("click", function () {
        chrome.storage.local.set({ currentAction: "stop" }, function () {
          updateButtonsAndStatus();
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, { todo: "stop" });
            }
          );
        });
      });
    }
  });
});
