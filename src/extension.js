console.log("extension.js running...");

// Wait until gmailjs has finished loading, before triggering actual extension-code.
const loaderId = setInterval(() => {
    if (!window._gmailjs) {
        return;
    }

    clearInterval(loaderId);
    startExtension(window._gmailjs);
}, 200);

window.genzMail = {};
window.genzMail.signoffs = [
    "<br>Yikes,<br>&lt;name&gt;",
    "<br>Slay,<br>&lt;name&gt;",
    "<br>Consider yourselves warned!<br>&lt;name&gt;",
    "<br>Disrespectfully,<br>&lt;name&gt;",
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
                // TODO: try to find a previously inserted signoff and:
                // case 1: if found, replace with new one
                // case 2: if not found, insert new random one

                // TODO: maybe add a list page for possible signoffs
                // - you could select all options
                // - you could disselect all options -> default is there - just <name>
                // - you could toggle specific options

                // choose a random signoff
                let yassified_signoff = chooseRandomSignoff();
                compose_ref.body(mail_body + yassified_signoff);
            }, 'genz-mail-btn');
        });
    });

}

function chooseRandomSignoff() {
    const randomIndex = Math.floor(Math.random() * window.genzMail.signoffs.length);
    return window.genzMail.signoffs[randomIndex];
}