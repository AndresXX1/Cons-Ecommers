import { useSelector } from "react-redux";
import { DeliveryProps } from "../utils/interface";
import Button from "./Button";

import { useLocation } from "react-router-dom";
import { RootState } from "../redux/store";

interface ModalCartProps {
  onClick?: () => void;
  disabled?: boolean;
  delivery?: DeliveryProps;
}

const ModalCart: React.FC<ModalCartProps> = ({
  onClick,
  disabled,
  delivery,
}) => {
  const location = useLocation();
  const cart = useSelector((state: RootState) => state.cart);

  const productsCount = cart?.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const isPayment =
    location.pathname === "/payment" ||
    location.pathname === "/delivery" ||
    location.pathname === "/payment-method" ||
    location.pathname === "/loans" ||
    location.pathname === "/summary";

  return (
    <div className="fixed w-full bottom-0 z-[100] lg:max-w-[400px] lg:relative">
      <div
        className={`${
          isPayment ? "h-[280px]" : "h-[234px]"
        } bg-argenpesos-white relative w-full px-6 py-5 lg:py-0}`}
      >
        <p className="hidden lg:flex pb-6 text-[25px] text-argenpesos-textos font-bold">
          Resumen de compra
        </p>
        <div className="flex justify-between w-full pb-7">
          <p className="text-[14px] lg:text-[16px] text-argenpesos-textos font-book">
            Productos ({productsCount})
          </p>
          <p className="text-[14px] lg:text-[16px] text-argenpesos-textos font-book">
            $
            {cart?.total_price.toLocaleString("es-ES", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        {isPayment ? (
          <div className="flex justify-between w-full pb-7">
            <p className="text-[14px] lg:text-[16px] text-argenpesos-textos font-book">
              Envío
            </p>
            <p className="text-[14px] lg:text-[16px] text-argenpesos-textos font-book">
              $ {delivery?.amounts?.price_incl_tax || 0}
            </p>
          </div>
        ) : null}
        <p className="text-[14px] font-book lg:text-[16px] text-argenpesos-red pb-7">
          Ingresar cupón de descuento
        </p>
        <div className="flex justify-between w-full pb-7">
          <p className="text-[14px] font-bold lg:text-[16px] text-argenpesos-textos">
            Total
          </p>
          <p className="text-[14px] font-bold lg:text-[16px] text-argenpesos-textos">
            $
            {delivery?.amounts?.price_incl_tax && cart?.total_price
              ? cart?.total_price + delivery?.amounts?.price_incl_tax
              : cart?.total_price.toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || 0}
          </p>
        </div>
        <Button
          className={`${!disabled ? "" : "bg-[#ED1A004D]"} lg:text-[16px]`}
          text="Continuar compra"
          onClick={onClick}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default ModalCart;
