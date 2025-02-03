import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  // const token = useSelector((state) => state.auth.token); // Access token from Redux store
  const token = window.localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default ProtectedRoute