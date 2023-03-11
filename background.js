chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  // Check if the URL matches medium.com and if the page is fully loaded
  if (details.url.includes('medium.com') && details.frameId === 0) {
    // Execute the content script in the new page
    console.log('Injecting content script');

    // execute main.js
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ['main.js']
    });
  }
});
