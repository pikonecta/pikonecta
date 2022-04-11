import { useState } from "react";
import Carousel from "../Carousel";

function Product({ name, price, images, canEdit }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex flex-col place-items-center ">
      <div className="cursor-pointer  my-2 mx-4 bg-white rounded-[18px] border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <Carousel images={images} />
        <div className="px-5 pb-5 py-2 bg-general-gray ">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h3>
          </div>
          <div className="flex justify-between items-center ">
            <span className="text-sm text-gray-900 dark:text-white">
              ${price}
            </span>
            {canEdit && (
              <div className="relative">
                <button
                  className="material-icons-outlined text-xl rounded-full border border-transparent h-8 w-8 flex justify-center items-center hover:bg-gray-200"
                  type="button"
                  onClick={() => setShowMenu((state) => !state)}
                >
                  more_vert
                </button>
                {showMenu && (
                  <div className="rounded-lg w-36 bg-gray-100 flex flex-col absolute bottom-full left-full">
                    <a
                      className="text-xls p-2 hover:bg-gray-200 rounded-lg"
                      href="#edit"
                    >
                      Editar producto
                    </a>
                    <a
                      className="text-xls p-2 hover:bg-gray-200 rounded-lg"
                      href="#edit"
                    >
                      Editar imagen
                    </a>
                    <a
                      className="text-xls p-2 hover:bg-gray-200 rounded-lg"
                      href="#delete"
                    >
                      Eliminar producto
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
