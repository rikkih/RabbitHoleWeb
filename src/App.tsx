import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WebSocketPage from "./pages/WebSocketPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/websocket" element={<WebSocketPage />} />
      </Routes>
    </Router>
  );
};

export default App;