import Sidebar from "@/components/Sidebar";
import CompanyCard from "./components/CompanyCard";
import SearchBar from "./components/SearchBar";

function AdminKonecta() {
  return (
    <div className="flex flex-row w-full">
      <div className="basis-1/4 max-w-sm">
        <Sidebar className="sticky top-0" />
      </div>
      <div className="w-full">
        <div className="flex flex-row justify-between py-10 px-5">
          <SearchBar className="mr-5 w-full" />
          <button
            className="bg-sidebar-color px-8 text-gray-500 hover:shadow-sm hover:bg-sidebar-color-dark hover:text-white rounded-lg mr-2 py-2"
            type="button"
          >
            Añadir
          </button>
        </div>
        <div className="grid grid-cols-4 gap-16 p-5">
          <CompanyCard
            name="E1"
            city="Medellín"
            address="Calle 9B #12"
            phone="+57 312 280 XX XX"
            imageUrl="https://via.placeholder.com/150"
            id="1"
            isAlt
          />
          <CompanyCard
            name="E1"
            city="Medellín"
            address="Calle 9B #12"
            phone="+57 312 280 XX XX"
            imageUrl="https://via.placeholder.com/150"
            id="1"
          />

          <CompanyCard
            name="E1"
            city="Medellín"
            address="Calle 9B #12"
            phone="+57 312 280 XX XX"
            imageUrl="https://via.placeholder.com/150"
            id="1"
            isAlt
          />

          <CompanyCard
            name="E1"
            city="Medellín"
            address="Calle 9B #12"
            phone="+57 312 280 XX XX"
            imageUrl="https://via.placeholder.com/150"
            id="1"
          />

          <CompanyCard
            name="E1"
            city="Medellín"
            address="Calle 9B #12"
            phone="+57 312 280 XX XX"
            imageUrl="https://via.placeholder.com/150"
            id="1"
            isAlt
          />

          <CompanyCard
            name="E1"
            city="Medellín"
            address="Calle 9B #12"
            phone="+57 312 280 XX XX"
            imageUrl="https://via.placeholder.com/150"
            id="1"
          />
        </div>
      </div>
    </div>
  );
}
export default AdminKonecta;
