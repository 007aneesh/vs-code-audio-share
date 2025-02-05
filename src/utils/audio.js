import { useEffect, useState } from "react";

const getAudio = async () => {
    const tracks = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    return tracks;
}

export const useAudio = (uuid) => {
    const [firstRender, setFirstRender] = useState(false);
    const [audioTracks, setAudioTracks] = useState(null);

    useEffect(() => {
        if(!uuid) return;
        if(!firstRender) {
            setFirstRender(true);
            return;
        }
        getAudio().then((tracks) => {
            setAudioTracks(tracks);
        });
    }, [uuid]);

    return {
        audioTracks
    }
}