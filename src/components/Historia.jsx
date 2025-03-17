"use client";


import { useState, useEffect, useRef } from "react";
import { montserrat } from "@/app/fonts/fonts";
import Image from "next/image";
export default function Historia() {
  const images = ["/club.jpeg", "/slider2.jpeg"];
  const eventos = [
    { year: "1932", description: "Fundación del club." },
    { year: "1950", description: "Apertura de la primera cancha de básquet." },
    { year: "1969", description: "Fundación de la Colonia Vacacional" },
    { year: "1980", description: "Incorporación de nuevas disciplinas como karate y patín." },
    { year: "2000", description: "Renovación de instalaciones deportivas." },
    { year: "2024", description: "Celebración del 92° aniversario del club." },
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [visibleEvents, setVisibleEvents] = useState([]); 
  const containerRef = useRef(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          eventos.forEach((_, index) => {
            setTimeout(() => {
              setVisibleEvents((prev) => [...prev, index]);
            }, index * 400); 
          });
        }
      },
      { threshold: 0.3 } 
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    <div
      id="nuestroClub"
      ref={containerRef}
      className="w-full h-[1381px] sm:h-[911px] bg-[#F2F2F2] flex justify-center text-[#101232]"
    >
      <div className="w-[80%] sm:w-[90%] flex flex-col sm:flex-row items-center justify-center sm:justify-around">
        
        <div className="w-full sm:w-[50%] h-auto sm:h-[650px] flex flex-col justify-between relative">
          <div className="h-[400px] sm:h-[60%] flex justify-evenly flex-col w-full pb-4 sm:pb-0">
            <h3 className="font-montserrat pt-4 leading-[24px] text-[16px] tracking-[0.2px] font-medium">
              Nuestro Club
            </h3>
            <h4
              className={` ${montserrat.className} font-montserrat text-[32px] sm:text-[48px] font-bold leading-[38px] sm:leading-[54px] tracking-[0.2px] pt-4 w-full sm:w-[70%] transition-all duration-700 ${
                isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"
              }`}>
              Casi un siglo de historia y pasión
            </h4>
            <p className={`font-montserrat pt-4 w-full xl:w-[92%] 2xl:w-[600px] font-semibold text-[16px] leading-[24px] sm:text-[20px] text-[#101232] ${montserrat.className} `}>
              Desde hace más de 90 años, el Club Deportivo Central Córdoba ha sido un pilar en nuestra comunidad, promoviendo el deporte, la recreación y la integración. Fundado en 1932, el club ha sido testigo de innumerables logros y momentos que han marcado generaciones.
            </p>
          </div>

    
          <div className="w-[100%] relative h-[316px] justify-center flex-col flex sm:pl-[20px]">
            {eventos.map((evento, index) => (
              <div
                key={index}
                className={`flex flex-row pb-4 items-center relative transition-opacity duration-500 ${
                  visibleEvents.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-20px]"
                }`}
              >
                <Image src="/circuloHistoria.svg" width={20} height={20} alt="img" className="absolute left-0" />
                <p className="pl-8 font-normal font-montserrat">
                  <span className="font-montserrat font-semibold">{evento.year}:</span> {evento.description}
                </p>

               
                {index < eventos.length - 1 && (
                  <svg className="absolute bottom-[-20px] left-[9px] sm:left-[10px]" width="2" height="50">
                    <line x1="0" y1="0" x2="0" y2="100%" stroke="#DF3737" strokeWidth="3" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

      
        <div className="relative w-full sm:w-[447px] h-[592px] overflow-hidden m-[20px] sm:m-[0px]">
       
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentImage * 100}%)`,
            }}
          >
            {images.map((src, index) => (
              <div key={index} className="w-full sm:w-[447px] h-[452px] sm:h-[592px] flex-shrink-0">
                <Image
                  src={src}
                  width={447}
                  height={592}
                  alt={`Slide ${index + 1}`}
                  className="object-cover w-full h-full  rounded-[34px] sm:rounded-[54px]"
                />
              </div>
            ))}
          </div>

          
          <div className="absolute bottom-[10rem] sm:bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-10 h-1 transition ${
                  currentImage === index ? "bg-[#DF3737]" : "bg-[#ffff] hover:bg-[#d66767]"
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
