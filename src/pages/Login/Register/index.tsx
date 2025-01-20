import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "../../../utils/svg";
import InputGeneral from "../../../components/InputGeneral";
import Button from "../../../components/Button";
import { useAppDispatch } from "../../../redux/store";
import { useEffect, useState } from "react";
import { signUpAsync } from "../../../redux/actions/auth";
import {
  updateFirstData,
  updateSecondData,
} from "../../../redux/services/user";
import { validateInputs } from "../../../utils/functions";
import { alertError } from "../../../utils/alerts";

export interface RegisterProps {
  name: string;
  email: string;
  cuil: string;
  phone: string;
  birthday: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  
  const [data, setData] = useState<RegisterProps>({
    name: "",
    email: "",
    cuil: "",
    phone: "",
    birthday: "",
    password: "",
  });
  const [active, setActive] = useState<boolean>(false);
  const [errors, setErrors] = useState<RegisterProps>({
    name: "",
    email: "",
    cuil: "",
    phone: "",
    birthday: "",
    password: "",
  });
  const [showErrors, setShowError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "phone" || e.target.name === "cuil") {
      const regex = /^[0-9]*$/;
      if (!regex.test(e.target.value)) {
        return
      }
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleError = (inputs : RegisterProps) => {
    const inputsErrors = validateInputs(inputs);
    setErrors(inputsErrors);
    return inputsErrors
  };
  
  useEffect(() => {
    if (Object.values(data).every((value) => value !== "")) {
      setActive(true)
    }
  }, [data])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputErrors = handleError(data)
    if (Object.values(inputErrors).some((value) => value !== "")) {
      setShowError(true);
      return;
    }
    setActive(false);
    const create = {
      email: data.email,
      password: data.password,
    };
      const responseSignUp = await dispatch(signUpAsync({ create, setActive, dispatch }));
      if (typeof responseSignUp === 'object' && 'payload' in responseSignUp && responseSignUp.payload === "El usuario ya existe") {
        setActive(false);
        alertError("El usuario ya existe");
        return;
      }
  
      const responseFirstData = await updateFirstData({
        first_name: data.name.split(" ")[0],
        last_name: data.name.split(" ")[1],
        cuil: data.cuil,
        dispatch,
      });

      if (responseFirstData?.payload?.error) {
        setActive(false);
        alertError(responseFirstData.payload.message);
        return;
      }
  
      await updateSecondData({
        birthday: data.birthday,
        phone: data.phone,
        dispatch,
      });      
  
      navigate('/verify-email')
      
  };

  return (
    <div className="flex px-7 lg:pb-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full lg:w-[50%] bg-white rounded-[8px] lg:px-[2.81rem] py-0 max-w-[550px] mx-auto lg:max-w-full"
      >
        <div className="flex flex-col w-full">
          <div className="flex pb-8 lg:flex-row-reverse lg:justify-between lg:items-center">
            <img
              src="/logo_login.png"
              alt="logo"
              className="block w-[174px] h-[48px] object-cover mx-auto lg:m-0"
            />
            <Link className="flex items-center gap-3" to="/login">
              <ArrowLeft />
              <p className="hidden lg:flex text-[14px] font-book text-argenpesos-textos">
                Volver
              </p>
            </Link>
          </div>
          <h2 className="text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] text-argenpesos-textos font-book leading-[120%] tracking-[-0.6px] lg:mt-10 lg:font-medium">
            Registrarse
          </h2>
          <p className="text-[clamp(0.75rem,0.571rem_+_0.476vw,1rem)] font-book text-argenpesos-textos lg:mt-1">
            Ingrese su email y contraseña para continuar
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full mt-6">
          <InputGeneral
            name="name"
            onChange={handleChange}
            value={data.name}
            type="text"
            label="Nombre y apellido"
            className="text-[16px] text-[#111827CC] font-light lg:h-[50px] w-full"
          />
          <InputGeneral
            name="email"
            onChange={handleChange}
            value={data.email}
            type="text"
            label="Email"
            className="text-[16px] text-[#111827CC] font-light lg:h-[50px] w-full"
          />
          <InputGeneral
            name="cuil"
            onChange={handleChange}
            value={data.cuil ? data.cuil : ""}
            type="text"
            label="Cuil"
            className="text-[16px] text-[#111827CC] font-light lg:h-[50px] w-full"
          />
          <InputGeneral
            name="phone"
            onChange={handleChange}
            value={data.phone ? data.phone : ""}
            type="text"
            label="Teléfono"
            className="text-[16px] text-[#111827CC] font-light lg:h-[50px] w-full"
          />
          <InputGeneral
            name="birthday"
            onChange={handleChange}
            value={data.birthday}
            type="date"
            label="Fecha de nacimiento"
            className={`text-[16px] appearance-none ${
              data.birthday ? "text-[#111827CC]" : "text-white"
            } focus:text-black/40 font-light lg:h-[50px] w-full`}
          />
          <InputGeneral
            name="password"
            onChange={handleChange}
            value={data.password}
            type="password"
            label="Tu Contraseña"
            className="text-[16px] text-[#111827CC] font-light lg:h-[50px] w-full"
          />
        </div>
        {Object.values(errors).some((error) => error) && showErrors && (
          <p className="text-red-500 text-sm text-wrap max-h-5 px-2">
            {Object.values(errors)
              .filter((error) => error)
              .join(" ")}
          </p>
        )}
        <Button
          className={`${Object.values(errors).some((error) => error) ? "mt-16" : "mt-10"} w-full ${!active && "opacity-60"}`}
          type="submit"
          text="Registrarse"
        />
      </form>

      <img
        className="w-[70%] h-[90vh] hidden lg:flex object-cover rounded-[13px]"
        src="/img_login.png"
      ></img>
    </div>
  );
};

export default Register;
