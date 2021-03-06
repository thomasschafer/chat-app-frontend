export interface chatMessage {
  senderUserId: string;
  body: string;
  userName: string;
}

const Message = ({ msg, senderUserId }: { msg: chatMessage; senderUserId: string }) => (
  <div
    className={`message-container max-w-max w-11/12 md:w-max rounded-xl px-5 py-3 my-3 break-words ${
      msg.senderUserId === senderUserId ? "ml-auto bg-indigo-100 text-right" : "bg-gray-200"
    }`}
  >
    <b>{msg.userName || <i className="text-gray-700">Anonymous</i>}</b>
    <br />
    {msg.body}
  </div>
);

export const MessageThread = ({
  messageThread,
  senderUserId,
}: {
  messageThread: Array<chatMessage>;
  senderUserId: string;
}) => (
  <div className="w-full max-w-screen-lg min-h-screen	h-full flex px-5 pt-20 pb-28 border-bottom">
    <div className="w-full self-end">
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
        <Message senderUserId={senderUserId} msg={msg} key={`${idx}-${msg.body}`} />
      ))}
    </div>
  </div>
);
