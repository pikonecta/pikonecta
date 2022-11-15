import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getTenant } from "@/utils/apiManager";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import errorImage from "@/assets/wrongResult.png";
import styles from "./PurchaseError.module.css";

function CheckoutError() {
  const [company, setCompany] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${id}`);
  };

  useEffect(async () => {
    const tenant = await getTenant(id);
    setCompany(tenant.Item);
  }, []);

  return (
    <div>
      <Header />
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
            <button
              type="button"
              className={styles.errorButton}
              onClick={handleNavigate}
            >
              Volver
            </button>
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

export default CheckoutError;
