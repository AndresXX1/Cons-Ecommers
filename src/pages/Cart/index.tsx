import { Link } from "react-router-dom";
import CardsCart from "../../components/CardsCart";
import ModalCart from "../../components/ModalCart";
import { ArrowLeft, IconCartPlus } from "../../utils/svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Button from "../../components/Button";
import Recommended from "../../components/Home/Recommended";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();

  return (
    <div className="container-pad-width lg:pt-12">
      <div className="px-5 lg:flex flex-col items-start">
        <div className="flex items-center mb-10">
          <Link className="lg:hidden" to="/home">
            <ArrowLeft />
          </Link>
          <p className="mx-auto text-[14px] font-book text-argenpesos-textos leading-[120%] tracking-[-0.42px] lg:hidden">
            Carrito de compras
          </p>
        </div>
        {cart?.items.length > 0 ? (
          <div className="w-full h-full lg:flex flex-row justify-between lg:mb-16 gap-10">
            <div className="lg:flex flex-col gap-10 lg:w-full">
              {cart?.items.map((inf) => {
                return <CardsCart key={inf.product.id} info={inf.product} />;
              })}
            </div>
            <div>
              <div className="hidden lg:flex">
                <ModalCart onClick={() => navigate("/payment")} />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center ">
            <IconCartPlus color="red" className="lg:w-[72px] lg:h-[72px]" />
            <h4 className="mt-7 text-argenpesos-textos text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] font-bold leading-[120%] tracking-[-0.6px] text-center">
              Aún no tienes productos en el carrito
            </h4>
            <p className="text-[clamp(0.875rem,0.518rem_+_0.952vw,1.375rem)] font-book leading-[120%] tracking-[-0.42px] text-argenpesos-textos text-center max-w-[270px] mt-5 mb-7 lg:max-w-full">
              Explora productos por categorías, precio, marcas y más
            </p>
            <Button
              onClick={() => navigate("/explore")}
              className="w-[224px] lg:w-[285px]"
              text="Explorar productos"
            />
          </div>
        )}
        <Recommended cartEmpty={true} />
      </div>
      {cart?.items.length > 0 && (
        <div className="lg:hidden">
          <ModalCart onClick={() => navigate("/payment")} />
        </div>
      )}
    </div>
  );
};
export default Cart;
