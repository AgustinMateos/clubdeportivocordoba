'use client';
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Pesca() {
  const containerRef = useRef(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const images = [
    { src: "/pesca3.svg", title: "Camping" },
    { src: "/torneos.jpeg", title: "Torneos y Competencias" },
    { src: "/guardalanchas.jpg", title: "Guardería de Lanchas" },
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
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
    if (touchEndX.current - touchStartX.current > 50) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsTitleVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-[1425px] md:h-[1225px] sm:h-[130vh] lg:h-[1125px]  bg-[#1A1A1A] relative w-full">

      <div className="absolute top-[-100px] w-full left: 50%;
left-1/2 -translate-x-1/2 
sm:w-[80%] md:w-[80%] flex flex-col md:flex-row items-center justify-center gap-4 ">
        <div
          className="h-[285px] sm:h-[156px] w-[320px] sm:w-[325px] lg:w-[842px] lg:h-[425px] rounded-[18px] bg-cover bg-center"
          style={{ backgroundImage: "url('/pesca1.svg')" }}
        ></div>
        <div
          className="h-[386px] sm:h-[156px] w-[320px] sm:w-[325px] lg:w-[335px] lg:h-[425px] rounded-[18px] bg-cover bg-center"
          style={{ backgroundImage: "url('/pesca2.jpeg')" }}
        ></div>
      </div>
      <div ref={containerRef} className="absolute top-[700px] md:top-[500px] lg:top-[400px] h-auto sm:top-[400px] w-full ">

        <div className="text-white flex flex-col items-center h-[250px] sm:h-[300px] justify-center">
          <h4
            className={`font-montserrat text-[32px] sm:text-[48px] font-bold tracking-[0.2px] leading-[55px] text-center pb-[40px] transition-all duration-700 ${isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"}`}
          >Pesca</h4>
          <p className="font-montserrat text-[16px] sm:text-[20px] text-center w-[90%] sm:w-[60%] tracking-[0.2px] leading-[24px]  font-semibold pt-4">
            Sumate a nuestra comunidad de pescadores y disfrutá de salidas al aire libre en un entorno natural.
            Instalaciones especialmente preparadas para camping, botes, pesca recreativa y deportiva.
          </p>
        </div>

        {/* Slider para mobile */}
        <div
          className="relative w-screen overflow-hidden md:hidden"
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-screen  flex-shrink-0 flex flex-col items-center pt-[40px]">
                <Image
                  width={210}
                  height={210}
                  alt={`pesca ${index + 3}`}
                  src={image.src}
                  className="border-2 border-[#DF3737] rounded-full border-dashed w-[210px] h-[210px] object-cover"
                />


                <p className="font-montserrat text-white text-center pt-2">{image.title}</p>
              </div>
            ))}
          </div>
        </div>


        <div className="absolute w-full flex justify-around px-6 bottom-[-90px] md:hidden">
          <button
            onClick={handlePrev}
            className="text-white text-3xl"
            aria-label="Previous"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="text-white text-3xl"
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>



        <div className="hidden sm:flex flex-row justify-evenly pt-4">
          {images.map((image, index) => (
            <div key={index} className="flex flex-col items-center ">
              <Image
                width={210}
                height={210}
                alt={`pesca ${index + 3}`}
                src={image.src}
                className="border-2 h-[210px] border-[#DF3737] rounded-full border-dashed"


              />
              <p className="font-montserrat text-white text-center pt-[20px] font-semibold text-[24px] leading-[24px] tracking-[0.2px]">{image.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}