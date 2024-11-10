import { useState } from "react";
import PropTypes from "prop-types";
import { FiCopy, FiMic, FiMicOff } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "./modal";
import { DROPDOWN_OPTIONS } from "../utils/constant";
import { handleCopy } from "../utils/common";

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

function Sidebar({ uuid }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const room_id = uuid?.userId;

  const handleDropdownClick = (action) => {
    setModalContent(action.label);
    setModalOpen(true);
    setDropdownOpen(false);
  };

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4">
      <div className="flex justify-between items-center mb-4 gap-5">
        <div className="flex items-center gap-1">
          <h2 className="text-base font-semibold truncate w-48">Room Id: {room_id}</h2>
          <button
            onClick={() => handleCopy(room_id)}
            className="text-blue-500 hover:text-blue-700"
            title="Copy Room ID"
          >
            <FiCopy className="inline w-5 h-5" />
          </button>
        </div>
        <div className="relative">
          <BsThreeDotsVertical
            className="text-gray-500 cursor-pointer"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              {DROPDOWN_OPTIONS.map((option) => (
                <button
                  key={option.action}
                  onClick={() => handleDropdownClick(option)}
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
        uuid={uuid}
        title={modalContent}
      />
    </div>
  );
}

Sidebar.propTypes = {
  uuid: PropTypes.shape({
    userId: PropTypes.string,
  }),
};

export default Sidebar;
