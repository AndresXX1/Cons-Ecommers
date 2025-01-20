import { ArrowRight } from "../utils/svg";

interface PaginateProps {
  NumberPage?: string;
  onNext: () => void;
  onPrevious: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const Paginated: React.FC<PaginateProps> = ({
  NumberPage,
  onNext,
  onPrevious,
  isPreviousDisabled,
  isNextDisabled,
}) => {
  return (
    <div className="hidden lg:flex justify-end gap-2 items-center">
      <p className="pr-5 text-argenpesos-textos text-[18px] font-book">
        {NumberPage}
      </p>
      <div
        className={`bg-argenpesos-white h-[46px] flex items-center justify-center w-[46px] rounded-full cursor-pointer border-[1px] border-argenpesos-textos ${
          isPreviousDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={!isPreviousDisabled ? onPrevious : undefined}
      >
        <ArrowRight className="rotate-180" />
      </div>
      <div
        className={`bg-argenpesos-white h-[46px] flex items-center justify-center w-[46px] rounded-full cursor-pointer border-[1px] border-argenpesos-textos ${
          isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={!isNextDisabled ? onNext : undefined}
      >
        <ArrowRight />
      </div>
    </div>
  );
};

export default Paginated;
