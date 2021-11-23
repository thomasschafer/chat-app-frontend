export interface chatMessage {
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

export const MessageThread = ({
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
