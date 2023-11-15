import { io } from 'socket.io-client';

let socket

const getSocket = () => {
    if (!socket) {
        socket = io('http://localhost:5000', {
            withCredentials: true,
        });
    }
    return socket;
}

export {
    getSocket
}