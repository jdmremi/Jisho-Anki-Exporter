# Jisho-Anki Exporter

- This is a Chrome extension that I was commissioned to do that adds a button to dictionary entries on [jisho.org](https://jisho.org/) to export terms and related info to an Anki deck.

![Image](https://i.imgur.com/2ltozuT.png)

# Installation

- Requires [AnkiConnect](https://ankiweb.net/shared/info/2055492159) to be installed as an add-on to Anki.
- Requires the provided Anki preset deck.

- ...To include further installation instructions

# Known Issues

- Sometimes AnkiConnect prevents incoming requests due to some CORS issues. This happens rarely, but if you add `"*"` to `webCorsOriginList` in AnkiConnect's config, then this issue does not persist.

- Sometimes the socket to communicate with Jisho and the extension's server doesn't initialize properly, therefore data is not sent/received sometimes.

- For some entries, if no example sentence exists, it will take the first example sentence on the page, even if it doesn't belong to the target word. 

- Background is reporting some errors which need to be handled, such as...
    - `Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.`
    - `No tab with id: ...`
    - `Unchecked runtime.lastError: Cannot access contents of url "https://github.com/Vezqi/Jisho-Anki-Exporter". Extension manifest must request permission to access this host.`

# To-do

- Add audio to cards.

- If card creation succeeds, send card ID through socket to frontend and change text of export button to include whether card creation succeeded or not. (✅・❌) an dlog to console.

# Collaboration

- If you would like to collaborate on this project, feel free to create a pull request, or message me on [Twitter](https://twitter.com/Vezqi) if you have any questions! 

- If you would like to beautify the original deck's format, feel free to customize it and make sure it contains all of the same files and create a pull request.

# Feedback

- Feel free to create an issue or send me a DM on [Twitter](https://twitter.com/Vezqi)!
