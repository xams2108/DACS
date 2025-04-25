export const connectToServerWs = (serverUrl, onMessage, onClose) => {
    const ws = new WebSocket(serverUrl);
    ws.onopen = () => { 
    };
    ws.onmessage = (event) => {
        onMessage(event.data);
    };
    ws.onclose = onClose;
    return ws;
};
export const connectToPublicWs = (publicUrl, onMessage, onClose) => {
    const ws = new WebSocket(publicUrl);
    ws.onopen = () => {
    };
    ws.onmessage = (event) => {
        onMessage(event.data);
    };
    ws.onclose = onClose; 
    return ws;
};