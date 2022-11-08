import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTenant } from "@/utils/apiManager";
import Loader from "@/components/Loader";

function FailedPayment() {
  const [company, setCompany] = useState();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const tenant = await getTenant(id);
    setCompany(tenant.Item);

    if (tenant) {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <Loader />;
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <div className="flex flex-col-2">
          <div>
            <div className="text-center my-32 mx-8">
              <h1 className="text-4xl text-gray-500 my-12 mx-12">
                ¡Oh no!, Algo ha salido mal con tu compra
              </h1>
              <h2 className="font-thin text-xl text-gray-500 ">
                Ya tu error fue notificado a nuestro equipo de trabajo.
              </h2>
              <h2 className="font-thin text-xl text-gray-500 ">
                Puedes volver a intentarlo, ¡no te desanimes!
              </h2>
              <button
                type="submit"
                className="border-2 mx-12 my-12 border-sidebar-title rounded-md text-sidebar-title font-thin m-4 p-2"
              >
                Volver
              </button>
            </div>
          </div>
          <img
            src="/src/assets/error_shop.jpeg"
            alt="Imagen exitosa"
            className="w-2/6 h-2/6 my-16 mx-40"
          />
        </div>
      </div>

      <div>
        <div className="m-0 p-0">
          <Footer
            client={company?.COMPANY_NAME}
            location={company?.CITY}
            address={company?.ADDRESS}
            telephone={company?.COMPANY_PHONE}
          />
        </div>
      </div>
    </div>
  );
}

export default FailedPayment;
