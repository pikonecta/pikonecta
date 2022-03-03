import Products from "@/components/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMagnifyingGlass,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/Footer/Footer";

function GeneralProduct() {
  return (
    <div className=" gap-3 gap-x-6">
      <div className=" bg-slate-50 flex ">
        <div className="p-10 ">
          <FontAwesomeIcon
            type="button"
            className="fa-2x bg-sky-100 px-3 py-2 rounded-md cursor-pointer"
            icon={faBars}
          />
        </div>
        <div className="items-center p-10">
          <img className="center" alt="LOGO" />
        </div>
        <div className="absolute right-0 p-6">
          <FontAwesomeIcon
            type="button"
            className="fa-2x bg-sky-100 px-3 py-2 rounded-md m-4 cursor-pointer"
            icon={faMagnifyingGlass}
          />
          <FontAwesomeIcon
            type="button"
            className="fa-2x bg-sky-100 px-3 py-2 rounded-md m-4 cursor-pointer"
            icon={faBagShopping}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 flex-col gap-y-5  p-20">
        <Products name="Nombre del producto" price="Precio del producto" />
        <Products name="Nombre del producto" price="Precio del producto" />
        <Products name="Nombre del producto" price="Precio del producto" />
        <Products name="Nombre del producto" price="Precio del producto" />
        <Products name="Nombre del producto" price="Precio del producto" />
        <Products name="Nombre del producto" price="Precio del producto" />
        <Products name="Nombre del producto" price="Precio del producto" />
        <Products name="Nombre del producto" price="Precio del producto" />
        <Products name="Nombre del producto" price="Precio del producto" />
        <Products name="Nombre del producto" price="Precio del producto" />
        <Products name="Nombre del producto" price="Precio del producto" />
        <Products name="Nombre del producto" price="Precio del producto" />
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
