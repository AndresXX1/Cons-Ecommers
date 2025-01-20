import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilters } from "../types/filters";
import { Brand, Category } from "../../utils/interface";

export const initialFilters: IFilters = {
  category: [],
  navExplore: "",
  minPrice: 5000,
  maxPrice: 2000000,
  brand: [],
  input: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialFilters,
  reducers: {
    setBrand(state, action: PayloadAction<Brand[]>) {
      state.brand = action.payload;
    },
    setMinPrice(state, action: PayloadAction<number>) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.maxPrice = action.payload;
    },
    setCategory(state, action: PayloadAction<Category[]>) {
      state.category = action.payload;
    },
    setNavExplore(state, action: PayloadAction<string>) {
      state.navExplore = action.payload;
    },
    setInput(state, action: PayloadAction<string>) {
      state.input = action.payload;
    },
    clearFilters(_, action: PayloadAction<Partial<IFilters>>) {
      const { category } = action.payload;
      return {
        ...initialFilters,
        ...(category ? { category } : {}),
      };
    },
  },
});

export const {
  setBrand,
  setMinPrice,
  setMaxPrice,
  setCategory,
  setNavExplore,
  setInput,
  clearFilters,
} = filtersSlice.actions;


export default filtersSlice.reducer;

