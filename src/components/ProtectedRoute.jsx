import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const accessToken = useSelector((state) => {
    return state.auth.accessToken;
  });
  if (!accessToken) {
    return <Navigate to="/login"></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
