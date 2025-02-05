import { useEffect, useState } from "react";
import BottomNavbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { socket } from "../utils/socket";
import { useWebrtc } from "../utils/webrtc";
import { useAudio } from "../utils/audio";
import ReactPlayer from "react-player";
import useDashboardStore from "../utils/store";

function Dashboard() {
  const [requests, set_requests] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [remoteStream, setRemoteStream] = useState();
  const [uuid, setUuidState] = useState(null); // Local state to manage uuid loading

  const { createAnswer, createOffer, acceptOffer, peerConnection } =
    useWebrtc();

  const setUuid = useDashboardStore((state) => state.setUuid);

  // Fetch the UUID when the component mounts
  useEffect(() => {
    const fetchUuid = async () => {
      await setUuid();
      const currentUuid = useDashboardStore.getState().uuid;
      setUuidState(currentUuid); // Store the uuid in local state
    };

    fetchUuid();
  }, [setUuid]);

  const { audioTracks } = useAudio(uuid); // Now we can safely use uuid

  const handle_action = async (hostId, action, offer) => {
    let answer = "";
    if (action === "accept") {
      answer = await createAnswer(offer);
      setIsConnected(true);
    }
    console.log(offer, hostId, {
      userId: uuid?.userId,
      hostId,
      action,
      answer,
    });
    socket.emit("join_request_action", {
      userId: uuid?.userId,
      hostId,
      action,
      answer,
    });
    set_requests((prev) => prev?.filter((item) => item.hostId !== hostId));
  };

  useEffect(() => {
    if (!uuid?.userId) return;
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("dis");
    });
    socket.on(`join_request-${uuid?.userId}`, (data) => {
      console.log("Request", data);
      set_requests((prev) => {
        if (!prev?.find((item) => item?.hostId === data?.hostId)) {
          return [...prev, data];
        }
        return prev;
      });
    });
    socket.on(`join_request_response-${uuid?.userId}`, (data) => {
      console.log("Response", data);
      if (data?.action === "accept") {
        acceptOffer(data?.answer);
        setIsConnected(true);
      }
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off(`join_request-${uuid?.userId}`);
      socket.off(`join_request_response-${uuid?.userId}`);
    };
  }, [uuid]);

  useEffect(() => {
    if (!isConnected || !audioTracks) return;
    audioTracks.getTracks().forEach((track) => {
      peerConnection.addTrack(track);
    });
  }, [isConnected, audioTracks, peerConnection]);

  useEffect(() => {
    if (!isConnected) return;
    peerConnection.addEventListener("track", (event) => {
      setRemoteStream(event.streams[0]);
    });

    return () => {
      peerConnection.removeEventListener("track", () => setRemoteStream(null));
    };
  }, [isConnected, peerConnection]);

  // Conditional rendering: Only render when uuid is available
  if (!uuid) {
    return <div>Loading...</div>; // Or any other loading UI you prefer
  }

  return (
    <div className="relative min-h-screen">
      <div className="flex">
        <div>
          <ReactPlayer url={audioTracks} muted controls playing />
          <ReactPlayer url={remoteStream} controls playing />
        </div>
        <div className="flex-grow">
          {requests.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <p>{item?.hostId}</p>
                <button
                  onClick={() =>
                    handle_action(item?.hostId, "accept", item?.offer)
                  }
                >
                  Accept
                </button>
                <button onClick={() => handle_action(item?.hostId, "decline")}>
                  Decline
                </button>
              </div>
            );
          })}
        </div>
        <Sidebar uuid={uuid} createOffer={createOffer} />
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Dashboard;
