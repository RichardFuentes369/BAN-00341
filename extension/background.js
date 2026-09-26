chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  if (request.action === 'ping') {
    sendResponse({ status: 'connected' });
  }
});