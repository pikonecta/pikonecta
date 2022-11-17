/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { deleteProduct } from "@/utils/apiManager";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatPrice } from "@/utils/numbers";
import Modal from "../Modal";

function Product({ name, price, images, canEdit = false, idProduct, setter }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const redirectToEdit = () => {
    navigate(`/${id}/update/${idProduct}`);
  };

  const redirectToProductId = () => {
    navigate(`/${id}/product-detail/${idProduct}`);
  };

  const handleDelete = async () => {
    const res = await deleteProduct(id, idProduct);
    if (res.status === 200) {
      toast.success("Producto borrado con exito ❌");
      setter(idProduct);
    } else {
      toast.error("Ocurrió algún error 😌");
    }
  };

  useEffect(() => {
    if (isDeleting) {
      handleDelete();
    }
  }, [isDeleting]);

  return (
    <div
      className="flex flex-col place-items-center"
      // onClick={redirectToProductId}
    >
      <div className="cursor-pointer  my-2 mx-4 bg-white rounded-[18px] border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
        <div className="items-start">
          <div
            className="relative w-full select-none"
            onClick={redirectToProductId}
          >
            <img src={images[0]} alt="" className="w-72 h-60" />
          </div>
        </div>
        <div className="px-5 pb-5 py-2 bg-general-gray ">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
          jsx-a11y/no-static-element-interactions */}
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h3>
          </div>
          <div className="flex justify-between items-center ">
            <span className="text-sm text-gray-900 dark:text-white">
              {formatPrice(price)}
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
                  <div className="rounded-lg bg-gray-100 flex flex-col absolute bottom-full left-full z-10">
                    <button
                      className="bg-button-edit/60 w-full rounded-lg my-2 px-4 hover:bg-button-edit hover:shadow-sm mr-2"
                      type="button"
                      onClick={redirectToEdit}
                    >
                      Editar Producto
                    </button>
                    <Modal
                      title="Eliminar producto"
                      text={`¿Estás seguro de eliminar ${name}? (esta acción no se puede deshacer) `}
                      setter={setIsDeleting}
                    />
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
