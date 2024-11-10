import { useEffect, useState } from "react";
import BottomNavbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import useDashboardStore from "../utils/store";
import { SOCKET_EVENTS } from "../utils/constant";
import { socket } from "../utils/socket";
import Modal from "../components/modal";

function Dashboard() {
  const { uuid, requests, setUuid, removeRequest, handleSocketEvents } =
    useDashboardStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    if (requests.length > 0) {
      setIsModalOpen(true);
    }
  }, [requests]);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative min-h-screen">
      <div className="flex">
        <div className="flex-grow">
          <Sidebar uuid={uuid} />
        </div>
      </div>
      <BottomNavbar />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Requests"
        uuid={uuid}
        requests={requests}
        handleAction={handle_action}
      />
    </div>
  );
}

export default Dashboard;
