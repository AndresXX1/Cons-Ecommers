import Button from "../../components/Button";
import { logOutAsync } from "../../redux/actions/auth";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  ArrowRight,
  IconCell,
  IconHomeBlack,
  IconKey,
  IconLogout,
  IconMail,
  IconPadlock,
  IconTerms,
  IconUser,
  IconWallet,
} from "../../utils/svg";
import { useSelector } from "react-redux";
import EditUser from "./EditUser";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  console.log(user?.address?.[0]);

  return (
    <div className="px-5 container-pad-width md:flex gap-16 justify-center pt-20">
      <div>
        <h3 className="text-argenpesos-textos text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] font-book leading-[120%] tracking-[-0.6px] pt-5 mb-10">
          Información personal
        </h3>
        <EditUser />
        <div className="flex items-center gap-5 mb-10">
          <IconUser />
          <div>
            <p className="text-[clamp(0.875rem,0.607rem_+_0.714vw,1.25rem)] text-argenpesos-textos font-bold">
              Nombre y apellido
            </p>
            <p className="text-[clamp(0.75rem,0.571rem_+_0.476vw,1rem)] text-argenpesos-textos font-book">
              {user?.first_name} {user?.last_name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 mb-10">
          <IconWallet />
          <div>
            <p className="text-[clamp(0.875rem,0.607rem_+_0.714vw,1.25rem)] text-argenpesos-textos font-bold">
              CUIL
            </p>
            <p className="text-[clamp(0.75rem,0.571rem_+_0.476vw,1rem)] text-argenpesos-textos font-book">
              {user?.cuil}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 mb-10">
          <IconCell />
          <div>
            <p className="text-[clamp(0.875rem,0.607rem_+_0.714vw,1.25rem)] text-argenpesos-textos font-bold">
              Teléfono
            </p>
            <p className="text-[clamp(0.75rem,0.571rem_+_0.476vw,1rem)] text-argenpesos-textos font-book">
              {user?.phone}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 mb-10">
          <IconMail />
          <div>
            <p className="text-[clamp(0.875rem,0.607rem_+_0.714vw,1.25rem)] text-argenpesos-textos font-bold">
              Email
            </p>
            <p className="text-[clamp(0.75rem,0.571rem_+_0.476vw,1rem)] text-argenpesos-textos font-book">
              {user?.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 mb-10">
          <IconHomeBlack />
          <div>
            <p className="text-[clamp(0.875rem,0.607rem_+_0.714vw,1.25rem)] text-argenpesos-textos font-bold">
              Domicilio
            </p>
            <p className="text-[clamp(0.75rem,0.571rem_+_0.476vw,1rem)] text-argenpesos-textos font-book">
              {user?.address?.[0]
                ? `${user?.address?.[0].street} ${user?.address?.[0].number}, ${user?.address?.[0].zipCode}, ${user?.address?.[0].province}, ${user?.address?.[0].city}`
                : "No ha agregado su domicilio"}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-argenpesos-textos text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] font-book leading-[120%] tracking-[-0.6px] pt-5 mb-10">
          Seguridad
        </h3>

        <div className="flex items-center justify-between mr-10 mb-16 lg:gap-28 cursor-pointer">
          <div className="flex gap-5">
            <IconKey />

            <p className="text-[clamp(0.875rem,0.696rem_+_0.476vw,1.125rem)] text-argenpesos-textos font-book">
              Cambiar contraseña
            </p>
          </div>
          <ArrowRight />
        </div>
        <div className="flex items-center justify-between mr-10 mb-16 cursor-pointer">
          <div className="flex gap-5">
            <IconPadlock />

            <p className="text-[clamp(0.875rem,0.696rem_+_0.476vw,1.125rem)] text-argenpesos-textos font-book">
              Ver políticas de privacidad
            </p>
          </div>
          <ArrowRight />
        </div>
        <div className="flex items-center justify-between mr-10 mb-16 cursor-pointer">
          <div className="flex gap-5">
            <IconTerms />

            <p className="text-[clamp(0.875rem,0.696rem_+_0.476vw,1.125rem)] text-argenpesos-textos font-book">
              Ver términos y condiciones
            </p>
          </div>
          <ArrowRight />
        </div>

        <h3 className="text-argenpesos-textos text-[clamp(1.25rem,0.357rem_+_2.381vw,2.5rem)] font-book leading-[120%] tracking-[-0.6px] pt-3 mb-10">
          Tu cuenta
        </h3>
        <button
          onClick={() => dispatch(logOutAsync())}
          className="w-[333px] bg-argenpesos-white flex items-center justify-center mx-auto h-[51px] rounded-[8.5px] border-[1px] border-solid border-argenpesos-red text-argenpesos-red text-[14px] font-book mb-5 gap-3 lg:text-[16px]"
        >
          <IconLogout />
          Cerrar Sesión
        </button>

        <Button className="lg:text-[16px]" text="Eliminar Cuenta" />
      </div>
    </div>
  );
};
export default Profile;
