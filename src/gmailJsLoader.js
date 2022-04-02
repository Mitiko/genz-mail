console.log("gmailJsLoader running...");

// Load gmail.js
const GmailFactory = require("gmail-js");
const jQuery = require("jquery");

// Don't mess up too bad if we have several gmail.js-based
// extensions loaded at the same time!
// Because we're running this script at top level
window._gmailjs = window._gmailjs || new GmailFactory.Gmail(jQuery);
