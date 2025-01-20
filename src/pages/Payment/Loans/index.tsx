import { Link } from "react-router-dom";
import { ArrowLeft, IconX } from "../../../utils/svg";
import ModalCart from "../../../components/ModalCart";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { DeliveryProps } from "../../../utils/interface";

const Loans = () => {
  const { authenticated, user } = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart);
  const [delivery, setDelivery] = useState<DeliveryProps>()
  
  
  const loadFromLocalStorage = () => {
    try {
      const deliveryState = localStorage.getItem("delivery");
      if (deliveryState) {
        setDelivery(JSON.parse(deliveryState));
      }
    } catch (e) {
      console.error("Error cargando de localStorage", e);
      return undefined;
    }
  };

  const navigate = useNavigate();

  const localStore = JSON.parse(localStorage.getItem("payment_method") || "{}");
  
  useEffect(()=>{
    loadFromLocalStorage()
    !authenticated && navigate("/login")
    const isApproved = user?.smarter_token !== "00000000-0000-0000-0000-000000000000" 
    const newStore = {...localStore, isApproved: isApproved}
    localStorage.setItem("payment_method", JSON.stringify(newStore))
  },[])

  
  return (
    <div className="lg:flex container-pad-width lg:pt-12 justify-between lg:mb-28 gap-24">
      <div className="flex pb-8 lg:flex-row-reverse lg:justify-between lg:items-center px-5 lg:hidden">
        <Link
          className="flex items-center gap-3 lg:hidden"
          to="/payment-method"
        >
          <ArrowLeft />
        </Link>
        <p className="mx-auto text-[14px] font-book leading-[120%] tracking-[-0.42px] text-argenpesos-textos">
          Comprar producto
        </p>
      </div>
      {user?.smarter_token !== "00000000-0000-0000-0000-000000000000" ? (
        <>
          <div className="px-5 flex flex-col gap-6 mb-40">
            <p className="text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] text-argenpesos-textos font-book leading-[120%] tracking-[-0.6px]">
              Estado de préstamo
            </p>
            <p className="text-[clamp(0.875rem,0.384rem_+_1.31vw,1.563rem)] text-argenpesos-textos font-book">
              Monto del préstamo pre-aprobado:{" "}
              <span className="font-bold">${cart?.total_price}</span>
            </p>
            <p className="text-argenpesos-textos text-[12px] md:text-[16px] lg:text-[18px] font-book leading-[130%]">
              Se ha autorizado el préstamo como medio de pago. El monto
              disponible es igual al precio total de su compra. Haga click en
              continuar para ver su resumen de compra.
            </p>
          </div>
          <ModalCart delivery={delivery} onClick={() => navigate("/summary")} />
        </>
      ) : (
        <div className="flex flex-col items-center text-center gap-11 mx-auto">
          <IconX
            width="90"
            height="90"
            color1="red"
            className="border-solid border-red-500 border-4 rounded-full p-4"
          />
          <p className="hidden lg:flex text-[40px] max-w-[780px] text-argenpesos-textos font-bold">
          No contamos con ofertas disponibles para usted en este momento.
          </p>
          <p className="text-argenpesos-textos text-[12px] md:text-[16px] lg:text-[18px] max-w-[780px] font-book leading-[130%]">
          Realizamos el análisis crediticio y lamentablemente no podemos ofrecerle un crédito. Si desea obtener más detalles no dude en contactarnos.
            </p>
            <Button text="Elegir otra forma de pago" onClick={() => navigate("/payment-method")}/>
        </div>
      )}
    </div>
  );
};

export default Loans;
