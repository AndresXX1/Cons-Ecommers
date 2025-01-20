import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import { IconCreateProfile } from "../../../utils/svg";
const CreateProfile = () => {
  return (
    <div className="h-[120vw] flex flex-col items-center justify-center md:h-[100vh]">
      <IconCreateProfile className="lg:w-[72px] lg:h-[72px]" />
      <h4 className="mt-7 text-argenpesos-textos text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] font-bold leading-[120%] tracking-[-0.6px] text-center">
        ¿Aún no tienes cuenta de ArgenCompras?
      </h4>
      <p className="text-[clamp(0.875rem,0.518rem_+_0.952vw,1.375rem)] font-book leading-[120%] tracking-[-0.42px] text-argenpesos-textos text-center max-w-[270px] mt-5 mb-7 lg:max-w-full">
        Obten puntos por tus compras, descuentos y más beneficios
      </p>
      <Button className="w-[224px] lg:hidden" text="Chat de contacto" />
      <div className="flex gap-4">
        <Link to="/login">
          <Button
            className="w-[285px] hidden lg:flex border-argenpesos-red border-[1px] text-argenpesos-red bg-argenpesos-white"
            text="Iniciar sesión"
          />
        </Link>
        <Link to="/register">
          <Button className="w-[285px] hidden lg:flex" text="Registrarse" />
        </Link>
      </div>
    </div>
  );
};

export default CreateProfile;
