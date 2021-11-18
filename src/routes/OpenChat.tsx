import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const BACKEND_URL = "localhost:8000";

interface chatMessage {
  senderId: string;
  body: string;
}

const Message = ({ msg, senderId }: { msg: chatMessage; senderId: string }) => (
  <div
    className={`message-container max-w-max w-11/12 md:w-max rounded-xl px-5 py-3 my-3 ${
      msg.senderId === senderId ? "ml-auto bg-blue-100 text-right" : "bg-gray-200"
    }`}
  >
    <b>{msg.senderId}</b>
    <br />
    {msg.body}
  </div>
);

const OpenChat = () => {
  let params = useParams();
  const [message, setMessage] = useState("");
  const [messageThread, setMessageThread] = useState<Array<chatMessage>>([]);
  const [socket, setSocket] = useState<Socket>();
  const [senderId, setSenderId] = useState<string>("");

  useEffect(() => {
    setSenderId(uuidv4());

    const newSocket = io(BACKEND_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("chat-id", params.chatId);
    });

    newSocket.on("message-received", (msg) => {
      setMessageThread((thread) => [...thread, msg]);
      window.scrollTo(0, document.body.scrollHeight);
    });

    newSocket.on("message-thread", (msg) => {
      console.log("message-thread", msg);
    });
  }, [params]);

  const updateMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const submitMessage = () => {
    if (socket) {
      socket.emit("new-message", { senderId: senderId, body: message, chatId: params.chatId });
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
    <main className="flex flex-col items-center">
      <nav className="fixed top-0 bg-indigo-700 h-16 w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-screen-lg p-5 flex flex-row justify-between items-center">
          <Link to="/" className="text-white w-5">
            Home
          </Link>
          <h1 className="text-white">{params.chatId}</h1>
          <div className="w-5"></div>
        </div>
      </nav>

      {params.chatId && params.chatId.length <= 5 ? (
        <div className="pt-20">Sorry, that chat doesn't exist.</div>
      ) : (
        <>
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
        </>
      )}
    </main>
  );
};

export default OpenChat;
