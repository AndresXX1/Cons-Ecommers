import { useState } from "react";
import SearchInput from "./SearchInput";
import { IconCart, IconSearch } from "../utils/svg";
import { Link, useNavigate } from "react-router-dom";
import { ProductProps } from "../utils/interface";
import { useDispatch, useSelector } from "react-redux";
import { setInput } from "../redux/reducers/filters";
import { getFilteredProducts } from "../redux/services/products";
import { RootState } from "../redux/store";

const excludedPaths = ["/cart", "/payment-method", "/delivery", "/payment"]

const Header = () => {
  const [searchResults, setSearchResults] = useState<ProductProps[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const cart = useSelector((state: RootState) => state.cart);
    
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    dispatch(setInput(term));

    if (term.length > 0) {
      const { products } = await getFilteredProducts({ search: term });
      setSearchResults(products);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectResult = (id: number | undefined) => {
    setSearchResults([]);
    setTimeout(() => {
      navigate(`/product/${id}`);
    }, 500);
  };

  return (
    <div className="flex mb-5 justify-between items-center px-5 container-pad-width md:hidden">
      <div className="w-full max-w-[500px]">
        <SearchInput
          inputPlaceHolder="Buscar en ArgenCompras..."
          inputClassName="h-[34px] w-[290px]"
          onChange={handleSearchChange}
          setSearchResults={setSearchResults}
        />
        {searchResults.length > 0 && (
          <div className="absolute mt-1 rounded-[27px] py-3 overflow-hidden z-[100] bg-white border border-gray-200 shadow-lg w-[clamp(17.5rem,8.125rem_+_25vw,30.625rem)]">
            {searchResults.map((product, key) => (
              <div
                key={key}
                className="flex flex-row items-center px-4 hover:bg-[#E64628] hover:bg-opacity-10 cursor-pointer"
                onClick={() => handleSelectResult(product.id)}
              >
                <IconSearch />
                <p className="h-[31px] flex items-center px-2 cursor-pointer text-[10px] font-book">
                  {product?.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Link to={"/cart"}>
        <IconCart />
        {cart && !excludedPaths.includes(currentPath) && (
          <div className="rounded-full w-3 h-3 absolute top-[-9px] right-[-9px] bg-red-600"></div>
        )}
      </Link>
    </div>
  );
};

export default Header;
