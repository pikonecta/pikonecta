import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Products from "@/components/Product";
import Footer from "@/components/Footer/Footer";

function GeneralProduct() {
  return (
    <div className=" gap-3 gap-x-6">
      <div className=" bg-general-gray flex ">
        <div className="p-10 ">
          <FontAwesomeIcon
            type="button"
            className="fa-2x bg-general-blue px-3 py-2 rounded-md cursor-pointer"
            icon={faBars}
          />
        </div>
        <div className="items-center p-10">
          <img className="center" alt="LOGO" />
        </div>
        <div className="absolute right-0 p-6">
          <FontAwesomeIcon
            type="button"
            className="fa-2x bg-general-blue px-3 py-2 rounded-md m-4 cursor-pointer"
            icon={faMagnifyingGlass}
          />
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-4 flex-col gap-y-5 p-20 sm:grid-cols-1 ">
        <Products name="Nombre del producto" price="100.000" />
        <Products name="Nombre del producto" price="100.000" />
        <Products name="Nombre del producto" price="100.000" />
        <Products name="Nombre del producto" price="100.000" />
        <Products name="Nombre del producto" price="100.000" />
        <Products name="Nombre del producto" price="100.000" />
        <Products name="Nombre del producto" price="100.000" />
        <Products name="Nombre del producto" price="100.000" />
        <Products name="Nombre del producto" price="100.000" />
        <Products name="Nombre del producto" price="100.000" />
        <Products name="Nombre del producto" price="100.000" />
        <Products name="Nombre del producto" price="100.000" />
      </div>
      <div className="m-0 p-0">
        <Footer
          client="Cliente"
          location="Ubicación"
          address="Dirección"
          telephone="Teléfono"
        />
      </div>
    </div>
  );
}

export default GeneralProduct;
