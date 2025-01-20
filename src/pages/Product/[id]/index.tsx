import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import { ArrowRight, DownArrow, IconDelete, IconMas } from "../../../utils/svg";
import { useEffect, useState } from "react";
import * as styles from "./styles";
import Recommended from "../../../components/Home/Recommended";
import { getProductsById } from "../../../redux/services/products";
import { apiUrls } from "../../../config";
import { CartItem, ProductProps } from "../../../utils/interface";
import { useDispatch, useSelector } from "react-redux";
import { setInput } from "../../../redux/reducers/filters";
import {
  addItem,
  modifyQuantity,
  removeItem,
  updateQuantity,
} from "../../../redux/reducers/cart";
import { RootState } from "../../../redux/store";

function ProductDetail() {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const [product, setProduct] = useState<ProductProps | null>();
  const [stock, setStock] = useState<number>(0);

  const verifyCart = cart?.items.find((item) => item.product.id === Number(id));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id !== undefined) {
          const response = await getProductsById(id);
          setProduct(response);
          setStock(response.stock);
          dispatch(setInput(""));
        } else {
          throw new Error("No se encuentra ID");
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };
    fetchProduct();
  }, [id]);

  const count = () => {
    let response = 0;
    cart.items.map((item: CartItem) => {
      if (item.product.id === id) {
        response = item.quantity;
      }
    });
    return response;
  };

  const handleBuy = () => {
    if(product?.id !== undefined){
      verifyCart ? dispatch(updateQuantity({id: product.id, operation: "plus"})) :
      dispatch(addItem(product!));
    }
    navigate("/payment");
  }
  return product ? (
    <div className={styles.MAIN_PRODUCT_DETAIL}>
      <div className={styles.FLEX_SMALL_DEVICES}>
        <p className={styles.PRAGRAPH_LABEL}>{product.category?.name}</p>
        <ArrowRight />
        <p className={styles.PRAGRAPH_LABEL}>{product.brand?.name}</p>
      </div>
      <h4 className={styles.PRODUCT_NAME_MOBILE}>{product.name}</h4>
      <div className={styles.CONTAIN_PRODUCT}>
        <div className={styles.IMG_CONTAINER}>
          <img
            className={styles.IMG_MAIN}
            src={
              product.images?.default?.length !== undefined &&
              product.images?.default?.length > 0
                ? apiUrls.productImg(product.images.default[0])
                : "https://ecommerce.maylandlabs.com/image_default_desktop.png"
            }
            alt=""
          />
        </div>
        <div className={styles.DESKTOP_CONTAINER}>
          <div className={styles.DIV_NUM_IMGS}>
            <p className={styles.P_NUM_IMGS}>1/4</p>
          </div>
          <img
            src={
              product.images?.default?.length !== undefined &&
              product.images?.default?.length > 0
                ? apiUrls.productImg(product.images.default[0])
                : "https://ecommerce.maylandlabs.com/image_default_desktop.png"
            }
            className={styles.IMG_MINI}
            alt="image"
          />
          {verifyCart ? (
            <div
              className={styles.ADD_TO_CART_CONTAINER}
              onClick={() => dispatch(removeItem(Number(id)))}
            >
              <p className={styles.REMOVE_TO_CART}>Quitar del carrito</p>
              <IconDelete className={styles.ICON_MINUS} />
            </div>
          ) : (
            <div
              className={styles.ADD_TO_CART_CONTAINER}
              onClick={() => dispatch(addItem(product))}
            >
              <p className={styles.ADD_TO_CART}>Agregar al carrito</p>
              <IconMas className={styles.ICON_MAS} />
            </div>
          )}
        </div>
        {/* ESTOS SON LOS PUNTOS DE CADA IMAGEN*/}
        <div className="flex md:hidden justify-center mt-4 mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`w-[6.56px] h-[6.56px] m-1 flex items-center justify-center rounded-full ${
                index === 0 ? "bg-argenpesos-red" : "bg-argenpesos-gray3"
              }`}
            ></div>
          ))}
        </div>
        <div>
          <div className={styles.ARROW_RIGHT_CONTAINER}>
            <p className={styles.PRAGRAPH_LABEL}>{product.category?.name}</p>
            <ArrowRight />
            <p className={styles.PRAGRAPH_LABEL}>{product.brand?.name}</p>
          </div>
          <h4 className={styles.PRODUCT_NAME_DESKTOP}>{product.name}</h4>
          <h4 className={styles.DUE_PLAN}>
            6 cuotas fijas de ${product.internal_cost}*
          </h4>
          <p className={styles.SUBTITLE}>*Sujeto a riesgo crediticio</p>
          <p className={styles.CASH_PLAN}>${product.final_price} al contado</p>

          <div className={styles.MAIN_QUANTITY}>
            <div className={styles.QUANTITY_CONTAINER}>
              <p className={styles.TEXT_QUANTITY}>Cantidad</p>
              <select
                className="w-[160px] h-[40px] text-center flex items-center justify-between px-4 lg:w-[274px] lg:h-[46px] cursor-pointer"
                defaultValue=""
                onChange={() => {}}
              >
                <option value="" disabled>
                  {count()}
                </option>
                {Array.from({ length: stock }).map((_, index) => (
                  <option
                    key={index}
                    value={index + 1}
                    onChange={() =>
                      dispatch(modifyQuantity({ id: Number(id), quantity: 2 }))
                    }
                  >
                    {index + 1}
                  </option>
                ))}
              </select>

              <DownArrow />
            </div>

            {/* COLORES DISPONIBLES
            <div className="flex rounded-[8px] md:justify-normal md:px-0 md:border-none border-[1px] border-solid border-argenpesos-textos w-[160px] h-[40px] justify-between px-4 items-center">
              <div className="flex items-center md:flex-col md:items-start gap-2">
                <div className="md:hidden w-[12px] h-[12px]  bg-argenpesos-textos rounded-full"></div>
                <p className="text-[12px] md:text-lg font-bold text-argenpesos-textos">
                  Color
                </p>
                <div className="hidden md:flex  space-x-[1.70rem]">
                  <div className="w-[15px] h-[15px]  bg-argenpesos-textos rounded-full"></div>
                  <div className="w-[15px] h-[15px]  bg-blue-500 color-green rounded-full"></div>
                  <div className="w-[15px] h-[15px]  bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="md:hidden">
                <DownArrow />
              </div>
            </div> */}
          </div>

          <div className={styles.DESCRIPTION_CONTAINER}>
            <p className={styles.P_DESCRIPTION}>
              Descripción:{" "}
              <span
                className={styles.SPAN_DESCRIPTION}
                dangerouslySetInnerHTML={{ __html: product.description || "" }}
              ></span>
            </p>
          </div>

          <Button
            className={styles.BTN_BUY}
            text="Comprar"
            onClick={handleBuy}
          />
        </div>
      </div>
      {/* <RecomenProducts /> */}
      <Recommended category={product.category?.id} />
    </div>
  ) : (
    <div>LOADING...</div>
  );
}

export default ProductDetail;
