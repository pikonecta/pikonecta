import React from "react";

function Products({ name, price }) {
  return (
    <div className="flex flex-col place-items-center ">
      <div className="max-w-sm cursor-pointer bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="items-center">
          <img
            className="p-8 rounded-t-lg"
            src="https://www.w3schools.com/images/lamp.jpg"
            alt="product "
          />
        </div>
        <div className="px-5 pb-5 bg-slate-100">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h3>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
