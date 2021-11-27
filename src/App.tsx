import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [chatId, setChatId] = useState("");
  const [showExistingChatInput, setShowExistingChatInput] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(`/chat/${chatId}`);
  };

  return (
    <main className="w-screen h-screen flex justify-center align-middle bg-primaryPurple">
      <div className="flex flex-col justify-center items-center align-middle py-10 sm:px-10 text-center h-full w-full sm-h-fit-content sm:w-8/12 sm:max-w-screen-sm my-auto rounded-xl bg-white">
        <div className="flex-shrink-0">
          <img
            className="h-40 w-40 mb-5 object-cover"
            src={process.env.PUBLIC_URL + "/kobble-logo.png"}
            alt="kobble logo"
          />
        </div>
        <img
          className="w-40 mb-10"
          src={process.env.PUBLIC_URL + "/kobble-text.png"}
          alt="kobble text"
        />
        <Link
          className="border-4 border-primaryPurple text-primaryPurple rounded-xl p-3 m-2 w-60 h-16 flex items-center justify-center hover:bg-primaryPurple hover:text-white transition duration-75 font-bold tracking-wide"
          to={`/chat/${uuidv4()}`}
        >
          New chat
        </Link>
        <div
          className="border-4 border-primaryPurple text-primaryPurple rounded-xl cursor-pointer p-3 m-2 w-60 h-16 flex items-center justify-center hover:bg-primaryPurple hover:text-white transition duration-75 font-bold tracking-wide"
          onClick={() => {
            !showExistingChatInput && setShowExistingChatInput(true);
          }}
        >
          {showExistingChatInput ? (
            <form className="flex flex-row items-center space-x-3">
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Chat ID"
                value={chatId}
                onChange={(e) => {
                  setChatId(e.target.value);
                }}
              />
              <input
                type="submit"
                className="py-2 px-3 cursor-pointer rounded-md"
                value="Go"
                onClick={handleSubmit}
              />
            </form>
          ) : (
            <>Existing chat</>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
