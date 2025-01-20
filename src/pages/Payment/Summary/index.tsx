import { Link } from "react-router-dom";
import ModalCart from "../../../components/ModalCart";
import { ArrowLeft } from "../../../utils/svg";
import { useNavigate } from "react-router-dom";
import CardResume from "../../../components/CardsResume";
import {
  Address,
  BuyerProps,
  CreateOrderProps,
  DeliveryProps,
} from "../../../utils/interface";
import Button from "../../../components/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { IStore } from "../Delivery/stores";
import {
  createGuestOrder,
  createOrder,
  postCreateMP,
} from "../../../redux/services/products";
import { alertConfirm, alertError } from "../../../utils/alerts";
import { FiCopy, FiExternalLink } from "react-icons/fi";

interface responseMP {
  ok: boolean;
  link: string;
}

const Summary = () => {
  const { user, authenticated } = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart);

  const navigate = useNavigate();
  const [delivery, setDelivery] = useState<DeliveryProps>();
  const [contact, setContact] = useState<BuyerProps>();
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState<{
    type: string;
    auxData: Address;
  }>();
  const [shippingDelivery, setShippingDelivery] = useState<{
    type: string;
    auxData: Address;
  }>();
  const [shippingPickup, setShippingPickup] = useState<{
    type: string;
    auxData: IStore;
  }>();
  const [payment, setPayment] = useState<{
    option: string;
    isApproved: boolean;
  }>();

  const loadFromLocalStorage = () => {
    try {
      const deliveryState = localStorage.getItem("delivery");
      if (deliveryState) {
        setDelivery(JSON.parse(deliveryState));
      }
      const contactState = localStorage.getItem("contact");
      if (contactState) {
        setContact(JSON.parse(contactState));
      }
      const shippingStateMp = localStorage.getItem("shipping");
      if (shippingStateMp) {
        setShipping(JSON.parse(shippingStateMp));
      }
      const shippingState = localStorage.getItem("shipping");
      if (shippingState) {
        const dataShipping = JSON.parse(shippingState);
        if (dataShipping.type === "delivery") {
          setShippingDelivery({
            type: dataShipping.type,
            auxData: dataShipping.auxData,
          });
        } else {
          setShippingPickup({
            type: dataShipping.type,
            auxData: dataShipping.auxData,
          });
        }
      }
      const paymentState = localStorage.getItem("payment_method");
      if (paymentState) {
        setPayment(JSON.parse(paymentState));
      }
    } catch (e) {
      console.error("Error cargando de localStorage", e);
      return undefined;
    }
  };

  console.log(payment?.option);

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const handleWA = () => {
    const url = `https://wa.me/5491171448040?text=${encodeURIComponent(
      `Hola, Argenpesos! \n Mi nombre es *${user?.first_name}*. Tengo un prestamos pre-aprobado de ${cart?.total_price}
                   \n Cuil: *${user?.cuil}* \n Me gustaría recibir mas información al respecto \n ------------------
                `
    )}`;
    window.open(url, "_blank");
  };

  const handleCreateMP = async () => {
    try {
      let newOrderId = 0;
      console.log(cart);
      console.log(contact);
      console.log(delivery);
      if (!shipping || !cart || !contact) {
        alertError("Falta información, intentelo de nuevo");
        return;
      }
      console.log("Validación pasada");
      if (!authenticated) {
        const orderResponse = await createGuestOrder(
          {
            shipmentMethod: shipping.type,
            address: shipping.auxData,
            products: cart.items.map((item) => ({
              productId: item.product.id as number,
              quantity: item.quantity,
            })),
            totalPrice: Number(cart.total_price),
            paymentMethod: "MercadoPago",
          },
          contact
        );
        newOrderId = orderResponse.id;
      } else {
        const orderResponse = await createOrder({
          shipmentMethod: shipping.type,
          address: shipping.auxData,
          products: cart.items.map((item) => ({
            productId: item.product.id as number,
            quantity: item.quantity,
          })),
          totalPrice: Number(cart.total_price),
          paymentMethod: "MercadoPago",
        });
        newOrderId = orderResponse.id;
      }
      const response: responseMP = await postCreateMP(
        newOrderId,
        Number(
          delivery?.amounts.price_incl_tax && cart?.total_price
            ? cart?.total_price + delivery?.amounts.price_incl_tax
            : cart?.total_price
        ) || 0
      );
      if (response.link) {
        window.location.href = response.link;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const concatAddress = (value: Address) => {
    const orderAddress = `${value.street} ${value.number} ${value.zipCode}, ${value.city}, ${value.province} `;
    return orderAddress;
  };

  const transformCartItems = () => {
    return cart.items.map((item) => ({
      productId: item.product.id || 0,
      quantity: item.quantity,
    }));
  };

  const handleCreateOrder = async () => {
    setLoading(true);
    const data: CreateOrderProps = {
      products: transformCartItems() || [{ productId: 0, quantity: 0 }],
      shipmentMethod: shippingDelivery?.type
        ? "Envío a domicilio"
        : "Retiro en local",
      totalPrice: Number(cart?.total_price) || 0,
      address: shippingDelivery?.auxData || shippingPickup?.auxData,
      paymentMethod: payment?.option || "",
    };

    const guestBuyer: BuyerProps = {
      name: contact?.name || "",
      email: contact?.email || "",
      phone: contact?.phone || "",
    };

    if (authenticated) {
      try {
        await createOrder(data);
        setLoading(false);
        payment?.option === "credit" && handleWA();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await createGuestOrder(data, guestBuyer);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    if (payment?.option === "transfer") {
      navigate("/pending");
    } else {
      navigate("/success");
    }
  };

  const handleCopy = (cbu: string) => {
    navigator.clipboard
      .writeText(cbu)
      .then(() => {
        alertConfirm("Se copió el CBU en el portapapeles");
      })
      .catch((_) => {
        alertError("Error al copiar al portapapeles:");
      });
  };

  return (
    <div className="lg:flex container-pad-width lg:pt-12 justify-between lg:mb-28 gap-10">
      <div className="flex pb-8 lg:flex-row-reverse lg:justify-between lg:items-center px-5 lg:hidden">
        <Link className="flex items-center gap-3 lg:hidden" to="/loans">
          <ArrowLeft />
        </Link>
        <p className="mx-auto text-[14px] font-book leading-[120%] tracking-[-0.42px] text-argenpesos-textos">
          Comprar producto
        </p>
      </div>
      <div className="px-5 flex flex-col mb-20">
        <p className="text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] text-argenpesos-textos font-book leading-[120%] tracking-[-0.6px] mb-8">
          Resumen de compra
        </p>

        {shippingDelivery && (
          <div className="flex flex-col gap-5 lg:my-5">
            <p className="text-argenpesos-textos text-[clamp(0.875rem,0.384rem_+_1.31vw,1.563rem)] font-bold">
              Envío a domicilio
            </p>
            <p className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] font-book text-argenpesos-textos leading-[130%]">
              {concatAddress(shippingDelivery.auxData)}
            </p>
          </div>
        )}
        {shippingPickup && (
          <div className="flex flex-col gap-5 lg:my-5">
            <p className="text-argenpesos-textos text-[clamp(0.875rem,0.384rem_+_1.31vw,1.563rem)] font-bold">
              Retiro en tienda
            </p>
            <p className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] font-book text-argenpesos-textos leading-[130%]">
              {shippingPickup?.auxData.address}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-5 mt-9 lg:mb-5">
          <p className="text-argenpesos-textos text-[clamp(0.875rem,0.384rem_+_1.31vw,1.563rem)] font-bold">
            {payment?.option === "market"
              ? "Mercado Pago"
              : payment?.option === "transfer"
              ? "Transferencia"
              : "Crédito"}
          </p>
          {payment?.option === "credit" && (
            <p className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] font-book text-argenpesos-textos leading-[130%]">
              {`Préstamo pre-aprobado de $${cart?.total_price}`}
            </p>
          )}
          {payment?.option === "transfer" && (
            <>
              <p className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] font-book text-argenpesos-textos leading-[130%]">
                Nuestros datos:
              </p>
              <p className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] font-book text-argenpesos-textos leading-[130%]">
                Banco: BBVA
              </p>
              <p className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] font-book text-argenpesos-textos leading-[130%]">
                Razón social: COOPERATIVE DE VIVIE
              </p>
              <div
                className="flex gap-2 cursor-pointer items-center"
                onClick={() => handleCopy("0170039820000000445582")}
              >
                <p className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] font-book text-argenpesos-textos leading-[130%]">
                  CBU: 0170039820000000445582
                </p>
                <FiCopy className="text-xl" color="blue" />
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] font-book text-argenpesos-textos leading-[130%]">
                  Por favor, envíe el comprobante de la transferencia a nuestro
                  WhatsApp{" "}
                </span>
                <a
                  href={`https://wa.me/+541171448040?text="Hola, estoy enviando el comprobante de transferencia. Mi número de pedido o DNI es: "`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] font-book text-blue-500 leading-[130%] flex gap-2"
                >
                  +54 - 1171448040
                  <FiExternalLink className="text-xl text-blue-500" />
                </a>
                <span className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] font-book text-argenpesos-textos leading-[130%]">
                  indicando su número de pedido (o numero de dni) para confirmar
                  su pago.
                </span>
              </div>
            </>
          )}
        </div>

        {/* <div className="flex flex-col gap-5 mt-9 lg:mb-5">
          <p className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] font-book text-argenpesos-textos leading-[130%]">
            {authenticated ? user?.full_name : contact?.name}
          </p>
          <p className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] font-book text-argenpesos-textos leading-[130%]">
            {(date.getMonth() + 1).toString().padStart(2, "0")}/
            {date.getFullYear()}
          </p>
        </div> */}
        <div className="flex flex-col gap-5 mt-9">
          <p className="text-argenpesos-textos text-[clamp(0.875rem,0.384rem_+_1.31vw,1.563rem)] font-bold">
            Email de contacto
          </p>
          <p className="text-[clamp(0.75rem,0.393rem_+_0.952vw,1.25rem)] font-book text-argenpesos-textos leading-[130%]">
            {authenticated ? user?.email : contact?.email}
          </p>
          <div className="flex flex-col gap-5 mb-8">
            <p className="text-argenpesos-textos text-[clamp(0.875rem,0.384rem_+_1.31vw,1.563rem)] font-bold">
              Productos
            </p>
            {cart?.items.map((inf) => (
              <CardResume key={inf.product.id} info={inf} />
            ))}
          </div>
        </div>
      </div>
      <div>
        {payment?.option === "credit" && payment?.isApproved === true ? (
          <Button
            text="Contactar un asesor"
            disabled={loading}
            onClick={handleCreateOrder}
          />
        ) : payment?.option === "market" ? (
          <ModalCart
            disabled={loading}
            onClick={() => handleCreateMP()}
          />
        ) : (
          <ModalCart
            delivery={delivery}
            disabled={loading}
            onClick={() => handleCreateOrder()}
          />
        )}
      </div>
    </div>
  );
};

export default Summary;
