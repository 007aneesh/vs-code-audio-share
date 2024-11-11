import { useEffect, useMemo, useState } from "react";
import BottomNavbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { getUserId } from "../utils/api";
import { socket } from "../utils/socket";
import { useWebrtc } from "../utils/webrtc";

function Dashboard() {
  const [uuid, setuuid] = useState();
  const [requests, set_requests] = useState([]);
  const [audioTracks, setAudioTracks] = useState();

  const { createAnswer, createOffer, acceptOffer } = useMemo(() => useWebrtc(), []);

  async function getUser() {
    const response = await getUserId();
    setuuid(response.data);
  }

  useEffect(() => {
    getUser();
  }, []);

  const handle_action = async (hostId, action, offer) => {
    let answer = "";
    if (action === "accept") answer = await createAnswer(offer);
    console.log(offer, hostId, {
      userId: uuid?.userId,
      hostId,
      action,
      answer
    });
    socket.emit("join_request_action", {
      userId: uuid?.userId,
      hostId,
      action,
      answer
    });
    set_requests((prev) => prev?.filter((item) => item.hostId !== hostId));
  }

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
      }
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off(`join_request-${uuid?.userId}`);
      socket.off(`join_request_response-${uuid?.userId}`);
    }
  }, [uuid]);

  useEffect(() => {
    (async () => {
      const tracks = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      setAudioTracks(tracks);
    })();
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="flex">
        <div className="flex-grow">
          {
            requests.map((item) => {
              return (
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start"
                }}>
                  <p>{item?.hostId}</p>
                  <button onClick={() => handle_action(item?.hostId, "accept", item?.offer)}>Accept</button>
                  <button onClick={() => handle_action(item?.hostId, "decline")}>Decline</button>
                </div>
              )
            })
          }
        </div>
        <Sidebar uuid={uuid} createOffer={createOffer} />
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Dashboard;
