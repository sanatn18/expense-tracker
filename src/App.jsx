import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register.jsx";
import Dashboard from "./Pages/Dashboard.jsx"; 
import Login from "./Pages/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Register />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;
