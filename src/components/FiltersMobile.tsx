import ButtonFilter from "./ButtonFilter";
import { IconX } from "../utils/svg";
import PriceRangeSlider from "./PrinceRangeSlider";

interface ButtonGroup {
  [key: string]: boolean;
}

interface FilterGroupProps {
  buttonGroups: {
    group1: ButtonGroup;
    group2: ButtonGroup;
    group3: ButtonGroup;
  };
  handleClick: (
    group: "group1" | "group2" | "group3",
    buttonId: string,
    type: "category" | "brand" | "price",
    value?: number
  ) => void;
  handlePriceChange?: (min: number, max: number) => void;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  minPrice?: number;
  maxPrice?: number;
}

const FiltersMobile: React.FC<FilterGroupProps> = ({
  buttonGroups,
  handleClick,
  handlePriceChange,
  closeModal,
  minPrice,
  maxPrice
}) => {
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
    handleClick(group, id, type);
  };

  return (
    <div className={`flex-row gap-5 mb-10 mt-8`}>
      <div className="flex justify-between px-7 mb-9">
        <span>Filtros</span>
        <IconX 
          onClick={() => closeModal(false)} 
        />
      </div>
      <div className="flex flex-col px-7">
        <span className="font-book text-[16px]">Categorías</span>
        <div className="flex flex-col my-7 gap-5">
          <span className="text-argenpesos-gray3 text-[14px]">
            Tecnología y dispositivos
          </span>
          <div className="flex gap-4">
            <ButtonFilter
              id={"Celulares"}
              changeColor={
                buttonGroups.group1[1]
              }
              handleClick={() => handleEntrieClick("group1", "1", "category")}
              label={"Celulares"}
              className="w-fit p-3"
              mainClass="w-fit"
            />
            <ButtonFilter
              id={"Smartwatches"}
              changeColor={
                buttonGroups.group1[2]
              }
              handleClick={() =>
                handleEntrieClick("group1", "2", "category")
              }
              label={"Smartwatches"}
              className="w-fit p-3"
              mainClass="w-fit"
            />
          </div>
        </div>
        <div className="flex flex-col my-7 gap-5">
          <span className="text-argenpesos-gray3 text-[14px]">
            Audio y sonido
          </span>
          <div className="flex gap-4">
            <ButtonFilter
              id={"Parlantes"}
              changeColor={
                buttonGroups.group1[3]
              }
              handleClick={() => handleEntrieClick("group1", "3", "category")}
              label={"Parlantes"}
              className="w-fit p-3"
              mainClass="w-fit"
            />
            <ButtonFilter
              id={"Auriculares"}
              changeColor={
                buttonGroups.group1[4]
              }
              handleClick={() => handleEntrieClick("group1", "4", "category")}
              label={"Auriculares"}
              className="w-fit p-3"
              mainClass="w-fit"
            />
          </div>
        </div>
        <div className="flex flex-col my-7 gap-5">
          <span className="text-argenpesos-gray3 text-[14px]">
            Electrodomésticos
          </span>
          <div className="flex gap-4">
            <ButtonFilter
              id={"Cocina"}
              changeColor={buttonGroups.group1[5]}
              handleClick={() => handleEntrieClick("group1", "5", "category")}
              label={"Cocina"}
              className="w-fit p-3"
              mainClass="w-fit"
            />
            <ButtonFilter
              id={"Hogar"}
              changeColor={buttonGroups.group1[6]}
              handleClick={() => handleEntrieClick("group1", "6", "category")}
              label={"Hogar"}
              className="w-fit p-3"
              mainClass="w-fit"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col px-7">
        <span className="font-book text-[16px]">Rango de precio</span>
        <div className="flex flex-col my-7 gap-5">
          <span className="text-argenpesos-gray3 text-[14px]">Ordenar por</span>
          <div className="flex gap-4">
            <ButtonFilter
              id={"Los más caros"}
              changeColor={
                buttonGroups.group2.button1
              }
              handleClick={() => handleClick("group2", "button1", "price", -1)}
              label={"Los más caros"}
              className="w-fit p-3"
              mainClass="w-fit"
            />
            <ButtonFilter
              id={"Los más baratos"}
              changeColor={
                buttonGroups.group2.button2
              }
              handleClick={() => handleClick("group2", "button2", "price", 1)}
              label={"Los más baratos"}
              className="w-fit p-3"
              mainClass="w-fit"
            />
          </div>
        </div>
        <div className="flex flex-col my-7 gap-5">
          <span className="text-argenpesos-gray3 text-[14px]">Rango</span>
          <div className="flex gap-4">
            <PriceRangeSlider onPriceChange={handlePriceChangeInternal} minPrice={minPrice} maxPrice={maxPrice}/>
          </div>
        </div>
        <div className="flex flex-col my-7 gap-5">
          <span className="text-argenpesos-gray3 text-[14px]">Marcas</span>
          <div className="flex gap-4 flex-wrap">
            {["Motorola", "Samsung", "Huawei", "Peabody", "Nokia"].map(
              (item, index) => (
                <ButtonFilter
                  id={item}
                  changeColor={buttonGroups.group3[index]}
                  handleClick={() =>  handleClick(
                    "group3",
                    item,
                    "brand"
                  )}
                  label={item}
                  className="w-fit p-3"
                  mainClass="w-fit"
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersMobile;
