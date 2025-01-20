import { apiUrls } from "../config";
import { CartItem } from "../utils/interface";

const CardResume = ({ info }: { info: CartItem }) => {
  return (
    <div>
      <div className="flex gap-3 lg:flex-col justify-between">
        <div className="w-[80%] flex flex-col pl-1 gap-2 justify-center">
          <p className="text-[clamp(0.563rem,0.072rem_+_1.309vw,1.25rem)] text-argenpesos-textos font-bold">
            {info.product.name}
          </p>
          <p className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] text-argenpesos-textos font-book lg:hidden">
            {info.product.final_price}
          </p>

          <p className="text-[clamp(0.563rem,0.072rem_+_1.309vw,1.25rem)] font-bold text-argenpesos-textos">
            {`${info.quantity} unidad${info.quantity > 1 ? "es" : ""}`}
          </p>
        </div>
        <div className="w-[20%] h-[clamp(4.858rem,-1.558rem_+_17.109vw,13.84rem)] bg-argenpesos-gray flex items-center justify-center rounded-[7px]">
          <img
            className="w-[clamp(3.191rem,-1.024rem_+_11.24vw,9.092rem)] h-[clamp(3.899rem,-1.25rem_+_13.731vw,11.108rem)] object-cover rounded-[7px]"
            src={
              info.product.images?.default?.length !== undefined &&
              info.product.images?.default?.length > 0
                ? `${apiUrls.productImg(info.product.images.default[0])}`
                : "/image_default.png"
            }
            alt={info.product.name}
          />
        </div>
      </div>
    </div>
  );
};
export default CardResume;
