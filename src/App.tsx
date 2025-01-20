import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Queries from "./pages/Queries";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Register from "./pages/Login/Register";
import CreateProfile from "./pages/Profile/CreateProfile/CreateProfile";
import { useMediaQuery } from "react-responsive";
import Payment from "./pages/Payment";
import Delivery from "./pages/Payment/Delivery";
import PaymentMethod from "./pages/Payment/PaymentMethod";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "./redux/store";
import { verifySessionAsync } from "./redux/actions/auth";
import ProtectedAuth from "./components/ProtectedAuth";
import RedirectAuth from "./components/RedirectAuth";
import VerifyEmail from "./pages/Login/Verify-email";
import Loans from "./pages/Payment/Loans";
import Summary from "./pages/Payment/Summary";
import Success from "./pages/Payment/Success";
import Failure from "./pages/Payment/Failure";
import SecondStep from "./pages/Login/Register/SecondStep";
import TermsAndConditions from "./pages/Footer/TermsAndConditions";
import PolicyAndPrivacy from "./pages/Footer/PolicyAndPrivacy";
import TechnicalServices from "./pages/Footer/TechnicalService";
import WhoAreThey from "./pages/Footer/WhoAreThey";
import Repentance from "./pages/Footer/Repentance";
import { getBrand, getCategory } from "./redux/services/products";
import { Brand, Category } from "./utils/interface";
import ProductDetail from "./pages/Product/[id]";
import Pending from "./pages/Payment/Pending";
import { setBrand, setCategory } from "./redux/reducers/filters";
import { useSelector } from "react-redux";

const App = (): JSX.Element => {

  const dispatch = useAppDispatch();
  const location = useLocation();
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  const filters = useSelector((state: RootState) => state.filters);

  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryAll, brandAll]: [Category[], Brand[]] =
          await Promise.all([getCategory(), getBrand()]);

        // Filtrar categorías activas
        const activeCategories = categoryAll.filter(
          (cat: Category) => cat.status === "activa"
        );

        const activeBrands = brandAll.filter(
          (brand: Brand) => brand.status === "activa"
        );

        dispatch(setCategory(activeCategories));
        dispatch(setBrand(activeBrands));
      } catch (error) {
        console.error("Error fetching categories and brands:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    dispatch(verifySessionAsync({ dispatch }));
  }, [dispatch]);

  return (
    <div className="pt-8">
      {isLargeScreen
        ? location.pathname !== "/login" &&
          !location.pathname.includes("/verify-email") &&
          location.pathname !== "/register" &&
          location.pathname !== "/second-step" && (
            <Nav
              category={filters.category}
              brand={filters.brand}
            />
          )
        : location.pathname !== "/login" &&
          location.pathname !== "/cart" &&
          location.pathname !== "/register" &&
          location.pathname !== "/create-profile" &&
          location.pathname !== "/payment" &&
          location.pathname !== "/delivery" &&
          location.pathname !== "/payment-method" &&
          location.pathname !== "/loans" &&
          location.pathname !== "/summary" &&
          location.pathname !== "/success" &&
          location.pathname !== "/failure" && (
            <Nav category={filters.category} />
          )}

      {location.pathname !== "/cart" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        !location.pathname.includes("/verify-email") &&
        location.pathname !== "/second-step" &&
        location.pathname !== "/payment" &&
        location.pathname !== "/delivery" &&
        location.pathname !== "/payment-method" &&
        location.pathname !== "/loans" &&
        location.pathname !== "/summary" &&
        location.pathname !== "/success" &&
        location.pathname !== "/failure" && <Header />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route
          path="explore"
          element={
            <Explore category={filters.category} brand={filters.brand} />
          }
        />
        <Route path="product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="search"
          element={<Search category={filters.category} brand={filters.brand} />}
        />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="policy-and-privacy" element={<PolicyAndPrivacy />} />
        <Route path="technical-service" element={<TechnicalServices />} />
        <Route path="who-are-they" element={<WhoAreThey />} />
        <Route path="repentance" element={<Repentance />} />
        <Route
          path="profile"
          element={
            <ProtectedAuth>
              <Profile />
            </ProtectedAuth>
          }
        />
        <Route path="create-profile" element={<CreateProfile />} />
        <Route path="queries" element={<Queries />} />
        <Route
          path="login"
          element={
            <RedirectAuth>
              <Login />
            </RedirectAuth>
          }
        />
        <Route
          path="register"
          element={
            <RedirectAuth>
              <Register />
            </RedirectAuth>
          }
        />
        <Route path="verify-email/:verifyCode?" element={<VerifyEmail />} />
        <Route path="second-step" element={<SecondStep />} />
        <Route path="payment" element={<Payment />}></Route>
        <Route path="/delivery" element={<Delivery />}></Route>
        <Route path="/payment-method" element={<PaymentMethod />}></Route>
        <Route path="/loans" element={<Loans />}></Route>
        <Route path="/summary" element={<Summary />}></Route>
        <Route path="/success" element={<Success />}></Route>
        <Route path="/pending" element={<Pending />}></Route>
        <Route path="/failure" element={<Failure />}></Route>
      </Routes>

      {isLargeScreen ? (
        location.pathname !== "/login" &&
        !location.pathname.includes("/verify-email") &&
        location.pathname !== "/register" &&
        location.pathname !== "/second-step" && <Footer />
      ) : (
        <Footer />
      )}
    </div>
  );
};

export default App;
