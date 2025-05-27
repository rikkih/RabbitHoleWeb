import { Outlet } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import Header from "./Header";

const PrivateLayout = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <Header user={user} logout={logout} />
      <Outlet />
    </>
  );
};

export default PrivateLayout;