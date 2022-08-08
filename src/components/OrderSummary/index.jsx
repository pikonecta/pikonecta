function OrderSummary() {
  return (
    <div className="bg-checkout-order m-20 lg:m-40 w-2/5 font-bold text-order-text">
      <h1 className="p-20 pb-10 text-2xl text-center">RESUMEN DE PEDIDO</h1>
      <div className="">
        <div className="px-5 pt-0 pb-0 text-center justify-center flex space-x-52 xl:space-x-64">
          <span>PRODUCTO</span>
          <span>VALOR</span>
        </div>
        <div className="px-5 pb-0 pt-10 text-center justify-center flex space-x-44 xl:space-x-60">
          <span>Product name</span>
          <span>100.000</span>
        </div>
        <div className="px-5 pb-0 pt-10 text-center justify-center flex space-x-44 xl:space-x-60">
          <span>Product name</span>
          <span>100.000</span>
        </div>
      </div>
      <h2 className="pt-5 text-center">INFORMACIÓN DE ENVÍO</h2>
      <div className="px-5 pb-0 pt-10 text-center justify-center flex space-x-44 xl:space-x-60">
        <span>Costo de envió</span>
        <span>10.000</span>
      </div>
      <div className="px-5 pb-0 pt-10 text-center justify-center flex space-x-44 xl:space-x-60">
        <span>SUBTOTAL</span>
        <span>210.000</span>
      </div>
    </div>
  );
}

export default OrderSummary;
