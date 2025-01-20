import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import CardsProducts from "../../components/CardsProducts";
import { NavProps, ProductProps } from "../../utils/interface";
import FilterGroup from "../../components/FilterGroup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getFilteredProducts } from "../../redux/services/products";
import { setInput } from "../../redux/reducers/filters";
import Paginated from "../../components/Paginated";
import { IconError, IconFilter } from "../../utils/svg";
import Modal from "../../components/Modal";
import FiltersMobile from "../../components/FiltersMobile";

type ButtonGroup = Record<string, boolean>;

const Search: React.FC<NavProps> = () => {
  const [buttonGroups, setButtonGroups] = useState<{
    group1: ButtonGroup;
    group2: ButtonGroup;
    group3: ButtonGroup;
  }>({
    group1: {
      button1: false,
      button2: false,
      button3: false,
      button4: false,
      button5: false,
      button6: false,
    },
    group2: {
      button1: false,
      button2: false,
    },
    group3: {
      button1: false,
      button2: false,
    },
  });
  const [filters, setFilters] = useState<{
    categoryIds?: number[];
    brandIds?: number[];
    minPrice?: number;
    maxPrice?: number;
  }>({});
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentList, setCurrentList] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { category, brand, input } = useSelector(
    (state: RootState) => state.filters
  );
  const [searchResults, setSearchResults] = useState<Array<ProductProps>>([]);
  const [visibleItem, setVisibleItem] = useState<string>("");
  const [prevInput, _] = useState<string>(input);
  const [loading, setLoading] = useState(false);
  const isAnyButtonActive = (group: string) => {
    return Object.values(buttonGroups[group as keyof typeof buttonGroups]).some(
      (isActive) => isActive
    );
  };

  const loadProducts = useCallback(
    async (list: number) => {
      setLoading(true);
      try {
        const { products } = await getFilteredProducts({
          ...filters,
          search: prevInput,
          pageNumber: list,
        });
        setSearchResults((prev) => [...prev, ...products]); 
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    },
    [prevInput]
  );

  useEffect(() => {
    getProds();
  }, [filters, currentPage]);

  const getProds = async () => {
    if (prevInput.length > 0) {
      const { products, totalPages } = await getFilteredProducts({
        ...filters,
        search: prevInput,
        pageNumber: currentPage,
      });
      setSearchResults(products);
      dispatch(setInput(""));
      if (totalPages !== undefined) {
        setTotalPages(totalPages);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minPrice: min,
      maxPrice: max,
    }));
  };

  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prevPage) =>
      direction === "next" ? prevPage + 1 : Math.max(prevPage - 1, 1)
    );
  };

  const handleSeeMore = () => {
    const nextList = currentList + 1;
    setCurrentList(nextList);
    loadProducts(nextList);
  };

  const handleClick = (
    group: keyof typeof buttonGroups,
    buttonId: string,
    type: "category" | "brand" | "price",
    value?: number
  ) => {
    setButtonGroups((prev) => {
      const newGroup = {
        ...prev[group],
        [buttonId]: !prev[group][buttonId],
      };

      let updatedFilters = { ...filters };

      // Manejo de categorías
      if (type === "category") {
        const selectedCategories = Object.entries(newGroup)
          .filter(([_, isActive]) => isActive)
          .map(([key]) => parseInt(key.replace("button", "")));

        updatedFilters.categoryIds =
          selectedCategories.length > 0 ? selectedCategories : undefined;
      }

      // Manejo de marcas
      if (type === "brand") {
        const selectedBrands = Object.entries(newGroup)
          .filter(([_, isActive]) => isActive)
          .map(([key]) => parseInt(key.replace("button", "")));

        updatedFilters.brandIds =
          selectedBrands.length > 0 ? selectedBrands : undefined;
      }

      if (type === "price" && value !== undefined) {
        if (buttonId === "button1") {
          newGroup.button2 = false;
          setSortOrder("desc");
        } else if (buttonId === "button2") {
          newGroup.button1 = false;
          setSortOrder("asc");
        }

        Object.keys(newGroup).forEach((key) => {
          if (key !== buttonId) newGroup[key] = false;
        });
      }

      const noActiveFilters =
        !updatedFilters.categoryIds &&
        !(updatedFilters.brandIds && updatedFilters.brandIds.length > 0);

      if (noActiveFilters) {
        updatedFilters = {};
      }

      setFilters(updatedFilters);
      setCurrentPage(1);

      return {
        ...prev,
        [group]: newGroup,
      };
    });
  };

  const toggleVisibility = (item: string) => {
    setVisibleItem((prevItem) => (prevItem === item ? "" : item));
  };

  const handleMouseLeave = (item: string) => {
    if (visibleItem === item) {
      setVisibleItem("");
    }
  };

  const applySorting = (
    products: ProductProps[],
    sortOrder?: "asc" | "desc"
  ) => {
    if (!sortOrder) return products;

    return [...products].sort((a, b) => {
      if (sortOrder === "asc") {
        return parseFloat(a.final_price) - parseFloat(b.final_price);
      } else if (sortOrder === "desc") {
        return parseFloat(b.final_price) - parseFloat(a.final_price);
      }
      return 0;
    });
  };

  const sortedProducts = applySorting(searchResults, sortOrder);

  const headerRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <div
      className="lg:flex gap-10 lg:mt-14 container-pad-width"
      ref={headerRef}
    >
      <div className="md:hidden flex w-[82px] h-[32px] border-[1px] border-solid rounded-full items-center justify-center mb-5 ml-6">
        <div
          onClick={() => setShowFilters(!showFilters)}
          className="cursor-pointer"
        >
          <div className="flex cursor-pointer flex-row gap-[7px] items-center">
            <div>
              <p className="text-[10px] font-book">Filtros</p>
            </div>
            <div>
              <IconFilter />
            </div>
          </div>
        </div>
        <Modal
          isShown={showFilters}
          closeModal={setShowFilters}
          element={
            <FiltersMobile
              buttonGroups={buttonGroups}
              handleClick={handleClick}
              handlePriceChange={handlePriceChange}
              closeModal={setShowFilters}
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
            />
          }
          classname="h-full w-full rounded-lg"
        />
      </div>
      <div className="hidden lg:flex items-start">
        <FilterGroup
          className="flex-col mt-0"
          buttonGroups={buttonGroups}
          isAnyButtonActive={isAnyButtonActive}
          handleClick={handleClick}
          toggleVisibility={toggleVisibility}
          handleMouseLeave={handleMouseLeave}
          visibleItem={visibleItem}
          handlePriceChange={handlePriceChange}
          category={category}
          brand={brand}
        />
      </div>
      {sortedProducts.length > 0 && (
        <div className="px-6 mb-14 w-full">
          {sortedProducts.map((inf) => (
            <CardsProducts key={inf.id} info={inf} />
          ))}
          <div>
            <Paginated
              NumberPage={`Página ${currentPage} / ${totalPages}`}
              onNext={() => handlePageChange("next")}
              onPrevious={() => handlePageChange("prev")}
              isPreviousDisabled={currentPage === 1}
              isNextDisabled={currentPage === totalPages}
            />
          </div>
          {/* <div className="justify-between hidden grid-cols-3 lg:grid lg:flex-wrap gap-10 lg:mb-16">
              {sortedProducts.map((inf) => (
                <CardsRecomm key={inf.id} info={inf} />
              ))}
            </div> */}
        </div>
      )}
      {sortedProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <IconError />
          <p className="text-[40px] text-argenpesos-textos font-bold tracking-[-1.2px] max-w-[870px] text-center my-10">
            Ups, no encontramos productos que coincidan con tu búsqueda.
          </p>
          <p className="text-[22px] font-book leading-[120%] tracking-[-0.66px] text-argenpesos-textos">
            Intenta con otros filtros o ajusta tu búsqueda para encontrar lo que
            necesitas.
          </p>
        </div>
      )}
      <Button
        className="lg:hidden"
        text={loading ? "Cargando..." : "Ver más"}
        onClick={handleSeeMore}
        disabled={loading}
      />
    </div>
  );
};

export default Search;
