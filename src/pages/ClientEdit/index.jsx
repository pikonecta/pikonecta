import { useEffect, useState, useRef } from "react";
import CompaniesMock from "@/assets/companies.json";
import Footer from "@/components/Footer/Footer";
import ProductsList from "@/assets/products.json";
import Product from "@/components/Product";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Pagination, {
  DEFAULT_ITEMS_PER_PAGE as ITEMS_PER_PAGE,
} from "../../components/pagination";

function ClientEdit({ id = "5F", canEdit = false }) {
  const [company, setCompany] = useState();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState([]);
  const productsSize = productsFiltered.length;
  const ref = useRef();

  const getCompanyInfo = (companyId) =>
    CompaniesMock.companies.find((companyInfo) => {
      return companyInfo.id === companyId;
    });

  useOnClickOutside(ref, () => setShowSearch(false));

  useEffect(() => {
    setCompany(getCompanyInfo(id));
  }, []);

  useEffect(() => {
    setProducts(ProductsList.products);
  }, []);

  useEffect(() => {
    const filter = products.filter((product) => {
      return product.name.toLowerCase().includes(inputValue);
    });
    setProductsFiltered(filter);
  }, [inputValue, products]);

  useEffect(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = (page - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE;
    setProductsPerPage(productsFiltered.slice(start, end));
  }, [page, productsFiltered]);

  return (
    <div className="">
      <div className=" bg-general-gray flex justify-between">
        <div className="p-10 ">
          <span className="material-icons-outlined rounded-lg p-3 text-gray-500 items-center bg-general-blue">
            menu
          </span>
        </div>
        <div className="items-center p-5">
          <img
            className="center h-24 w-24"
            src={company?.imageUrl}
            alt="LOGO"
          />
          {/* <span className="center">{company?.name}</span> */}
        </div>
        <div className="p-10">
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
          {showSearch === false && (
            <button
              className="material-icons-outlined rounded-lg p-3 text-gray-500 items-center bg-general-blue "
              type="button"
              onClick={() => setShowSearch((state) => !state)}
            >
              search
            </button>
          )}
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-4 flex-col gap-y-5 p-20 sm:grid-cols-1 min-h-screen">
        {productsPerPage.map((currentProduct) => {
          return (
            <Product
              key={currentProduct.id}
              name={currentProduct.name}
              price={currentProduct.price}
              imageUrl={currentProduct.imageUrl}
              canEdit={canEdit}
              id={currentProduct.id}
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
          client={company?.name}
          location={company?.city}
          address={company?.address}
          telephone={company?.phone}
        />
      </div>
    </div>
  );
}

export default ClientEdit;
