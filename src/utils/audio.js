import { useEffect, useState } from "react";

const getAudio = async () => {
    const tracks = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    return tracks;
}

export const useAudio = (uuid) => {
    const [firstRender, setFirstRender] = useState(true);
    const [allTracks, setAllTracks] = useState(null);

    useEffect(() => {
        if(!uuid || !firstRender) return;
        setFirstRender(false);
        getAudio().then((tracks) => {
            setAllTracks(tracks);
        });
    }, [uuid]);

    return {
        allTracks
    }
}