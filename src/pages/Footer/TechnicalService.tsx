const TechnicalServices = () => {
  const data = [
    {
      img: "/footer/image_samsung.png",
      number: "0810-555-7267",
      attention: "Lunes a viernes de 9 a 18hs",
      support: "https://www.samsung.com/ar/support/service-center/",
    },
    {
      img: "/footer/image_motorola.png",
      number: "0800-666-8676",
      attention: "Lunes a viernes de 9 a 21hs",
      support: "https://www.motorola.com.ar/servicio-tecnico",
    },
    {
      img: "/footer/image_jbl.png",
      number: "0800-362-0008",
      attention: "Lunes a viernes de 9 a 18hs",
      support: "https://support.jbl.com/ar/es/",
    },
    {
      img: "/footer/image_liliana.png",
      number: "0800 777 0407",
      attention: "Lunes a viernes, de 9 a 18hs",
      support: "https://www.liliana.com.ar/servicio-tecnico/",
    },
    {
      img: "/footer/image_philco.png",
      number: "0810-444-7445",
      attention: "11 2503-3474",
      support: "https://philco.com.ar/servicio-tecnico-philco",
    },
    {
      img: "/footer/image_noblex.png",
      number: "0810-444-6625",
      attention: "11 2503-3296",
      support: "https://noblex.com.ar/servicio-tecnico-noblex",
    },
  ];
  return (
    <div className="container-pad-width mt-10 mb-5 px-5 lg:px-0">
      <h4 className="text-argenpesos-textos text-[40px] font-book leading-[120%] tracking-[-1.2px] mb-20">
        Servicio técnico
      </h4>

      <p className="text-[14px] lg:text-[20px] font-book text-argenpesos-textos">
        Si tuviste un problema con un producto adquirido en nuestra tienda
        online por fallas técnicas del mismo por favor comunicate con el
        servicio técnico de la marca correspondiente.
      </p>

      {data.map((info, key) => (
        <div key={key}>
          <img
            key={key}
            className={`object-cover my-14 ${
              key === 2
                ? "w-[210px] h-[120px]"
                : key === 4
                ? "w-[310px] h-[80px] lg:w-[360px] lg:h-[91px]"
                : key === 5
                ? "w-[300px] lg:w-[419px] lg:h-[109px]"
                : "w-[310px] lg:w-[300px] h-[88px]"
            }`}
            src={info.img}
            alt="img"
          />
          <p className="text-[14px] lg:text-[20px] font-bold text-argenpesos-textos leading-[160%]">
            Número de teléfono: {" "}
            <span className="font-book">{info.number}</span>
          </p>
          <p className="text-[14px] lg:text-[20px] font-bold text-argenpesos-textos leading-[160%]">
            {key === 4 || key === 5
              ? "Número de Whatsapp: "
              : "Horario de atención: "}
            <span className="font-book">{info.attention}</span>
          </p>
          <p className="text-[14px] lg:text-[20px] font-bold text-argenpesos-textos leading-[160%]">
            {key === 0 ? "Centro de soporte: " : "Servicio técnico: "}
            <span className="font-book">{info.support}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default TechnicalServices;
