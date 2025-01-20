import Button from "../../components/Button";
import RecomenProducts from "../../components/Home/RecomenProducts";
import { ArrowRight, DownArrow, IconMas } from "../../utils/svg";

const Product = () => {
  return (
    <div className="px-5 container-pad-width">
      <div className="flex md:hidden items-center gap-4 mb-6">
        <p className="text-argenpesos-red text-[14.745px] font-book">
          Celulares
        </p>
        <ArrowRight />
        <p className="text-argenpesos-red text-[14.745px] font-book">
          Motorola
        </p>
      </div>
      <h4 className="md:hidden text-[25px] font-book text-argenpesos-textos leading-[120%] tracking-[-0.75px] mb-10">
        Motorola E22 64GB
      </h4>
      <div className="md:flex md:mt-[4rem]">
        <div className="hidden md:flex flex-col space-y-[43px]  px-4 items-center ">
          <img
            className="w-[72px] h-[78px]"
            src="/product/image_1.png"
            alt=""
          />
          <img
            className="w-[72px] h-[78px]"
            src="/product/image_1.png"
            alt=""
          />
          <img
            className="w-[72px] h-[78px]"
            src="/product/image_1.png"
            alt=""
          />
        </div>
        <div className="w-full md:w-[35rem] h-[335.637px] md:h-[35rem]  md:max-w-[35rem] md:mx-[3rem] lg:mx-[5rem] bg-argenpesos-gray rounded-[31.031px] flex items-center justify-center relative">
          <div className="md:hidden absolute left-3 top-7 bg-argenpesos-white w-[53px] h-[26px] flex items-center justify-center rounded-full">
            <p className="text-[12px] font-book">1/4</p>
          </div>
          <img
            src="/product/image_1.png"
            className="md:w-[55%]  md:min-w-[50%] lg:min-h-[50%]"
            alt="image"
          />
          <div className="absolute right-5 top-7">
            <IconMas className="w-[26px] h-[26px]" />
          </div>
        </div>
        <div className="flex md:hidden justify-center mt-4 mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`w-[6.56px] h-[6.56px] m-1 flex items-center justify-center rounded-full ${
                index === 0 ? "bg-argenpesos-red" : "bg-argenpesos-gray3"
              }`}
            ></div>
          ))}
        </div>
        <div>
          <div className="hidden md:flex items-center gap-4 mb-2">
            <p className="text-argenpesos-red text-[14.745px] font-book">
              Celulares
            </p>
            <ArrowRight />
            <p className="text-argenpesos-red text-[14.745px] font-book">
              Motorola
            </p>
          </div>
          <h4 className="hidden md:flex font-bold text-[33px] font-book text-argenpesos-textos leading-[120%] tracking-[-0.75px] mb-2 lg:text-[40px]">
            Motorola E22 64GB
          </h4>
          <h4 className="text-[25px]  text-argenpesos-red font-book mb-3 lg:text-[35px]">
            6 cuotas fijas de $75.000*
          </h4>
          <p className="text-argenpesos-gray3  font-book text-[12px] mb-3">
            *Sujeto a riesgo crediticio
          </p>
          <p className="mb-4 md:mb-2 md:text-lg text-argenpesos-textos font-book text-[14px]">
            $250.000 al contado
          </p>

          <div className="flex justify-between md:flex-col mb-10 md:mb-6">
            <div className="flex rounded-[8px] md:rounded-none border-[1px] md:mb-[0.75rem] md:border-none border-solid border-argenpesos-textos w-[160px] md:w-[200px] h-[40px] justify-center md:justify-normal items-center gap-2">
              <p className="text-[12px] md:text-base text-argenpesos-textos font-book">
                Cantidad
              </p>
              <p className="text-[12px] md:text-base font-bold text-argenpesos-textos">
                1 unidad
              </p>
              <DownArrow />
            </div>

            <div className="flex rounded-[8px] md:justify-normal md:px-0 md:border-none border-[1px] border-solid border-argenpesos-textos w-[160px] h-[40px] justify-between px-4 items-center">
              <div className="flex items-center md:flex-col md:items-start gap-2">
                <div className="md:hidden w-[12px] h-[12px]  bg-argenpesos-textos rounded-full"></div>
                <p className="text-[12px] md:text-lg font-bold text-argenpesos-textos">
                  Color
                </p>
                <div className="hidden md:flex  space-x-[1.70rem]">
                  <div className="w-[15px] h-[15px]  bg-argenpesos-textos rounded-full"></div>
                  <div className="w-[15px] h-[15px]  bg-blue-500 color-green rounded-full"></div>
                  <div className="w-[15px] h-[15px]  bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="md:hidden">
                <DownArrow />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <p className="text-[12px] md:text-base md:leading-tight text-argenpesos-textos font-bold leading-[122%]">
              Memoria RAM: <span className="font-book">4 GB</span>
            </p>
            <p className="text-[12px] md:text-base md:leading-tight text-argenpesos-textos font-bold leading-[122%]">
              Memoria interna: <span className="font-book">64 GB</span>
            </p>
            <p className="text-[12px] md:text-base md:leading-tight text-argenpesos-textos font-bold leading-[122%]">
              Liberado: <span className="font-book">Si</span>
            </p>
            <p className="text-[12px] md:text-base md:leading-tight text-argenpesos-textos font-bold leading-[122%]">
              Pantalla: <span className="font-book">6.5"</span>
            </p>
            <p className="text-[12px] md:text-base md:leading-tight text-argenpesos-textos font-bold leading-[122%]">
              Cámara delantera: <span className="font-book">5 Mpx</span>
            </p>
            <p className="text-[12px] md:text-base md:leading-tight text-argenpesos-textos font-bold leading-[122%]">
              Batería: <span className="font-book">4020 mAh</span>
            </p>
          </div>

          <Button className="mx-0 max-w-[274px]" text="Comprar" />
        </div>
      </div>
      <RecomenProducts />
    </div>
  );
};

export default Product;
