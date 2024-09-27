import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: any }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  if (isAuthenticated === false) {
    setTimeout(() => {
      return <Navigate to="/login" />;
    }, 2000);
  }
  return children;
};

export default ProtectedRoute;
