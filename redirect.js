const redirectToRandomProblem = async (requestDetails) => {
    let problemUrl = '';
    try {
        let result = await browser.storage.sync.get('problemUrl');
        problemUrl = result.problemUrl;
        if (!problemUrl) {
            const resp = await fetch("https://leetcode-api-pied.vercel.app/daily");
            const body = await resp.json();

            problemUrl = `https://leetcode.com${body.link}`;
            browser.storage.sync.set({ problemUrl });
        }

        if (requestDetails.url === problemUrl) {
            return;
        }

        const { powerOn } = await browser.storage.sync.get('powerOn');
        if (powerOn !== undefined && !powerOn) return;

        const { isProblemSolved } = await browser.storage.sync.get('isProblemSolved');
        if (isProblemSolved) return;
    } catch (err) {
        console.log(`Error: ${err}`);
    }

    return {
        redirectUrl: problemUrl,
    };

}

browser.webRequest.onBeforeRequest.addListener(
    redirectToRandomProblem,
    { urls: ['<all_urls>'], types: ['main_frame'] },
    ['blocking'],
);
