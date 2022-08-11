import BillingInfo from "@/components/BillingInfo";
import CartCheckout from "@/components/CartCheckout";
import OrderSummary from "@/components/OrderSummary";

function Checkout() {
  return (
    <div>
      <CartCheckout />
      <div className="flex">
        <BillingInfo />
        <OrderSummary />
      </div>
    </div>
  );
}

export default Checkout;
