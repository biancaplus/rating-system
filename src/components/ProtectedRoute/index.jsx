import { Navigate, Outlet } from "react-router-dom";
import dataInit from "@/config.js";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  // const isAdmin = useSelector((state) => state.user.isAdmin);

  const token = localStorage.getItem(dataInit.cookieID);

  const payload = token ? jwtDecode(token) : null;
  const isAdmin = payload?.username === "admin" ? true : false;

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
