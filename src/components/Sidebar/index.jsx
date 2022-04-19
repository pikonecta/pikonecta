import cn from "classnames";
import logo from "@/assets/logo-konecta.svg";
import { useNavigate } from "react-router-dom";
import useAccount from "@/hooks/useAccount";

function Sidebar({ className }) {
  const navigate = useNavigate();
  const { logout } = useAccount();
  const redirectToLogin = () => {
    logout();
    navigate("/login");
  };
  return (
    <div
      className={cn(
        "px-4 py-10 bg-sidebar-color border-r-2 border-gray-300 sticky top-0 h-screen flex justify-between flex-col",
        className
      )}
    >
      <img src={logo} alt="Logo konecta" className="mx-auto w-64" />

      <button
        type="button"
        className="material-icons-outlined text-gray-500 hover:text-gray-600"
        onClick={redirectToLogin}
      >
        logout
      </button>
    </div>
  );
}

export default Sidebar;
