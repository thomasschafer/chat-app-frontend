import { useState } from "react";
import { Socket } from "socket.io-client";

export const ChatSettingsModal = ({
  chatId,
  intialChatName,
  setShowChatSettingsModal,
  socket,
}: {
  chatId: string;
  intialChatName: string;
  setShowChatSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket | undefined;
}) => {
  const [chatName, setChatName] = useState(intialChatName);

  const submitChatSettings = () => {
    if (socket && chatName) {
      socket.emit("update-chat", {
        chatId,
        chatName,
      });
      setShowChatSettingsModal(false);
    } else {
      // TODO: ADD ERROR MESSAGE
    }
  };

  return (
    <div className="fixed w-5/6 h-fit-content max-w-xl m-auto inset-x-0 inset-y-0 bg-white shadow-md border-2 rounded z-10 p-5">
      <div
        className="max-w-min absolute right-5 cursor-pointer"
        onClick={() => {
          setShowChatSettingsModal(false);
        }}
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
        </svg>
      </div>
      <div className="mb-2">
        Chat id:
        <div className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-600 leading-tight bg-gray-200 focus:outline-none focus:shadow-outline">
          {chatId}
        </div>
      </div>
      <form className="flex flex-col h-full">
        <label>
          Chat name:
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={chatName}
            onChange={(e) => {
              setChatName(e.target.value);
            }}
          />
        </label>
        <input
          type="submit"
          className="py-2 px-6 w-full mt-4 ml-auto max-w-min cursor-pointer rounded-md bg-gray-200 shadow border border-gray-300"
          value="Save"
          onClick={submitChatSettings}
        />
      </form>
    </div>
  );
};
