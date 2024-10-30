import { useState } from "react";
import { FiMic, FiMicOff } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "./modal";

const participants = [
  {
    name: "Akbar Husain",
    role: "Host",
    mic: true,
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Aneesh Menon",
    role: "",
    mic: true,
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Jonathan Sasi",
    role: "",
    mic: false,
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Riska Thakur",
    role: "",
    mic: true,
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Natalia",
    role: "",
    mic: true,
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Alia Thakur",
    role: "",
    mic: true,
    avatar: "https://via.placeholder.com/40",
  },
];

const dropdownOptions = [
  { label: "Add Participants", action: "add_participant" },
  { label: "Notifications", action: "notifications" },
];

function Sidebar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const room_id = "3773-4232-2378";

  const handleDropdownClick = (action) => {
    setModalContent(action);
    setModalOpen(true);
    setDropdownOpen(false);
  };

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Room Id: {room_id}</h2>
        <div className="relative">
          <BsThreeDotsVertical
            className="text-gray-500 cursor-pointer"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              {dropdownOptions.map((option) => (
                <button
                  key={option.action}
                  onClick={() => handleDropdownClick(option.action)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <ul className="space-y-3">
        {participants.map((participant, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={participant.avatar}
                alt={participant.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{participant.name}</p>
                {participant.role && (
                  <span className="text-xs text-blue-500">
                    {participant.role}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              {participant.mic ? (
                <FiMic className="text-blue-500" />
              ) : (
                <FiMicOff className="text-gray-400" />
              )}
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={
          modalContent === "add_participant"
            ? "Add Participants"
            : "Notifications"
        }
      />
        
    </div>
  );
}

export default Sidebar;
