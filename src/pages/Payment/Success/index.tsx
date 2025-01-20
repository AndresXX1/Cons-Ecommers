import { Link } from "react-router-dom";
import { ArrowLeft, IconSuccess } from "../../../utils/svg";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useEffect, useState } from "react";
import { BuyerProps } from "../../../utils/interface";
import { clearCart } from "../../../redux/reducers/cart";

const Success = () => {
  const { user, authenticated } = useSelector((state: RootState) => state.auth);
  const [contact, setContact] = useState<BuyerProps>();
  const dispatch = useAppDispatch();

  const loadFromLocalStorage = () => {
    try {
      const contactState = localStorage.getItem("contact");
      if (contactState) {
        setContact(JSON.parse(contactState));
      }
    } catch (e) {
      console.error("Error cargando de localStorage", e);
      return undefined;
    }
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <div className="flex pb-8 lg:flex-row-reverse lg:justify-between lg:items-center px-5 lg:hidden">
        <Link className="flex items-center gap-3 lg:hidden" to="/delivery">
          <ArrowLeft />
        </Link>
        <p className="mx-auto text-[14px] font-book leading-[120%] tracking-[-0.42px] text-argenpesos-textos">
          Comprar producto
        </p>
      </div>
      <div className="h-[120vw] flex flex-col items-center justify-center md:h-[90vh]">
        <IconSuccess className="lg:w-[72px] lg:h-[72px]" />
        <h4 className="mt-7 text-argenpesos-textos text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] font-bold leading-[120%] tracking-[-0.6px]">
          ¡Gracias por su compra!
        </h4>
        <p className="text-[clamp(0.875rem,0.518rem_+_0.952vw,1.375rem)] font-book leading-[120%] tracking-[-0.42px] text-argenpesos-textos text-center max-w-[270px] mt-5 mb-7 lg:max-w-full">
          Será notificado el estado de su compra a su email:{" "}
          {authenticated ? user?.email : contact?.email}
        </p>
        <Button
          onClick={() => {
            dispatch(clearCart());
            localStorage.removeItem("delivery");
            localStorage.removeItem("payment_method");
            localStorage.removeItem("shipping");
            navigate("/");
            localStorage.removeItem("contact");
          }}
          className="w-[224px] lg:w-[285px]"
          text="Volver a ArgenCompras"
        />
      </div>
    </div>
  );
};

export default Success;
