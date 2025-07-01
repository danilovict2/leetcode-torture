const listener = (details) => {
    let filter = browser.webRequest.filterResponseData(details.requestId);
    let decoder = new TextDecoder("utf-8");
    let encoder = new TextEncoder();

    filter.ondata = event => {
        let str = decoder.decode(event.data, { stream: true });
        const json = JSON.parse(str);
        if ('run_success' in json && json.run_success) {
            browser.storage.sync.set({
                isProblemSolved: true,
                solvedAt: Date.now(),
            });
        }

        filter.write(encoder.encode(str));
        filter.disconnect();
    }

    return {};
}

browser.webRequest.onBeforeRequest.addListener(
    listener,
    { urls: ["https://leetcode.com/submissions/detail/*/check/"] },
    ["blocking"]
);