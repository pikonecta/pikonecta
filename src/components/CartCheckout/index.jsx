function CartCheckout() {
  return (
    <div className="w-90% bg-cart-checkout font-bold text-order-text m-20 p-2">
      <h1 className="text-2xl p-10 pb-5">TU PEDIDO</h1>
      <div className="text-center justify-between mg:mr-0 sm:mr-0 lg:mr-28 xl:mr-24 2xl:mr-40">
        <span className="2xl:px-28 xl:px-15 lg:px-10 md:px-5">PRODUCTO</span>
        <span className="2xl:px-28 xl:px-15 lg:px-10 md:px-5">CANTIDAD</span>
        <span className="2xl:px-28 xl:px-15 lg:px-10 md:px-5">VALOR</span>
      </div>
      <div className="flex flex-wrap bg-white m-10 justify-between px-10 py-5 items-center">
        <img
          className="w-24 h-24 border border-text-order rounded-2xl mr-0"
          alt="Imagen del producto"
          src="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"
        />
        <span>Product name</span>
        <span>1</span>
        <span>$100.000</span>
        <button
          className="bg-button-add-checkout p-5 font-bold h-12 flex items-center"
          type="button"
        >
          +
        </button>
        <button
          className="bg-button-remove-checkout p-5 font-bold h-12 flex items-center"
          type="button"
        >
          -
        </button>
      </div>
      <div className="flex bg-white m-10 justify-between px-10 py-5 items-center">
        <img
          className="w-24 h-24 border border-text-order rounded-2xl mr-0"
          alt="Imagen del producto"
          src="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"
        />
        <span>Product name</span>
        <span>1</span>
        <span>$100.000</span>
        <button
          className="bg-button-add-checkout p-5 font-bold h-12 flex items-center"
          type="button"
        >
          +
        </button>
        <button
          className="bg-button-remove-checkout p-5 font-bold h-12 flex items-center"
          type="button"
        >
          -
        </button>
      </div>
      <div className="flex bg-white m-10 justify-between px-10 py-5">
        <span>SUBTOTAL</span>
        <span>$200.000</span>
      </div>
    </div>
  );
}

export default CartCheckout;
