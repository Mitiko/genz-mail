console.log("extension.js running...");

// Wait until gmailjs has finished loading, before triggering actual extension-code.
const loaderId = setInterval(() => {
    if (!window._gmailjs) {
        return;
    }

    clearInterval(loaderId);
    startExtension(window._gmailjs);
}, 100);

function startExtension(gmail) {
    window.gmail = gmail;
    // Note window._gmail is the potentially uninitiallized version but window.gmail we can work on 

    gmail.observe.on("load", () => {
        console.log("Gmail loaded.");

        gmail.observe.on('compose', function(compose, _) {
            gmail.tools.add_compose_button(compose, 'Yassify', () => {
                console.log("Yassified! Slay!");
                let mail_body = compose.body();
                let yassified_signoff = "<br>Yikes,<br>&lt;name&gt;"
                compose.body(mail_body + yassified_signoff);
            }, 'genz-mail-yassified');
        });
    });

}
