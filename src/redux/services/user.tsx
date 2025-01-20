import { apiUrls } from "../../config";
import { axiosInstance, getUserAsync } from "../actions/auth";
import { useAppDispatch } from "../store";

export const updateFirstData = async ({
  first_name,
  last_name,
  cuil,
  dispatch,
}: {
  first_name: string;
  last_name: string;
  cuil: string;
  dispatch: ReturnType<typeof useAppDispatch>;
}) => {
  try {
    const response = await axiosInstance.post(apiUrls.updateFirstData(), {
      first_name,
      last_name,
      cuil,
    });
    if (response.data.ok) {
      dispatch(getUserAsync());
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data || "Error en datos de usuario";
  }
};

export const updateSecondData = async ({
  birthday,
  phone,
  dispatch,
}: {
  birthday: string;
  phone: string;
  dispatch: ReturnType<typeof useAppDispatch>;
}) => {
  try {
    const response = await axiosInstance.post(apiUrls.updateSecondData(), {
      birthday,
      phone,
    });
    if (response.data.ok) {
      dispatch(getUserAsync());
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data?.message || "Error al iniciar sesión";
  }
};

export const verifyAccount = async ({
  verifyCode,
  userId,
  dispatch,
}: {
  verifyCode: string;
  userId: number;
  dispatch: ReturnType<typeof useAppDispatch>;
}) => {
  try {
    const response = await axiosInstance.post(apiUrls.verifyAccount(), {
      verifyCode,
      userId,
    });
    if (response.data.ok) {
      dispatch(getUserAsync());
    } else {
      console.log(response.data.message);
    }
    // eslint-disable-next-line
  } catch (error: any) {
    console.log(error.response?.data?.message || "Error al verificar cuenta");
  }
};
