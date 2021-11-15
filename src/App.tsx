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
    <div className="App">
      <header className="text-center">
        <div className="bg-blue-900 p-5">
          <h1 className="text-white">Welcome!</h1>
        </div>
      </header>
      <main>
        <div className="flex flex-col items-center p-2 text-center">
          <Link
            className="bg-gray-300 p-3 m-2 rounded-md h-full w-60 max-w-full"
            to={`/chat/${uuidv4()}`}
          >
            New chat
          </Link>
          <div
            className="cursor-pointer bg-gray-300 p-3 rounded-md min-w-min m-2 w-60 max-w-full"
            onClick={() => {
              setShowExistingChatInput(!showExistingChatInput);
            }}
          >
            Existing chat
          </div>
          <form className={`flex flex-row ${showExistingChatInput ? "" : "invisible"}`}>
            <label>Chat ID:</label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="1234"
              value={chatId}
              onChange={updateChatId}
            />
            <input
              type="submit"
              className="py-2 px-3 cursor-pointer rounded-md mt-2"
              value="Go"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
