import { useCallback, useEffect, useMemo, useRef } from "react";

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.1.google.com:19302', 'stun:stun2.1.google.com:19302']
        }
    ]
};

const pcConstraints = {
    'optional': [
        { 'DtlsSrtpKeyAgreement': true },
    ],
};

export const useWebrtc = () => {
    let peerConnection = useMemo(() => new RTCPeerConnection(servers), []);

    const get_ice_candidates = () => {
        const handleICECandidate = (event) => {
            if (event.candidate) {
                console.log("New ICE candidate:", event.candidate);
            }
        };

        peerConnection.addEventListener("icecandidate", handleICECandidate);
    }

    const createOffer = async () => {
        get_ice_candidates();
        const offer = await peerConnection.createOffer();     // P1 - Call -> P2
        peerConnection.setLocalDescription(offer);            // Offer is local connection
        return offer;
    };
    
    const createAnswer = async (offer) => {
        get_ice_candidates();
        await peerConnection.setRemoteDescription(offer);     // P2 -> offer save as remote connection
        const answer = await peerConnection.createAnswer();   // P2 -> Accept -> P1
        peerConnection.setLocalDescription(answer);           // P2 -> Answer
        return { answer, peerConnection };                                        // P2 -> Answer - Local connection
    }

    const acceptOffer = async (answer) => {
        if (peerConnection.currentRemoteDescription) return;   // P1 -> Answer -> Remote connection
        await peerConnection.setRemoteDescription(answer);
        return peerConnection;
    }

    return {
        createOffer,
        createAnswer,
        acceptOffer,
        peerConnection
    }
}