import FormElement from "components/FormElement";
import SideBar from "components/Sidebar";
import Ubication from "components/Location";
import UploadImgToForm from "components/ImageUpload";

function ClientForm() {
  return (
    <div className="grid grid-cols-3 gap-3 gap-x-6">
      <div className="col-span-1">
        <SideBar />
      </div>
      <div className="col-span-2 h-screen">
        <form action="#" method="POST">
          <div className=" bg-white space-y-3 p-4 pr-10">
            <h1 className="text-6xl font-bold leading-6 text-sky-700 py-10">
              Añadir usuario
            </h1>
            <div className="grid grid-flow-row-dense grid-cols-3 gap-3">
              <div className="row-start-2 col-span-2">
                <FormElement content="Nombre de la empresa: *">
                  <input
                    type="text"
                    name="product-name"
                    id="product-name"
                    className=" flex-1 block w-full  border-b border-sky-700"
                    placeholder="Escriba el nombre de la empresa de su cliente"
                  />
                </FormElement>
              </div>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-sky-100 row-start-1 row-end-3">
                <UploadImgToForm content="Sube tu logo" />
              </div>
            </div>

            <FormElement content="Ubicación: *">
              <Ubication />
            </FormElement>

            <FormElement content="Dirección: *">
              <input
                type="text"
                name="product-name"
                id="product-name"
                className=" flex-1 block w-full  border-b border-sky-700"
                placeholder="Escriba la dirección de la empresa del cliente"
              />
            </FormElement>

            <FormElement content="Nombre del cliente: *">
              <input
                type="text"
                name="product-name"
                id="product-name"
                className=" flex-1 block w-full  border-b border-sky-700"
                placeholder="Escriba el nombre del cliente"
              />
            </FormElement>

            <FormElement content="Número de teléfono: *">
              <input
                type="text"
                name="product-name"
                id="product-name"
                className=" flex-1 block w-full  border-b border-sky-700"
                placeholder="Escriba el número de teléfono del cliente"
              />
            </FormElement>

            <div className="flex justify-around">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-l font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none "
              >
                ENVIAR
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

export default ClientForm;
