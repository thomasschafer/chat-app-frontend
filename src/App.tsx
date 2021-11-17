import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [chatId, setChatId] = useState("");
  const [showExistingChatInput, setShowExistingChatInput] = useState(false);
  const navigate = useNavigate();

  const updateChatId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatId(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(`/chat/${chatId}`);
  };

  return (
    <main className="w-screen h-screen flex justify-center align-middle bg-white">
      <div className="flex flex-col sm:flex-row justify-center items-center align-middle p-2 text-center">
        <Link
          className="bg-gray-300 p-3 m-2 rounded-md w-60 h-16 flex items-center justify-center shadow hover:bg-indigo-200 hover:shadow-md font-bold tracking-wide"
          to={`/chat/${uuidv4()}`}
        >
          New chat
        </Link>
        <div
          className="cursor-pointer bg-gray-300 p-3 rounded-md m-2 w-60 h-16 flex items-center justify-center shadow hover:bg-indigo-200 hover:shadow-md font-bold tracking-wide"
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
                onChange={updateChatId}
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
