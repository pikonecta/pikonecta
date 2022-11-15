import shoppingImage from "@/assets/shopping.png";
import styles from "./RightPurchase.module.css";

function CheckoutSuccess() {
  return (
    <div>
      <div className={styles.purchaseResult}>
        <div className={styles.purchaseResultContainer}>
          <img
            src={shoppingImage}
            alt="Mujer feliz de realizar su compra"
            className={styles.purchaseResultImg}
          />
          <div className={styles.purchaseResultDescription}>
            <h2 className={styles.purchaseResultTitle}>
              Gracias por tu compra
            </h2>
            <span className={styles.purchaseResultSpan}>
              Tu pedido va en camino!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
