import { useState } from "react";
import { IconDelete, IconExclamation, IconMas } from "../utils/svg";
import { ProductProps } from "../utils/interface";
import { apiUrls } from "../config";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../redux/store";
import { addItem, removeItem } from "../redux/reducers/cart";
import { useSelector } from "react-redux";

export interface CardProductProps {
  data: ProductProps;
}

const CardsRecomm = ({ info }: { info: ProductProps }) => {
  const [hoverActivo, setHoverActivo] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const verifyCart = cart?.items.find((item) => item.product.id === info.id);

  const handleMouseEnter = () => {
    setHoverActivo(true);
  };

  const handleMouseLeave = () => {
    setHoverActivo(false);
  };

  return (
    <div
      className="flex flex-row gap-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="lg:border-[1px] lg:border-argenpesos-textos w-[clamp(12.424rem,4.557rem_+_20.979vw,23.438rem)] h-[clamp(16.764rem,6.149rem_+_28.307vw,31.625rem)] lg:p-2 xl:p-3 rounded-[8px] lg:flex flex-col justify-center  text-white ">
        <div className="bg-[#F9F9F9] cursor-pointer w-[clamp(12.125rem,5.205rem_+_18.453vw,21.813rem)] h-[clamp(12.188rem,5.212rem_+_18.604vw,21.955rem)] flex items-center justify-center rounded-[5px] relative">
          <img
            className={`w-[clamp(8.015rem,3.438rem_+_12.206vw,14.423rem)] pt-[1rem] h-[clamp(9.75rem,4.128rem_+_14.992vw,17.621rem)] object-cover rounded-[7px] transition-transform duration-500 ${
              hoverActivo ? "transform scale-110" : ""
            }`}
            src={
              info.images?.default?.length !== undefined &&
              info.images?.default?.length > 0
                ? `${apiUrls.productImg(info.images.default[0])}`
                : "/image_default_desktop.png"
            }
            alt={info.name}
            onClick={() => navigate(`/product/${info.id}`)}
          />
          <div className="hidden lg:flex absolute left-3 top-3">
            <IconExclamation className="lg:w-[33px] lg:h-[33px] cursor-pointer" />
          </div>
          {
            info.stock === 0 ? (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center">
                  <p className="text-xl font-bold">Sin Stock</p>
                </div>
              </div>
            ) : 
          verifyCart ? (
            <div
              className="flex absolute right-3 top-3 z-10000 items-center"
              onClick={() =>
                info.id !== undefined && dispatch(removeItem(info.id))
              }
            >
              <div
                className={`text-gray-700 rounded-[20px] text-sm md:text-[1 zrem] w-[8rem] h-[1rem] justify-center md:h-[1.8rem] md:w-[10rem] items-center bg-white opacity-0 transition-opacity duration-500 cursor-pointer ${
                  hoverActivo ? "opacity-100 flex" : "flex"
                }`}
              >
                Quitar del carrito
              </div>
              <IconDelete className="lg:w-[17px] lg:h-[17px] cursor-pointer" />
            </div>
          ) : (
            <div
              className="flex absolute right-3 top-3 z-10000"
              onClick={() => dispatch(addItem(info))}
            >
              <div
                className={`text-gray-700 rounded-[20px] text-sm md:text-[1 zrem] w-[8rem] h-[1rem] justify-center md:h-[1.8rem] md:w-[10rem] items-center bg-white opacity-0 transition-opacity duration-500 cursor-pointer ${
                  hoverActivo ? "opacity-100 flex" : "flex"
                }`}
              >
                Agregar al carrito
              </div>
              <IconMas className="lg:w-[33px] lg:h-[33px] cursor-pointer" />
            </div>
          )}
        </div>
        <div
          className="flex flex-col py-2 pl-1 gap-3 cursor-pointer"
          onClick={() => info.stock !== undefined && info.stock > 0 && navigate(`/product/${info.id}`)}
        >
          <p className="text-[clamp(0.75rem,0.169rem_+_1.549vw,1.563rem)] text-argenpesos-textos font-bold">
            {info.name}
          </p>
          <p
            className={`text-[clamp(0.625rem,0.179rem_+_1.19vw,1.25rem)] py-[4px] px-2 border-[1px] border-solid font-book max-w-[149px] lg:max-w-[283px] rounded-[2.5px] duration-500 ${
              hoverActivo
                ? "bg-argenpesos-red text-white border-transparent"
                : "text-argenpesos-red border-argenpesos-red"
            }`}
          >
            Precio{" "}
            {`$${parseFloat(info.final_price).toLocaleString("es-AR", {
              minimumFractionDigits: 2,
            })}`}
          </p>
          <p className="text-[clamp(0.5rem,0.054rem_+_1.19vw,1.125rem)] text-argenpesos-gray3 font-book">
            {`$${parseFloat(info.final_price).toLocaleString("es-AR", {
              minimumFractionDigits: 2,
            })}`}{" "}
            al contado
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardsRecomm;
