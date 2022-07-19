import React, { useState } from "react";
// import Carousel from "../Carousel";

function ProductSide({ name, price, close }) {
  //   const handleDelete = async () => {
  //     const res = await deleteProductSide(id, idProduct);
  //     console.log(res);
  //     if (res.status === 200) {
  //       setter(idProduct);
  //     } else {
  //       console.log("error al eliminar producto");
  //       console.log(res);
  //     }
  //   };

  const deleteProduct = () => {
    close(false);
  };

  const [count, setCount] = useState(1);
  const decrease = () => {
    setCount(count - 1);
  };
  const increase = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <div className="grid grid-cols-2 mx-6 my-2 bg-sidebar-product rounded h-48">
        <div className="flex">
          <div className="grid grid-cols-2 m-4">
            <img
              className="w-32 h-32 rounded"
              src="https://www.w3schools.com/images/w3schools_green.jpg"
              alt="W3Schools.com"
            />
            <div className="grid">
              <h1 className="text-gray-800 font-bold mx-4">{name}</h1>
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
                  <span className="text-gray-800 font-bold mx-1">{count}</span>
                  <button type="button" onClick={increase}>
                    +
                  </button>
                </div>
                <h1 className="text-gray-800 font-bold mx-40 my-16 container">
                  ${price}
                </h1>
                {/* <Carousel images={images} /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex cursor-pointer w-6 h-6 justify-center bg-general-blue rounded mx-40 my-4">
          <button
            className="text-gray-800 font-bold "
            type="button"
            onClick={deleteProduct}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductSide;
