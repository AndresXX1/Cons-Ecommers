// src/pages/Login/Verify-email/index.tsx

import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft } from "../../../utils/svg";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { resendCode, verifyCode } from "../../../redux/actions/auth";
import Button from "../../../components/Button";
import { useEffect, useRef, useState } from "react";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { user, authenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string[]>([]);

  // Primer useEffect: Redireccionar si el email ya está verificado
  useEffect(() => {
    if (user?.email_verified) {
      navigate("/home");
    }
  }, [user?.email_verified, navigate]);

  // Segundo useEffect: Manejar estados de carga y autenticación
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
    
    if (!loading && !authenticated) {
      navigate("/login");
    }
  }, [user, authenticated, loading]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsButtonDisabled(true);
    const dto = {
      code: code.join("").toString(),
    };
    const response = await dispatch(
      verifyCode({ dto, setError, setActive: setIsButtonDisabled })
    );
    if (
      response.payload &&
      typeof response.payload === "object" &&
      "ok" in response.payload
    ) {
      if (response.payload.ok) {
        setLoading(false);
        resetInputs();
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    }
  }

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusNextInput = (index: number) => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const focusPrevInput = (index: number) => {
    if (inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const [content, setContent] = useState<Array<string>>(Array(5).fill(""));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = e.target.value;
    const updatedContent = [...content];
    updatedContent[index] = e.target.value;
    setContent(updatedContent);
    validateInputs(updatedContent);
    if (inputValue.length === 1) {
      setCode((prevState) => [...prevState, e.target.value]);
      focusNextInput(index);
    } else if (inputValue.length === 0) {
      setCode((prevState) => prevState.slice(0, -1));
      focusPrevInput(index);
    }
  };

  const validateInputs = (inputs: string[]) => {
    const allFilled = inputs.every((value) => value.trim() !== "");
    setIsButtonDisabled(!allFilled);
  };

  const resetInputs = () => {
    setContent(Array(5).fill("")); // Blanquea el estado
    setIsButtonDisabled(true);
    inputRefs.current.forEach((input) => {
      if (input && input instanceof HTMLInputElement) {
        input.value = ""; // Opcional: asegura que los valores de los inputs se blanqueen directamente
      }
    });
  };

  useEffect(() => {
    // Validar los inputs al montar el componente por si el estado inicial cambia
    validateInputs(content);
  }, []);

  const handleResendCode = async () => {
    if (isButtonDisabled) return; // Prevenir múltiples envíos
    setIsButtonDisabled(true);
    resetInputs();
    await resendCode(dispatch);
    setTimeout(() => setIsButtonDisabled(false), 60000); // 1 minuto de espera
  };

  // Condiciones de redirección en el render
  if (!loading && authenticated && user && user.email_verified) {
    return <Navigate to="/auth/complete-profile" />;
  }

  if (!loading && authenticated && user && user.email_verified) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex px-7 lg:pb-10">
      <form
        className="flex flex-col w-full max-w-[643px] lg:max-h-[800px] bg-white rounded-[8px] lg:px-[2.81rem] px-[35px] py-1 lg:py-12 text-padelink-black"
        onSubmit={submit}
      >
        <div className="flex pb-8 lg:flex-row-reverse lg:justify-between lg:items-center">
          <img
            src="/logo_login.png"
            alt="logo"
            className="block w-[174px] h-[48px] object-cover mx-auto lg:m-0"
          />
          <Link className="flex items-center gap-3" to="/register">
            <ArrowLeft />
            <p className="hidden lg:flex text-[14px] font-book text-argenpesos-textos">
              Volver
            </p>
          </Link>
        </div>

        <h3 className="text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] text-argenpesos-textos font-book leading-[120%] tracking-[-0.6px] lg:mt-10 lg:font-medium">
          Verifica tu correo
        </h3>

        <p className="text-[clamp(0.75rem,0.571rem_+_0.476vw,1rem)] font-book text-argenpesos-textos lg:mt-1">
          Busca en tu casillero el código de verificación. Revisa también en
          spam.
        </p>

        <div className="flex items-center mx-auto flew-row gap-2 flex-shrink-0 flex-grow-0 rounded-[1px] mt-16 mb-[7.5rem]">
          {[...Array(5)].map((_, index) => (
            <input
              className={`text-center h-[80px] lg:h-[120px] w-[53px] lg:pb-5 text-[2.75rem] lg:text-[5rem] text-gray-700 border-0 border-b-4 border-b-red-200 focus:outline-none transition focus:ring-0 focus:border-padelink-red focus:border-b-8 focus:text-padelink-red md:w-[98.6px] ${
                content[index] ? "has-content" : ""
              }`}
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleInputChange(e, index)}
              maxLength={1}
              value={content[index]}
              onKeyDown={(k) => {
                if (k.key === "Backspace" && !k.currentTarget.value) {
                  focusPrevInput(index);
                } else {
                  if (k.key !== "Backspace" && k.currentTarget.value) {
                    focusNextInput(index);
                  }
                }
              }}
            />
          ))}
        </div>
        <Button
          text="Continuar"
          type="submit"
          disabled={isButtonDisabled}
          className={`w-full cursor-pointer ${
            isButtonDisabled ? "opacity-50" : ""
          }`}
        ></Button>

        {error ? (
          <p className="text-red-500 text-sm text-wrap max-h-10 py-4">
            {error}
          </p>
        ) : (
          <p className="text-transparent text-sm text-wrap max-h-10 py-4">
            El codigo es incorrecto.
          </p>
        )}

        <div className="flex justify-center">
          <p
            className="w-fit text-center text-argenpesos-red hover:font-bold font-book  cursor-pointer"
            onClick={() => handleResendCode()}
          >
            Reenviar código
          </p>
        </div>
      </form>
      <img
        className="w-[70%] h-[95vh] hidden lg:flex object-cover rounded-[13px]"
        src="/img_login.png"
        alt="Login Illustration"
      ></img>
    </div>
  );
};

export default VerifyEmail;
