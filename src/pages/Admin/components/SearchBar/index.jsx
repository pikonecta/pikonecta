import cn from "classnames";

function SearchBar({ className }) {
  return (
    <div
      className={cn("bg-gray-100 rounded-lg flex flex-row relative", className)}
    >
      <span className="material-icons border-r border-r-gray-300 p-2 absolute text-gray-500 h-full flex items-center">
        search
      </span>
      <input
        type="text"
        className="bg-none w-full bg-transparent border-transparent z-10 pl-14"
        placeholder="Buscar"
      />
    </div>
  );
}

export default SearchBar;
