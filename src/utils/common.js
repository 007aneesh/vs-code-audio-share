export const handleCopy = (room_id) => {
  navigator.clipboard
    .writeText(room_id)
    .catch((error) => console.error("Failed to copy room ID", error));
};
