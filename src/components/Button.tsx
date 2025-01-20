import React from "react";
import { cn } from "../utils/cn";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className, type, disabled }) => {
  return (
    <button
      className={cn(
        "w-[333px] bg-argenpesos-red flex items-center justify-center mx-auto h-[51px] rounded-[8.5px] text-white text-[14px] font-book mb-10 hover:bg-argenpesos-white hover:border-[1px] hover:border-argenpesos-red hover:text-argenpesos-red duration-300",
        className,
        `${!disabled ? "" : "bg-[#ED1A004D]"} lg:text-[16px]`
      )}
      

      onClick={onClick}
      type={type ? type : "button"}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
