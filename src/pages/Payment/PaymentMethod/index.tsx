import { Link } from "react-router-dom";
import ModalCart from "../../../components/ModalCart";
import { ArrowLeft } from "../../../utils/svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RadioBtn from "../../../components/RadioBtn";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { DeliveryProps } from "../../../utils/interface";
import { alertConfirm, alertError } from "../../../utils/alerts";
import { FiCopy, FiExternalLink } from "react-icons/fi";

const PaymentMethod = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { authenticated } = useSelector((state: RootState) => state.auth);
  const [delivery, setDelivery] = useState<DeliveryProps>();

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

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    localStorage.setItem("payment_method", JSON.stringify({ option }));
  };


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
    <div className="lg:flex container-pad-width lg:pt-12 justify-between lg:mb-28 gap-10">
      <div className="flex pb-8 lg:flex-row-reverse lg:justify-between lg:items-center px-5 lg:hidden">
        <Link className="flex items-center gap-3 lg:hidden" to="/delivery">
          <ArrowLeft />
        </Link>
        <p className="mx-auto text-[14px] font-book leading-[120%] tracking-[-0.42px] text-argenpesos-textos">
          Comprar producto
        </p>
      </div>
      <div className="px-5 lg:w-full">
        <p className="pb-7 text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] font-book leading-[120%] tracking-[-0.6px] text-argenpesos-textos lg:tracking-[-1.2px] lg:mb-5">
          Elegí la forma de pago
        </p>
        <div className="flex justify-between mt-4 cursor-pointer">
          <RadioBtn
            state={selectedOption}
            handleChange={handleOptionChange}
            id="credit"
            name="Sacar crédito ArgenPesos"
            value="credit"
            classname={`text-[clamp(0.913rem,0.449rem_+_1.238vw,1.563rem)] text-argenpesos-textos max-w-[220px] lg:max-w-full ${
              selectedOption === "credit" ? "font-bold" : "font-book"
            }`}
          />
        </div>
        {selectedOption === "credit" && !authenticated && (
          <p className="text-[clamp(0.875rem,0.518rem_+_0.952vw,1.375rem)] font-book leading-[120%] tracking-[-0.42px] text-argenpesos-textos text-center max-w-[270px] mt-5 mb-7 lg:max-w-full">
            Para visualizar esta opción será dirigido a inicio de sesión
          </p>
        )}
        <div className="w-full h-[1px] bg-argenpesos-gray2 my-8 lg:my-14"></div>
        <div
          className="flex justify-between mt-4 cursor-pointer"
          onClick={() => handleOptionChange("market")}
        >
          <RadioBtn
            state={selectedOption}
            handleChange={handleOptionChange}
            id="market"
            name="Mercado Pago"
            value="market"
            classname={`text-[clamp(0.913rem,0.449rem_+_1.238vw,1.563rem)] text-argenpesos-textos max-w-[220px] lg:max-w-full ${
              selectedOption === "market" ? "font-bold" : "font-book"
            }`}
          />
        </div>
        <div className="w-full h-[1px] bg-argenpesos-gray2 my-8 lg:my-14"></div>

        <div className="flex flex-col justify-between mt-4">
          <RadioBtn
            state={selectedOption}
            handleChange={handleOptionChange}
            id="transfer"
            name="Transferencia"
            value="transfer"
            classname={`text-[clamp(0.913rem,0.449rem_+_1.238vw,1.563rem)] text-argenpesos-textos max-w-[220px] lg:max-w-full ${
              selectedOption === "transfer" ? "font-bold" : "font-book"
            }`}
          />
          {selectedOption === "transfer" && (
            <div className="flex flex-col ml-6 font-book gap-4">
              <p>Nuestros datos:</p>
              <p>Banco: BBVA</p>
              <p>Razón social: COOPERATIVE DE VIVIE</p>
              <div
                className="flex gap-2 cursor-pointer items-center"
                onClick={() => handleCopy("0170039820000000445582")}
              >
                <p className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] font-book text-argenpesos-textos leading-[130%]">
                  CBU: 0170039820000000445582
                </p>
                <FiCopy className="text-xl" color="blue" />
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] font-book text-argenpesos-textos leading-[130%]">
                  Por favor, envíe el comprobante de la transferencia a nuestro
                  WhatsApp{" "}
                </span>
                <a
                  href={`https://wa.me/+541171448040?text="Hola, estoy enviando el comprobante de transferencia. Mi número de pedido o DNI es: "`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] font-book text-blue-500 leading-[130%] flex gap-2"
                >
                  +54 - 1171448040
                  <FiExternalLink className="text-xl text-blue-500" />
                </a>
                <span className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] font-book text-argenpesos-textos leading-[130%]">
                  indicando su número de pedido (o numero de dni) para confirmar
                  su pago.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <ModalCart
        delivery={delivery}
        disabled={selectedOption === null}
        onClick={() =>
          selectedOption === "credit" && !authenticated
            ? navigate("/login")
            : selectedOption === "credit"
            ? navigate("/loans")
            : navigate("/summary")
        }
      />
    </div>
  );
};
export default PaymentMethod;
