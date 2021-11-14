import { Link, useParams } from "react-router-dom";

const OpenChat = () => {
  let params = useParams();

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
    </main>
  );
};

export default OpenChat;
