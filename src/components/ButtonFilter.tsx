export interface ButtonFilterProps {
  label: string;
  changeColor: boolean;
  handleClick: () => void;
  className?: string;
  mainClass?: string;
  id: string;
}

const ButtonFilter: React.FC<ButtonFilterProps> = ({
  label,
  changeColor,
  handleClick,
  className,
  mainClass,
  id,
}) => {
  return (
    <div className={`flex text-base w-[22rem] h-[2.125rem]  text-[#575757] font-book ${mainClass}`}>
      <p
        onClick={handleClick}
        className={`border items-center bg-[#f2f2f2] rounded-lg justify-center flex w-full cursor-pointer ${className} ${
          changeColor
            ? "bg-argenpesos-red text-argenpesos-white"
            : "bg-argenpesos-gray"
        }`}
        id={id}
      >
        {label}
      </p>
    </div>
  );
};

export default ButtonFilter;
