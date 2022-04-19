// import useAccount from "@/hooks/useAccount";
import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import Loader from "../Loader";

function PrivateRoute({ children, requiredGroup }) {
  const { loading, user } = useAuth();

  if (loading) {
    return <Loader />;
  }
  if (user) {
    if (requiredGroup) {
      return user.user.groups.includes(requiredGroup) ? (
        children
      ) : (
        <Navigate to="/login" />
      );
    }
    return children;
  }
  return <Navigate to="/login" />;
}

export default PrivateRoute;
