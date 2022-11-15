import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getTenant } from "@/utils/apiManager";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import shoppingImage from "@/assets/shopping.png";
import styles from "./RightPurchase.module.css";

function CheckoutSuccess() {
  const [company, setCompany] = useState();
  const { id } = useParams();

  useEffect(async () => {
    const tenant = await getTenant(id);
    setCompany(tenant.Item);
  }, []);
  return (
    <div>
      <Header />
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
            {/* <button
              className={styles.purchaseResultButton}
              onClick={handleNavigate}
            >
              Ver mis pedidos
            </button> */}
          </div>
        </div>
      </div>
      <Footer
        client={company?.COMPANY_NAME}
        location={company?.CITY}
        address={company?.ADDRESS}
        telephone={company?.COMPANY_PHONE}
      />
    </div>
  );
}

export default CheckoutSuccess;
