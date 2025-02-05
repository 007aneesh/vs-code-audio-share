import { io } from "socket.io-client";
import { SOCKET_EVENTS } from "./constant";
import useDashboardStore from "../utils/store";

const URL = "http://localhost:4000";

export const socket = io(URL, {
  transports: ["websocket"],
});

export const handleSocketEvents = (uuid) => {
  const addRequest = useDashboardStore.getState().addRequest;
  const removeRequest = useDashboardStore.getState().removeRequest;

  socket.on("connect", () => console.log("Connected to socket"));
  socket.on("disconnect", () => console.log("Disconnected from socket"));

  socket.on(`${SOCKET_EVENTS.JOIN_REQUEST}-${uuid}`, (data) => {
    addRequest(data); // Directly call the addRequest action from the store
  });

  socket.on(`${SOCKET_EVENTS.JOIN_REQUEST_RESPONSE}-${uuid}`, (data) => {
    console.log("Response from server:", data);
    if (data.action === "ACCEPT") {
      localStorage.setItem("Remote", data.userId);
    }
    if (data.action === "remove") {
      removeRequest(data.hostId);
    }
  });

  return () => {
    socket.off("connect");
    socket.off("disconnect");
    socket.off(`${SOCKET_EVENTS.JOIN_REQUEST}-${uuid}`);
    socket.off(`${SOCKET_EVENTS.JOIN_REQUEST_RESPONSE}-${uuid}`);
  };
};
