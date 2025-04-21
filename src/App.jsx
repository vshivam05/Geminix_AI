import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import PastConversation from "./Components/PastConversation";
import "./App.css";
import "./index.css";
function App() {
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(savedMode === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/history"
            element={<PastConversation toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}
          />
          <Route
            exact
            path="/"
            element={
              <Homepage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
