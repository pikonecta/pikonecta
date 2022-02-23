import UploadImgToForm from "@/components/ImageUpload";
import FormElement from "@/components/FormElement";
import Sidebar from "@/components/Sidebar";

function ProductForm() {
  return (
    <div className="grid grid-cols-3 gap-3 gap-x-6">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-2 h-screen">
        <form action="#" method="POST">
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
                  />
                </FormElement>

                <FormElement content="Precio: *">
                  <input
                    type="text"
                    name="product-name"
                    id="product-name"
                    className=" flex-1 block w-full  border-b border-sky-700"
                    placeholder="Escriba el precio de su producto"
                  />
                </FormElement>
              </div>

              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-sky-100">
                <UploadImgToForm content="Sube tus imagenes" />
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
              />
            </FormElement>

            <div className="flex justify-around">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-l font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none "
              >
                ACEPTAR
              </button>

              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-black shadow-sm text-l font-medium rounded-md text-black bg-white hover:bg-gray-100 focus:outline-none focus:pointer-events-auto"
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
