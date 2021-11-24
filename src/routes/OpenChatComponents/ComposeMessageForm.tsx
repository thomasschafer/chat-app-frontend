import { Socket } from "socket.io-client";

export const ComposeMessageForm = ({
  message,
  setMessage,
  senderUserId,
  socket,
}: {
  message: string;
  setMessage: any;
  senderUserId: string;
  socket: Socket | undefined;
}) => {
  const updateMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const submitMessage = () => {
    if (socket && message) {
      socket.emit("new-message", { senderUserId: senderUserId, body: message });
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
