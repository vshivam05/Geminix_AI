import React from "react";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import PastConversation from "./Components/PastConversation";
function App() {
  return (
    <>
      {/* //dummy text */}
      <Router>
        <Routes>
          <Route exact path="/history" element={<PastConversation />} />
          <Route exact path="/" element={<Homepage />} />
        </Routes>
      </Router>
      {/* <Homepage /> */}
    </>
  );
}

export default App;
