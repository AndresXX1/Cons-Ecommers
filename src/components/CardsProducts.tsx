import { apiUrls } from "../config";
import { ProductProps } from "../utils/interface";
import { IconDelete, IconMas } from "../utils/svg";
import { RootState, useAppDispatch } from "../redux/store";
import { addItem, removeItem } from "../redux/reducers/cart";
import { useSelector } from "react-redux";

export const CardsProducts = ({ info }: { info: ProductProps }) => {
  const dispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const verifyCart = cart?.items.find((item) => item.product.id === info.id);

  return (
    <div>
      <div className="flex gap-3 justify-between">
        <div className="flex gap-3">
          <div className="w-[clamp(6.644rem,1.568rem_+_13.535vw,13.75rem)] h-[clamp(6.688rem,1.58rem_+_13.621vw,13.839rem)] bg-argenpesos-gray flex items-center justify-center rounded-[7px] relative">
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
            {/* Overlay de Sin Stock */}
            {info.stock !== undefined && info.stock === 0 && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center">
                  <p className="text-xl font-bold">Sin Stock</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col py-2 pl-1 gap-3">
            <p className="text-[clamp(0.875rem,0.161rem_+_1.905vw,1.875rem)] text-argenpesos-textos font-bold">
              {info.name}
            </p>
            <p className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] py-[4px] px-2 border-[1px] border-solid border-argenpesos-red rounded-md text-argenpesos-red font-book">
              {info.final_price}
            </p>
            <p className="text-[clamp(0.625rem,0.357rem_+_0.714vw,1rem)] text-argenpesos-gray3 font-book">
              {info.price}
            </p>
          </div>
        </div>
        {info.stock !== undefined &&
          info.stock > 0 &&
          (verifyCart ? (
            <div
              className="right-3 top-3"
              onClick={() => dispatch(removeItem(Number(info.id)))}
            >
              <IconDelete className="w-[33px] cursor-pointer" />
            </div>
          ) : (
            <div
              className=" right-3 top-3"
              onClick={() => dispatch(addItem(info))}
            >
              <IconMas className="w-[33px] h-[33px] cursor-pointer" />
            </div>
          ))}
        {info.stock !== undefined && info.stock === 0 && (
          <div className="invisible w-[33px]"></div>
        )}
      </div>
      <div className="h-[1px] w-full bg-argenpesos-textos opacity-[0.3] my-5"></div>
    </div>
  );
};
export default CardsProducts;
