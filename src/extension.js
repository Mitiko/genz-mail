console.log("extension.js running...");

// Wait until gmailjs has finished loading, before triggering actual extension-code.
const loaderId = setInterval(() => {
    if (!window._gmailjs) {
        return;
    }

    clearInterval(loaderId);
    startExtension(window._gmailjs);
}, 200);

window.genzMailState = {};
window.genzMailState.signoffs = [
    "<br>Yikes,<br>&lt;name&gt;",
    "<br>Slay,<br>&lt;name&gt;",
    "<br>Consider yourselves warned!<br>&lt;name&gt;",
    "<br>Disrespectfully,<br>&lt;name&gt;",
];

function startExtension(gmail) {
    window.gmail = gmail;
    // Note window._gmail is the potentially uninitiallized version but window.gmail we can work on

    gmail.observe.on("load", () => {
        console.log("Gmail loaded.");

        gmail.observe.on('compose', function(compose_ref, _) {
            // @param {gmailjs object} compose_ref - The gmailjs compose object
            // @param {string} content_html - Content of the button
            // @param {function} onclick_action - on_click event handler
            // @param {string} custom_style_class - a class only added to the button
            gmail.tools.add_compose_button(compose_ref, 'Yassify', () => {
                console.log("Yassified! Slay! New"); // for debug purposes
                // cache the email so far
                let mail_body = compose_ref.body();
                let yassified_signoff = chooseRandomSignoff();
                let replaced = false;

                // replace old signoff if found
                if (window.genzMailState.previous) {
                    // HACK: Abusing the replace callback to check if replacement occured in a single pass
                    mail_body = mail_body.replace(window.genzMailState.previous, () => {
                        replaced = true;
                        return yassified_signoff;
                    });
                }

                // if first signoff or old one modified (deleted or not found)
                // append the new one to the mail body
                if (!window.genzMailState.current || !replaced) {
                    mail_body += yassified_signoff;
                }

                // TODO: maybe add a list page for possible signoffs
                // - you could select all options
                // - you could disselect all options -> default is there - just <name>
                // - you could toggle specific options

                // refresh the body
                compose_ref.body(mail_body);
            }, 'genz-mail-btn');
        });
    });
}

function chooseRandomSignoff() {
    // initially, this would be undefined
    window.genzMailState.previous = window.genzMailState.current;

    // ensure a new signoff is generated
    do {
        const randomIndex = Math.floor(Math.random() * window.genzMailState.signoffs.length);
        window.genzMailState.current = window.genzMailState.signoffs[randomIndex];
    } while (window.genzMailState.current === window.genzMailState.previous);

    return window.genzMailState.current;
}
