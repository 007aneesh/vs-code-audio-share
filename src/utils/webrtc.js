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
    const peerConnection = useMemo(() => new RTCPeerConnection(servers), []);

    const createOffer = async () => {
        const offer = await peerConnection.createOffer();
        console.log(offer);
        peerConnection.setLocalDescription(offer);
        return offer;
    }

    const createAnswer = async (offer) => {
        await peerConnection.setRemoteDescription(offer);
        const answer = await peerConnection.createAnswer();
        peerConnection.setLocalDescription(answer);
        return answer;
    }

    const acceptAnswer = async (answer) => {
        if(peerConnection.currentRemoteDescription) return;
        await peerConnection.setRemoteDescription(answer);
    }

    return {
        createOffer,
        createAnswer,
        acceptAnswer
    }
}