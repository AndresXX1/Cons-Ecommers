import React, { useRef } from "react";
import { ArrowRight } from "../utils/svg";
import ButtonFilter from "./ButtonFilter";
import { Brand, Category } from "../utils/interface";
import PriceRangeSlider from "./PrinceRangeSlider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setNavExplore } from "../redux/reducers/filters";

interface ButtonGroup {
  [key: string]: boolean;
}

interface FilterGroupProps {
  buttonGroups: {
    group1: ButtonGroup;
    group2: ButtonGroup;
    group3: ButtonGroup;
  };
  isAnyButtonActive: (group: string) => boolean;
  handleClick: (
    group: "group1" | "group2" | "group3",
    buttonId: string,
    type: "category" | "brand" | "price",
    value?: number
  ) => void;

  toggleVisibility: (item: string) => void;
  handleMouseLeave: (item: string) => void;
  visibleItem: string;
  className?: string;
  category?: Category[];
  brand?: Brand[];
  handlePriceChange?: (min: number, max: number) => void;
  resetFilters?: () => void;
}

const FilterGroup: React.FC<FilterGroupProps> = ({
  buttonGroups,
  isAnyButtonActive,
  handleClick,
  toggleVisibility,
  handleMouseLeave,
  visibleItem,
  className,
  category,
  handlePriceChange,
  brand,
  resetFilters,
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const { navExplore } = useSelector((state: RootState) => state.filters);
  const handlePriceChangeInternal = (min: number, max: number) => {
    if (handlePriceChange) {
      handlePriceChange(min, max);
    } else {
      console.error("handlePriceChange is undefined");
    }
  };

  const handleEntrieClick = (
    group: "group1" | "group2" | "group3",
    id: string,
    type: "category" | "brand" | "price"
  ) => {
    id === navExplore && dispatch(setNavExplore(""));
    handleClick(group, id, type);
  };

  return (
    <div className={`lg:flex flex-row gap-5 mb-10 mt-8 ${className}`}>
      <div
        className={`flex w-[82px] h-[32px] lg:w-[180px] lg:h-[53px] border-[1px] border-solid px-1 rounded-full items-center justify-center gap-2 mt-6 lg:justify-between lg:px-5 relative ${
          isAnyButtonActive("group1")
            ? "border-argenpesos-red"
            : "border-argenpesos-gray2"
        }`}
      >
        <div
          className={`absolute right-14 top-14 w-[0px] ${
            visibleItem ? "z-50" : "z-0"
          }`}
        >
          <div
            ref={menuRef}
            className={`transition-all duration-2000 ease-in-out ${
              visibleItem === "menu"
                ? "opacity-100 h-[13.5rem] w-[24rem]"
                : "opacity-0 max-h-0 z-[0]"
            } bg-argenpesos-white border-[1px] border-solid border-argenpesos-gray rounded-[7px] w-[158px] relative right-[7rem] z-[100]`}
            onMouseLeave={() => handleMouseLeave("menu")}
          >
            <div className="grid grid-cols-2 gap-3 pt-[1.5rem] px-5">
              {category?.map((category) => {
                const isExplore =
                  category.id === navExplore
                    ? true
                    : buttonGroups.group1[category.id];
                return (
                  <div
                    key={category.id}
                    className="flex text-base h-[2.125rem] text-[#575757] font-book"
                  >
                    <ButtonFilter
                      id={category.id}
                      changeColor={isExplore}
                      handleClick={() =>
                        handleEntrieClick("group1", category.id, "category")
                      }
                      label={category.name ? category.name : ""}
                      className="w-full"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          onClick={() => toggleVisibility("menu")}
          className="cursor-pointer py-4"
        >
          <div className="flex cursor-pointer flex-row space-x-10 items-center justify-between">
            <div>
              <p
                className={`text-[10px] lg:text-[16px] font-book ${
                  isAnyButtonActive("group1")
                    ? "text-argenpesos-red"
                    : "text-argenpesos-textos"
                }`}
              >
                Categorías
              </p>
            </div>
            <div>
              <ArrowRight
                color={isAnyButtonActive("group1") ? "#ED1A00" : ""}
                className="hidden lg:flex rotate-90"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Precio */}
      <div
        className={`flex w-[82px] h-[32px] lg:w-[180px] lg:h-[53px] border-[1px] border-solid px-1 rounded-full items-center justify-center gap-2 mt-6 lg:justify-between lg:px-5 relative ${
          isAnyButtonActive("group2")
            ? "border-argenpesos-red"
            : "border-argenpesos-gray2"
        }`}
      >
        <div
          className={`absolute right-14 top-14 w-[0px] ${
            visibleItem ? "z-50" : "z-0"
          }`}
        >
          <div
            ref={categoryRef}
            className={`transition-all duration-2000 ease-in-out ${
              visibleItem === "category"
                ? "opacity-100 h-[17rem] w-[23rem]"
                : "opacity-0 max-h-0 z-[0] hidden"
            } bg-argenpesos-white border-[1px] border-solid border-argenpesos-gray rounded-[7px] w-[158px] relative right-[7rem] z-[100]`}
            onMouseLeave={() => handleMouseLeave("category")}
          >
            <div className="flex flex-col gap-3">
              <p className="pl-[1rem] pt-[1rem] font-book text-[#575757] text-lg text-opacity-[0.6]">
                Ordenar por
              </p>
              <div className="flex text-base w-[22rem] h-[2.125rem] justify-center text-[#575757] font-book px-5 gap-3">
                <ButtonFilter
                  id="button1"
                  changeColor={buttonGroups.group2.button1}
                  handleClick={() =>
                    handleClick("group2", "button1", "price", -1)
                  }
                  label="Los más caros"
                  className="w-[90%]"
                />
                <ButtonFilter
                  id="button2"
                  changeColor={buttonGroups.group2.button2}
                  handleClick={() =>
                    handleClick("group2", "button2", "price", 1)
                  }
                  label="Los más baratos"
                  className="w-[90%]"
                />
              </div>

              <div className="flex pt-3 text-base space-x-5 justify-center text-[#575757] font-book">
                <PriceRangeSlider onPriceChange={handlePriceChangeInternal} />
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => toggleVisibility("category")}
          className="cursor-pointer py-4 w-full"
        >
          <div className="flex cursor-pointer flex-row space-x-10 items-center justify-between">
            <div>
              <p
                className={`text-[10px] lg:text-[16px] font-book ${
                  isAnyButtonActive("group2")
                    ? "text-argenpesos-red"
                    : "text-argenpesos-textos"
                }`}
              >
                Precio
              </p>
            </div>
            <div>
              <ArrowRight
                color={isAnyButtonActive("group2") ? "#ED1A00" : ""}
                className="hidden lg:flex rotate-90"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div
        className={`flex w-[82px] h-[32px] lg:w-[180px] lg:h-[53px] border-[1px] border-solid px-1 rounded-full items-center justify-center gap-2 mt-6 lg:justify-between lg:px-5 relative ${
          isAnyButtonActive("group3")
            ? "border-argenpesos-red"
            : "border-argenpesos-gray2"
        }`}
      >
        <div
          className={`absolute right-14 top-14 w-[0px] ${
            visibleItem ? "z-50" : "z-0"
          }`}
        >
          <div
            ref={filterRef}
            className={`transition-all duration-2000 ease-in-out ${
              visibleItem === "filter"
                ? "opacity-100 h-[10.5rem] w-[22rem]"
                : "opacity-0 max-h-0 z-[0] hidden"
            } bg-argenpesos-white border-[1px] border-solid border-argenpesos-gray rounded-[7px] w-[158px] relative right-[7rem] z-[100]`}
            onMouseLeave={() => handleMouseLeave("filter")}
          >
            <div className="flex flex-col gap-3 px-5">
              <div className="flex gap-3 pt-[1rem]">
                <div className="grid grid-cols-3 gap-3 pt-[1.5rem]">
                  {brand?.map((brands) => (
                    <div
                      key={brands.id}
                      className="flex text-base w-full h-[2.125rem] justify-center text-[#575757] font-book"
                    >
                      <ButtonFilter
                        id={brands.id.toLocaleString()}
                        changeColor={buttonGroups.group3[brands.id]}
                        handleClick={() =>
                          handleClick(
                            "group3",
                            brands.toLocaleString(),
                            "brand"
                          )
                        }
                        label={brands.name ? brands.name : ""}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => toggleVisibility("filter")}
          className="cursor-pointer py-4 w-full"
        >
          <div className="flex cursor-pointer flex-row space-x-10 items-center justify-between">
            <div>
              <p
                className={`text-[10px] lg:text-[16px] font-book ${
                  isAnyButtonActive("group3")
                    ? "text-argenpesos-red"
                    : "text-argenpesos-textos"
                }`}
              >
                Marcas
              </p>
            </div>
            <div>
              <ArrowRight
                color={isAnyButtonActive("group3") ? "#ED1A00" : ""}
                className="hidden lg:flex rotate-90"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center">
        <p
          onClick={resetFilters}
          className="pt-7 text-argenpesos-red text-[16px] font-book cursor-pointer"
          //style={{display: `${buttonGroups.group1 === {}} ? "none" : "flex"`}}
        >
          Eliminar filtros
        </p>
      </div>
    </div>
  );
};

export default FilterGroup;
