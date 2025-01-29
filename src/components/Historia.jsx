'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Historia() {
  // Imágenes para el slider
  const images = [
    "/slide1Historia.svg",
    "/club2.jpeg",
  ];

  // Datos de los eventos históricos
  const eventos = [
    { year: "1932", description: "Fundación del club." },
    { year: "1950", description: "Apertura de la primera cancha de básquet." },
    { year: "1980", description: "Incorporación de nuevas disciplinas como karate y patín." },
    { year: "2000", description: "Renovación de instalaciones deportivas." },
    { year: "2024", description: "Celebración del 92° aniversario del club." },
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
    <div  id="nuestroClub" className="w-full min-h-[100vh] sm:h-[911px] bg-[#F2F2F2] flex justify-center">
      <div className="w-[90%] flex flex-col sm:flex-row items-center justify-around">
        {/* Sección de texto con los eventos */}
        <div className="w-full sm:w-[50%] h-auto sm:h-[650px] flex flex-col justify-between relative">
          <div className="h-[60%] flex justify-evenly flex-col w-full pb-4 sm:pb-0">
            <h3 className="pt-4">Nuestro Club</h3>
            <h4 className="text-[36px] sm:text-[48px] font-bold leading-[44px] sm:leading-[54px] pt-4 w-full sm:w-[70%]">
              Casi un siglo de historia y pasión
            </h4>
            <p className="pt-4 w-full font-semibold text-[18px] sm:text-[20px]">
              Desde hace más de 90 años, el Club Deportivo Central Córdoba ha sido un pilar en nuestra comunidad, promoviendo el deporte, la recreación y la integración.
            </p>
          </div>

          {/* Mapeo de los eventos */}
          <div className="w-[90%] relative pl-[20px]">
            {eventos.map((evento, index) => (
              <div key={index} className="flex flex-row pb-4 items-center relative">
                <Image src="/circuloHistoria.svg" width={20} height={20} alt="img" className="absolute left-0" />
                <p className="pl-8">
                  <span className="font-bold">{evento.year}:</span> {evento.description}
                </p>

                {/* Línea roja (SVG) para conectar círculos */}
                {index < eventos.length - 1 && (
                  <svg className="absolute bottom-[-20px] left-[10px]" width="2" height="40">
                    <line x1="0" y1="0" x2="0" y2="100%" stroke="red" strokeWidth="2" />
                  </svg>
                )}
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
