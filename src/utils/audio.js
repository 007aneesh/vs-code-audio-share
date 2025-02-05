import { useEffect, useState } from "react";

const getAudio = async () => {
    const tracks = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    return tracks;
}

export const useAudio = (uuid) => {
    const [firstRender, setFirstRender] = useState(false);
    const [allTracks, setAllTracks] = useState(null);

    useEffect(() => {
        if(!uuid) return;
        if(!firstRender) {
            setFirstRender(true);
            return;
        }
        getAudio().then((tracks) => {
            setAllTracks(tracks);
        });
    }, [uuid]);

    return {
        allTracks
    }
}