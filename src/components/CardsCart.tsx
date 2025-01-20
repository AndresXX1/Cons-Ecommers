import { useSelector } from "react-redux";
import { CartItem, ProductProps } from "../utils/interface";
import {
  DownArrow,
  IconDecrement,
  IconDelete,
  IconIncrement,
} from "../utils/svg";
import { RootState, useAppDispatch } from "../redux/store";
import { removeItem, updateQuantity } from "../redux/reducers/cart";
import { useEffect } from "react";
import { apiUrls } from "../config";

export const CardsCart = ({ info }: { info: ProductProps }) => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();

  const count = () => {
    let response = 0;
    cart.items.map((item: CartItem) => {
      if (item.product.id === info.id) {
        response = item.quantity;
      }
    });
    return response;
  };

  useEffect(() => {
    count();
  }, [cart]);

  return (
    <div className="flex gap-3 justify-evenly lg:relative lg:w-[100%] lg:justify-between">
      <div className="flex gap-10 lg:w-[80%]">
        <div className="w-[30%] flex items-center justify-center rounded-[7px] relative">
          <img
            className="w-[clamp(4.375rem,1.006rem_+_8.985vw,9.092rem)] h-[clamp(5.313rem,1.174rem_+_11.038vw,11.108rem)] object-cover rounded-[7px]"
            src={
              info.images?.default?.length !== undefined &&
              info.images?.default?.length > 0
                ? `${apiUrls.productImg(info.images.default[0])}`
                : "/image_default.png"
            }
            alt={info.name}
          />
          <div
            onClick={() =>
              info.id !== undefined && dispatch(removeItem(info.id))
            }
            className="hidden absolute right-3 top-3 w-[33px] h-[33px] bg-argenpesos-white rounded-full items-center justify-center cursor-pointer lg:flex"
          >
            <IconDelete color="#ED1A00" />
          </div>
        </div>
        <div className="flex flex-col w-[70%] pl-1 gap-1 pb-16">
          <p className="text-[clamp(0.875rem,0.161rem_+_1.905vw,1.875rem)] text-argenpesos-textos font-bold">
            {info.name}
          </p>
          <p className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] text-argenpesos-textos font-book mb-2 lg:text-argenpesos-red">
            $
            {Number(info.final_price).toLocaleString("es-ES", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <div className="flex rounded-[8px] border-[1px] border-solid border-argenpesos-textos w-[130px] h-[32.5px] justify-center items-center gap-2 lg:hidden">
            <p className="text-[9px] text-argenpesos-textos font-book">
              Cantidad
            </p>
            <p className="text-[9px] font-bold text-argenpesos-textos">
              {count()} unidad{count() > 1 && "es"}
            </p>
            <DownArrow />
          </div>
        </div>
        <div
          onClick={() => info.id !== undefined && dispatch(removeItem(info.id))}
        >
          <IconDelete className="lg:hidden cursor-pointer hover:scale-110 duration-300" />
        </div>
      </div>
      <div className="hidden lg:flex lg:w-[20%] flex-col items-center">
        <div className=" w-[139px] h-[48px] lg:flex border-[1px] border-argenpesos-gray2 items-center justify-between p-3 rounded-[9px]">
          <p
            className="cursor-pointer"
            onClick={() =>
              info.id !== undefined &&
              dispatch(updateQuantity({ id: info.id, operation: "minus" }))
            }
          >
            <IconDecrement />
          </p>
          <p className="text-[18px] text-argenpesos-textos font-book">
            {count()}
          </p>
          <p
            className="cursor-pointer"
            onClick={() =>
              info.id !== undefined &&
              dispatch(updateQuantity({ id: info.id, operation: "plus" }))
            }
          >
            <IconIncrement />
          </p>
        </div>
        <p className="text-center mt-2 text-argenpesos-textos text-[18px] font-book text-opacity-[0.5]">
          {" "}
          {info.stock}
        </p>
      </div>
    </div>
  );
};

export default CardsCart;
