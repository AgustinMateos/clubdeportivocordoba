
'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Historia() {
  // Imágenes para el slider
  const images = [
    "/colonia1.svg",
    "/slide1Historia.svg",
    
  ];

  // Datos de los eventos históricos
  const eventos = [
    { year: "1932", description: "Acceso a la pileta", },
    { year: "1950", description: "Actividades recreativas y deportivas para niños y adultos" },
    { year: "1980", description: "Camping en un entorno natural" },
    { year: "2000", description: "Alquiler de botes y carpas para experiencias completas al aire libre" },
    { year: "2024", description: "Habitación para estadías cómodas" },
  ];

  // Estado para rastrear la imagen actual
  const [currentImage, setCurrentImage] = useState(0);

  // Cambio automático de imágenes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // Cambia cada 3 segundos
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full min-h-[100vh] bg-[#F2F2F2] flex justify-center">
  <div className="w-[90%] sm:w-[80%] flex flex-col sm:flex-row items-center justify-around">
    {/* Sección de texto con los eventos */}
    <div className="w-full sm:w-[50%] h-auto sm:h-[700px] flex flex-col justify-between relative">
      <div className="h-[70%] flex justify-evenly flex-col w-full">
        <h3 className="pt-4">Colonia de Vacaciones</h3>
        <h4 className="text-[48px] font-bold leading-[54px] pt-4 w-full ">
          Un verano inolvidable en Central Córdoba
        </h4>
        <p className="pt-4 w-full font-semibold text-[20px]">
          ¡Se acerca la temporada de verano y nuestra colonia de vacaciones está lista para recibirte!
        </p>
        <p className="pt-4 w-full text-[20px]">
          En el Club Deportivo Central Córdoba, ofrecemos actividades para todas las edades en un entorno natural y seguro.
        </p>
        <p className="pt-4 w-full text-[20px]">
          Disfrutá de momentos únicos en familia o con amigos mientras aprovechás nuestras instalaciones y actividades diseñadas para el máximo disfrute.
        </p>
      </div>

      {/* Mapeo de los eventos */}
      <div className="w-[95%] relative pl-[20px]">
        <h5 className="pt-[50px] pb-[20px]">Beneficios</h5>
        {eventos.map((evento, index) => (
          <div
            key={index}
            className="flex flex-row pb-4 items-center relative"
          >
            {/* Imagen del círculo */}
            <Image
              src="/circulocolonia.svg"
              width={20}
              height={20}
              alt="img"
              className="absolute left-0"
            />
            <p className="pl-8">
              {/* Año en negrita */}
              {evento.description}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Slider */}
    <div className="relative w-full sm:w-[447px] h-[592px] overflow-hidden m-[20px] sm:m-[0px]">
      {/* Imágenes */}
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentImage * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="w-full sm:w-[447px] h-[452px]  sm:h-[592px] flex-shrink-0"
          >
            <Image
              src={src}
              width={447}
              height={592}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full rounded-[54px] sm:rounded-[86px]"
            />
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="absolute bottom-[10rem] sm:bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-10 h-1 transition ${
              currentImage === index
                ? "bg-[#DF3737]"
                : "bg-[#ffff] hover:bg-[#d66767]"
            }`}
            onClick={() => setCurrentImage(index)}
          ></button>
        ))}
      </div>
    </div>
  </div>
</div>

  );
}
