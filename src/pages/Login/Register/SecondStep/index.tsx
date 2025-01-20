import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "../../../../utils/svg";
import InputGeneral from "../../../../components/InputGeneral";
import Button from "../../../../components/Button";

const SecondStep = () => {
  const [data, setData] = useState({
    name: "",
    lastname: "",
    email: "",
    cuil: "",
    number: "",
    home: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex px-7">
      <form className="flex flex-col w-full lg:w-[50%] bg-white rounded-[8px] lg:px-[2.81rem] py-0 max-w-[550px] mx-auto lg:max-w-full">
        <div className="flex flex-col w-full">
          <div className="flex pb-8 lg:flex-row-reverse lg:justify-between lg:items-center">
            <Link className="flex items-center gap-3" to="/register">
              <ArrowLeft />
              <p className="hidden lg:flex text-[14px] font-book text-argenpesos-textos">
                Volver
              </p>
            </Link>
            <img
              src="/logo_login.png"
              alt="logo"
              className="block w-[174px] h-[48px] object-cover mx-auto lg:m-0"
            />
          </div>
          <h2 className="text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] text-argenpesos-textos font-book leading-[120%] tracking-[-0.6px] lg:font-medium lg:tracking-[-1.2px]">
            Registrarse
          </h2>
          <p className="text-[clamp(0.75rem,0.571rem_+_0.476vw,1rem)] font-book text-argenpesos-textos lg:mt-1">
            Ingrese email y contraseña para continuar
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full mt-6">
          <div className="flex gap-10">
            <InputGeneral
              value={data.name}
              onChange={handleChange}
              name="name"
              type="text"
              label="Nombre"
              className="text-[16px] text-[#111827CC] font-light lg:h-[50px] w-full"
            />
            <InputGeneral
              value={data.lastname}
              onChange={handleChange}
              name="lastname"
              type="text"
              label="Apellido"
              className="text-[16px] text-[#111827CC] font-light lg:h-[50px] w-full"
            />
          </div>
          <InputGeneral
            onChange={handleChange}
            value={data.email}
            name="email"
            type="text"
            label="Email"
            className="text-[16px] text-[#111827CC] font-light lg:h-[50px] w-full"
          />
          <InputGeneral
            value={data.cuil}
            onChange={handleChange}
            name="cuil"
            type="text"
            label="Cuil"
            className="text-[16px] text-[#111827CC] font-light lg:h-[50px] w-full"
          />
          <InputGeneral
            value={data.number}
            onChange={handleChange}
            name="number"
            type="text"
            label="Teléfono"
            className="text-[16px] text-[#111827CC] font-light lg:h-[50px] w-full"
          />
          <InputGeneral
            value={data.home}
            onChange={handleChange}
            name="home"
            type="text"
            label="Domicilio"
            className="text-[16px] text-[#111827CC] font-light lg:h-[50px] w-full"
          />
          <InputGeneral
            value={data.password}
            onChange={handleChange}
            name="date"
            type="date"
            label=""
            className="text-[16px] text-[#111827CC] font-light lg:h-[50px] w-full"
          />
        </div>
        <Button className="mt-6 w-full lg:h-[52px]" text="Crear cuenta" />
      </form>
      <img
        className="w-[70%] h-[95vh] hidden lg:flex object-cover rounded-[13px]"
        src="/img_login.png"
      ></img>
    </div>
  );
};

export default SecondStep;
