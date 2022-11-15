import { useEffect, useState } from "react";
import { getProducts, getTenant } from "@/utils/apiManager";
import Footer from "@/components/Footer";
import Product from "@/components/Product";
import { useParams } from "react-router-dom";
import useAccount from "@/hooks/useAccount";
import Loader from "@/components/Loader";
// import SideBarShop from "@/components/SideBarShop";
import Header from "@/components/Header";
import Pagination, {
  DEFAULT_ITEMS_PER_PAGE as ITEMS_PER_PAGE,
} from "../../components/Pagination";

function ProductList() {
  const [company, setCompany] = useState();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  // const [showSearch, setShowSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState([]);
  // const [productsSideBar, setProductsSideBar] = useState([]);
  const [deletedItem, setDeletedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const productsSize = productsFiltered.length;
  const { id } = useParams();
  // const navigate = useNavigate();
  const { hasTenant } = useAccount();
  const canEdit = hasTenant(id);
  // const [sidebar, setSidebar] = useState(false);
  //  const showSideBar = () => setSidebar(!sidebar);

  // useOnClickOutside(ref, () => setShowSearch(false));
  // useOnClickOutside(ref, () => showSideBar(!sidebar));

  /* const redirectToLogin = () => {
    logout();
    navigate("/login");
  }; */

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
      <Header onInputValue={(input) => setInputValue(input)} />

      <div className="grid flex-col min-h-screen p-20 lg:grid-cols-4 gap-y-5 sm:grid-cols-1 md:grid-cols-2">
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
