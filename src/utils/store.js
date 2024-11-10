import { create } from "zustand";
import { socket } from "./socket";
import { getUserId } from "./api";
import { SOCKET_EVENTS } from "./constant";

const useDashboardStore = create((set) => ({
  uuid: null,
  requests: [],

  setUuid: async () => {
    const response = await getUserId();
    set({ uuid: response.data });
  },

  addRequest: (data) =>
    set((state) => ({
      requests: state.requests.some((item) => item.hostId === data.hostId)
        ? state.requests
        : [...state.requests, data],
    })),

  removeRequest: (hostId) =>
    set((state) => ({
      requests: state.requests.filter((item) => item?.hostId !== hostId),
    })),

  handleSocketEvents: (uuid) => {
    socket.on("connect", () => console.log("Connected to socket"));
    socket.on("disconnect", () => console.log("Disconnected from socket"));

    socket.on(`${SOCKET_EVENTS.JOIN_REQUEST}-${uuid}`, (data) => {
      set((state) => ({
        requests: state.requests.some((item) => item?.hostId === data.hostId)
          ? state.requests
          : [...state.requests, data],
      }));
    });

    socket.on(`${SOCKET_EVENTS.JOIN_REQUEST_RESPONSE}-${uuid}`, (data) => {
      console.log("Response from server:", data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off(`${SOCKET_EVENTS.JOIN_REQUEST}-${uuid}`);
      socket.off(`${SOCKET_EVENTS.JOIN_REQUEST_RESPONSE}-${uuid}`);
    };
  },
}));

export default useDashboardStore;