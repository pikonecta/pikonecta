import Footer from "@/components/Footer";

function ProductDetail() {
  // TODO use SidBarShop
  return (
    <>
      <div className=" bg-general-gray flex justify-between">
        {/* Este espacio de debe modificar por el componente Header */}
        <div className="p-10 inline-flex h-min">HEADER</div>
      </div>
      <div className="lg:grid lg:grid-cols-3 flex-col  p-5 px-10 sm:grid-cols-1 min-h-[73vh]">
        <div className="min-h-full col-span-2">
          <div className="flex flex-row min-h-full">
            <div className="flex flex-col col-span-2 justify-between mr-2 w-1/5">
              <div className="bg-general-blue mb-1 h-full">Imagen Pequeña</div>
              <div className="bg-general-blue mb-1 h-full">Imagen Pequeña</div>
              <div className="bg-general-blue mb-1 h-full">Imagen Pequeña</div>
              <div className="bg-general-blue h-full">Imagen Pequeña</div>
            </div>
            <div className="w-full bg-general-blue">Imagen Grande</div>
          </div>
        </div>

        <div className="flex flex-col justify-between h-full mx-3">
          <span className="text-green-500 text-xs mb-10">Disponible</span>
          <div className="basis-1/4">
            <h1 className="text-2xl font-bold text-center text-general-gray-darker">
              NOMBRE DEL PRODUCTO
            </h1>
            <p className="text-center">$ 150.000</p>
          </div>
          <p className="mx-24 text-xs text-justify basis-1/2 text-general-gray-dark">
            Descripcion del producto, en este espacio se mostrará información de
            utilidad que sirva a los clientes sobre lo que van a obtener de este
            producto, información adicional que no se ve en las imagenes también
            puede ir aqui.
          </p>
          <div className="text-center">
            <p className="font-bold">CANTIDAD</p>
            <input
              type="number"
              className="w-1/3 h-8 appearance-none"
              placeholder="0"
              min={0}
            />
            <button
              type="button"
              className="w-full bg-general-blue py-6 rounded mt-3 font-bold"
            >
              AGREGAR AL CARRITO
            </button>
          </div>
        </div>
      </div>
      <div className="m-0 p-0">
        <Footer
          client="Prueba"
          location="Prueba"
          address="Prueba"
          telephone="Prueba"
        />
      </div>
    </>
  );
}

export default ProductDetail;
