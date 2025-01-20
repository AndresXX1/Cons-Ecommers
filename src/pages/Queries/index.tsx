import Button from "../../components/Button";
import { IconQueries } from "../../utils/svg";

const Queries = () => {
  return (
    <div className="h-[120vw] flex flex-col items-center justify-center md:h-[100vh]">
      <IconQueries className="lg:w-[72px] lg:h-[72px]" />
      <h4 className="mt-7 text-argenpesos-textos text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] font-bold leading-[120%] tracking-[-0.6px]">
        ¿Tenés alguna consulta?
      </h4>
      <p className="text-[clamp(0.875rem,0.518rem_+_0.952vw,1.375rem)] font-book leading-[120%] tracking-[-0.42px] text-argenpesos-textos text-center max-w-[270px] mt-5 mb-7 lg:max-w-full">
        Cualquier duda o reclamo lo podes hacer en nuestro WhatsApp de contacto
      </p>
      <a
        href="https://wa.me/+5491171448040"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="w-[224px] lg:w-[285px]" text="Chat de contacto" />
      </a>
    </div>
  );
};

export default Queries;
