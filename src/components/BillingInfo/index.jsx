import FormElement from "../FormElement";

function BillingInfo() {
  return (
    <div className="cursor-default bg-checkout-order mr-5 ml-10 my-20 w-3/5">
      <h1 className="p-20 pb-10 text-2xl text-center font-bold text-order-text">
        DATOS DE FACTURACIÓN
      </h1>
      <form action="#" method="POST">
        <div className=" bg-white space-y-3 p-4 pr-10">
          <div className="grid grid-flow-row-dense grid-cols-3 gap-3">
            <div className="row-start-2 col-span-2">
              <FormElement content="NOMBRE: *">
                <input
                  className=" flex-1 block w-full  border-b border-sky-700"
                  placeholder="Escriba su nombre."
                />
              </FormElement>
            </div>
          </div>
          <FormElement content="APELLIDO: *">
            <input
              className=" flex-1 block w-full  border-b border-sky-700"
              placeholder="Escriba su apellido."
            />
          </FormElement>

          <FormElement content="CÉDULA: *">
            <input
              className=" flex-1 block w-full  border-b border-sky-700"
              placeholder="Escriba su cédula."
            />
          </FormElement>
          <FormElement content="DIRECCIÓN: *">
            <input
              className=" flex-1 block w-full  border-b border-sky-700"
              placeholder="Escriba su dirección."
            />
          </FormElement>

          <FormElement content="APARTAMENTO, LOCAL, ETC:">
            <input
              className=" flex-1 block w-full  border-b border-sky-700"
              placeholder="Escriba su apartamento, local, etc-."
            />
          </FormElement>

          <FormElement content="TELÉFONO: ">
            <input
              className=" flex-1 block w-full  border-b border-sky-700"
              placeholder="Escriba su teléfono de contacto.."
            />
          </FormElement>

          <FormElement content="CORREO ELECTRÓNICO: *">
            <input
              className=" flex-1 block w-full  border-b border-sky-700"
              placeholder="Escriba su correo de contacto.."
            />
          </FormElement>
        </div>
      </form>
    </div>
  );
}

export default BillingInfo;
