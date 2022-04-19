import UploadImgToForm from "@/components/ImageUpload";
import FormElement from "@/components/FormElement";
import Sidebar from "@/components/Sidebar";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import Carousel from "@/components/Carousel";
import { createProduct, getProduct, updateProduct } from "@/utils/apiManager";
import { useNavigate, useParams } from "react-router-dom";
import useAccount from "@/hooks/useAccount";
import Loader from "@/components/Loader";

function ProductForm({ canEdit = false }) {
  const {
    register,
    handleSubmit,
    unregister,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { id, idProduct } = useParams();
  const { hasTenant } = useAccount();
  const isCurrentTenant = hasTenant(id);

  const [images, setImages] = useState([]);
  const [imagesSrc, setImagesSrc] = useState([]);
  const [isCorrectImagesType, setIsCorrectImagesType] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const redirectToProducts = () => {
    navigate(`/${id}`);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (!canEdit) {
      const res = await createProduct(data, id, images);
      if (res.statusCode === 200) {
        reset();
        setImages([]);
        setImagesSrc([]);
        isCorrectImagesType(false);
        setIsLoading(false);
      } else {
        console.log("error creando el producto", res);
        setIsLoading(false);
      }
    } else {
      const res = await updateProduct(
        { ...data, idProduct, imgs: imagesSrc },
        id,
        images[0] instanceof File,
        images
      );
      if (res.statusCode === 200) {
        setIsLoading(false);
        navigate(`/${id}`);
      } else {
        setIsLoading(false);
        console.log("error actualizando el producto", res);
      }
    }
  };

  useEffect(() => {
    if (!isCurrentTenant) navigate("/"); // redirect to default redirection page
  }, []);

  useEffect(() => {
    const currentImgsCorrectTypes = [];
    if (images.length > 0) {
      images.forEach((image) => {
        const { type } = image;
        currentImgsCorrectTypes.push(
          ["image/jpeg", "image/png"].includes(type)
        );
      });
      setIsCorrectImagesType(!currentImgsCorrectTypes.includes(false));
    }
  }, [images]);

  useEffect(async () => {
    if (canEdit) {
      setIsLoading(true);
      const res = await getProduct(id, idProduct);
      const { Item: currentProduct } = res;

      setValue("name", currentProduct.name);
      setValue("description", currentProduct.description);
      setValue("price", currentProduct.price);
      setValue("type", currentProduct.type);
      setImagesSrc(currentProduct.imgs);
      const currentImgs = currentProduct.imgs.map((img) => {
        return {
          src: img,
          type: "image/png",
        };
      });
      setImages(currentImgs);
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3 gap-x-6 min-h-fit h-screen">
      <div className="col-span-1">
        <Sidebar />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="col-span-2 cursor-default">
          <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className=" bg-white space-y-6 p-4 pr-10 ">
              <h1 className="text-6xl font-bold leading-6 text-sky-700 py-10">
                {canEdit ? "Editar" : "Añadir"} producto
              </h1>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 grid gap-6">
                  <FormElement content="Nombre: *">
                    <input
                      type="text"
                      name="product-name"
                      id="product-name"
                      className=" flex-1 block w-full  border-b border-sky-700"
                      placeholder="Escriba el nombre de su producto"
                      {...register("name", { required: true })}
                    />
                    {errors.name?.type === "required" && (
                      <ErrorMessage message="Debe escribir el nombre del producto" />
                    )}
                  </FormElement>

                  <FormElement content="Precio: *">
                    <input
                      type="text"
                      name="product-price"
                      id="product-price"
                      className=" flex-1 block w-full  border-b border-sky-700"
                      placeholder="Escriba el precio de su producto"
                      {...register("price", { required: true })}
                    />
                    {errors.price?.type === "required" && (
                      <ErrorMessage message="Debe escribir el precio del producto" />
                    )}
                  </FormElement>
                </div>

                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 h-56 border-gray-300 border-dashed rounded-md bg-sky-100">
                  {images.length > 0 ? (
                    <div className="h-full flex flex-col justify-center">
                      <Carousel images={imagesSrc} />
                      {!isCorrectImagesType && (
                        <ErrorMessage message="El formato de algún archivo es incorrecto" />
                      )}
                      <button
                        type="button"
                        className="text-xs text-center text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={() => {
                          setImages([]);
                          setImagesSrc([]);
                          unregister("product-img");
                        }}
                      >
                        cambiar imagen
                      </button>
                    </div>
                  ) : (
                    <UploadImgToForm
                      content="Sube la imagen del producto"
                      name="product-img"
                      message="imagen del producto"
                      setters={[
                        { name: "setImages", func: setImages },
                        { name: "setImagesSrc", func: setImagesSrc },
                      ]}
                      moreThanOne
                      register={register}
                      errors={errors}
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <FormElement content="tipo: ">
                    <input
                      type="text"
                      name="product-type"
                      id="product-type"
                      className=" flex-1 block w-full  border-b border-sky-700"
                      placeholder="Elija el tipo de producto"
                      {...register("type")}
                    />
                  </FormElement>
                </div>
              </div>

              <FormElement content="Descripción: *">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full  border border-gray-300 rounded-md h-48 resize-none"
                  placeholder="Escriba una breve descripción del producto"
                  defaultValue=""
                  {...register("description", { required: true })}
                />
                {errors.description?.type === "required" && (
                  <ErrorMessage message="Debe escribir la descripción del producto" />
                )}
              </FormElement>

              <div className="flex justify-around">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-l font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none "
                >
                  ACEPTAR
                </button>

                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-black shadow-sm text-l font-medium rounded-md text-black bg-white hover:bg-gray-100 focus:outline-none focus:pointer-events-auto"
                  onClick={redirectToProducts}
                >
                  ATRAS
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProductForm;
