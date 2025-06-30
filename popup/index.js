let powerOn = false;

browser.storage.sync.get("powerOn")
    .then(r => {
        powerOn = r.powerOn;
        button.classList.toggle('on', powerOn);
    }, err => console.log(err))

const button = document.getElementById('power-button');

button.addEventListener('click', () => {
    powerOn = !powerOn;
    button.classList.toggle('on', powerOn);

    browser.storage.sync.set({
        powerOn: powerOn,
    });
});
