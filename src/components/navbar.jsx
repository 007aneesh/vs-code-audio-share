import { useState } from "react";
import { FiMic, FiMicOff } from "react-icons/fi";
import { MdCallEnd } from "react-icons/md";

function BottomNavbar() {
  const [micOn, setMicOn] = useState(true);
  const participantsCount = 5; 
  const currentSpeaker = "Akbar Husain"; 

  const toggleMic = () => {
    setMicOn(!micOn);
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-lg bg-white border-2 shadow-lg rounded-full flex justify-between items-center px-6 py-4">
      <div className="flex flex-col items-start justify-start text-sm">
        <span className="text-gray-700">
          <span className="font-medium">{currentSpeaker}</span> is speaking..
        </span>
        <span className="text-gray-700 font-sm">
          {participantsCount} Participants
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleMic}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
        >
          {micOn ? (
            <FiMic className="text-blue-500 text-xl" />
          ) : (
            <FiMicOff className="text-gray-500 text-xl" />
          )}
        </button>

        <button className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white focus:outline-none flex items-center">
          <MdCallEnd className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default BottomNavbar;
