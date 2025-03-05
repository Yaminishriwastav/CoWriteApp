import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StoryForm from "./components/component/StoryForm";
import StoryView from "./components/component/StoryView";
import StoryList from "./components/component/StoryList";
function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/story/:id" element={<StoryView user={user} />} />
        <Route path="/create-story" element={<StoryForm user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
