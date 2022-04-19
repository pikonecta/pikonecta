import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTenants } from "@/utils/apiManager";
import Loader from "@/components/Loader";
import CompanyCard from "./components/CompanyCard";
import SearchBar from "./components/SearchBar";
import Pagination, {
  DEFAULT_ITEMS_PER_PAGE as ITEMS_PER_PAGE,
} from "../../components/pagination";

function AdminKonecta() {
  const [inputValue, setInputValue] = useState("");
  const [companies, setCompanies] = useState([]);
  const [companiesFiltered, setCompaniesFiltered] = useState([]);
  const [companiesPerPage, setCompaniesPerPage] = useState([]);
  const [page, setPage] = useState(1);
  const [deletedItem, setDeletedItem] = useState(null);
  const companiesSize = companiesFiltered.length;

  const navigate = useNavigate();

  useEffect(async () => {
    const res = await getTenants();
    const tenants = JSON.parse(res.body).Items;
    setCompanies(tenants);
  }, []);

  useEffect(() => {
    if (deletedItem) {
      setDeletedItem(null);
      const filtered = companies.filter(
        (company) => company.id !== deletedItem
      );
      setCompanies([...filtered]);
    }
  }, [deletedItem]);

  useEffect(() => {
    const filter = companies.filter((company) => {
      return company.COMPANY_NAME.toLowerCase().includes(
        inputValue.toLowerCase()
      );
    });
    setCompaniesFiltered(filter);
  }, [inputValue, companies]);

  useEffect(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = (page - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE;
    setCompaniesPerPage(companiesFiltered.slice(start, end));
  }, [page, companiesFiltered]);

  const redirectToCreate = () => {
    navigate(`/admin/create`);
  };

  return (
    <div className="flex flex-row w-full">
      <div className="basis-1/4 max-w-sm">
        <Sidebar />
      </div>
      <div className="w-full">
        <div className="flex flex-row justify-between py-10 px-5">
          <SearchBar
            className="mr-5 w-full"
            onChange={(search) => {
              setInputValue(search);
            }}
          />
          <button
            className="bg-sidebar-color px-8 text-gray-500 hover:shadow-sm hover:bg-sidebar-color-dark hover:text-white rounded-lg mr-2 py-2"
            type="button"
            onClick={redirectToCreate}
          >
            Añadir
          </button>
        </div>
        <div className="grid grid-cols-1 gap-16 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {companiesPerPage.length === 0 && <Loader />}
          {companiesPerPage.map((company, index) => {
            return (
              <CompanyCard
                name={company.COMPANY_NAME}
                city={company.CITY}
                address={company.ADDRESS}
                phone={company.REPRESENTATIVE_PHONE}
                imageUrl={company.LOGO}
                id={company.id}
                key={company.id}
                isAlt={!(index % 2)}
                setter={setDeletedItem}
              />
            );
          })}
        </div>
        <div>
          <Pagination
            size={companiesSize}
            onPageChanged={(currentPage) => setPage(currentPage)}
          />
        </div>
      </div>
    </div>
  );
}
export default AdminKonecta;
