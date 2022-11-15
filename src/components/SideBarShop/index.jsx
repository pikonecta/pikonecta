import { useShoppingCart } from "use-shopping-cart";

import useCheckout from "@/hooks/useCheckout";
import ProductSide from "../ProductSide";

function SideBarShop({ active }) {
  // TODO show products using context
  const { handleCheckout } = useCheckout();
  const { totalPrice, cartCount, cartDetails } = useShoppingCart();

  const closeSidebar = () => {
    active(false);
  };

  const cartItems = Object.keys(cartDetails).map((key) => cartDetails[key]);

  // const [productsSideBar, setProductsSideBar] = useState([]);
  return (
    <div className="flex-col fixed bg-sidebar-bg  lg:w-1/3  h-screen right-0 top-0 overflow-auto focus:overflow-y-scroll overflow-x-hidden ">
      <div className="flex ">
        <div className="m-8">
          <p className="whitespace-nowrap text-sidebar-title justify-center font-bold text-2xl tracking-widest">
            Carrito de compras
          </p>
        </div>
        <div className="flex cursor-pointer w-6 h-6 m-8 mx-12 justify-center bg-general-blue rounded pt-0">
          <button
            className="selection:text-gray-800 font-bold"
            type="button"
            onClick={closeSidebar}
          >
            x
          </button>
        </div>
      </div>

      <div className="my-2">
        {cartItems.map((currentProduct) => {
          return (
            <ProductSide
              key={currentProduct.id}
              id={currentProduct.id}
              name={currentProduct.name}
              price={currentProduct.price}
              images={currentProduct.imgs}
              quantity={currentProduct.quantity}
              stock={currentProduct.stock}
            />
          );
        })}
        {/* <ProductSide name="Camisa" price="50.000" close={closeProduct} /> */}
      </div>
      <div className="">
        <div className="p-4 mx-6 my-10 m-4 bg-sidebar-product rounded ">
          <span className="text-gray-800 font-bold">SUBTOTAL</span>
          <span className=" text-gray-800 font-bold mx-48 container">
            {totalPrice} ({cartCount})
          </span>
        </div>
        <div className="mx-60">
          <button
            className="w-48 h-8 items-center bg-sidebar-title text-slate-50 font-bold rounded-md"
            type="button"
            onClick={handleCheckout}
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBarShop;
