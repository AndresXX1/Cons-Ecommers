import { Brand, Category } from "../../utils/interface";

export interface IFilters {
    category: Category[];
    navExplore: string;
    minPrice: number;
    maxPrice: number;
    brand: Brand[];
    input: string;
}

export interface IActionFilter {
    type: string,
    payload?: string | string[] | number | IFilters,
    category?: string
}