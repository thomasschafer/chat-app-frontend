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
      <div className="flex flex-col justify-center items-center align-middle py-10 sm:px-10 text-center w-11/12 h-fit-content max-w-screen-sm my-auto rounded-xl bg-white">
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
          className={`border-4 border-primaryPurple text-primaryPurple rounded-xl m-2 w-60 h-16 flex items-center justify-center hover:bg-primaryPurple hover:text-white transition duration-75 font-bold tracking-wide ${
            showExistingChatInput ? "bg-primaryPurple" : "cursor-pointer"
          }`}
          onClick={() => {
            !showExistingChatInput && setShowExistingChatInput(true);
          }}
        >
          {showExistingChatInput ? (
            <form className="flex flex-row items-center h-full">
              <input
                type="text"
                className="shadow appearance-none rounded-lg border-primaryPurple w-full h-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Chat ID"
                value={chatId}
                onChange={(e) => {
                  setChatId(e.target.value);
                }}
              />
              <input
                type="submit"
                className="py-2 px-3 h-full cursor-pointer rounded-lg bg-primaryPurple text-white hover:bg-grey font-bold"
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
