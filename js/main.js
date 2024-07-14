import { joinRoom, keepConnection, fetchMessages, sendMessage, fetchParticipants } from './api.js';
import { updateMessageList, menu, updateParticipantsList, updateVisibilitySelection } from './dom.js';

let username;
let uuid = '16c5fd0e-23ec-4747-baf0-73483d905560';

let selectorSend = 'Todos';
let selectorVisibility = 'Público';
let participants = [];

async function askName() {
    while (true) {
        username = prompt('Qual é seu nome?');
        if (username === null || username === undefined || username === '') {
            alert('Por favor, insira um nome válido.');
        } else {
            try {
                await joinRoom(uuid, username);
                break;
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    alert('Nome já está em uso. Por favor, escolha outro nome.');
                } else {
                    alert('Erro ao tentar entrar na sala. Tente novamente.');
                }
            }
        }
    }
}

function setSelectedRecipient(recipient) {
    selectorSend = recipient;
    updateParticipantsList(participants, selectorSend, setSelectedRecipient);
    const sendingToText = document.querySelector('.SendMessage p');

    sendingToText.textContent = `Enviando para ${selectorSend} (${selectorVisibility.toLowerCase()})`;
}

function setSelectedVisibility(visibility) {
    selectorVisibility = visibility;
    updateVisibilitySelection(selectorVisibility, setSelectedVisibility);

    const sendingToText = document.querySelector('.SendMessage p');
    sendingToText.textContent = `Enviando para ${selectorSend} (${selectorVisibility.toLowerCase()})`;
}

async function handleSendMessage() {
    const messageInput = document.querySelector('.SendMessage input');

    if (!messageInput) {
        console.error('Elemento de entrada de mensagem não encontrado.');
        return;
    }

    const messageText = messageInput.value.trim();

    if (messageText === '') {
        alert('A mensagem não pode estar vazia.');
        return;
    }

    const messageType = selectorVisibility === 'Público' || selectorSend === 'Todos' ? 'message' : 'private_message';

    try {
        await sendMessage(uuid, {
            from: username,
            to: selectorSend,
            text: messageText,
            type: messageType
        });

        messageInput.value = '';
        const messages = await fetchMessages(uuid);
        updateMessageList(messages, username);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    await askName();

    setInterval(() => keepConnection(uuid, username), 5000);

    setInterval(async () => {
        try {
            const messages = await fetchMessages(uuid);
            updateMessageList(messages, username);

            participants = await fetchParticipants(uuid);
            updateParticipantsList(participants, selectorSend, setSelectedRecipient);
        } catch (error) {
            console.log(error);
        }
    }, 3000);

    const menuButton = document.getElementById('menu-button');
    menuButton.addEventListener('click', function () {
        menu();
    });

    const containerMenu = document.querySelector('.background');
    containerMenu.addEventListener('click', function () {
        menu();
    });

    const sendButton = document.querySelector('footer img[alt="Enviar"]');
    sendButton.addEventListener('click', handleSendMessage);

    updateVisibilitySelection(selectorVisibility, setSelectedVisibility);
});
