import { useState } from "react";

function Product({ name, price, images, canEdit }) {
  const imgLength = images?.length || 0;
  const [showMenu, setShowMenu] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const handleImageChange = (goBack) => {
    if (goBack) {
      if (currentImg === 0) {
        setCurrentImg(imgLength - 1);
      } else {
        setCurrentImg(currentImg - 1);
      }
    }
    if (!goBack) {
      if (currentImg === imgLength - 1) {
        setCurrentImg(0);
      } else {
        setCurrentImg(currentImg + 1);
      }
    }
  };

  return (
    <div className="flex flex-col place-items-center ">
      <div className="cursor-pointer  my-2 mx-4 bg-white rounded-[18px] border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="items-start">
          <div className="relative w-full select-none">
            <img src={images[currentImg]} alt="" />
            {imgLength > 1 && (
              <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
                <button
                  type="button"
                  className="text-7xl text-gray-300 rounded-full hover:bg-slate-100"
                  onClick={() => handleImageChange(true)}
                >
                  {"<"}
                </button>
                <button
                  type="button"
                  className="text-7xl text-gray-300 rounded-full hover:bg-slate-100"
                  onClick={() => handleImageChange(false)}
                >
                  {">"}
                </button>
              </div>
            )}
          </div>
        </div>
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
