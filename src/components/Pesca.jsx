'use client'
import Image from "next/image";
import { useState, useRef } from "react";

export default function Pesca() {
  const images = [
    { src: "/pesca3.svg", title: "Camping" },
    { src: "/pesca4.svg", title: "Torneos y Competencias" },
    { src: "/pesca5.svg", title: "Guardería de Lanchas" },
    { src: "/pesca6.svg", title: "Comunidad" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Deslizó hacia la izquierda
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }

    if (touchEndX.current - touchStartX.current > 50) {
      // Deslizó hacia la derecha
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="min-h-[140vh] sm:h-[900px] bg-[#1A1A1A] relative w-full">
      {/* Imagen principal */}
      <div className="absolute top-[-100px] w-full flex">
        <div className="flex flex-col sm:flex-row w-full justify-evenly items-center">
          <Image
            width={842}
            height={335}
            className="w-[328px] h-[156px] sm:w-[842px] sm:h-[335px]"
            alt="pesca"
            src={"/pesca1.svg"}
          />
          <Image
            width={406}
            height={335}
            className="w-[325px] h-[406px] sm:w-[325px] sm:h-[335px]"
            alt="pesca"
            src={"/pesca2.svg"}
          />
        </div>
      </div>

      {/* Texto descriptivo */}
      <div className="absolute top-[500px] h-auto sm:top-[400px]">
        <div className="text-white w-full flex flex-col items-center justify-center">
          <h4 className="w-[50%] text-center text-[48px]">Pesca</h4>
          <p className="w-[60%] text-center text-[20px] pt-[20px]">
            Sumate a nuestra comunidad de pescadores y disfrutá de salidas al aire libre en un entorno natural. Instalaciones especialmente preparadas para camping, botes y pesca recreativa.
          </p>
        </div>

        {/* Slider para mobile */}
        <div
          className="relative w-full overflow-hidden sm:hidden"
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Contenedor de imágenes */}
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full p-[20px] sm:p-[0px] text-center flex flex-col items-center"
              >
                <Image
                  width={210}
                  height={210}
                  alt={`pesca ${index + 3}`}
                  src={image.src}
                />
                <p className="text-white text-center pt-2">{image.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vista estática para pantallas grandes */}
        <div className="hidden sm:flex flex-row justify-evenly pt-[20px]">
          {images.map((image, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                width={210}
                height={210}
                alt={`pesca ${index + 3}`}
                src={image.src}
              />
              <p className="text-white text-center pt-2">{image.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
