import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import { BACKEND_URL } from "../constants";
import { ComposeMessageForm } from "./OpenChatComponents/ComposeMessageForm";
import { chatMessage, MessageThread } from "./OpenChatComponents/MessageThread";
import { NavBar } from "./OpenChatComponents/NavBar";
import { useLocalStorage } from "../hooks/useLocalStorage";

const OpenChat = () => {
  let params = useParams();
  const [message, setMessage] = useState("");
  const [messageThread, setMessageThread] = useState<Array<chatMessage>>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [socket, setSocket] = useState<Socket>();
  const [senderUserId, setSenderUserId] = useLocalStorage("chat-sender-userid", ""); // TODO: CREATE LOGIN TO USE INSTEAD OF LOCAL STORAGE

  useEffect(() => {
    if (!BACKEND_URL) {
      throw new Error("BACKEND_URL is not defined as an environment variable.");
    }
    const newSocket = io(BACKEND_URL);
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (!senderUserId) {
      setSenderUserId(uuidv4());
    }
  }, [senderUserId, setSenderUserId]);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      socket.emit("join-chat", params.chatId);
    });
  }, [params, socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on("message-received", (msg) => {
      setMessageThread((thread) => [...thread, msg]);
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on("message-thread", (msg) => {
      if (msg) {
        setMessageThread(msg);
      }
      setHasLoaded(true);
    });

    socket.on("user-was-updated", (body) => {
      setMessageThread((oldMessageThread) => {
        if (!oldMessageThread) return oldMessageThread;
        return oldMessageThread.map((message) => ({
          ...message,
          userName:
            message.senderUserId === body.senderUserId && body.userName
              ? body.userName
              : message.userName,
        }));
      });
    });
  }, [setMessageThread, socket]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);
  }, [messageThread]);

  return (
    <main className="flex flex-col items-center min-h-screen">
      <NavBar chatId={params.chatId || ""} senderUserId={senderUserId} socket={socket} />
      {params.chatId && params.chatId.length <= 5 ? (
        <div className="pt-20">Sorry, that chat doesn't exist.</div>
      ) : (
        <>
          {hasLoaded ? (
            <MessageThread messageThread={messageThread} senderUserId={senderUserId} />
          ) : (
            <div className="w-full h-screen flex justify-center items-center">Loading...</div>
          )}

          <ComposeMessageForm
            message={message}
            setMessage={setMessage}
            senderUserId={senderUserId}
            socket={socket}
          />
        </>
      )}
    </main>
  );
};

export default OpenChat;
