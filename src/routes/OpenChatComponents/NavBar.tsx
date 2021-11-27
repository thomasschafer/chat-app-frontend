import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Socket } from "socket.io-client";

import { UserSettingsModal } from "./UserSettingsModal";
import { ChatSettingsModal } from "./ChatSettingsModal";
import settingsGear from "../../static/settings-gear.svg";
import back from "../../static/back.svg";

export const NavBar = ({
  chatId,
  senderUserId,
  socket,
}: {
  chatId: string;
  senderUserId: string;
  socket: Socket | undefined;
}) => {
  const [chatName, setChatName] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [showUserSettingsModal, setShowUserSettingsModal] = useState(false);
  const [showChatSettingsModal, setShowChatSettingsModal] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.on("chat-name", (body) => {
      if (body.chatName) {
        setChatName(body.chatName);
      }
      setLoaded(true);
    });
  }, [socket, setChatName]);

  return (
    <>
      <nav className="fixed top-0 bg-primaryPurple h-16 w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-screen-lg p-5 flex flex-row justify-between items-center">
          <Link to="/" className="text-white transform hover:scale-105 transition-all">
            <img
              src={back}
              alt="Back"
              className="h-9 w-9 transform hover:scale-110 transition-all"
            />
          </Link>
          <h1
            className="text-white cursor-pointer transform hover:scale-105 transition-all"
            onClick={() => {
              setShowUserSettingsModal(false);
              setShowChatSettingsModal(true);
            }}
          >
            {chatName || (loaded && chatId)}
          </h1>
          <div
            className="text-white cursor-pointer"
            onClick={() => {
              setShowUserSettingsModal(true);
              setShowChatSettingsModal(false);
            }}
          >
            <img
              src={settingsGear}
              alt="Settings"
              className="h-8 w-8 transform hover:scale-110 transition-all"
            />
          </div>
        </div>
      </nav>

      {showUserSettingsModal && (
        <UserSettingsModal
          chatId={chatId}
          senderUserId={senderUserId}
          setShowUserSettingsModal={setShowUserSettingsModal}
          socket={socket}
        />
      )}

      {showChatSettingsModal && (
        <ChatSettingsModal
          chatId={chatId}
          intialChatName={chatName}
          setShowChatSettingsModal={setShowChatSettingsModal}
          socket={socket}
        />
      )}
    </>
  );
};
