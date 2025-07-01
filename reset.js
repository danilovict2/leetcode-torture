browser.storage.sync.get('solvedAt')
    .then(({ solvedAt }) => {
        const now = Date.now();
        const oneDay = 1 * 24 * 60 * 1000;

        if ((now - solvedAt) >= oneDay) {
            browser.storage.sync.set({
                isProblemSolved: false,
            });
        }
    }, err => console.log(`Error: ${err}`));