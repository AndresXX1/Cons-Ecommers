import Button from "../../components/Button";
import CardsProducts from "../../components/CardsProducts";
import { NavProps, ProductProps } from "../../utils/interface";
import { IconError, IconX } from "../../utils/svg";
import Modal from "../../components/Modal";
import { useEffect, useRef, useState } from "react";
import CardsRecomm from "../../components/CardsRecomm";
import FilterGroup from "../../components/FilterGroup";
import Paginated from "../../components/Paginated";
import {
  getFilteredProducts,
  getBrandsByCategoryId,
} from "../../redux/services/products";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type ButtonGroup = Record<string, boolean>;

const Explore: React.FC<NavProps> = () => {
  const { category, brand, navExplore } = useSelector(
    (state: RootState) => state.filters
  );
  const [buttonGroups, setButtonGroups] = useState<{
    group1: ButtonGroup;
    group2: ButtonGroup;
    group3: ButtonGroup;
  }>({
    group1: {},
    group2: {},
    group3: {},
  });

  const [modal, setModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [filters, setFilters] = useState<{
    categoryIds?: number[];
    brandIds?: number[];
    minPrice?: number;
    maxPrice?: number;
  }>({});
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [brands, setBrands] = useState<any[]>([]); 
  const [visibleItem, setVisibleItem] = useState<string>("");
  const resetFilters = () => {
    setButtonGroups({
      group1: {},
      group2: {},
      group3: {},
    });
    setFilters({});
    setSortOrder(undefined);
    setBrands([]); 
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minPrice: min,
      maxPrice: max,
    }));
  };

  useEffect(() => {
    getProductsList();
  }, [filters, currentPage]);

  useEffect(() => {
    const selectedCategories = Object.entries(buttonGroups.group1)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => parseInt(key.replace("button", "")));

    if (selectedCategories.length > 0) {
      getBrandsByCategoryId(selectedCategories)
        .then(setBrands)
        .catch((error) => console.log(error));
    } else {
      setBrands(brand || []);
    }
  }, [buttonGroups, brand]);

  const getProductsList = async () => {
    const { products, totalPages } = await getFilteredProducts({
      ...filters,
      pageNumber: currentPage,
    });
    setFilteredProducts(products);
    if (totalPages !== undefined) {
      setTotalPages(totalPages);
    }
  };

  useEffect(() => {
    navExplore !== "" &&
      setFilters((prev) => ({
        ...prev,
        categoryIds: [Number(navExplore)],
      }));
    navExplore !== "" &&
      setButtonGroups((prev) => ({
        ...prev,
        group1: { [navExplore]: true },
      }));
  }, [navExplore]);

  const isAnyButtonActive = (group: string) => {
    return Object.values(buttonGroups[group as keyof typeof buttonGroups]).some(
      (isActive) => isActive
    );
  };

  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prevPage) =>
      direction === "next" ? prevPage + 1 : Math.max(prevPage - 1, 1)
    );
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

  const sortedProducts = applySorting(filteredProducts, sortOrder);

  const headerRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <>
      <Modal
        isShown={modal}
        element={
          <div className="max-w-[389px] w-[375px] z-[1000] py-7 px-6 mb-10">
            <div className="flex justify-between mb-10">
              <h4 className="text-[1rem] font-bold text-argenpesos-textos">
                Filtros
              </h4>
              <IconX
                className="cursor-pointer"
                onClick={() => setModal(false)}
              />
            </div>
            <p className="pb-7 text-[16px] font-book text-argenpesos-textos">
              Categorías
            </p>
            <p className="pb-7 text-[14px] font-book text-argenpesos-textos text-opacity-[0.6]">
              Tecnología
            </p>
          </div>
        }
      />
      <div className="container-pad-width">
        <div className="px-5 pb-8 lg:px-0">
          <h3
            ref={headerRef}
            className="text-argenpesos-textos text-[clamp(1.25rem,-0.089rem_+_3.571vw,3.125rem)] font-book leading-[120%] tracking-[-0.6px] lg:mt-16 lg:tracking-[-1.5px]"
          >
            Explora nuestros productos
          </h3>
          <div className="hidden lg:flex mt-8">
            <FilterGroup
              buttonGroups={buttonGroups}
              isAnyButtonActive={isAnyButtonActive}
              handleClick={handleClick}
              toggleVisibility={toggleVisibility}
              handleMouseLeave={handleMouseLeave}
              visibleItem={visibleItem}
              handlePriceChange={handlePriceChange}
              category={category}
              brand={brands} 
              resetFilters={resetFilters}
            />
          </div>
        </div>
        <div className="px-6 mb-16 lg:hidden">
          {sortedProducts.map((inf) => (
            <CardsProducts key={inf.id} info={inf} />
          ))}
        </div>
        {sortedProducts.length > 0 ? (
          <div>
            <div className="justify-between hidden grid-cols-3 lg:grid lg:flex-wrap gap-10 lg:mb-16">
              {sortedProducts.map((inf) => (
                <CardsRecomm key={inf.id} info={inf} />
              ))}
            </div>
            <Paginated
              NumberPage={`Página ${currentPage} / ${totalPages}`}
              onNext={() => handlePageChange("next")}
              onPrevious={() => handlePageChange("prev")}
              isPreviousDisabled={currentPage === 1}
              isNextDisabled={currentPage === totalPages}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <IconError />
            <p className="text-[40px] text-argenpesos-textos font-bold tracking-[-1.2px] max-w-[870px] text-center my-10">
              Ups, no encontramos productos que coincidan con tu búsqueda.
            </p>
            <p className="text-[22px] font-book leading-[120%] tracking-[-0.66px] text-argenpesos-textos">
              Intenta con otros filtros o ajusta tu búsqueda para encontrar lo
              que necesitas.
            </p>
          </div>
        )}
        <Button className="lg:hidden" text="Ver más" />
      </div>
    </>
  );
};

export default Explore;
