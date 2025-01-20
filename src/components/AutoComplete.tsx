import React, { useState } from "react";
import { Province, provinces } from "../pages/Payment/Delivery/province";
import InputGeneral from "./InputGeneral"; // Asegúrate de la ruta correcta

type Props = {
  onSelectCity: (selectedCity: string) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data: { province: string; city: string };
};

const Autocomplete: React.FC<Props> = ({ onSelectCity, onChange, data }) => {
  const [filteredProvinces, setFilteredProvinces] =
    useState<Province[]>(provinces);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [_, setVisible] = useState<boolean>(false);

  const handleProvinceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onChange(event);
    setFilteredProvinces(
      provinces.filter((province) =>
        province.province.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
    setSelectedProvince(null);
    setFilteredCities([]);
  };

  const handleProvinceSelect = (province: Province) => {
    setSelectedProvince(province);
    onChange({
      target: { value: province.province, name: "province" } as any,
    } as React.ChangeEvent<HTMLInputElement>);
    setFilteredCities(province.cities);
    setFilteredProvinces([]);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onChange(event);
    if (selectedProvince) {
      setFilteredCities(
        selectedProvince.cities.filter((city) =>
          city.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  };

  const handleCitySelect = (city: string) => {
    onSelectCity(city);
    onChange({
      target: { name: "city", value: city } as any,
    } as React.ChangeEvent<HTMLInputElement>);
    setFilteredCities([]);
  };

  return (
    <div className="relative w-full flex gap-5">
      <div className="relative w-full" onClick={() => setVisible(true)}>
        <InputGeneral
          onChange={handleProvinceChange}
          value={data.province}
          name="province"
          label="Provincia"
          className="text-[16px] text-[#111827CC] font-light"
        />
        {filteredProvinces.length > 0 && !selectedProvince && (
          <ul
            className={
              "absolute w-[100%] bg-white border border-gray-300 mt-1 rounded max-h-40 overflow-y-auto z-[100]"
            }
          >
            {filteredProvinces.map((province) => (
              <li
                key={province.id}
                onClick={(_) => handleProvinceSelect(province)}
                className="p-2 hover:bg-gray-100 cursor-pointer text-[14px] font-book text-argenpesos-textos leading-[100%]"
              >
                {province.province}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative w-full">
        <InputGeneral
          onChange={handleCityChange}
          value={data.city}
          name="city"
          label="Ciudad"
          className="text-[16px] text-[#111827CC] font-light w-"
        />
        {filteredCities.length > 0 && (
          <ul
            className={
              "absolute w-[100%] bg-white border border-gray-300 mt-1 rounded max-h-60 overflow-y-auto z-[100]"
            }
          >
            {filteredCities.map((city) => (
              <li
                key={city}
                onClick={() => handleCitySelect(city)}
                className="p-2 hover:bg-gray-100 cursor-pointer text-[14px] font-book text-argenpesos-textos leading-[100%]"
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Autocomplete;
