'use client'
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Beneficios() {
  const containerRef = useRef(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState([]);

  const eventos = [
    { titulo: "Acceso exclusivo:", description: "Instalaciones de primera calidad y tarifas preferenciales." },
    { titulo: "Eventos y comunidad: ", description: "Participá en actividades especiales para socios." },
    { titulo: "Descuentos:", description: " En la colonia vacacional y alquiler de instalaciones." },
    { titulo: "Soporte al club: ", description: "Ayudás a seguir creciendo nuestra comunidad deportiva." },

  ];

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
    <div id="beneficios" ref={containerRef} className="w-full  sm:min-h-[75vh] bg-[#F2F2F2] flex justify-center sm:justify-end items-start sm:items-center">
      <div className="w-full sm:w-[95%] mb-[40px] flex flex-col sm:flex-row items-center justify-between pt-[20px] sm:pt-[0px]">

        <div className="w-full sm:w-[50%] lg:w-[60%] mb-[40px] min-h-[600px] sm:min-h-[500px] p-[20px] flex flex-col justify-around sm:justify-start md:justify-evenly">
          <div className="h-[40%] flex justify-evenly flex-col w-full ">
            <h3 className="pt-4 text-[16px] font-medium font-montserrat">Beneficios de Socios</h3>
            <h4 className={` text-[32px] sm:text-[48px] font-bold leading-[41px] sm:leading-[54px] pt-4 transition-all duration-700 ${isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"}`}>
              Tu lugar en Club Deportivo Central Córdoba
            </h4>
          </div>


          <div className="w-full sm:w-[95%] pl-5">

            {eventos.map((evento, index) => (
              <div key={index} className={`flex flex-row pb-4 items-center transition-opacity duration-500 ${visibleEvents.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[20px]"
                }`}
              >

                <Image
                  src="/circulocolonia.svg"
                  width={20}
                  height={20}
                  alt="circulo"
                  className="mr-4"
                />
                <p className=" text-[#101232]  font-medium text-[18px] leading-[24px]  tracking-[0.2px] " ><span className=" font-bold text-[18px] leading-[24px]  tracking-[0.2px]">{evento.titulo} </span>{evento.description}</p>
              </div>
            ))}
          </div>
        </div>


        <div className="w-[90%] sm:w-[500px] h-auto sm:h-[500px] hidden sm:block">
          <Image
            src="/logonew2.png"
            width={447}
            height={592}
            alt="Beneficio"
            className="w-full h-auto opacity-[0.2]"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
              maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)"
            }}
          />
        </div>

      </div>
    </div>
  );
}
