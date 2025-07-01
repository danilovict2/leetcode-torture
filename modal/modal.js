const closeModal = (modal, backdrop) => {
    modal.remove();
    backdrop.remove();
};

const showSucessModal = () => {
    const backdrop = document.createElement('div');
    backdrop.classList.add('leetcode-torture-modal-backdrop');

    const modal = document.createElement('div');
    modal.classList.add('leetcode-torture-modal');

    modal.innerHTML = `
        <p>Congratulations! You are now free from the leetcode gulag (for now)! 🥳</p>
        <button class="leetcode-torture-modal-close">Close</button>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);

    modal.querySelector('.leetcode-torture-modal-close').addEventListener('click', () => closeModal(modal, backdrop));
};

browser.runtime.onMessage.addListener(message => {
    if (message.command === 'sucess') {
        showSucessModal();
    }
});