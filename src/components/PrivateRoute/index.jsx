// import useAccount from "@/hooks/useAccount";
import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, requiredGroup }) {
  const { loading, user } = useAuth();

  if (loading) {
    return <>Cargando</>;
  }
  if (user) {
    if (requiredGroup) {
      return user.groups.includes(requiredGroup) ? (
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
