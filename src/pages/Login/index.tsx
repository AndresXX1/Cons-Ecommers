import { useState } from "react";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import InputGeneral from "../../components/InputGeneral";
import { ArrowLeft } from "../../utils/svg";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { logInAsync } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

const LogIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [active, setActive] = useState<boolean>(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (data.email === "" || data.password === "") {
      if (data.email === "") {
        setError("Introduce un Correo electrónico.");
      }
      if (data.password === "") {
        setError(prevState =>
          prevState
            ? (prevState = prevState + " " + "Introduce una Contraseña.")
            : (prevState = "Introduce una Contraseña.")
        );
      }
      return;
    }
    setActive(true);
    dispatch(logInAsync({ data, setActive, setError, dispatch }));
  };

  return (
    <div className="flex px-7 lg:pb-10">
      <form onSubmit={handleSubmit} className="flex flex-col w-full lg:w-[50%] bg-white rounded-[8px] lg:px-[2.81rem] py-0 max-w-[550px] mx-auto lg:max-w-full">
        <div className="flex flex-col w-full">
          <div className="flex pb-8 lg:flex-row-reverse lg:justify-between lg:items-center">
            <img
              src="/logo_login.png"
              alt="logo"
              className="block w-[174px] h-[48px] object-cover mx-auto lg:m-0"
            />
            <Link className="flex items-center gap-3" to="/home">
              <ArrowLeft />
              <p className="hidden lg:flex text-[14px] font-book text-argenpesos-textos">
                Volver
              </p>
            </Link>
          </div>
          <h2 className="text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] text-argenpesos-textos font-book leading-[120%] tracking-[-0.6px] lg:mt-10 lg:font-medium">
            Inicio de sesión
          </h2>
          <p className="text-[clamp(0.75rem,0.571rem_+_0.476vw,1rem)] font-book text-argenpesos-textos lg:mt-1">
            Ingrese su email y contraseña para continuar
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full mt-6">
          <InputGeneral
            onChange={handleChange}
            value={data.email}
            name="email"
            type="text"
            label="Email"
            className="text-[16px] text-[#111827CC] font-light lg:h-[50px] w-full"
          />
          <InputGeneral
            onChange={handleChange}
            value={data.password}
            name="password"
            type="password"
            label="Contraseña"
            className="text-[16px] text-[#111827CC] font-light lg:h-[50px] w-full"
          />
        </div>
        {error ? (
          <p className="text-red-500 text-sm text-wrap text-center max-h-5 px-2 mb-2">
            {Array.isArray(error) ? error.join(" ") : error}
          </p>
        ) : (
          <div className="hidden w-full h-4"></div>
        )}

        <p className="pt-[19px] pb-7 text-argenpesos-red text-[12px] font-book lg:text-[14px] leading-[120%] cursor-pointer">
          ¿Olvidaste tu contraseña?
        </p>
        <Button
          className="w-full lg:mb-5 lg:text-[16px]"
          type="submit"
          disabled={active}
          text="Iniciar sesión"
        />
        <div className="flex items-center justify-center space-x-[12px] w-full mb-8 lg:mb-5">
          <div className="bg-[#E9E9E9] flex-grow h-[1px]"></div>
          <div className="text-[#8F8F8F] text-center text-[14px]  font-regular leading-[120%]">
            O
          </div>
          <div className="bg-[#E9E9E9] flex-grow h-[1px]"></div>
        </div>
        <GoogleLoginButton label="Iniciar" setError={setError} />
        <p className="pt-14 text-[12px] lg:text-[14px] text-center text-argenpesos-textos font-book leading-[100%]">
          ¿Sos nuevo en la plataforma?{" "}
          <Link to="/register">
            <span className="text-argenpesos-red"> Registrarme</span>
          </Link>
        </p>
      </form>

      <img
        className="w-[70%] h-[90vh] hidden lg:flex object-cover rounded-[13px]"
        src="/img_login.png"
      ></img>
    </div>
  );
};

export default LogIn;
