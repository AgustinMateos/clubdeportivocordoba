

'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from 'react';


export default function Historia() {
  const containerRef = useRef(null);
    const [isTitleVisible, setIsTitleVisible] = useState(false);
    const [visibleEvents, setVisibleEvents] = useState([]);
  
  const images = [
    "/colonia1.svg",
    "/slide1Historia.svg",
    
  ];

  
  const eventos = [
    {  description: "Acceso a la pileta", },
    {  description: "Actividades recreativas y deportivas para niños y adultos" },
    {  description: "Camping en un entorno natural" },
    {  description: "Alquiler de botes y carpas para experiencias completas al aire libre" },
    {  description: "Habitación para estadías cómodas" },
  ];

 
  const [currentImage, setCurrentImage] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); 
    return () => clearInterval(interval);
  }, [images.length]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log('Title is visible');
        setIsTitleVisible(true);
      }
    }, { threshold: 0.3 });
  
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
  
    return () => observer.disconnect();
  }, []);
  

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

  return (
    <div id="colonia" ref={containerRef} className="w-full min-h-[100vh] bg-[#F2F2F2] flex justify-center">
  <div className="w-[90%] sm:w-[90%] flex flex-col lg:flex-row items-center justify-around">
   
    <div className="w-full sm:w-[100%] lg:w-[50%] h-auto lg:h-[700px] flex flex-col justify-between relative">
      <div className="h-[70%]  flex justify-evenly flex-col w-full">
        <h3 className="pt-4 leading-[24px] text-[16px] tracking-[0.2px] font-medium">Colonia de Vacaciones</h3>
        <h4
              className={` text-[32px] sm:text-[48px] pb-[10px] font-bold leading-[38px] sm:leading-[54px] tracking-[0.2px] pt-4 w-full sm:w-[83%] transition-all duration-700 ${
                isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"
              }`}>
          Un verano inolvidable en Central Córdoba
        </h4>
        <p className="font-montserrat pt-4 w-full lg:w-[90%] xl:w-[653px] font-semibold text-[16px] leading-[24px] sm:text-[20px] text-[#101232] ">
          ¡Se acerca la temporada de verano y nuestra colonia de vacaciones está lista para recibirte!
        </p>
        <p className="font-montserrat pt-4  w-full  lg:w-[90%] xl:w-[653px]  font-normal text-[16px] leading-[24px] sm:text-[20px] text-[#101232]">
          En el Club Deportivo Central Córdoba, ofrecemos actividades para todas las edades en un entorno natural y seguro.
        </p>
        <p className="font-montserrat pt-4 w-full lg:w-[90%] xl:w-[653px]  font-normal text-[16px] leading-[24px] sm:text-[20px] text-[#101232]">
          Disfrutá de momentos únicos en familia o con amigos mientras aprovechás nuestras instalaciones y actividades diseñadas para el máximo disfrute.
        </p>
      </div>

      
      <div className="w-[95%] relative pl-[20px]">
        <h5 className="font-montserrat pt-[50px] pb-[20px] font-bold text-[20px] leading-[24px] tracking-[0.2px] ">Beneficios</h5>
        {eventos.map((evento, index) => (
  <div
    key={index}
    className={` flex flex-row pb-4 items-center relative transition-opacity duration-500 ${
      visibleEvents.includes(index)
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-[20px]"
    }`}
  >
    <Image
      src="/circulocolonia.svg"
      width={20}
      height={20}
      alt="img"
      className="absolute left-0"
    />
    <p className=" pl-8 font-medium text-[18px] leading-[24px] tracking-[0.2px]">
      {evento.description}
    </p>
  </div>
))}

      </div>
    </div>

    
    <div className="relative w-full sm:w-[447px] h-[592px] overflow-hidden m-[20px] sm:m-[0px] sm:mb-[20px] sm:mt-[20px]">
     
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentImage * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className={`w-full sm:w-[447px] h-[452px]  sm:h-[592px] flex-shrink-0 ${
              visibleEvents.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-20px]"
            }`}
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
