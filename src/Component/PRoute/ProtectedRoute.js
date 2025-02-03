import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = useSelector((state) => state.auth.token); // Access token from Redux store

  if (!token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
