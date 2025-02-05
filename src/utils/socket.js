import { io } from "socket.io-client";

const URL = "http://192.168.1.25:4000"
// const URL = "http://localhost:4000"

export const socket = io(URL, {
    transports: ["websocket"]
});
