import { Link } from "react-router-dom";
import { ArrowLeft } from "../../../utils/svg";
import ModalCart from "../../../components/ModalCart";
import { useEffect, useState } from "react";
import InputGeneral from "../../../components/InputGeneral";
import { useNavigate } from "react-router-dom";
import Autocomplete from "../../../components/AutoComplete";
import Stores, { IStore } from "./stores";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import RadioBtn from "../../../components/RadioBtn";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import { Address, DeliveryProps, ProductProps } from "../../../utils/interface";
import { getZippingCorization } from "../../../redux/services/products";

const initialData = {
  street: "",
  number: 0,
  zipCode: "",
  city: "",
  province: "",
};

const initialStore = {
  id: 0,
  store: "",
  address: "",
  phone: 0,
};

export interface CotizationProps {
  items: ProductProps[];
  destination: DestintationPops;
  declared_value: number | 0; // Este parametro es para el seguro de el envio si se le pasa 0 es sin seguro
}

export interface DestintationPops {
  zipcode: string;
  state: string;
  city: string;
}

export const Delivery = () => {
  const { authenticated, user } = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [modalAddress, setModalAddress] = useState<string | null>(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [data, setData] = useState<Address>(initialData);
  const [inlineAddress, setInlineAddress] = useState<Address | null>(null);
  const [store, setStore] = useState<IStore>(initialStore);
  const [modal, setModal] = useState<boolean>(false);
  const [delivery, setDelivery] = useState<DeliveryProps>();


  if (authenticated && user) {
    const contactObject = {
      name: user.full_name,
      surname: "",
      email: user.email,
      phone: user.phone,
      date: user.birthday,
      cuil: user.cuil,
    };
    localStorage.setItem("contact", JSON.stringify(contactObject));
  }

  useEffect(() => {
    if (user?.address !== undefined) {
      setInlineAddress(user.address[0]);
    }
  }, []);

  const handleSelectCity = (city: string) => {
    console.log("Ciudad seleccionada:", city);
  };

  const isDataComplete = (address: Address) => {
    return (
      address?.street !== "" &&
      address?.number !== 0 &&
      address?.zipCode !== "" &&
      address?.city !== "" &&
      address?.province !== ""
    );
  };
  const fetchCotization = async (data: Address) => {
    if (cart) {
      try {
        const response = await getZippingCorization({
          declared_value: Number(cart.total_price),
          items: cart.items.flatMap((item) =>
            Array(item.quantity)
              .fill(null)
              .map(() => ({ ...item.product, sku: 0 }))
          ),
          destination: {
            zipcode: data.zipCode,
            state: data.province,
            city: data.city,
          },
        });
        setDelivery(response.results.standard_delivery);
        localStorage.setItem(
          "delivery",
          JSON.stringify(response.results.standard_delivery)
        );
      } catch (error) {
        console.error("Error al obtener cotización:", error);
      }
    }
  };

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = {
      ...data,
      [e.target.name]:
        e.target.name === "number" ? Number(e.target.value) : e.target.value,
    };
    setData(newData);

    !authenticated && setInlineAddress(newData);
    const storage = JSON.parse(localStorage.getItem("shipping") || "{}");
    localStorage.setItem(
      "shipping",
      JSON.stringify({ ...storage, auxData: newData })
    );
    if (isDataComplete(newData) && cart) {
      fetchCotization(newData);
    }
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    if (option !== "Envío a domicilio") {
      setIsEditingAddress(false);
    }
    const auxData = option === "Envío a domicilio" ? data : store;
    localStorage.setItem("shipping", JSON.stringify({ type: option, auxData }));
  };

  const handleModalAddress = (option: string, address?: Address) => {
    setModalAddress(option);
    if (option !== "other") setData(initialData);
    address && setInlineAddress(address);
  };

  const handleEditClick = () => {
    setIsEditingAddress(!isEditingAddress);
    if (selectedOption === "Envío a domicilio" && authenticated) {
      setModal(true);
      setModalAddress(inlineAddress && concatAddress(inlineAddress));
    }
  };

  const handleChangeStore = (store: IStore) => {
    setStore(store);
    const storage = JSON.parse(localStorage.getItem("shipping") || "{}");
    localStorage.setItem(
      "shipping",
      JSON.stringify({ ...storage, auxData: store })
    );
  };

  const handleModal = (value: boolean, text?: string) => {
    setModal(value);
    setIsEditingAddress(false);
    if (text === "Seleccionar" && modalAddress !== "other") {
      setSelectedAddress(modalAddress);
      setData(initialData);
      localStorage.setItem(
        "shipping",
        JSON.stringify({ type: "Envío a domicilio", auxData: selectedAddress })
      );
    }
    if (text === "Seleccionar" && modalAddress === "other") {
      isDataComplete(data) && setInlineAddress(data);
    }
  };

  const concatAddress = (value: Address) => {
    const orderAddress = `${value.street} ${value.number} ${value.zipCode}, ${value.city}, ${value.province} `;
    return orderAddress;
  };

  console.log(initialData)

  return (
    <div className="mb-20 lg:flex container-pad-width lg:pt-12 justify-between lg:mb-28 gap-10">
      <div className="flex pb-8 lg:flex-row-reverse lg:justify-between lg:items-center px-5 lg:hidden">
        <Link className="flex items-center gap-3 lg:hidden" to="/payment">
          <ArrowLeft />
        </Link>
        <p className="mx-auto text-[14px] font-book leading-[120%] tracking-[-0.42px] text-argenpesos-textos">
          Comprar producto
        </p>
      </div>
      <div className="px-5 lg:w-full">
        <p className="pb-7 text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] font-book leading-[120%] tracking-[-0.6px] text-argenpesos-textos lg:tracking-[-1.2px] lg:mb-5">
          Elegí la forma de entrega
        </p>
        <div className="flex justify-between mb-5">
          <RadioBtn
            state={selectedOption}
            handleChange={handleOptionChange}
            id="delivery"
            name="Enviar a domicilio"
            value="Envío a domicilio"
            classname={`text-[clamp(0.913rem,0.449rem_+_1.238vw,1.563rem)] text-argenpesos-textos ${
              selectedOption === "Envío a domicilio" ? "font-bold" : "font-book"
            }`}
          />
          <p className="text-[clamp(0.913rem,0.449rem_+_1.238vw,1.563rem)] text-argenpesos-textos font-book">
            $
          </p>
        </div>
        {selectedOption === "Envío a domicilio" && (
          <>
            {authenticated && user?.address && (
              <>
                {inlineAddress && (
                  <div className="flex flex-col ml-6 font-book gap-4">
                    <p>{concatAddress(inlineAddress)}</p>
                  </div>
                )}
                <Modal
                  isShown={modal}
                  zIndex="z-[9999]"
                  element={
                    <div className="flex flex-col justify-between w-[969px] max-h-[557px] z-[9999] border-solid border-2 py-12 px-14">
                      <p className="hidden lg:flex pb-6 text-[32px] text-argenpesos-textos font-bold">
                        Domicilio
                      </p>
                      {user.address.map((addr: Address) => {
                        // user.address.map((addr) => {
                        const addressInline = concatAddress(addr);
                        return (
                          <RadioBtn
                            state={modalAddress}
                            handleChange={handleModalAddress}
                            id={addressInline}
                            name={addressInline}
                            value={addressInline}
                            address={addr}
                          />
                        );
                      })}
                      <RadioBtn
                        state={modalAddress}
                        handleChange={handleModalAddress}
                        id="other"
                        name="Otro Domicilio"
                        value="other"
                      />
                      {modalAddress === "other" && (
                        <div className="flex flex-col gap-3 lg:max-w-[584px]">
                          <div className="flex flex-col gap-3 lg:flex-row">
                            <Autocomplete
                              onSelectCity={handleSelectCity}
                              onChange={handleChange}
                              data={data}
                            />
                          </div>
                          <div className="flex flex-col gap-3 lg:flex-row">
                            <InputGeneral
                              onChange={handleChange}
                              value={data.zipCode}
                              name="zipCode"
                              label="Código postal"
                              className="text-[16px] text-[#111827CC] font-light"
                            />
                            <InputGeneral
                              onChange={handleChange}
                              value={data.street}
                              name="street"
                              label="Domicilio"
                              className="text-[16px] text-[#111827CC] font-light"
                            />
                            <InputGeneral
                              onChange={handleChange}
                              value={data.number === 0 ? "" : data.number}
                              type="number"
                              name="number"
                              label="Número"
                              className="text-[16px] text-[#111827CC] font-light"
                            />
                          </div>
                        </div>
                      )}
                      <div className="flex flex-nowrap self-end gap-4">
                        <Button
                          text="Cancelar"
                          onClick={() => handleModal(false)}
                          className="w-[121px] h-[38px] bg-argenpesos-white flex items-center justify-center mx-auto rounded-[8.5px] border-[1px] border-solid border-argenpesos-red text-argenpesos-red text-[14px] font-book mb-5 gap-3 lg:text-[16px]"
                        />
                        <Button
                          text="Seleccionar"
                          onClick={() => handleModal(false, "Seleccionar")}
                          className={`${
                            modalAddress === "other" && !isDataComplete(data)
                              ? "bg-[#ED1A004D]"
                              : ""
                          } w-[121px] h-[38px] mb-0`}
                          disabled={
                            modalAddress === "other" && !isDataComplete(data)
                          }
                        />
                      </div>
                    </div>
                  }
                  closeModal={handleModal}
                />
              </>
            )}
            {!isEditingAddress && authenticated && (
              <div>
                {/* <p className="text-[clamp(0.73rem,0.359rem_+_0.99vw,1.25rem)] text-argenpesos-textos font-book ml-5">
                  {data.home} {data.cp}
                </p>
                <p className="text-[clamp(0.73rem,0.359rem_+_0.99vw,1.25rem)] text-argenpesos-textos font-book ml-5">
                  {data.province} {data.city}
                </p> */}

                <p
                  onClick={handleEditClick}
                  className="text-[clamp(0.73rem,0.359rem_+_0.99vw,1.25rem)] text-argenpesos-red font-book ml-5 mt-5 cursor-pointer"
                >
                  Editar o elegir otro domicilio
                </p>
              </div>
            )}
            {!authenticated && (
              <div className="flex flex-col gap-3 lg:max-w-[584px]">
                <div className="flex flex-col gap-3 lg:flex-row">
                  <Autocomplete
                    onSelectCity={handleSelectCity}
                    onChange={handleChange}
                    data={data}
                  />
                </div>
                <div className="flex flex-col gap-3 lg:flex-row">
                  <InputGeneral
                    onChange={handleChange}
                    value={data.zipCode}
                    name="zipCode"
                    label="Código postal"
                    className="text-[16px] text-[#111827CC] font-light"
                  />
                  <InputGeneral
                    onChange={handleChange}
                    value={data.street}
                    name="street"
                    label="Domicilio"
                    className="text-[16px] text-[#111827CC] font-light"
                  />
                  <InputGeneral
                    onChange={handleChange}
                    value={data.number === 0 ? "" : data.number}
                    name="number"
                    label="Número"
                    className="text-[16px] text-[#111827CC] font-light"
                  />
                </div>
              </div>
            )}
          </>
        )}

        <div className="w-full h-[1px] bg-argenpesos-gray2 mt-8"></div>

        <div className="flex justify-between mt-4 lg:mt-8 cursor-pointer">
          <RadioBtn
            state={selectedOption}
            handleChange={handleOptionChange}
            id="Retiro en local"
            name="Retirar en uno de nuestros locales"
            value="Retiro en local"
            classname={`text-[clamp(0.913rem,0.449rem_+_1.238vw,1.563rem)] text-argenpesos-textos max-w-[220px] lg:max-w-full ${
              selectedOption === "Retiro en local" ? "font-bold" : "font-book"
            }`}
          />

          <p className="text-[clamp(0.913rem,0.449rem_+_1.238vw,1.563rem)] text-argenpesos-textos font-book">
            Gratis
          </p>
        </div>
        {selectedOption === "Retiro en local" && (
          <>
            <Stores onChange={handleChangeStore} />
            <div className="p-4">
              <h3>{store.store}</h3>
              <p>{store.address}</p>
              <span>{store.phone === 0 ? null : `+${store.phone}`}</span>
            </div>
            <div className="w-[full] h-[full] md:w-[600px] md:h-[450px]">
              {store.id !== 0 && store.map !== undefined && (
                <iframe
                  src={store.map}
                  className="w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                ></iframe>
              )}
            </div>
          </>
        )}
      </div>
      <ModalCart
        delivery={delivery}
        disabled={
          selectedOption === null ||
          //(selectedOption === "delivery" && !isDataComplete(data)) ||
          (selectedOption === "Envío a domicilio" &&
            !isDataComplete(inlineAddress || initialData)) ||
          (selectedOption === "Retiro en local" && store.id === 0)
        }
        onClick={() => navigate("/payment-method")}
      />
    </div>
  );
};

export default Delivery;
