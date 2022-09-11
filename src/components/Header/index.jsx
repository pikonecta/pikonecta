import companies from "@/assets/companies.json";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAccount from "@/hooks/useAccount";
import useOnClickOutside from "@/hooks/useOnClickOutside";

function Header({ onInputValue }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { hasTenant, logout } = useAccount();
  const navigate = useNavigate();
  const { id } = useParams();
  const canEdit = hasTenant(id);
  const ref = useRef();

  useOnClickOutside(ref, () => setShowSearch(false));

  const redirectToCreate = () => {
    navigate(`/${id}/create`);
  };

  const redirectToLogin = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="p-5 bg-general-gray text-header-text flex justify-between aling-center">
      <div className="p-10 inline-flex h-min m-2">
        {canEdit && (
          <button
            type="button"
            className="material-icons-outlined rounded-lg p-3 text-gray-500 items-center bg-general-blue"
            onClick={redirectToLogin}
          >
            logout
          </button>
        )}
      </div>
      <div className="items-center p-5">
        <img
          className="center h-24 w-24"
          src={companies.companies[0].imageUrl}
          alt="LOGO"
        />
        <h1 className="center">{companies.companies[0].name}</h1>
      </div>
      <div className="p-10 inline-flex h-min">
        <div>
          {showSearch && (
            <input
              className="radius-lg rounded-lg border-b p-3  text-gray-500 m-2"
              placeholder="Busqueda"
              ref={ref}
              onChange={(search) => {
                setInputValue(search.target.value);
                onInputValue(search.target.value);
              }}
              autoFocus
            />
          )}
        </div>
        <div>
          {!showSearch && (
            <button
              className="material-icons rounded-lg p-3 text-gray-500 items-center bg-general-blue m-2"
              type="button"
              onClick={() => setShowSearch((state) => !state)}
            >
              search
            </button>
          )}
        </div>

        <div>
          <div>
            <button
              className=" material-icons rounded-lg p-3 text-gray-500 items-center bg-general-blue m-2"
              type="button"
            >
              shopping_cart
            </button>
          </div>
        </div>
        <div className="flex fixed z-10 right-0 top-0 ">
          <div className="flex" />
          <div className="opacity-25 w-2/3 lg:fixed inset-0 z-40 bg-black" />
        </div>

        <div className="">
          {canEdit && (
            <button
              type="button"
              className="material-icons rounded-lg p-3 text-gray-500 items-center bg-general-blue m-2"
              onClick={redirectToCreate}
            >
              add_circle
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
