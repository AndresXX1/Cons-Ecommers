import CardsRecomm from "../CardsRecomm";
import { ProductProps } from "../../utils/interface";
import Button from "../Button";
// import Paginated from "../Paginated";
import { useEffect, useState } from "react";
import { getHighlighted } from "../../redux/services/products";
import { useNavigate } from "react-router-dom";

const RecomenProducts = () => {
  const [productHighlighted, setProductshighlighted] = useState<ProductProps[]>(
    []
  );
  const navigate = useNavigate();

  useEffect(() => {
    getHighlightedList();
  }, []);

  const getHighlightedList = async () => {
    const productsHigh = await getHighlighted();
    setProductshighlighted(productsHigh);
  };

  return (
    <div className="container-pad-width">
      {productHighlighted?.length > 0 ? (
        <>
          <div className="flex justify-between lg:pt-16">
            <h4 className="text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] font-book leading-[120%] tracking-[-0.6px] text-argenpesos-textos mb-5 lg:tracking-[-1.2px]">
              Productos recomendados
            </h4>
            <Button
              onClick={() => navigate("/explore")}
              className="hidden lg:flex mx-0 max-w-[260px] h-[48px] text-[16px]"
              text="Explorar más productos"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 lg:gap-24">
            {productHighlighted?.map((inf) => (
              <CardsRecomm key={inf.id} info={inf} />
            ))}
          </div>
          <div className="mt-10">
            {/* <Paginated /> */}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default RecomenProducts;
