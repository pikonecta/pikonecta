import cn from "classnames";
import logo from "@/assets/logo-konecta-dark.png";

function Sidebar({ className }) {
  return (
    <div
      className={cn(
        "px-4 py-10 bg-sidebar-color border-r-2 border-gray-300 h-screen flex justify-between flex-col",
        className
      )}
    >
      <img src={logo} alt="Logo konecta" className="mx-auto w-64" />
      <span className="material-icons-outlined text-gray-500">logout</span>
    </div>
  );
}

export default Sidebar;
