function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getElements() {
  var videoElement = document.querySelector("#video_player_html5_api");
  var nextLink = document.querySelector(
    'a[aria-label="Next Item"].cds-button-disableElevation.css-w8m9pb'
  );
  var goToNextItem = document.querySelector(
    'button.cds-105.cds-button-disableElevation.css-1hxz9ej[data-testid="next-item"]'
  );
  var markAsCompleted = document.querySelector(
    'button.cds-105.cds-button-disableElevation.css-tmhjax[data-testid="mark-complete"]'
  );

  return { videoElement, nextLink, goToNextItem, markAsCompleted };
}
async function script() {
  var reportButton = document.querySelector(
    'button.cds-105[aria-label="Report an issue"]'
  );
  var likeButton = document.querySelector(
    'button.cds-105[aria-pressed="false"]'
  );
  const { videoElement, nextLink, goToNextItem, markAsCompleted } =
    getElements();
  if (!reportButton && !likeButton && !!nextLink) {
    nextLink?.click();
    return;
  }
  if (!reportButton && !likeButton) {
    return;
  }
  if (!videoElement && !nextLink && !goToNextItem && !markAsCompleted) {
    return;
  }

  if (videoElement) {
    videoElement.muted = true;
    videoElement.currentTime = videoElement.duration - 10;
    await videoElement.play(); //play the video
    await delay(500); // Wait for half second after playing the video
    //click the Next> Link if exist
    nextLink?.click();
    return;
  }
  // click the 'mark as completed' button if exist
  markAsCompleted?.click();
  //click the 'go to the next item' button if exist
  goToNextItem?.click();
  //click the 'Next>' Link if exist
  nextLink?.click();
}

var intervalId;
chrome.storage.local.get("currentAction", function (result) {
  var currentAction = result.currentAction;
  if (currentAction === "start") {
    intervalId = setInterval(script, 3500);
  }
});
chrome.runtime.onMessage.addListener(function (request) {
  if (request.todo === "start") {
    // Execute the script every 3 seconds
    intervalId = setInterval(script, 3500);
  }

  if (request.todo === "stop") {
    clearInterval(intervalId);
  }
});
