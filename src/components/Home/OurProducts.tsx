import { useNavigate } from "react-router-dom";
import useWindowWidth from "../../utils/hooks/useWindowWidth";
import { useDispatch } from "react-redux";
import { setNavExplore } from "../../redux/reducers/filters";

const OurProducts = () => {
  const width = useWindowWidth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickCategory = (id: string) => {
    dispatch(setNavExplore(id));
    navigate("/explore");
  };
  return (
    <div className="pt-14 pb-10 container-pad-width lg:pt-36">
      <h4 className="text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] font-book leading-[120%] tracking-[-0.6px] text-argenpesos-textos mb-5 lg:mb-10 lg:tracking-[-1.2px]">
        Nuestros productos
      </h4>

      <div className="grid grid-cols-1 grid-rows-6 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 flex-col gap-5 lg:h-[550px] lg:grid-rows-6">
        <div className="bg-[#A9E7FF] group w-full h-[180px] rounded-[4.4px] lg:rounded-[8px] flex lg:col-span-2 lg:row-span-3 lg:col-start-1 lg:px-5 max-w-[400px] mx-auto lg:max-w-full lg:m-0 lg:h-full lg:justify-between overflow-hidden">
          <div className="flex flex-col justify-center pl-4">
            <p className="text-[clamp(1.25rem,1.026rem_+_0.596vw,1.563rem)] font-bold leading-[120%] tracking-[-0.6px] text-argenpesos-textos">
              Celulares
            </p>
            <p className="text-[clamp(0.75rem,0.566rem_+_0.476vw,1rem)] mb-2 font-book leading-[120%] tracking-[-0.42px] text-argenpesos-textos lg:mb-5 lg:mt-1">
              Lo mejor en teléfonos celulares
            </p>
            <button
              className="w-[150px] h-[31.4px] bg-[#F35F4D] hover:bg-[#d75c4c] transition-all text-[12px] rounded-full text-argenpesos-white leading-[142%] tracking-[-0.36px] lg:w-[210px] xl:w-[264px] lg:text-[16px] lg:h-[44px] font-bold"
              onClick={() => handleClickCategory("1")}
            >
              {width < 1024 ? "Ver celulares" : "Ver todos los celulares"}
            </button>
          </div>
          {width < 1024 ? (
            <img
              className="w-[118px] h-[152px] ml-4 lg:ml-0 mt-[28px] lg:mt-5 lg:mb-5 lg:max-h-full"
              src="/home/image_3.png"
              alt="image"
            />
          ) : (
            <img
              className="mt-10 xl:w-[235px] group-hover:scale-105 ease-in transition-all duration-300 group-hover:-rotate-90 group-hover:translate-x-5 group-hover:-translate-y-5"
              src="/home/image_3_desktop.png"
              alt="image"
            />
          )}
        </div>
        <div className="bg-argenpesos-gray overflow-hidden group w-full h-[180px] rounded-[4.4px] flex px-10 justify-center lg:h-full gap-5 max-w-[400px] mx-auto lg:max-w-full lg:m-0 lg:row-span-4 lg:flex-col-reverse lg:px-0">
          <img
            className="w-[153px] h-[153px] object-cover mx-auto group-hover:scale-125 transition-all duration-300 lg:h-full mt-7 lg:w-full xl:w-[260px] lg:mt-0 lg:pr-8"
            src="/home/image_2.png"
            alt="image"
          />
          <div className="flex flex-col justify-center mr-10 lg:items-center lg:mr-0 lg:mt-5">
            <p className="text-[clamp(1.25rem,1.026rem_+_0.596vw,1.563rem)] font-bold leading-[120%] tracking-[-0.6px] text-argenpesos-textos">
              Parlantes
            </p>
            <p className="text-[clamp(0.75rem,0.566rem_+_0.476vw,1rem)] mb-2 font-book leading-[120%] tracking-[-0.42px] text-argenpesos-textos">
              Variedad de equipos de audio
            </p>
            <button
              className="w-[150px] h-[31.4px] bg-[#F35F4D] hover:bg-[#d75c4c] transition-all text-[12px] rounded-full text-argenpesos-white leading-[142%] lg:w-[200px] tracking-[-0.36px] xl:w-[244px] lg:text-[16px] lg:h-[44px] font-bold"
              onClick={() => handleClickCategory("3")}
            >
              {width < 1024 ? "Ver parlantes" : "Ver todos los parlantes"}
            </button>
          </div>
        </div>
        <div className="bg-[#ED1A00B2] overflow-hidden group w-full h-[180px] rounded-[4.4px] flex lg:flex-col lg:justify-center max-w-[400px] mx-auto lg:max-w-full lg:m-0 lg:col-span-1 lg:row-span-4 lg:h-full ">
          <div className="flex flex-col justify-center pl-5 lg:px-0 lg:items-center lg:mb-5">
            <p className="text-[clamp(1.25rem,1.026rem_+_0.596vw,1.563rem)] font-bold leading-[120%] tracking-[-0.6px] text-argenpesos-white">
              Auriculares
            </p>
            <p className="text-[clamp(0.75rem,0.566rem_+_0.476vw,1rem)] mb-2 font-book leading-[120%] tracking-[-0.42px] text-argenpesos-white">
              Bluetooth, cable
            </p>
            <button
              className="w-[150px] h-[31.4px] bg-argenpesos-white hover:bg-[#f3f0f0] transition-all text-[12px] rounded-full text-argenpesos-textos font-bold leading-[142%] lg:w-[210px] tracking-[-0.36px] lg:text-[16px] xl:w-[244px] lg:h-[44px]"
              onClick={() => handleClickCategory("4")}
            >
              {width < 1024 ? "Ver auriculares" : "Ver todos los auriculares"}
            </button>
          </div>
          {width < 1024 ? (
            <img
              className="w-full h-[152px] lg:ml-0 mt-[28px] lg:mt-5 lg:mb-5 lg:max-h-full"
              src="/home/image_1.png"
              alt="image"
            />
          ) : (
            <div className="flex-col gap-1 mt-5">
              <img
                className="mb-2 w-full transition-all duration-300 group-hover:translate-x-3"
                src="/home/image_1_desktop_3.png"
                alt="image"
              />
              <img
                className="mb-2 w-full group-hover:-translate-x-3 transition-all duration-300"
                src="/home/image_1_desktop_2.png"
                alt="image"
              />
              <img
                className="w-full group-hover:scale-105 transition-all duration-300 group-hover:translate-x-3"
                src="/home/image_1_desktop_1.png"
                alt="image"
              />
            </div>
          )}
        </div>
        <div className="bg-argenpesos-gray group h-[180px] w-full rounded-[4.4px] flex lg:h-full lg:flex-col-reverse max-w-[400px] mx-auto lg:max-w-full lg:m-0 lg:row-span-3 overflow-hidden">
          {width < 1024 ? (
            <img
              className="w-full h-[120px] mt-[35px] lg:mx-auto lg:hidden"
              src="/home/image_5.png"
              alt="image"
            />
          ) : (
            <img className="group-hover:scale-110 transition-all duration-300" src="/home/image_5_desktop.png" alt="image" />
          )}
          <div className="flex flex-col justify-center pl-4 pr-4 lg:p-0 lg:items-center lg:mb-3 ">
            <p className="text-[clamp(1.25rem,1.026rem_+_0.596vw,1.563rem)] font-bold leading-[120%] tracking-[-0.6px] text-argenpesos-textos">
              Cocina
            </p>
            <p className="text-[clamp(0.75rem,0.566rem_+_0.476vw,1rem)] mb-2 font-book leading-[120%] tracking-[-0.42px] text-argenpesos-textos">
              Diferentes productos de cocina
            </p>
            <button
              className="w-[clamp(9.375rem,5.089rem_+_11.429vw,15.375rem)] hover:bg-[#d75c4c] transition-all h-[31.4px] bg-[#F35F4D] text-[12px] rounded-full text-argenpesos-white  leading-[142%] tracking-[-0.36px] lg:text-[16px] lg:h-[44px] lg:w-[225px] font-bold lg:mx-auto"
              onClick={() => handleClickCategory("5")}
            >
              {width < 1024 ? "Ver cocina" : "Ver todos los productos"}
            </button>
          </div>
        </div>
        <div className="bg-argenpesos-gray overflow-hidden group w-full h-[180px] lg:h-full rounded-[4.4px] lg:rounded-[8px] flex lg:px-5 max-w-[400px] mx-auto lg:max-w-full lg:m-0 lg:row-span-3 lg:relative lg:row-start-4">
          <div className="flex flex-col justify-center pl-4 lg:justify-start lg:pt-5 lg:items-center lg:pl-0">
            <p className="text-[clamp(1.25rem,1.026rem_+_0.596vw,1.563rem)] font-bold leading-[120%] tracking-[-0.6px] text-argenpesos-textos">
              Hogar
            </p>
            <p className="text-[clamp(0.75rem,0.566rem_+_0.476vw,1rem)] mb-2 font-book leading-[120%] tracking-[-0.42px] text-argenpesos-textos">
              Productos para tu hogar
            </p>
            <button
              className="w-[150px] h-[31.4px] bg-[#F35F4D] hover:bg-[#d75c4c] transition-all text-[12px] rounded-full text-argenpesos-white leading-[142%] tracking-[-0.36px] xl:w-[225px] lg:text-[16px] lg:h-[44px] font-bold lg:w-[225px] lg:z-[100]"
              onClick={() => handleClickCategory("6")}
            >
              {width < 1024 ? "Ver hogar" : "Ver todos los productos"}
            </button>
          </div>
          <img
            className="w-full h-full lg:ml-0 lg:mt-8 lg:mb-5 lg:max-h-full mix-blend-multiply lg:absolute group-hover:translate-x-5 transition-all duration-300 group-hover:-translate-y-3"
            src="/home/image_6.png"
            alt="image"
          />
        </div>
        <div className="bg-[#ED1A00B2] group h-[180px] w-full rounded-[4.4px] flex lg:h-full overflow-hidden lg:p-5 max-w-[400px] mx-auto lg:max-w-full lg:m-0 lg:col-span-2 lg:row-span-2 lg:flex-row lg:justify-between lg:px-10">
          {width < 1024 ? (
            <img
              className="w-full h-[150px] mt-[2.1rem] max-w-[185px] object-cover lg:mt-0 lg:w-full"
              src="/home/image_7.png"
              alt="image"
            />
          ) : (
            <img
              className="w-[200px] h-[160px] group-hover:scale-110 transition-all duration-300 group-hover:-translate-y-3 group-hover:-rotate-6"
              src="/home/image_7_desktop.png"
              alt="image"
            />
          )}
          <div className="flex flex-col justify-center pl-4 pr-4 lg:p-0">
            <p className="text-[clamp(1.25rem,1.026rem_+_0.596vw,1.563rem)] font-bold leading-[120%] tracking-[-0.6px] text-argenpesos-white">
              Smartwatches
            </p>
            <p className="text-[clamp(0.75rem,0.566rem_+_0.476vw,1rem)] mb-2 font-book leading-[120%] tracking-[-0.42px] text-argenpesos-white">
              Relojes inteligentes
            </p>
            <button
              className="w-[clamp(9.375rem,5.089rem_+_11.429vw,15.375rem)] h-[31.4px] bg-argenpesos-white hover:bg-[#f3f0f0] transition-all text-[12px] rounded-full text-argenpesos-textos  leading-[142%] tracking-[-0.36px] lg:text-[16px] lg:w-[240px] xl:w-[267px] lg:h-[44px] font-bold lg:mx-auto"
              onClick={() => handleClickCategory("2")}
            >
              {width < 1024 ? "Ver smartwatches" : "Ver todos los smartwatches"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProducts;
