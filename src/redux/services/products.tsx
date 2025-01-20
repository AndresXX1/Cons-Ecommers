import { apiUrls } from "../../config";
import { CotizationProps } from "../../pages/Payment/Delivery";
import { BuyerProps, CreateOrderProps } from "../../utils/interface";
import { axiosInstance } from "../actions/auth";

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get(apiUrls.getProducts());
    if (response.data.ok) {    
      return response.data.allProducts;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getZippingCorization = async (data: CotizationProps) => {
  try {
    const response = await axiosInstance.post(apiUrls.getZippingCorization(), data);
    if (response.data.ok) {
      return response.data.reponseCotization;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductsById = async (id: string) => {
  try {
    const response = await axiosInstance.get(apiUrls.getProductsId(id));
    if (response.data.ok) {
      return response.data.product;
    }
  } catch (error) {
    console.log(error)
  }
};

export const getProductsByCategoryId = async (id: number[]) => {
  try {
    const response = await axiosInstance.put(apiUrls.getProductsByCategoryId(), {categoryIds: id});
    if (response.data.ok) {
      return response.data.data.products;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getHighlighted = async () => {
  try {
    const response = await axiosInstance.get(apiUrls.getHighlighted());
    if (response.data.ok) {
      return response.data.highlightedProducts;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredProducts = async (filters: {
  minPrice?: number;
  maxPrice?: number;
  categoryIds?: number[];
  brandIds?: number[];
  search?: string;
  pageNumber?: number;
}) => {

  try {
    const response = await axiosInstance.put(
      apiUrls.getProductsFilter(filters.pageNumber),
      {
        ...filters,
      }
    );
    const products = response.data.data.products;
    const totalPages = response.data.data.totalPages;

    return { products, totalPages };
  } catch (error) {
    console.error(error);
    return { products: [], totalPages: 0 };
  }
};

export const getCategory = async () => {
  try {
    const response = await axiosInstance.get(apiUrls.getCategory());
    return response.data.categories;
  } catch (error) {
    console.log(error);
  }
};

export const getBrand = async () => {
  try {
    const response = await axiosInstance.get(apiUrls.getbrand());
    return response.data.brands;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (data: CreateOrderProps) => {
  try {
    const response = await axiosInstance.post(apiUrls.creatOrder(), data);
    return response.data.orderCreated;
  } catch (error) {
    console.log(error);
  }
};

export const createGuestOrder = async (orderDto: CreateOrderProps, guestBuyer: BuyerProps) => {
  try {
    const response = await axiosInstance.post(apiUrls.creatGuestOrder(), {...orderDto, ...guestBuyer});
    console.log(response.data)
    return response.data.orderCreated;
  } catch (error) {
    console.log(error);
  }
};

export const postCreateMP = async (orderId: number, price: number) => {
  try {
    const response = await axiosInstance.post(apiUrls.postCreateMP(),{orderId, price});
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBrandsByCategoryId = async (categoryId: number | number[]) => {
  try {
    const categoryIds = Array.isArray(categoryId) ? categoryId : [categoryId];

    const response = await axiosInstance.get(
      apiUrls.getBrandsByCategoryId(categoryIds)
    );

    return response.data.brands;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
