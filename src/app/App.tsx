import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "../auth/AuthProvider";
import LoginPage from "../auth/Login";
import PrivateRoute from "../auth/PrivateRoute";
import ChatView from "../chat/components/ChatView";
import Home from "../home/Home";
import PrivateLayout from "../shared/components/PrivateLayout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route element={<PrivateLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/chats/:chatId" element={<ChatView />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
