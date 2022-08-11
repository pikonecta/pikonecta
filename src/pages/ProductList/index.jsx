import { useEffect, useState, useRef } from "react";
import { getProducts, getTenant } from "@/utils/apiManager";
import Footer from "@/components/Footer";
import Product from "@/components/Product";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useNavigate, useParams } from "react-router-dom";
import useAccount from "@/hooks/useAccount";
import Loader from "@/components/Loader";
import SideBarShop from "@/components/SideBarShop";
import Pagination, {
  DEFAULT_ITEMS_PER_PAGE as ITEMS_PER_PAGE,
} from "../../components/pagination";

function ProductList() {
  const [company, setCompany] = useState();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState([]);
  // const [productsSideBar, setProductsSideBar] = useState([]);
  const [deletedItem, setDeletedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const productsSize = productsFiltered.length;
  const ref = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasTenant, logout } = useAccount();
  const canEdit = hasTenant(id);
  const [sidebar, setSidebar] = useState(false);
  const showSideBar = () => setSidebar(!sidebar);

  useOnClickOutside(ref, () => setShowSearch(false));
  // useOnClickOutside(ref, () => showSideBar(!sidebar));

  const redirectToCreate = () => {
    navigate(`/${id}/create`);
  };

  const redirectToLogin = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (deletedItem) {
      setDeletedItem(null);
      const filtered = products.filter((product) => product.id !== deletedItem);
      setProducts([...filtered]);
    }
  }, [deletedItem]);

  useEffect(async () => {
    const tenant = await getTenant(id);
    setCompany(tenant.Item);

    const product = await getProducts(id);
    setProducts(product.Items);

    if (tenant && product) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const filter = products.filter((product) => {
      return product.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    setProductsFiltered(filter);
  }, [inputValue, products]);

  useEffect(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = (page - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE;
    setProductsPerPage(productsFiltered.slice(start, end));
  }, [page, productsFiltered]);

  if (isLoading) return <Loader />;
  return (
    <>
      <div className=" flex bg-general-gray justify-between">
        <div className="p-10 inline-flex h-min">
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
          <img className="center h-24 w-24" src={company?.LOGO} alt="LOGO" />
          <span className="center">{company?.COMPANY_NAME}</span>
        </div>
        <div className="p-10 inline-flex h-min">
          <div>
            {showSearch && (
              <input
                className="radius-lg rounded-lg border-b p-3  text-gray-500"
                placeholder="Busqueda"
                ref={ref}
                onChange={(search) => {
                  setInputValue(search.target.value);
                }}
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
            {!showSearch && (
              <div>
                <button
                  className=" material-icons rounded-lg p-3 text-gray-500 items-center bg-general-blue m-2"
                  type="button"
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

          <div className="my-2">
            {canEdit && (
              <button
                type="button"
                className="rounded-lg p-3 text-gray-500 items-center bg-general-blue top-0 ml-2"
                onClick={redirectToCreate}
              >
                AÑADIR
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-4 flex-col gap-y-5 p-20 sm:grid-cols-1 min-h-screen">
        {productsPerPage.map((currentProduct) => {
          return (
            <Product
              key={currentProduct.id}
              name={currentProduct.name}
              price={currentProduct.price}
              images={currentProduct.imgs}
              canEdit={canEdit}
              idProduct={currentProduct.id}
              setter={setDeletedItem}
            />
          );
        })}
      </div>
      <div>
        <Pagination
          size={productsSize}
          onPageChanged={(currentPage) => setPage(currentPage)}
        />
      </div>
      <div className="m-0 p-0">
        <Footer
          client={company?.COMPANY_NAME}
          location={company?.CITY}
          address={company?.ADDRESS}
          telephone={company?.COMPANY_PHONE}
        />
      </div>
    </>
  );
}

export default ProductList;
