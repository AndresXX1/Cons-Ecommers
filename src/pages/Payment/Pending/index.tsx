import { Link } from "react-router-dom";
import { ArrowLeft, IconSuccess } from "../../../utils/svg";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { BuyerProps } from "../../../utils/interface";
import { useEffect, useState } from "react";
import { clearCart } from "../../../redux/reducers/cart";
import { FiCopy, FiExternalLink } from "react-icons/fi";
import { alertConfirm, alertError } from "../../../utils/alerts";

const Pending = () => {
  const { user, authenticated } = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart);

  const [contact, setContact] = useState<BuyerProps>();
  const dispatch = useAppDispatch();
  const [payment, setPayment] = useState<{
    option: string;
    isApproved: boolean;
  }>();

  const loadFromLocalStorage = () => {
    try {
      const contactState = localStorage.getItem("contact");
      if (contactState) {
        setContact(JSON.parse(contactState));
      }
      const paymentState = localStorage.getItem("payment_method");
      if (paymentState) {
        setPayment(JSON.parse(paymentState));
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

  const handleCopy = (cbu: string) => {
    navigator.clipboard
      .writeText(cbu)
      .then(() => {
        alertConfirm("Se copió el CBU en el portapapeles");
      })
      .catch((_) => {
        alertError("Error al copiar al portapapeles:");
      });
  };
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
      <div className="h-[120vw] flex flex-col items-center justify-center md:h-[70vh]">
        <IconSuccess className="lg:w-[72px] lg:h-[72px]" />
        <h4 className="mt-7 text-argenpesos-textos text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] font-bold leading-[120%] tracking-[-0.6px]">
          ¡Su compra ya casi está lista!
        </h4>
        <p className="text-[clamp(0.875rem,0.518rem_+_0.952vw,1.375rem)] font-book leading-[120%] tracking-[-0.42px] text-argenpesos-textos text-center max-w-[270px] mt-5 mb-7 lg:max-w-full">
          Será notificado el estado de su compra a su email:{" "}
          {authenticated ? user?.email : contact?.email}
        </p>
        {payment?.option === "transfer" && (
          <div className="flex flex-col gap-2 items-center p-4">
            <span className="text-argenpesos-textos font-book text-center">
              Recordá que podés realizar el pago a través de transferencia
              bancaria al
            </span>
            <div
              className="flex gap-2 cursor-pointer items-center"
              onClick={() => handleCopy("0170039820000000445582")}
            >
              <span>CBU: 0170039820000000445582</span>
              <FiCopy className="text-xl" color="blue" />
            </div>
            <hr style={{ width: "50%", margin: "10px 0", border: "1px solid #000" }} />
            <div className="flex flex-col gap-2">
              <span className="text-argenpesos-textos font-book text-center">
                Una vez realizado el pago, envíe el comprobante de la
                transferencia a nuestro WhatsApp{" "}
              </span>
              <a
                href={`https://wa.me/+541171448040?text="Hola, estoy enviando el comprobante de transferencia. Mi número de pedido o DNI es: "`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2"
              >
                +54 - 1171448040
                <FiExternalLink className="text-xl text-blue-500" />
                <span className="text-argenpesos-textos font-book text-center">
                  indicando su número de pedido (o numero de dni) para confirmar
                  su pago.
                </span>
              </a>

            </div>
            <hr style={{ width: "50%", margin: "10px 0", border: "1px solid #000" }} />
            <div>
              <span className="text-argenpesos-textos text-center font-bold">
                Total: $ {cart.total_price.toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        )}
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

export default Pending;
