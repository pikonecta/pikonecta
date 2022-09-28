import BillingInfo from "@/components/BillingInfo";
import Header from "@/components/Header";
import OrderSummary from "@/components/OrderSummary";

function Checkout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <BillingInfo />
        <OrderSummary />
      </div>
    </div>
  );
}

export default Checkout;
