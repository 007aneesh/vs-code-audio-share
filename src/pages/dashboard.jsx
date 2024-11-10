// dashboard.jsx
import { useEffect } from "react";
import BottomNavbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import useDashboardStore from "../utils/store";
import { SOCKET_EVENTS, JOIN_REQUEST_ACTION } from "../utils/constant";
import { socket } from "../utils/socket";

function Dashboard() {
  const {
    uuid,
    requests,
    setUuid,
    removeRequest,
    handleSocketEvents,
  } = useDashboardStore();

  const answer = `ANSWER FROM WEBRTC ${uuid?.userId}`;

  useEffect(() => {
    setUuid();
  }, [setUuid]);

  useEffect(() => {
    if (!uuid?.userId) return;
    const cleanup = handleSocketEvents(uuid.userId);
    return cleanup;
  }, [uuid, handleSocketEvents]);

  const handle_action = (hostId, action) => {
    socket.emit(SOCKET_EVENTS.JOIN_REQUEST_ACTION, {
      userId: uuid?.userId,
      hostId,
      action,
      answer,
    });
    removeRequest(hostId);
  };

  return (
    <div className="relative min-h-screen">
      <div className="flex">
        <div className="flex-grow">
          {requests.map((item) => (
            <div
              key={item.hostId}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <p>{item.hostId}</p>
              <button
                onClick={() =>
                  handle_action(item.hostId, JOIN_REQUEST_ACTION.ACCEPT)
                }
              >
                Accept
              </button>
              <button
                onClick={() =>
                  handle_action(item.hostId, JOIN_REQUEST_ACTION.DECLINE)
                }
              >
                Decline
              </button>
            </div>
          ))}
        </div>
        <Sidebar uuid={uuid} />
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Dashboard;
