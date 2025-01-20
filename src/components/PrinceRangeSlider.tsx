import React, { useState, useEffect } from "react";
import { PriceRangeSliderProps } from "../utils/interface";

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  onPriceChange,
  minPrice,
  maxPrice
}) => {

  const initialMinPrice = 5000;
  const fixedMaxPrice = 2000000;

  const [tempMinPrice, setTempMinPrice] = useState<number>(minPrice ? minPrice : initialMinPrice);
  const [prevMinPrice, setPrevMinPrice] = useState<number>(maxPrice ? maxPrice : initialMinPrice);

  useEffect(() => {
    if (tempMinPrice !== prevMinPrice) {
      onPriceChange(tempMinPrice, fixedMaxPrice);
      setPrevMinPrice(tempMinPrice);
    }
  }, [tempMinPrice, fixedMaxPrice, onPriceChange, prevMinPrice]);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setTempMinPrice(value);
  };

  return (
    <div className="w-80">
      <p className="font-book text-[#575757] text-lg text-opacity-[0.6] mb-[1rem]">
        Ordenar por
      </p>
      <div className="flex items-center mb-6">
        <input
          type="range"
          min="5000"
          max="2000000"
          step="5000"
          value={tempMinPrice}
          onChange={handleMinChange}
          className="w-full h-2 bg-argenpesos-red rounded-lg appearance-none cursor-pointer accent-argenpesos-red"
        />
      </div>
      <div className="flex justify-between gap-5 mt-4 text-sm font-bold">
        <div className="flex items-center justify-between px-2 w-[170px] bg-argenpesos-gray h-[34px] rounded-[5px]">
          <p className="text-[16px] font-book text-argenpesos-textos text-opacity-[0.6]">
            Desde:{" "}
          </p>
          <p className="text-[16px] font-book text-argenpesos-textos">
            ${tempMinPrice.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center justify-between px-2 w-[150px] bg-argenpesos-gray h-[34px] rounded-[5px]">
          <p className="text-[16px] font-book text-argenpesos-textos text-opacity-[0.6]">
            Hasta:{" "}
          </p>
          <p className="text-[16px] font-book text-argenpesos-textos">+$2M</p>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
