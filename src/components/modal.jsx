/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { socket } from "../utils/socket";

function Modal({ isOpen, uuid, onClose, title }) {
  const offer = `OFFER FROM WEBRTC ${uuid?.userId}`;
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      participants: [""],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: "participants",
  });

  const onSubmit = (data) => {
    // console.log("Form Data:", data, uuid);
    if(!uuid?.userId) return;
    socket.emit("add_participant", {
      hostId: uuid?.userId,
      friends: data?.participants,
      offer
    });
  };

  useEffect(() => {
    if (!isOpen) {
      reset({
        participants: [""],
      });
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex flex-col bg-black bg-opacity-50 items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-96 shadow-lg">
        <div className="w-full h-full flex flex-col">
          <div className="flex flex-row w-full justify-between items-center">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              X
            </button>
          </div>

          {title === "Add Participants" && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-2 mt-8">
                {fields.map((field, index) => (
                  <input
                    key={field.id}
                    type="text"
                    {...register(`participants.${index}`)}
                    placeholder="Room ID of participant"
                    className="border p-2 bg-gray-50 border-gray-300 rounded-lg outline-none"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => append("")}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                >
                  Add another user
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Participants
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
