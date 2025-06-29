let powerOn = false;

browser.storage.local.get("powerOn")
    .then(r => {
        powerOn = r.powerOn;
        button.classList.toggle('on', powerOn);
    })
    .catch(err => console.log(`Error: ${err}`));

const button = document.getElementById('power-button');

button.addEventListener('click', () => {
    powerOn = !powerOn;
    button.classList.toggle('on', powerOn);

    browser.storage.local.set({
        powerOn: powerOn,
    });
});
