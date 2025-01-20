import {
  IconEmail,
  IconFb,
  IconIg,
  IconPhone,
  IconWhatsapp,
} from "../utils/svg";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/second-step" ||
    location.pathname === "/create-profile";
  const isCart = location.pathname === "/cart";
  const isPayment =
    location.pathname === "/payment" ||
    location.pathname === "/delivery" ||
    location.pathname === "/payment-method" ||
    location.pathname === "/loans" ||
    location.pathname === "/summary";
  return (
    <footer
      className={`pt-5 px-5 bg-custom-gradient-footer lg:pb-8 ${
        isCart ? "pb-64" : isLogin ? "pb-5" : isPayment ? "pb-72" : "pb-36"
      }`}
    >
      <div className="md:flex flex-row gap-20 md:mb-10 lg:gap-28 container-pad-width">
        <div className="flex justify-between md:gap-20 lg:gap-28">
          <div className="mt-10">
            <img
              className="w-[clamp(7.375rem,4.294rem_+_8.215vw,11.688rem)] h-[clamp(1.419rem,0.825rem_+_1.583vw,2.25rem)] mb-4"
              src="/footer/logo_argencompras.png"
              alt=""
            />
            <a
              href="https://wa.me/+5491171448040"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[clamp(0.625rem,0.357rem_+_0.714vw,1rem)] font-book leading-[142%] tracking-[-0.3px] text-argenpesos-textos md:tracking-[-0.48px]"
            >
              Quiero hacer un reclamo
            </a>
            <p
              onClick={() => navigate("terms-and-conditions")}
              className="text-[clamp(0.625rem,0.357rem_+_0.714vw,1rem)] font-book leading-[142%] tracking-[-0.3px] text-argenpesos-textos pt-4 md:tracking-[-0.48px] cursor-pointer"
            >
              Términos y condiciones de uso
            </p>
            <p
              onClick={() => navigate("policy-and-privacy")}
              className="text-[clamp(0.625rem,0.357rem_+_0.714vw,1rem)] font-book leading-[142%] tracking-[-0.3px] text-argenpesos-textos pt-4 md:tracking-[-0.48px] cursor-pointer"
            >
              Política de privacidad
            </p>
            <p
              onClick={() => navigate("technical-service")}
              className="text-[clamp(0.625rem,0.357rem_+_0.714vw,1rem)] font-book leading-[142%] tracking-[-0.3px] text-argenpesos-textos pt-4 md:tracking-[-0.48px] cursor-pointer"
            >
              Servicio técnico
            </p>
            <p
              onClick={() => navigate("who-are-they")}
              className="text-[clamp(0.625rem,0.357rem_+_0.714vw,1rem)] font-book leading-[142%] tracking-[-0.3px] text-argenpesos-textos pt-4 md:tracking-[-0.48px] cursor-pointer"
            >
              ¿Quiénes somos?
            </p>
          </div>
          <div className="pt-10 flex flex-col">
            <img
              className="w-[clamp(7.375rem,5.544rem_+_4.882vw,9.938rem)] h-[clamp(1.313rem,0.761rem_+_1.472vw,2.086rem)] mb-4"
              src="/footer/logo_argenpesos.png"
              alt=""
            />
            <a
              href="https://wa.me/+5491171448040"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[clamp(0.625rem,0.357rem_+_0.714vw,1rem)] font-book leading-[142%] tracking-[-0.3px] text-argenpesos-textos pt-1 md:tracking-[-0.48px]"
            >
              Quiero financiar mi compra
            </a>
            <a
              href="https://www.argenpesos.com.ar/"
              target="_blank"
              className="text-[clamp(0.625rem,0.357rem_+_0.714vw,1rem)] font-book leading-[142%] tracking-[-0.3px] text-argenpesos-textos pt-4 md:tracking-[-0.48px]"
            >
              Quiero un préstamo de dinero
            </a>
            <a
              href="https://www.argenpesos.com.ar/public/storage/pdf/ARGENCRED%20-%20Terminos%20y%20condiciones%20SITIO%20WEB.pdf"
              target="_blank"
              className="text-[clamp(0.625rem,0.357rem_+_0.714vw,1rem)] font-book leading-[142%] tracking-[-0.3px] text-argenpesos-textos pt-4 md:tracking-[-0.48px]"
            >
              Términos y condiciones
            </a>
            <a
              href="https://www.argenpesos.com.ar/public/storage/pdf/ARGENCRED%20-%20POL.%20DE%20PRIVACIDAD.pdf"
              target="_blank"
              className="text-[clamp(0.625rem,0.357rem_+_0.714vw,1rem)] font-book leading-[142%] tracking-[-0.3px] text-argenpesos-textos pt-4 md:tracking-[-0.48px]"
            >
              Políticas de privacidad
            </a>
          </div>
        </div>
        <div className="md:flex flex-col">
          <p className="pt-[18px] text-[clamp(0.875rem,0.607rem_+_0.714vw,1.25rem)] text-argenpesos-textos font-bold leading-[142%] tracking-[-0.42px] md:pt-11 md:pb-4">
            Contactános
          </p>
          <div className="flex gap-5 my-3 md:flex-col">
            <a
              href="tel:08002202743"
              className="flex gap-1 items-center md:gap-3 lg:pointer-events-none"
            >
              <IconPhone className="md:w-[18px] md:h-[18px] lg:w-[24px] lg:h-[24px]" />
              <p className="text-[clamp(0.625rem,0.357rem_+_0.714vw,1rem)] font-book leading-[142%] tracking-[-0.3px] text-argenpesos-textos md:tracking-[-0.48px]">
                0800 - 2202743
              </p>
            </a>
            <a
              href="https://wa.me/+5491171448040"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-1 items-center md:gap-3"
            >
              <IconWhatsapp className="md:w-[18px] md:h-[18px] lg:w-[24px] lg:h-[24px]" />
              <p className="text-[clamp(0.625rem,0.357rem_+_0.714vw,1rem)] font-book leading-[142%] tracking-[-0.3px] text-argenpesos-textos md:tracking-[-0.48px]">
                +54 - 1171448040
              </p>
            </a>
          </div>
          <a
            href="mailto:consultas@argencompras.com.ar"
            className="flex gap-1 items-center mb-[18px] md:gap-3 md:pt-2 lg:pointer-events-none"
          >
            <IconEmail className="md:w-[18px] md:h-[18px] lg:w-[24px] lg:h-[22px]" />
            <p className="text-[clamp(0.625rem,0.357rem_+_0.714vw,1rem)] font-book leading-[142%] tracking-[-0.3px] text-argenpesos-textos md:tracking-[-0.48px]">
              consultas@argencompras.com.ar
            </p>
          </a>
        </div>
      </div>
      <div className="rounded-[24px] border-[1px] border-argenpesos-gray2 p-[18px] container-pad-width">
        <h4 className="text-[clamp(0.563rem,0.072rem_+_1.309vw,1.25rem)] text-argenpesos-textos font-bold leading-[142%] tracking-[-0.27px] mb-3 md:tracking-[-0.6px]">
          Argencred S.A. - Cuit 30-70910041-2 - Reconquista 660 PB CABA
        </h4>
        <p className="text-[clamp(0.5rem,0.321rem_+_0.476vw,0.75rem)] text-[#57575799] font-book leading-[142%] tracking-[-0.24px] mb-3 md:tracking-[-0.36px]">
          Las fotos son a modo ilustrativo. La venta de cualquiera de los
          productos publicados está sujeta a la verificación de stock. Los
          precios online y los planes de financiación para los productos
          presentados o publicados en argencompras.com.ar son válidos
          exclusicamente para la compra vía internet en la página antes
          mencionada. Las especificaciones técnicas y descripciones tán sujetas
          a cambios sin previo aviso.
        </p>
        <div className="md:flex gap-4">
          <p className="text-[clamp(0.563rem,0.366rem_+_0.526vw,0.839rem)] text-argenpesos-textos leading-[142%] tracking-[-0.27px] mb-3">
            Copyright Argencompras - 2024. Todos los derechos reservados.
            Defensa de las y los consumidores
          </p>
          <div className="flex gap-5">
            <a
              href="https://autogestion.produccion.gob.ar/consumidores"
              target="_blank"
              className="text-[clamp(0.75rem,0.686rem_+_0.17vw,0.839rem)] text-argenpesos-textos font-bold leading-[142%] tracking-[-0.36px] md:tracking-[-0.403px]"
            >
              Ingresá acá
            </a>
            <p className="text-[clamp(0.75rem,0.686rem_+_0.17vw,0.839rem)] text-argenpesos-textos font-bold leading-[142%] tracking-[-0.36px] md:tracking-[-0.403px]">
              /
            </p>
            <p
              onClick={() => navigate("repentance")}
              className="text-[clamp(0.75rem,0.686rem_+_0.17vw,0.839rem)] text-argenpesos-textos font-bold leading-[142%] tracking-[-0.36px] md:tracking-[-0.403px] cursor-pointer"
            >
              Botón de arrepentimiento
            </p>
          </div>
        </div>
      </div>
      <div className="md:flex md:items-center md:mt-10 md:justify-between container-pad-width">
        <p className="text-[clamp(0.75rem,0.571rem_+_0.476vw,1rem)] text-center mt-5 text-argenpesos-textos font-book leading-[142%] tracking-[-0.36px] md:mt-0 md:tracking-[-0.48px]">
          Diseñado y desarrollado por{" "}
          <a
            className="font-bold"
            href="https://www.maylandlabs.com/"
            target="_blank"
          >
            Mayland Labs
          </a>
        </p>
        <div className="hidden md:flex gap-10">
          <a
            href="https://wa.me/+5491171448040"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWhatsapp className="w-[20px] h-[20px] cursor-pointer" />
          </a>
          <a href="https://www.facebook.com/argencompras.ok" target="_blank">
            <IconFb className="cursor-pointer" />
          </a>
          <a href="https://www.instagram.com/argencompras" target="_blank">
            <IconIg className="cursor-pointer" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
