import Button from "../../components/Button";
import InputGeneral from "../../components/InputGeneral";
import { IconEmail, IconPhone, IconWhatsapp } from "../../utils/svg";
import { useState } from "react";

const Repentance = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLTextAreaElement | HTMLInputElement;
    setData({ ...data, [name]: value });
  };
  return (
    <div className="container-pad-width mt-10 mb-5 px-5 lg:mt-20">
      <div className="flex flex-col lg:flex-row gap-10 xl:gap-28">
        <div className="flex flex-col gap-5">
          <p className="pt-[18px] text-[14px] lg:text-[30px] text-argenpesos-textos font-bold leading-[142%] tracking-[-0.42px] md:pb-4">
            Contactános
          </p>
          <a
            href="tel:08002202743"
            className="flex gap-1 items-center md:gap-3 lg:pointer-events-none"
          >
            <IconPhone className="md:w-[18px] md:h-[18px] lg:w-[24px] lg:h-[24px]" />
            <p className="text-[clamp(0.625rem,0.357rem_+_0.714vw,1rem)] font-book leading-[142%] tracking-[-0.3px] text-argenpesos-textos md:tracking-[-0.48px]">
              0800 - 2202743
            </p>
          </a>
          <a
            href="https://wa.me/+5491171448040"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-1 items-center md:gap-3"
          >
            <IconWhatsapp className="md:w-[18px] md:h-[18px] lg:w-[24px] lg:h-[24px]" />
            <p className="text-[clamp(0.625rem,0.357rem_+_0.714vw,1rem)] font-book leading-[142%] tracking-[-0.3px] text-argenpesos-textos md:tracking-[-0.48px]">
              +54 - 1171448040
            </p>
          </a>

          <a
            href="mailto:consultas@argencompras.com.ar"
            className="flex gap-1 items-center mb-[18px] md:gap-3 md:pt-2 lg:pointer-events-none"
          >
            <IconEmail className="md:w-[18px] md:h-[18px] lg:w-[24px] lg:h-[22px]" />
            <p className="text-[clamp(0.625rem,0.357rem_+_0.714vw,1rem)] font-book leading-[142%] tracking-[-0.3px] text-argenpesos-textos md:tracking-[-0.48px]">
              consultas@argencompras.com.ar
            </p>
          </a>
        </div>

        <div>
          <p className="text-[12px] md:text-[18px] font-book text-argenpesos-textos leading-[222%] mb-5 lg:mb-10">
            Si te arrepentiste de una compra, podés pedir la cancelación
            enviando este formulario con tu número de orden. Tenés como máximo
            hasta 10 días corridos desde que recibiste el producto.
          </p>
          <div className="flex flex-col lg:flex-row gap-5">
            <InputGeneral
              name="name"
              onChange={handleChange}
              value={data.name}
              label="Nombre"
            />
            <InputGeneral
              name="email"
              onChange={handleChange}
              value={data.email}
              label="Email"
            />
            <InputGeneral
              name="number"
              onChange={handleChange}
              value={data.number}
              label="Teléfono"
            />
          </div>
          <textarea
            name="message"
            onChange={handleChange}
            value={data.message}
            placeholder="Mensaje"
            className="rounded-[8px] border-[1px] p-3 my-2 w-full px-[18px] border-gray-400 leading-[100%] tracking-[-0.16px] text-argenpesos-textos font-book focus:ring-0 bg-white disabled:bg-black h-[300px] resize-none"
          ></textarea>
          <div className="flex items-end justify-end">
            <Button className="m-0" text="Enviar" type="submit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repentance;
