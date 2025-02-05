import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getUserId } from "./api";

const useDashboardStore = create(
  persist(
    (set) => ({
      uuid: null,
      requests: [],

      setUuid: async () => {
        const currentuuid = useDashboardStore.getState().uuid;

        if (currentuuid) return;

        const response = await getUserId();
        console.log(response); // Debugging response
        set({ uuid: response?.data });

        // Debugging sessionStorage after setting
        console.log(sessionStorage.getItem("uuid"));
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
    }),
    {
      name: "uuid",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useDashboardStore;
