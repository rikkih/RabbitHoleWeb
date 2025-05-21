import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import WebSocketPage from "../chat/WebSocketPage";

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