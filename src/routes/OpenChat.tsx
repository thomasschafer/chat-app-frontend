import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import { useLocalStorage } from "../hooks/useLocalStorage";

const BACKEND_URL = "localhost:8000";

interface chatMessage {
  senderId: string;
  body: string;
  userName: string;
}

const Message = ({ msg, senderId }: { msg: chatMessage; senderId: string }) => (
  <div
    className={`message-container max-w-max w-11/12 md:w-max rounded-xl px-5 py-3 my-3 ${
      msg.senderId === senderId ? "ml-auto bg-blue-100 text-right" : "bg-gray-200"
    }`}
  >
    <b>{msg.userName || msg.senderId}</b>
    <br />
    {msg.body}
  </div>
);

const MessageThread = ({
  messageThread,
  senderId,
}: {
  messageThread: Array<chatMessage>;
  senderId: string;
}) => (
  <div className="w-full max-w-screen-lg p-5 pt-20 border-bottom mb-24">
    {messageThread.length === 0 ? (
      <>
        <img
          className="w-8/12 max-w-sm mx-auto my-10"
          src={process.env.PUBLIC_URL + "/message-ideas.svg"}
          alt="Message ideas"
        />
        <div className="mx-auto my-10 w-max text-gray-500 text-2xl">Say hi!</div>
      </>
    ) : (
      <></>
    )}
    {messageThread.map((msg, idx) => (
      <Message senderId={senderId} msg={msg} key={`${idx}-${msg.body}`} />
    ))}
  </div>
);

const SettingsModal = ({
  chatId,
  senderId,
  setShowSettingsModal,
  socket,
}: {
  chatId: string;
  senderId: string;
  setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket | undefined;
}) => {
  const [userName, setUserName] = useState("ldksmf");

  useEffect(() => {
    if (!socket) return;
    socket.emit("request-username", { userId: senderId });
    socket.on("username", (body) => {
      if (body.userName) {
        setUserName(body.userName);
      }
    });
  }, [senderId, socket]);

  const submitUserSettings = () => {
    if (socket) {
      socket.emit("update-user", { chatId: chatId, senderId: senderId, userName: userName });
      setShowSettingsModal(false);
    } else {
      // TODO: ADD ERROR MESSAGE
    }
  };

  return (
    <div className="fixed w-5/6 h-5/6 max-w-xl max-h-xl m-auto inset-x-0 inset-y-0 bg-white shadow-md border-2 rounded z-10 p-5">
      <div
        className="max-w-min absolute right-5 cursor-pointer"
        onClick={() => {
          setShowSettingsModal(false);
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
      <form className="flex flex-col h-full">
        <label>
          Username:
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </label>
        <input
          type="submit"
          className="py-2 px-6 w-full mt-auto ml-auto max-w-min cursor-pointer rounded-md"
          value="Save"
          onClick={submitUserSettings}
        />
      </form>
    </div>
  );
};

const Navbar = ({
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

const ComposeMessageForm = ({
  message,
  setMessage,
  senderId,
  socket,
}: {
  message: string;
  setMessage: any;
  senderId: string;
  socket: Socket | undefined;
}) => {
  const updateMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const submitMessage = () => {
    if (socket && message) {
      socket.emit("new-message", { senderId: senderId, body: message });
      setMessage("");
    }
  };

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    submitMessage();
  };

  const submitOnEnterPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && event.shiftKey === false) {
      event.preventDefault();
      submitMessage();
    }
  };

  return (
    <div className="fixed bottom-0 w-full bg-gray-100 flex flex-col items-center">
      <form className="flex flex-row w-full max-w-screen-lg p-5">
        <textarea
          className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
          placeholder="Message"
          value={message}
          onChange={updateMessage}
          onKeyDown={submitOnEnterPress}
        />
        <input
          type="submit"
          className="my-auto py-2 px-3 cursor-pointer rounded-md ml-2 bg-gray-200 shadow border border-gray-300"
          value="Send"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

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
      <Navbar chatId={params.chatId || ""} senderId={senderId} socket={socket} />
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
      <div className="pb-36">User id: {senderId}</div>
    </main>
  );
};

export default OpenChat;
