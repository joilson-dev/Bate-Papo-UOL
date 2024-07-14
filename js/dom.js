export function menu() {
    const menuRight = document.querySelector('.container-menu');
    if (menuRight.style.display === 'flex') {
        menuRight.style.display = 'none';
    } else {
        menuRight.style.display = 'flex';
    }
}


export function updateMessageList(messages, username) {
    const chatContainer = document.querySelector('.chat');
    chatContainer.innerHTML = '';

    messages.forEach(message => {
        if (message.type === 'private_message' && message.to !== username && message.from !== username && message.to !== 'Todos') {
            return;
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('message-chat');

        if (message.type === 'private_message') {
            messageElement.classList.add('private');
        } else {
            messageElement.classList.add(message.type);
        }

        if (message.type === 'status') {
            messageElement.innerHTML = `
                <p>
                    <b class="timestamp">(${message.time})</b>
                    <b class="user">${message.from}</b> ${message.text}
                </p>
            `;
        } else if (message.type === 'message' || (message.type === 'private_message' && message.to === 'Todos')) {
            messageElement.innerHTML = `
                <p>
                    <b class="timestamp">(${message.time})</b>
                    <b class="user">${message.from}</b> para <b class="user">${message.to}</b>: ${message.text}
                </p>
            `;
        } else if (message.type === 'private_message') {
            messageElement.innerHTML = `
                <p>
                    <b class="timestamp">(${message.time})</b>
                    <b class="user">${message.from}</b> reservadamente para <b class="user">${message.to}</b>: ${message.text}
                </p>
            `;
        }

        chatContainer.appendChild(messageElement);
    });


    if (chatContainer.lastElementChild) {
        chatContainer.lastElementChild.scrollIntoView();
    }
}


export function updateParticipantsList(participants, selectorSend, setSelectedRecipient) {
    const itensContainer = document.querySelector('.participants');

    if (!participants.some(participant => participant.name === selectorSend)) {
        selectorSend = 'Todos';
    }

    itensContainer.innerHTML = '';

    const allParticipantsElement = document.createElement('div');
    allParticipantsElement.classList.add('itens');
    allParticipantsElement.innerHTML = `
        <img src="img/people.svg">
        <div class="recipient">
            <p>Todos</p>
            ${selectorSend === 'Todos' ? '<img src="img/ok.svg">' : ''}
        </div>
    `;
    allParticipantsElement.addEventListener('click', () => {
        setSelectedRecipient('Todos');
    });
    itensContainer.appendChild(allParticipantsElement);

    participants.forEach(participant => {
        const participantElement = document.createElement('div');
        participantElement.classList.add('itens');
        participantElement.innerHTML = `
            <img src="img/people.svg">
            <div class="recipient">
                <p>${participant.name}</p>
                ${participant.name === selectorSend ? '<img src="img/ok.svg">' : ''}
            </div>
        `;
        participantElement.addEventListener('click', () => {
            setSelectedRecipient(participant.name);
        });
        itensContainer.appendChild(participantElement);
    });
}

export function updateVisibilitySelection(selectedVisibility, setSelectedVisibility) {
    const publicElement = document.querySelector('.shipping-type.public');
    const privateElement = document.querySelector('.shipping-type.private');

    publicElement.innerHTML = `
        <img src="img/lock-open.svg">
        <div class="recipient">
            <p>Público</p>
            ${selectedVisibility === 'Público' ? '<img src="img/ok.svg">' : ''}
        </div>
    `;
    privateElement.innerHTML = `
        <img src="img/lock-closed.svg">
        <div class="recipient">
            <p>Reservadamente</p>
            ${selectedVisibility === 'Reservadamente' ? '<img src="img/ok.svg">' : ''}
        </div>
    `;

    publicElement.addEventListener('click', () => {
        setSelectedVisibility('Público');
    });
    privateElement.addEventListener('click', () => {
        setSelectedVisibility('Reservadamente');
    });
}