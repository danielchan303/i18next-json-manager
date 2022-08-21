import "./logo.svg";
import "./App.css";
import * as React from "react";
import { useAuthStateListener } from "./services/firebase";
import useSocket from "./services/socketio";
import { Routes, Route } from "react-router-dom";
import ProjectList from "./pages/ProjectList";
import ProjectDetails from "./pages/ProjectDetails";

function App() {
  useAuthStateListener();
  useSocket();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/:userId/:projectId" element={<ProjectDetails />} />
      </Routes>
    </div>
  );
}

export default App;
