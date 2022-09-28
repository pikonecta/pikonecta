import axios from "axios";
import { useShoppingCart } from "use-shopping-cart";

export default function useCheckout() {
  const { redirectToCheckout, cartDetails } = useShoppingCart();

  async function handleCheckout() {
    try {
      const { data } = await axios.post(
        "https://5qryz6726k.execute-api.us-west-2.amazonaws.com/dev/checkout?tableName=Product_16ace113-bf40-4519-8aca-31e2ee8e2d4a",
        cartDetails
      );
      if (data && data?.session?.id) {
        redirectToCheckout(data.session.id);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  return {
    handleCheckout,
  };
}
