import UploadImgToForm from "@/components/ImageUpload";
import FormElement from "@/components/FormElement";
import Sidebar from "@/components/Sidebar";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "@/components/ErrorMessage";
import Carousel from "@/components/Carousel";
import { createProduct } from "@/utils/apiManager";

function ProductForm() {
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm();

  const [images, setImages] = useState(undefined);
  const [imagesSrc, setImagesSrc] = useState(undefined);
  const [isCorrectLogoType, setIsCorrectLogoType] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const redirectToBack = () => {
    navigate(`/${id}`);
  };

  const onSubmit = async (data) => {
    const currentImages = [...images];
    const res = await createProduct(data, id, currentImages);
    console.log(res);
    // if (res.statusCode === 200) {
    //   redirectToBack();
    // } else {
    //   console.log("error al crear cliente");
    // }
  };

  useEffect(() => {
    if (images && images[0]) {
      const { type } = images[0];
      setIsCorrectLogoType(["image/jpeg", "image/png"].includes(type));
    }
  }, [images]);

  return (
    <div className="grid grid-cols-3 gap-3 gap-x-6 min-h-fit h-screen">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-2 cursor-default">
        <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
          <div className=" bg-white space-y-6 p-4 pr-10 ">
            <h1 className="text-6xl font-bold leading-6 text-sky-700 py-10">
              Añadir producto
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
                {images ? (
                  <div className="h-full flex flex-col justify-center">
                    <Carousel images={imagesSrc} />
                    {!isCorrectLogoType && (
                      <ErrorMessage message="El formato del archivo es incorrecto" />
                    )}
                    <button
                      type="button"
                      className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      onClick={() => {
                        setImages(undefined);
                        setImagesSrc(undefined);
                        unregister("product-img");
                      }}
                    >
                      cambiar imagenes
                    </button>
                  </div>
                ) : (
                  <UploadImgToForm
                    content="Sube las imagenes del producto"
                    name="product-img"
                    message="imagen del producto"
                    setters={[
                      { name: "setImages", func: setImages },
                      { name: "setImagesSrc", func: setImagesSrc },
                    ]}
                    register={register}
                    errors={errors}
                    moreThanOne
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
              <div className="flex flex-col">
                ¿desea añadir otro tipo de producto?
                <button type="button">añadir</button>
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
                onClick={redirectToBack}
              >
                ATRAS
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
