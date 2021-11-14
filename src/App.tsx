import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

function App() {
  const [chatId, setChatId] = useState("");
  const [showExistingChatInput, setShowExistingChatInput] = useState(false);
  const navigate = useNavigate();

  const updateChatId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatId(event.target.value);
  };

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      navigate(`/chat/${chatId}`);
    }
  };

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome!</p>
      </header>
      <main>
        <div>
          <Link to={`/chat/${uuidv4()}`}>New chat</Link>
          <div
            onClick={() => {
              setShowExistingChatInput(!showExistingChatInput);
            }}
          >
            Existing chat
          </div>
          {showExistingChatInput && (
            <form>
              <label>
                Chat ID:
                <input
                  type="text"
                  value={chatId}
                  onChange={updateChatId}
                  onKeyPress={handleEnter}
                />
              </label>
              <input type="submit" value="Go" onClick={handleSubmit} />
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
