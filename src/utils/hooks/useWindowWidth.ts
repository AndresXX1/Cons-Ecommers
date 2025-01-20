import { useState, useEffect } from "react";

const useWindowWidth = () => {
  // Estado para almacenar el ancho de la ventana
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Función para actualizar el estado con el ancho actual de la ventana
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Agrega el event listener para el evento 'resize'
    window.addEventListener("resize", handleResize);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar

  return width;
};

export default useWindowWidth;
