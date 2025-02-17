import { useEffect, useMemo, useRef, useState } from "react";
import BottomNavbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { socket } from "../utils/socket";
import { useWebrtc } from "../utils/webrtc";
import { useAudio } from "../utils/audio";
import ReactPlayer from "react-player";
import useDashboardStore from "../utils/store";

function Dashboard() {
  const [requests, set_requests] = useState([]);
  const [remoteStream, setRemoteStream] = useState();

  const { createAnswer, createOffer, acceptOffer, peerConnection } = useWebrtc();

  const uuid = useDashboardStore((state) => state?.uuid);

  const { allTracks } = useAudio(uuid?.userId);

  const handle_negotiation_request = async () => {
    const offer = await createOffer();
    console.log("NEGO");
    socket.emit("add_participant", {
      hostId: uuid?.userId,
      friends: data?.participants,
      offer
    });
  }

  const senStreams = (peer) => {
    const pc = peer ?? peerConnection
    allTracks.getTracks().forEach((track) => {
      pc.addTrack(track, allTracks);
    });
  }

  const getStreams = (peer) => {
    const pc = peer ?? peerConnection
    pc.ontrack = (event) => {
      console.log(event);
      setRemoteStream(event.streams[0]);
    };
  }

  const handle_action = async (hostId, action, offer) => {
    let answer = "";
    if (action === "accept") {
      const data = await createAnswer(offer);
      answer = data.answer;
      senStreams(data.peerConnection);
      getStreams(data.peerConnection);
    }
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
    socket.on("connect", () => console.log("connected"));
    socket.on("disconnect", () => console.log("dis"));
    socket.on(`join_request-${uuid?.userId}`, (data) => {
      set_requests((prev) => {
        if (!prev?.find((item) => item?.hostId === data?.hostId)) {
          return [...prev, data];
        }
        return prev;
      });
    });
    socket.on(`join_request_response-${uuid?.userId}`, async (data) => {
      if (data?.action === "accept") {
        const peer = await acceptOffer(data?.answer);
        if (peer) {
          handle_remote_streams(peer);
          getStreams(peer);
        }
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
    peerConnection.addEventListener('negotiationneeded', handle_negotiation_request);
    return () => {
      peerConnection.removeEventListener('negotiationneeded', () => { });
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="flex">
        <div>
          <ReactPlayer url={allTracks} muted controls playing />
          {remoteStream && <ReactPlayer url={remoteStream} muted controls playing />}
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
