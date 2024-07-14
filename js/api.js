export async function joinRoom(uuid, username) {
    const response = await axios.post(`https://mock-api.driven.com.br/api/v6/uol/participants/${uuid}`, {
        name: username
    });
    return response.data;
}

export async function keepConnection(uuid, username) {
    await axios.post(`https://mock-api.driven.com.br/api/v6/uol/status/${uuid}`, {
        name: username
    });
}

export async function fetchMessages(uuid) {
    const response = await axios.get(`https://mock-api.driven.com.br/api/v6/uol/messages/${uuid}`);
    return response.data;
}

export async function sendMessage(uuid, message) {
    await axios.post(`https://mock-api.driven.com.br/api/v6/uol/messages/${uuid}`, message);
}

export async function fetchParticipants(uuid) {
    const response = await axios.get(`https://mock-api.driven.com.br/api/v6/uol/participants/${uuid}`);
    return response.data;
}
