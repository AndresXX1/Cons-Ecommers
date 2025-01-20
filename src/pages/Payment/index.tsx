import { Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "../../utils/svg";
import ModalCart from "../../components/ModalCart";
import InputGeneral from "../../components/InputGeneral";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface DataValue {
  name: string;
  surname: string;
  email: string;
  phone: number | null;
  date: string;
  cuil: number | null;
}

const Payment = () => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  const [data, setData] = useState<DataValue>({
    name: "",
    surname: "",
    email: "",
    phone: null,
    date: "",
    cuil: null,
  });

  localStorage.setItem("contact", JSON.stringify(data));

  // const validate = (dataValue: DataValue) => {
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //   const validator =
  //     dataValue.name.length >= 2 &&
  //     dataValue.phone &&
  //     dataValue.phone.toLocaleString().length > 8 &&
  //     emailRegex.test(dataValue.email);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...data, [e.target.name]: e.target.value };
    setData(newData);
    // validate(newData);
    localStorage.setItem("contact", JSON.stringify(newData));
  };

  const navigate = useNavigate();
  if (authenticated) return <Navigate to="/delivery" />;
  return (
    <div className="lg:flex container-pad-width lg:pt-12 justify-between lg:mb-28 gap-10">
      <div className="flex pb-8 lg:flex-row-reverse lg:justify-between lg:items-center px-5 lg:hidden">
        <Link className="flex items-center gap-3 lg:hidden" to="/cart">
          <ArrowLeft />
        </Link>
        <p className="mx-auto text-[14px] font-book leading-[120%] tracking-[-0.42px] text-argenpesos-textos">
          Comprar producto
        </p>
      </div>
      <div className="px-5 mb-40">
        <p className="pb-7 text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] font-book leading-[120%] tracking-[-0.6px] text-argenpesos-textos lg:tracking-[-1.2px]">
          Información de contacto
        </p>
        <p className="pb-7 text-argenpesos-textos text-[clamp(0.75rem,0.169rem_+_1.549vw,1.563rem)] font-book leading-[130%]">
          Ingrese sus datos por donde será notificado el estado de su compra
        </p>
        <div className="max-w-[481px] flex flex-col gap-4">
          <div className="md:w-[60%]">
            <InputGeneral
              value={data.name}
              name="name"
              onChange={handleChange}
              label="Nombre"
              className="text-[16px] text-[#111827CC] font-light"
            />
          </div>
          <div className="md:w-[60%]">
            <InputGeneral
              value={data.email}
              name="email"
              onChange={handleChange}
              label="Email"
              className="text-[16px] text-[#111827CC] font-light"
            />
          </div>

          <div className="md:w-[60%]">
            <InputGeneral
              value={data.phone || ""}
              name="phone"
              onChange={handleChange}
              label="Teléfono"
              className="text-[16px] text-[#111827CC] font-light"
            />
          </div>
        </div>
      </div>
      <ModalCart onClick={() => navigate("/delivery")} />
    </div>
  );
};

export default Payment;
