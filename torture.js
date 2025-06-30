const logError = err => console.log(`Error: ${err}`);

const redirectToRandomProblem = () => {
    fetch("https://leetcode-api-pied.vercel.app/daily")
        .then(r => r.json())
        .then(body => location.href = `https://leetcode.com${body.link}`)
        .catch(logError);
}


browser.storage.sync.get('powerOn')
    .then(({ powerOn }) => {
        if (!powerOn) return;

        browser.storage.sync.get('isProblemSolved')
            .then(({ isProblemSolved }) => {
                if (isProblemSolved) return;

                redirectToRandomProblem();
            }, logError);
    }, logError);
