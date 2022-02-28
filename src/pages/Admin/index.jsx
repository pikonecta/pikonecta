import Sidebar from "@/components/Sidebar";
import CompaniesMock from "@/assets/companies.json";
import { useEffect, useState } from "react";
import CompanyCard from "./components/CompanyCard";
import SearchBar from "./components/SearchBar";

function AdminKonecta() {
  const [inputValue, setInputValue] = useState("");
  const [filterResult, setFilterResult] = useState([]);

  useEffect(() => {
    console.log(inputValue);
    const filter = CompaniesMock.companies.filter((company) => {
      return company.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    setFilterResult(filter);
    console.log(filter);
  }, [inputValue]);

  return (
    <div className="flex flex-row w-full">
      <div className="basis-1/4 max-w-sm">
        <Sidebar className="sticky top-0" />
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
          >
            Añadir
          </button>
        </div>
        <div className="grid grid-cols-4 gap-16 p-5">
          {filterResult.map((company, index) => {
            return (
              <CompanyCard
                name={company.name}
                city={company.city}
                address={company.address}
                phone={company.phone}
                imageUrl={company.imageUrl}
                id={company.id}
                key={company.id}
                isAlt={!(index % 2)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default AdminKonecta;
