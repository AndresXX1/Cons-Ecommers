import { apiUrls } from "../../config";
import { axiosInstance } from "../actions/auth";

export const getBannersMobile = async () => {
  try {
    const response = await axiosInstance.get(apiUrls.getBannersMobile());
    return response.data.banners;
  } catch (error) {
    console.log(error);
  }
};

export const getBannersDesktop = async () => {
  try {
    const response = await axiosInstance.get(apiUrls.getBannersDesktop());
    return response.data.banners;
  } catch (error) {
    console.log(error);
  }
};
