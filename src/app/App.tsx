import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "../auth/AuthProvider";
import LoginPage from "../auth/Login";
import PrivateRoute from "../auth/PrivateRoute";
import ChatView from "../chat/components/ChatView";
import Home2 from "../home/components/Home2";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home2 />
              </PrivateRoute>
            }
          />
          <Route
            path="/chats/:chatId"
            element={
              <PrivateRoute>
                <ChatView />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
