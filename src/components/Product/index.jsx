import React from "react";

function Products({ name, price }) {
  return (
    <div className="flex flex-col place-items-center  ">
      <div className="cursor-pointer  my-2 mx-4 bg-white rounded-[18px] border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="items-start">
          <img
            className="p-8 rounded-t-lg"
            src="https://picsum.photos/200"
            alt="product "
          />
        </div>
        <div className="px-5 pb-5 py-2 bg-general-gray ">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h3>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-900 dark:text-white">
              ${price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
