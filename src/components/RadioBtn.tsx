import { Address } from "../utils/interface";

interface RadioProps {
  state: string | null;
  handleChange: Function;
  id: string;
  name: string;
  value: string;
  classname?: string;
  address?: Address;
}

const RadioBtn = ({
  state,
  handleChange,
  id,
  name,
  value,
  classname,
  address,
}: RadioProps) => {
  return (
    <div
      className="flex gap-2 mb-6 items-center cursor-pointer"
      onClick={() => handleChange(value, address)}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className="hidden peer"
        checked={state === name}
      />
      <label
        htmlFor={id}
        className={`relative w-4 h-4 border-2 border-gray-500 rounded-full cursor-pointer ${
          state === value && "border-red-400"
        }`}
      >
        <span
          className={`absolute top-1/2 left-1/2 w-2 h-2 bg-red-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 scale-0 ${
            state === value && "scale-100"
          }`}
        ></span>
      </label>
      <p
        className={`${
          classname
            ? classname
            : "text-[clamp(0.73rem,0.359rem_+_0.99vw,1.25rem)] font-book"
        }`}
      >
        {address
          ? `${address.street} ${address.number} ${address.zipCode}, ${address.city}, ${address.province} `
          : name}
      </p>
    </div>
  );
};

export default RadioBtn;
