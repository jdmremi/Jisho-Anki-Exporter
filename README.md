# Jisho-Anki Exporter

- This is a project that I was commissioned to do that adds a button to dictionary entries on [jisho.org](https://jisho.org/) to export terms and related info to an Anki deck.

# Installation

- Requires [AnkiConnect](https://ankiweb.net/shared/info/2055492159) to be installed as an add-on to Anki.
- Requires the provided Anki preset deck.

- ...To include further installation instructions

# Known Issues

- Sometimes AnkiConnect prevents incoming requests due to some CORS issues. This happens rarely, but if you add `"*"` to `webCorsOriginList` in AnkiConnect's config, then this issue does not persist.

- Sometimes the socket to communicate with Jisho and the extension's server doesn't initialize properly, therefore data is not sent/received sometimes.

- For some entries, if no example sentence exists, it will take the first example sentence on the page, even if it doesn't belong to the target word. 

# To-do

- Add audio

# Collaboration

- If you would like to collaborate on this project, feel free to create a pull request, or message me on [Twitter](https://twitter.com/Vezqi) if you have any questions! 

- If you would like to beautify the original deck's format, feel free to customize it and make sure it contains all of the same files and create a pull request.

# Feedback

- Feel free to create an issue or send me a DM on [Twitter](https://twitter.com/Vezqi)!