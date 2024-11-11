import { useEffect, useMemo, useState } from "react"

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
    let peerConnection = new RTCPeerConnection(servers);

    const createOffer = async () => {
        const offer = await peerConnection.createOffer();     // P1 - Call -> P2
        console.log(offer);                                   // Call -> Offer
        peerConnection.setLocalDescription(offer);            // Offer is local connection
        return offer;
    }

    const createAnswer = async (offer) => {
        await peerConnection.setRemoteDescription(offer);     // P2 -> offer save as remote connection
        const answer = await peerConnection.createAnswer();   // P2 -> Accept -> P1
        peerConnection.setLocalDescription(answer);           // P2 -> Answer
        return answer;                                        // P2 -> Answer - Local connection
    }

    const acceptOffer = async (answer) => {
        if(peerConnection.currentRemoteDescription) return;   // P1 -> Answer -> Remote connection
        await peerConnection.setRemoteDescription(answer);
    }

    const resetConnection = () => {
        peerConnection = new RTCPeerConnection(servers);
    }

    return {
        createOffer,
        createAnswer,
        acceptOffer
    }
}