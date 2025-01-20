import { Link } from "react-router-dom";
import { ArrowLeft, IconSuccess } from "../../../utils/svg";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

const Failure = () => {
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
      <div className="h-[120vw] flex flex-col items-center justify-center md:h-[100vh]">
        <IconSuccess className="lg:w-[72px] lg:h-[72px]" />
        <h4 className="mt-7 text-argenpesos-textos text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] font-bold leading-[120%] tracking-[-0.6px] max-w-[250px] text-center lg:max-w-full">
          Surgió un error al momento del pago
        </h4>
        <p className="text-[clamp(0.875rem,0.518rem_+_0.952vw,1.375rem)] font-book leading-[120%] tracking-[-0.42px] text-argenpesos-textos text-center max-w-[270px] mt-5 mb-7 lg:max-w-full">
          Vuelve a intentarlo más tarde
        </p>
        <div className="flex gap-6">
            <Button
              text="Volver a ArgenCompras"
              onClick={() => navigate("/")}
              className="w-[224px] lg:w-[280px] bg-argenpesos-white flex items-center justify-center mx-auto rounded-[8.5px] border-[1px] border-solid border-argenpesos-red text-argenpesos-red text-[14px] font-book mb-5 gap-3 lg:text-[16px]"
            />
            <Button
              onClick={() => navigate("/payment-method")}
              className="w-[224px] lg:w-[285px]"
              text="Elegir otra forma de pago"
            />
          </div>
      </div>
    </div>
  );
};

export default Failure;
