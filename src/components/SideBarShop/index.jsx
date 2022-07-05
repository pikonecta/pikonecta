import React from "react";
import ProductSide from "../ProductSide";
// import {useState} from "react";

function SideBarShop({ active }) {
  const closeSidebar = () => {
    active(false);
  };
  // const [productsSideBar, setProductsSideBar] = useState([]);
  return (
    <div className="fixed bg-sidebar-bg w-1/3 h-screen right-0 top-0">
      <div className="flex">
        <div className="flex flex-col m-8">
          <p className="text-sidebar-title justify-center font-bold text-2xl tracking-widest">
            Carrito de compras
          </p>
        </div>
        <div className="flex cursor-pointer w-6 h-6 m-8 mx-12 justify-center bg-general-blue rounded pt-0">
          <button
            className="text-gray-800 font-bold"
            type="button"
            onClick={closeSidebar}
          >
            X
          </button>
        </div>
      </div>

      <div>
        {/* {productsSideBar.map((currentProduct) => {
          return (
            <ProductSide
              name={currentProduct.name}
              price={currentProduct.price}
              images={currentProduct.images}
              close={false}
            />
          );
        })} */}
        <ProductSide name="Camisa" price="50.000" close={false} />
      </div>
    </div>
  );
}

export default SideBarShop;
