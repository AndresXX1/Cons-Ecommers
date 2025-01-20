import {
  ArrowRight,
  IconHome,
  IconMessages,
  IconSmile,
  IconTruck,
} from "../../utils/svg";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import useWindowWidth from "../../utils/hooks/useWindowWidth";
import { useEffect, useState } from "react";
import {
  getBannersDesktop,
  getBannersMobile,
} from "../../redux/services/banners";
import { apiUrls } from "../../config";

export interface Banner {
  id: string;
  url: string;
}

const Hero = () => {
  const [bannersMobile, setBannersMobile] = useState<Banner[]>([]);
  const [bannersDesktop, setBannersDesktop] = useState<Banner[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const getBannersListMobile = async () => {
    const bannersMobile = await getBannersMobile();
    setBannersMobile(bannersMobile);
  };

  const getBannersListDesktop = async () => {
    const bannersDesktop = await getBannersDesktop();
    setBannersDesktop(bannersDesktop);
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getBannersListMobile(), getBannersListDesktop()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1, spacing: 15 },
    slideChanged(slider) {
      setActiveIndex(slider.track.details.rel);
    },
  });

  const [sliderRef, sliderInstance] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slideChanged(slider) {
        setActiveIndex(slider.track.details.rel);
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  const width = useWindowWidth();

  const handlePrevClick = () => {
    sliderInstance.current?.prev();
  };

  const handleNextClick = () => {
    sliderInstance.current?.next();
  };

  if (loading) {
    return <div>Cargando banners...</div>;
  }

  return (
    <div className="relative container-pad-width max-h-[375px] max-w-[1300px]">
      {width < 1024 ? (
        <div
          className="flex flex-row keen-slider max-h-[400px] w-full"
          ref={ref}
        >
          {bannersMobile?.map((img, key) => (
            <img
              key={key}
              className={`pt-6 opacity-[0.9] w-full mx-auto ${
                bannersMobile?.length > 1 ? "keen-slider__slide" : ""
              }`}
              src={apiUrls.bannerImg(img.url)}
              alt=""
            />
          ))}
        </div>
      ) : null}

      <div className="w-full items-center justify-center min-h-[375px] p-6 lg:p-0 rounded-[27px] lg:mt-10 hidden lg:flex relative flex-col gap-5">
        {width > 1023 ? (
          <div
            className={`flex flex-row keen-slider max-h-[400px] w-full`}
            ref={sliderRef}
          >
            {bannersDesktop?.map((img, key) => (
              <img
                key={key}
                className={`opacity-[0.9] w-full object-cover mx-auto max-w-[1330px] rounded-[27px] ${
                  bannersDesktop?.length > 1
                    ? "keen-slider__slide cursor-pointer min-w-full"
                    : ""
                }`}
                src={apiUrls.bannerImg(img.url)}
                alt=""
              />
            ))}
          </div>
        ) : null}
        <div
          className={`absolute top-16 right-24 flex gap-2 ${
            bannersDesktop?.length < 2 ? "hidden" : ""
          }`}
        >
          <div
            onClick={handlePrevClick}
            className="bg-argenpesos-white h-[46px] flex items-center justify-center w-[46px] rounded-full cursor-pointer"
          >
            <ArrowRight className="rotate-180" />
          </div>
          <div
            onClick={handleNextClick}
            className="bg-argenpesos-white h-[46px] flex items-center justify-center w-[46px] rounded-full cursor-pointer"
          >
            <ArrowRight />
          </div>
        </div>
        <div
          className={`flex justify-center gap-5    ${
            bannersDesktop?.length < 2 ? "hidden" : ""
          }`}
        >
          {bannersDesktop?.map((_, index) => (
            <div
              key={index}
              className={`w-[11.74px] h-[11.74px] m-1 flex items-center justify-center rounded-full ${
                index === activeIndex
                  ? "bg-argenpesos-red"
                  : "bg-argenpesos-gray3"
              }`}
            ></div>
          ))}
        </div>
      </div>
      <div className="absolute left-4 top-10 bg-argenpesos-white w-[53px] h-[26px] flex items-center justify-center rounded-full lg:hidden">
        <p className="text-[12px] font-book text-argenpesos-textos">
          {activeIndex + 1}/{bannersMobile?.length}
        </p>
      </div>
      <div className="absolute bottom-[1rem] left-0 right-0 lg:hidden pointer-events-none">
        <h2 className="text-center text-[1rem] font-book leading-[120%] tracking-[-0.48px] text-argenpesos-white mb-6">
          Las mejores ofertas, desde tu hogar
        </h2>

        <div className="flex justify-evenly mb-5">
          <div className="flex flex-col items-center gap-1">
            <IconSmile />
            <p className="text-[7.33px] text-argenpesos-white font-book leading-[142%] tracking-[-0.214px]">
              Ofertas mensuales
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <IconHome />
            <p className="text-[7.33px] text-argenpesos-white font-book leading-[142%] tracking-[-0.214px]">
              Comprá desde casa
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <IconTruck />
            <p className="text-[7.33px] text-argenpesos-white font-book leading-[142%] tracking-[-0.214px]">
              Envíos a todo el país
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <IconMessages />
            <p className="text-[7.33px] text-argenpesos-white font-book leading-[142%] tracking-[-0.214px]">
              ¿Tenés dudas? Te ayudamos
            </p>
          </div>
        </div>
      </div>
      <div
        className={`flex justify-center mt-4 lg:hidden ${
          bannersMobile?.length < 2 ? "hidden" : ""
        }`}
      >
        {bannersMobile?.map((_, index) => (
          <div
            key={index}
            className={`w-[4.56px] h-[4.56px] m-1 flex items-center justify-center rounded-full ${
              activeIndex === index
                ? "bg-argenpesos-red"
                : "bg-argenpesos-gray3"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
