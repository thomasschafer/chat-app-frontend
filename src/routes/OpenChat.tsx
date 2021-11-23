import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import { ComposeMessageForm } from "./OpenChatComponents/ComposeMessageForm";
import { chatMessage, MessageThread } from "./OpenChatComponents/MessageThread";
import { NavBar } from "./OpenChatComponents/NavBar";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BACKEND_URL = "localhost:8000";

const OpenChat = () => {
  let params = useParams();
  const [message, setMessage] = useState("");
  const [messageThread, setMessageThread] = useState<Array<chatMessage>>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [socket, setSocket] = useState<Socket>();
  const [senderId, setSenderId] = useLocalStorage("chat-senderid", ""); // TODO: CREATE LOGIN TO USE INSTEAD OF LOCAL STORAGE

  useEffect(() => {
    const newSocket = io(BACKEND_URL);
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (!senderId) {
      setSenderId(uuidv4());
    }
  }, [senderId, setSenderId]);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      socket.emit("chat-id", params.chatId);
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
      console.log("user-was-updated");
      console.log(body);
      setMessageThread((oldMessageThread) => {
        if (!oldMessageThread) return oldMessageThread;
        return oldMessageThread.map((message) => ({
          ...message,
          userName:
            message.senderId === body.senderId && body.userName ? body.userName : message.userName,
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
      <NavBar chatId={params.chatId || ""} senderId={senderId} socket={socket} />
      {params.chatId && params.chatId.length <= 5 ? (
        <div className="pt-20">Sorry, that chat doesn't exist.</div>
      ) : (
        <>
          {hasLoaded ? (
            <MessageThread messageThread={messageThread} senderId={senderId} />
          ) : (
            <div className="w-full h-screen flex justify-center items-center">Loading...</div>
          )}

          <ComposeMessageForm
            message={message}
            setMessage={setMessage}
            senderId={senderId}
            socket={socket}
          />
        </>
      )}
    </main>
  );
};

export default OpenChat;
