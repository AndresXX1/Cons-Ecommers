import { useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";
import { IconSearch } from "../utils/svg";
import { InputHTMLAttributes, KeyboardEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ProductProps } from "../utils/interface";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  inputPlaceHolder: string;
  inputClassName?: string;
  className?: string;
  setSearchResults: React.Dispatch<React.SetStateAction<ProductProps[]>>;
}

const SearchInput = ({
  inputPlaceHolder,
  inputClassName,
  className,
  onChange,
  setSearchResults,
}: SearchProps) => {
  const navigate = useNavigate();
  const { input } = useSelector((state: RootState) => state.filters);

  const handleSearch = () => {
    if (input && input !== " ") {
      setSearchResults([]);
      setTimeout(() => {
        navigate("/search");
      }, 500);
    }
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    event.keyCode === 13 && handleSearch();
  }

  return (
    <div className={cn("w-full ", className)}>
      <div className="relative w-full">
        <div
          className="absolute top-3 left-3 flex md:hidden cursor-pointer"
          onClick={handleSearch}
        >
          <IconSearch />
        </div>
        <div
          className="hidden absolute top-2 right-3 md:flex items-center justify-center md:bg-argenpesos-white md:rounded-full md:w-[39px] md:h-[39px] cursor-pointer"
          onClick={handleSearch}
        >
          <IconSearch />
        </div>
        <input
          type="search"
          className={cn(
            "block w-full h-full lg:py-4 px-9 text-[12px] rounded-3xl focus:ring-0 bg-argenpesos-gray text-argenpesos-textos font-book text-opacity-[1] lg:text-[16px]",
            inputClassName
          )}
          placeholder={inputPlaceHolder}
          onChange={onChange || (() => {})}
          onKeyDown={handleEnter}
          value={input || ""}
        />
      </div>
    </div>
  );
};

export default SearchInput;
