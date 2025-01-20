import CardsRecomm from "../CardsRecomm";
import { ProductProps } from "../../utils/interface";
import Button from "../Button";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "../../utils/svg";
import {
  getProducts,
  getProductsByCategoryId,
} from "../../redux/services/products";

const Recommended = (props: {
  category?: string | undefined;
  cartEmpty?: boolean;
}) => {
  const { id } = useParams<string>();
  const { category, cartEmpty } = props;
  const [productRecommended, setProductRecommended] = useState<ProductProps[]>(
    []
  );
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const categoryNumber = [Number(category)];
        const response: ProductProps[] = await getProductsByCategoryId(
          categoryNumber
        );
        const filteredResponse = response.filter(
          (prod) => prod.id !== Number(id)
        );
        setProductRecommended(filteredResponse);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchAllProds = async () => {
      try {
        const response: ProductProps[] = await getProducts();
        setProductRecommended(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    cartEmpty ? fetchAllProds() : fetchProduct();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -900,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 900,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container-pad-width">
      {productRecommended.length > 0 ? (
        <>
          <div className="flex justify-between lg:pt-16">
            <h4 className="text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] font-book leading-[120%] tracking-[-0.6px] text-argenpesos-textos mb-5 lg:tracking-[-1.2px]">
              Productos recomendados
            </h4>
            {!cartEmpty && (
              <Button
                onClick={() => navigate("/explore")}
                className="hidden lg:flex mx-0 max-w-[260px] h-[48px] text-[16px]"
                text="Explorar más productos"
              />
            )}
          </div>
          <div
            ref={scrollRef}
            className="flex overflow-x-scroll scrollbar-none lg:gap-24 p-3"
          >
            {productRecommended?.map((inf) => (
              <CardsRecomm key={inf.id} info={inf} />
            ))}
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={scrollLeft}
              className="flex justify-center bottom-0 transform bg-argenpesos-white p-4 border-2 rounded-full z-10 hover:bg-argenpesos-gray hover:text-argenpesos-gray h-[48px] w-[48px]"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={scrollRight}
              className="flex justify-center bottom-0 transform bg-argenpesos-white p-4 border-2 rounded-full z-10 hover:bg-argenpesos-gray hover:text-argenpesos-gray h-[48px] w-[48px]"
            >
              <ArrowRight />
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Recommended;
