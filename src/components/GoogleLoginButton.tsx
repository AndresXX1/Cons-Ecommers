import { useGoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../redux/store";
import { Google } from "../utils/svg";
import { logInWithGoogleAsync } from "../redux/actions/auth";

const GoogleLoginButton = ({
  label,
  setError,
}: {
  label: string;
  setError: (error: string | null) => void;
}) => {
  const dispatch = useAppDispatch();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async response => {
      const { access_token } = response;
      dispatch(
        logInWithGoogleAsync({ token: access_token, dispatch, setError })
      );
    },
    onError: () => {
      setError("Error al iniciar sesión con Google");
    },
  });

  return (
    <button
      onClick={() => handleGoogleLogin()}
      type="button"
      className="border-argenpesos-red text-argenpesos-red text-[14px] font-book w-full border h-14 rounded-[8px] flex items-center gap-3 justify-center bg-argenpesos-white leading-[100%] lg:text-[16px]"
    >
      <Google color="#F9FAFB" className="w-6 h-6" />
      {label} sesión con Google
    </button>
  );
};

export default GoogleLoginButton;

