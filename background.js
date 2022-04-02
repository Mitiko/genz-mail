// import GmailFactory from "gmail-js";
// import jQuery from "jquery";

// window._gmailjs = window._gmailjs || new GmailFactory.Gmail(jQuery);

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});
