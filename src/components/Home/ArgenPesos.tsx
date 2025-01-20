import { IconAndroid, IconApple } from "../../utils/svg";

const ArgenPesos = () => {
  return (
    <div className="mb-3 group mt-10 lg:mt-28 lg:mb-20 container-pad-width bg-gradient-to-tl from-argenpesos-skyBlue to-[#06a0dd] rounded-[9.5px] lg:rounded-[27px] overflow-hidden">
      <div className="flex flex-col items-center text-center w-full h-[clamp(29.563rem,16.081rem_+_35.952vw,48.438rem)] z-[-100] rounded-[9.5px] pt-[43px] sm:pt-[21px] lg:flex-row lg:justify-evenly lg:pt-36 lg:rounded-[27px]">
        <div className="flex flex-col lg:w-[50%] items-center lg:justify-start h-full mt-5">
          <img
            className="w-[clamp(7.454rem,0.725rem_+_17.945vw,16.875rem)] h-[clamp(1.564rem,0.15rem_+_3.77vw,3.543rem)] mb-4 "
            src="/home/logo_argenpesos_white.png"
            alt="logo"
          />
          <p className="text-[clamp(1.125rem,0.203rem_+_2.459vw,2.416rem)] font-bold text-argenpesos-white leading-[120%] tracking-[-0.54px] max-w-[224px] mb-4 lg:max-w-[480px]">
            ¿Todavía no descargaste la app de ArgenPesos?
          </p>
          <p className="text-[clamp(0.75rem,0.135rem_+_1.64vw,1.611rem)] text-argenpesos-white font-book leading-[120%] tracking-[-0.36px] max-w-[234px] lg:max-w-[480px] mb-10 md:mb-5 lg:mb-14">
            Recibe préstamos, compra productos, obtén descuentos y más
            beneficios.
          </p>
          <div className="hidden lg:flex gap-4">
            <button className="flex items-center justify-center gap-2 w-[222px] h-[48px] bg-argenpesos-white rounded-[8px] text-[16px] font-bold text-argenpesos-skyBlue tracking-[-0.48px] leading-[142%]">
              <IconAndroid /> Google Play
            </button>
            <button className="flex items-center justify-center gap-2 w-[222px] h-[48px] bg-argenpesos-white rounded-[8px] text-[16px] font-bold text-argenpesos-skyBlue tracking-[-0.48px] leading-[142%]">
              <IconApple /> App store
            </button>
          </div>
        </div>
        <div className="h-screen w-full flex flex-col items-center rounded-[9.5px] lg:w-[30%] lg:justify-end lg:h-full">
          <div className="flex mb-[43px] gap-5">
            <img
              className="w-[114.589px] h-[32.053px] sm:hidden"
              src="/home/image_apple.png"
              alt="logo"
            />
            <img
              className="w-[114.589px] h-[32.053px] sm:hidden"
              src="/home/image_google.png"
              alt="logo"
            />
          </div>
          <img
            className="w-[160px] h-[165.195px] sm:h-full sm:w-[200px] lg:hidden"
            src="/home/image_mobile.png"
            alt="logo"
          />
          <img
            className="hidden lg:flex rotate-[5deg] relative top-4 group-hover:scale-110 group-hover:rotate-0 group-hover:-translate-y-10 duration-300 ease-in-out"
            src="/home/img_mobile_desktop.png"
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
};

export default ArgenPesos;
