import React, { useState } from "react";
import { toast } from "react-toastify";
import { useShoppingCart } from "use-shopping-cart";
import { formatPrice } from "@/utils/numbers";
// import Carousel from "../Carousel";

function ProductSide({ id, name, price, images, quantity, stock }) {
  const { incrementItem, decrementItem, removeItem } = useShoppingCart();
  const deleteProduct = () => {
    removeItem(id);
    toast.error("Producto eliminado");
  };

  const [count, setCount] = useState(quantity);
  const decrease = () => {
    setCount(count - 1);
    decrementItem(id);
  };
  const increase = () => {
    setCount(count + 1);
    incrementItem(id);
  };

  const currentStock = quantity !== undefined ? stock - quantity : stock;

  return (
    <div>
      <div className="grid grid-cols-2 mx-6 my-2 bg-sidebar-product rounded h-48">
        <div className="flex">
          <div className="grid grid-cols-2 m-4">
            <img className="w-32 h-32 rounded" src={images} alt={name} />
            <div className="grid">
              <h1 className="text-gray-800 font-bimageold mx-4">{name}</h1>
              <div className="grid grid-cols-2 ">
                <div className="grid grid-cols-3 items-center m-2 w-16 h-8 bg-sidebar-amount rounded my-16">
                  <button
                    className="mx-0"
                    type="button"
                    onClick={decrease}
                    disabled={count <= 1}
                  >
                    -
                  </button>
                  <span className="text-gray-800 font-bold mx-1">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={increase}
                    disabled={currentStock <= 0}
                  >
                    +
                  </button>
                </div>
                <h1 className="text-gray-800 font-bold mx-40 my-16 container">
                  {formatPrice(price)}
                </h1>
                {/* <Carousel images={images} /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex cursor-pointer w-6 h-6 justify-center bg-general-blue rounded mx-40 my-4">
          <button
            className="material-icons-outlined text-gray-800 font-light text-base"
            type="button"
            onClick={deleteProduct}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductSide;
