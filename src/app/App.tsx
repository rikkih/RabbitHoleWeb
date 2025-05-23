import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import WebSocketPage from "../chat/WebSocketPage";
import { AuthProvider } from "../auth/AuthProvider";
import PrivateRoute from "../auth/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/websocket"
            element={
              <PrivateRoute>
                <WebSocketPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
