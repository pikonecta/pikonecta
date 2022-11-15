/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import companies from "@/assets/companies.json";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAccount from "@/hooks/useAccount";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { getTenant } from "@/utils/apiManager";
import Loader from "@/components/Loader";
import SideBarShop from "@/components/SideBarShop";

function Header({ onInputValue }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [company, setCompany] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebar, setSidebar] = useState(false);
  const showSideBar = () => setSidebar(!sidebar);

  const { hasTenant, logout } = useAccount();
  const navigate = useNavigate(); // usar el context
  const { id } = useParams();
  const canEdit = hasTenant(id);
  const ref = useRef();

  useOnClickOutside(ref, () => setShowSearch(false));
  useOnClickOutside(ref, () => showSideBar(!sidebar));

  useEffect(async () => {
    const tenant = await getTenant(id);
    setCompany(tenant.Item);

    if (tenant) {
      setIsLoading(false);
    }
  }, []);

  useOnClickOutside(ref, () => setShowSearch(false));

  const redirectToCreate = () => {
    navigate(`/${id}/create`);
  };

  const redirectToLogin = () => {
    logout();
    navigate("/login");
  };

  const redirectToProductList = () => {
    navigate(`/${id}`);
  };

  if (isLoading) return <Loader />;
  return (
    <div className="p-3 bg-general-gray text-header-text flex justify-between aling-center">
      <div className="p-10 inline-flex h-min m-2">
        {canEdit && (
          <button
            type="button"
            className="material-icons-outlined rounded-lg p-3 items-center bg-general-blue"
            onClick={redirectToLogin}
            title="Cerrar sesión"
          >
            logout
          </button>
        )}
      </div>
      <div className="items-center p-5" onClick={redirectToProductList}>
        <img
          className="content-center h-24 w-24"
          src={company?.LOGO || companies.companies[0].imageUrl}
          alt="LOGO"
        />
        <h1 className="center">
          {company?.COMPANY_NAME || companies.companies[0].name}
        </h1>
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
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            />
          )}
        </div>
        <div>
          {!showSearch && (
            <button
              className="material-icons rounded-lg p-3 text-gray-500 items-center bg-general-blue m-2"
              type="button"
              title="Buscar"
              onClick={() => {
                setShowSearch((state) => !state);
              }}
            >
              search
            </button>
          )}
        </div>

        <div>
          {!showSearch && (
            <div>
              <button
                className=" material-icons rounded-lg p-3 text-gray-500 items-center bg-general-blue m-2"
                type="button"
                title="Shop"
                onClick={showSideBar}
              >
                shopping_cart
              </button>
            </div>
          )}
        </div>
        <div className="flex fixed z-10 right-0 top-0 ">
          {sidebar ? (
            <>
              <div className="flex">
                <SideBarShop
                  className="flex justify-center"
                  active={setSidebar}
                />
              </div>
              <div className="opacity-25 w-2/3 lg:fixed inset-0 z-40 bg-black" />
            </>
          ) : null}
        </div>
        <div className="flex fixed z-10 right-0 top-0 ">
          <div className="flex" />
        </div>

        <div className="">
          {canEdit && (
            <button
              type="button"
              title="Añadir"
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
