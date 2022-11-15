import errorImage from "@/assets/wrongResult.png";
import styles from "./PurchaseError.module.css";

function CheckoutError() {
  return (
    <div>
      <div className={styles.error}>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>
            Oh no! algo ha salido mal con tu compra
          </h2>
          <div className={styles.errorImgContainer}>
            <img
              src={errorImage}
              alt="Hombre tropezando con una escoba"
              className={styles.errorImg}
            />
          </div>
          <div className={styles.errorDescription}>
            <span className={styles.errorSpan}>
              Ya tu error fue notificado a nuestro equipo de trabajo.
            </span>
            <span className={styles.errorSpan}>
              Puedes volver a intentarlo, no te desanimes!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutError;
