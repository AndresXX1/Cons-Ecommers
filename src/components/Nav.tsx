import { links } from "../utils/format";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IconCart, IconSearch } from "../utils/svg";
import SearchInput from "./SearchInput";
import { Category, NavProps, ProductProps } from "../utils/interface";
import { useState } from "react";
import { getFilteredProducts } from "../redux/services/products";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setInput, setNavExplore } from "../redux/reducers/filters";

const excludedPaths = ["/cart", "/payment-method", "/delivery", "/payment"]

const Nav: React.FC<NavProps> = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const productsCount = cart?.items.reduce((total, item) => total + item.quantity, 0)
  const { category } = useSelector((state: RootState) => state.filters);
  const [searchResults, setSearchResults] = useState<ProductProps[]>([]);

  const navigate = useNavigate();

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

  const handleChangeCategory = (info: Category) => {
    dispatch(setNavExplore(info.id));
    navigate("/explore");
  };

  const handleSelectResult = (id: number | undefined) => {
    setSearchResults([]);
    setTimeout(() => {
      navigate(`/product/${id}`);
    }, 500);
  };

  return (
    <div className="container-pad-width">
      <div className="flex flex-row justify-between">
        <div className="hidden mb-5 justify-between items-center px-5 md:flex lg:px-0 lg:items-center lg:mb-0 lg:justify-normal lg:gap-10 md:w-full">
          <Link className="min-w-[220px]" to={"/home"}>
            <img
              className="w-full h-[66px] cursor-pointer"
              src="/logo_login.png"
              alt="logo"
            />
          </Link>
          <div className="w-full max-w-[500px]">
            <SearchInput
              inputPlaceHolder="Buscar en ArgenCompras..."
              inputClassName="h-[34px] w-full md:h-[54px]"
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
                    <p className="h-[31px] flex items-center px-2 cursor-pointer text-[16px] font-book text-argenpesos-textos">
                      {product?.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:hidden relative">
            <Link to={"/cart"}>
              <IconCart />
              {cart && currentPath !== "/cart" && (
                <div className="rounded-full w-3 h-3 absolute top-[-9px] right-[-9px] bg-red-600"></div>
              )}
            </Link>
          </div>
        </div>

        <div className="fixed w-full bottom-0 h-[86px] z-[1] lg:relative lg:z-[0] lg:w-[50%]">
          <div className="h-[86px] bg-argenpesos-white relative w-full pt-7 lg:pt-0 lg:flex lg:justify-around lg:px-5">
            <div className="flex justify-between px-5 lg:items-center lg:gap-10 xl:gap-12 2xl:gap-16 lg:px-0">
              {links.map((link, index) => (
                <li
                  key={`${link.text}-${index}`}
                  className={`flex gap-3 ${
                    currentPath === link.to
                      ? "text-argenpesos-textos text-[20px] font-bold leading-[120%] tracking-[-0.66px]"
                      : "text-argenpesos-textos"
                  }`}
                >
                  <div className="flex items-center justify-center gap-5">
                    <Link
                      to={link.to}
                      className="font-book text-[20px] lg:hidden"
                    >
                      <link.Icon
                        color={currentPath === link.to ? "#ED1A00" : ""}
                      />
                    </Link>
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`font-book text-[20px] ${
                        link.text === "Home" ? "hidden" : "hidden lg:flex"
                      }`}
                    >
                      {link.text}
                    </Link>
                  </div>
                </li>
              ))}
              <Link
                className={`
                  hidden md:bg-argenpesos-white md:rounded-full md:w-[52px] md:h-[52px] lg:flex items-center justify-center border-[1px]
                    ${
                      currentPath === "/cart"
                        ? "border-argenpesos-red"
                        : "border-argenpesos-textos"
                    }
                  `}
                to={"/cart"}
              >
                <IconCart color={currentPath === "/cart" ? "#ED1A00" : ""} />
                {cart && !excludedPaths.includes(currentPath) && (
                  <div className={`rounded-full w-5 h-5 absolute top-4 right-4 bg-red-600 text-white text-xs justify-center items-center ${productsCount > 0 ? "flex" : "hidden"}`}>{productsCount}</div>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full hidden lg:flex justify-center gap-16 pt-6 mb-20">
        {category?.map((inf, key) => (
          <div
            key={key}
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => handleChangeCategory(inf)}
          >
            <p className="text-[18px] text-argenpesos-textos font-book overflow-hidden whitespace-nowrap text-ellipsis max-w-[130px]">
              {inf.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nav;
