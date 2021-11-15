import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";

const BACKEND_URL = "localhost:8000";

const OpenChat = () => {
  let params = useParams();
  const [message, setMessage] = useState("");
  const [messageThread, setMessageThread] = useState<Array<string>>([]);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io(BACKEND_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Client: connected", newSocket.connected);
    });

    newSocket.on("message received", (msg) => {
      console.log("Message received", msg);
      setMessageThread((thread) => [...thread, msg.message]);
      window.scrollTo(0, document.body.scrollHeight);
    });
  }, []);

  const updateMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const submitMessage = () => {
    if (socket) {
      console.log("Sending message:", message);
      socket.emit("new message", message);
      setMessage("");
    } else {
      console.log("ERROR");
    }
  };

  const handleSubmit = (event: React.MouseEvent) => {
    console.log("handleSubmit");
    event.preventDefault();
    submitMessage();
  };

  return (
    <main>
      <div>
        <Link to="/">Home</Link>
      </div>
      {params.chatId && params.chatId.length <= 5 ? (
        <div>Sorry, that chat doesn't exist.</div>
      ) : (
        <h1>Open {params.chatId}</h1>
      )}
      <div>
        {messageThread.map((msg, idx) => (
          <p key={`${msg}-${idx}`}>{msg}</p>
        ))}
      </div>

      <form className="flex flex-row">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Message"
          value={message}
          onChange={updateMessage}
        />
        <input
          type="submit"
          className="py-2 px-3 cursor-pointer rounded-md mt-2"
          value="Go"
          onClick={handleSubmit}
        />
      </form>
    </main>
  );
};

export default OpenChat;
