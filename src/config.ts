export const baseUrl = import.meta.env.VITE_BACKEND_URL;
export const baseUrl2 = import.meta.env.VITE_BACKEND_URL2;

export const apiUrls = {
  // user Auth
  logIn: () => `${baseUrl}/api/auth/log-in`,
  logInWithGoogle: () => `${baseUrl}/api/auth/log-in-with-google`,
  refreshToken: () => `${baseUrl}/api/auth/refresh-token`,
  signUp: () => `${baseUrl}/api/auth/sign-up`,
  verifyAccount: () => `${baseUrl}/api/auth/verify-email`,
  logOut: () => `${baseUrl}/api/auth/log-out`,
  getSessions: () => `/api/auth/session`,
  deleteSession: (id: number) => `/api/auth/session/${id}`,
  getUser: () => `/api/user`,
  uploadAvatar: () => `/api/user/avatar`,
  putUser: () => `/api/user`,
  createUser: () => `/api/user/create`,
  updateFirstData: () => `${baseUrl}/api/user/first-data`,
  updateSecondData: () => `${baseUrl}/api/user/second-data`,
  verifyEmail: () => `${baseUrl}/api/user/verify-code`,
  resendCode: () => `${baseUrl}/api/auth/resend-code`,
  // services
  imgAvatar: (img: string) => `${baseUrl}/avatar/${img}`,
  // banners
  bannerImg: (img: string) => `${baseUrl2}/banner/${img}`,
  getBannersMobile: () => `${baseUrl2}/api/banner/mobile`,
  getBannersDesktop: () => `${baseUrl2}/api/banner/desktop`,
  // orders
  creatOrder: () => `${baseUrl2}/api/order/user`,
  creatGuestOrder: () => `${baseUrl2}/api/order/guest`,
  // products
  getProducts: () => `${baseUrl2}/api/product/all`,
  getProductsId: (id: string) => `${baseUrl2}/api/product/${id}`,
  getProductsByCategoryId: () => `${baseUrl2}/api/product?page=1&limit=100`,
  getProductsFilter: (data?: number) => `${baseUrl2}/api/product?page=${data}`,
  productImg: (img: string) => `${baseUrl2}/product/${img}`,
  getHighlighted: () => `${baseUrl2}/api/product/highlighted`,
  getCategory: () => `${baseUrl2}/api/category/all`,
  getbrand: () => `${baseUrl2}/api/brand`,
  getBrandsByCategoryId: (id: number | number[]) => {
    const categoryIds = Array.isArray(id) ? id.join(",") : id;
    return `${baseUrl2}/api/brand?categoryIds=${categoryIds}`;
  },
  //zippin
  getZippingCorization: () => `${baseUrl2}/api/zippin/cotization`,
  //mercadoPago
  postCreateMP: () => `${baseUrl2}/api/payment/mercadopago/create`,
  //loan
  applyForLoan: () => `${baseUrl}/api/loan/getOffer/19/ONLINEAPP`,
  
};

export const tokenAccess = {
  tokenName: import.meta.env.VITE_PUBLIC_TOKEN_NAME_ADMIN,
  refreshTokenName: import.meta.env.VITE_PUBLIC_TOKEN_REFRESH_NAME_ADMIN,
  tokenNameRegular: import.meta.env.VITE_PUBLIC_TOKEN_NAME,
  refreshTokenNameRegular: import.meta.env.VITE_PUBLIC_TOKEN_REFRESH_NAME,
};

export const urls = {
  android: import.meta.env.VITE_LINK_PLAY_STORE,
  ios: import.meta.env.VITE_LINK_APP_STORE,
  frontend: import.meta.env.VITE_FRONTEND_URL,
};

export const googleIdClient = import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID;
