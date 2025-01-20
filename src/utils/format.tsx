import { IconUser, IconShop, IconHomeBlack, IconQueriesBlack } from "./svg";

export const links = [
  {
    to: "/home",
    text: "Home",
    active: ["/home"],
    Icon: IconHomeBlack,
  },
  {
    to: "/explore",
    text: "Explorar",
    active: ["/explore"],
    Icon: IconShop,
  },
  {
    to: "/queries",
    text: "Consultas",
    active: ["/queries"],
    Icon: IconQueriesBlack,
  },
  {
    to: "/profile",
    text: "Perfil",
    active: ["/profile"],
    Icon: IconUser,
  },
];
