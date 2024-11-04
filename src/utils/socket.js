import { io } from "socket.io-client";

const URL = "https://pn-household-jamie-accepts.trycloudflare.com"

export const socket = io(URL, {
    transports: ["websocket"]
});
