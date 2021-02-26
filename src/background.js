try {
    const ANKI_CONNECT_URL = 'http://localhost:8765'
    console.log(`[Jisho-Anki] Background running!`);

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        chrome.tabs.get(tabId, (current) => {
            if (current.url.includes('jisho.org') && changeInfo.status === 'complete') {
                chrome.tabs.executeScript(null, {
                    file: './src/foreground.js'
                }, () => {
                    console.log('Injected foreground script.');
                });
            }
        });
    });

    chrome.extension.onConnect.addListener((port) => {
        console.log(`Connected to port: ${port.name}`);
        if (port.name === 'jisho-client') {
            port.onMessage.addListener(async (message) => {
                console.log(message);
                console.log(await Anki.ping());
                await Anki.createNote(message);
            });
        }
    });

    // For some reason, sometimes requests are blocked to localhost due to CORS issues.

    class Anki {
        static async ping() {
            // ping and see if Anki is open.
            // Make sure that Anki is running and that you have AnkiConnect installed.
            let response = await fetch(ANKI_CONNECT_URL, {
                method: 'GET'
            });

            if(response.ok) {
                return true;
            } else {
                return false;
            }

        }

        static async getDecks() {

        }

        static async checkForDeck() {
            let posted = await fetch(ANKI_CONNECT_URL, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'deckNames',
                    version: 6
                })
            });
    
            let responseJson = await posted.json();
            let parsedResult = responseJson.result;

            return parsedResult.includes('Jisho-Anki Exports');
        }

        static async createNote(entry) {
            let deckExists = await this.checkForDeck();
            let online = await this.ping();
            console.log(`Online: ${online}, Exists: ${deckExists}`);
            if(deckExists && online) {
                let body =  {
                    action: 'addNote',
                    version: 6,
                    params: {
                        note: {
                            deckName: 'Jisho-Anki Exports',
                            modelName: 'Basic',
                            fields: {
                                Front: entry.word,
                                Back: entry.definitions[0].type + ' ' + entry.definitions[0].definition,
                                Furigana: entry.furigana,
                                Other: entry.info.join(', '),
                                Example: `${entry.sentence.jp ?? ''}<br>${entry.sentence.en ?? ''}`,
                            },
                            options: {
                                allowDuplicate: false,
                                duplicateScope: 'deck'
                            }
                        }
                    }
                };

                let posted = await fetch(ANKI_CONNECT_URL, {
                    method: 'POST',
                    body: JSON.stringify(body)
                });

                let responseJson = await posted.json();
                console.log(responseJson);
                return responseJson;

            }
        }

    }

} catch (e) {
    console.log(`An error occurred: ${e}`);
}