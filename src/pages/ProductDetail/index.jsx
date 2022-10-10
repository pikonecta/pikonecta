import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct, getTenant } from "@/utils/apiManager";
import { useShoppingCart } from "use-shopping-cart";
import Loader from "@/components/Loader";

function ProductDetail() {
  const { id, idProduct } = useParams();
  const [countItem, setCountItem] = useState(1);
  const [product, setProduct] = useState({});
  const [company, setCompany] = useState();
  const { addItem } = useShoppingCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const res = await getProduct(id, idProduct);
    const { Item: currentProduct } = res;
    setProduct(currentProduct);

    const tenant = await getTenant(id);
    setCompany(tenant.Item);
    setIsLoading(false);
  }, []);

  // TODO use SidBarShop
  if (isLoading) return <Loader />;
  return (
    <>
      <Header />
      <div className="lg:grid lg:grid-cols-3 flex-col  p-5 px-10 sm:grid-cols-1 min-h-[73vh]">
        <div className="min-h-full col-span-2">
          <div className="flex flex-row min-h-full">
            <div className="flex flex-col col-span-2 justify-between mr-2 w-1/5">
              <div className=" mb-1 h-full">
                <img src={product.imgs} alt={product.name} />
              </div>
              <div className="mb-1 h-full">
                <img src={product.imgs} alt={product.name} />
              </div>
              <div className="mb-1 h-full">
                <img src={product.imgs} alt={product.name} />
              </div>
              <div className="h-full">
                <img src={product.imgs} alt={product.name} />
              </div>
            </div>
            <div className="w-full ">
              <img src={product.imgs} alt={product.name} />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between h-full mx-3">
          <span className="text-green-500 text-xs mb-10">
            Disponible {product.stock}
          </span>
          <div className="basis-1/4">
            <h1 className="text-2xl font-bold text-center text-general-gray-darker">
              {product.name}
            </h1>
            <p className="text-center">$ {product.price}</p>
          </div>
          <p className="mx-24 text-xs text-justify basis-1/2 text-general-gray-dark">
            {product.description}
          </p>
          <div className="text-center">
            <p className="font-bold">CANTIDAD</p>
            <input
              type="number"
              className="w-1/3 h-8 appearance-none"
              placeholder="1"
              onChange={(e) => setCountItem(e.target.valueAsNumber)}
              min={1}
            />
            <button
              type="button"
              className="w-full bg-general-blue py-6 rounded mt-3 font-bold"
              onClick={() => {
                addItem(product, { count: countItem });
              }}
            >
              AGREGAR AL CARRITO
            </button>
          </div>
        </div>
      </div>
      <div className="m-0 p-0">
        <Footer
          client={company?.COMPANY_NAME}
          location={company?.CITY}
          address={company?.ADDRESS}
          telephone={company?.COMPANY_PHONE}
        />
      </div>
    </>
  );
}

export default ProductDetail;
