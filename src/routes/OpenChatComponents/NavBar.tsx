import { useState } from "react";
import { Link } from "react-router-dom";
import { Socket } from "socket.io-client";

import { SettingsModal } from "./SettingsModal";

export const NavBar = ({
  chatId,
  senderId,
  socket,
}: {
  chatId: string;
  senderId: string;
  socket: Socket | undefined;
}) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <>
      <nav className="fixed top-0 bg-indigo-700 h-16 w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-screen-lg p-5 flex flex-row justify-between items-center">
          <Link to="/" className="text-white">
            Home
          </Link>
          <h1 className="text-white">{chatId}</h1>
          <div
            className="text-white cursor-pointer"
            onClick={() => {
              setShowSettingsModal(true);
            }}
          >
            Settings
          </div>
        </div>
      </nav>

      {showSettingsModal ? (
        <SettingsModal
          chatId={chatId}
          senderId={senderId}
          setShowSettingsModal={setShowSettingsModal}
          socket={socket}
        />
      ) : (
        <></>
      )}
    </>
  );
};
