'use client'
import { useState, useEffect, useRef } from "react";
export default function PrimerComponente() {
  const containerRef = useRef(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);

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
      ref={containerRef}
      className="w-full  sm:h-[100%]  xl:h-[100vh] bg-center sm:bg-right bg-cover lg:bg-center flex items-center relative pt-[5rem] justify-center"
      style={{

        backgroundImage: `
          linear-gradient(180deg, rgba(21, 21, 21, 0) 0%, #151515 100%),
          url('/fondopesca.svg')`,


      }}
    >

      <div className="w-[100%]  sm:w-[100%] h-[130vh] items-start content-center  sm:h-[597px] flex  sm:items-end flex-wrap sm:flex-nowrap pb-[20px] justify-center md:justify-center xl:justify-evenly  2xl:justify-evenly ">
        <div className="w-[95%] sm:w-[55%] 2xl:w-[45%] text-white p-[0.2rem] sm:p-4 xl:h-[50%] 2xl:h-[350px] sm:items-start h-[350px] sm:h-[250px] md:h-[350px]  flex flex-col items-center justify-evenly">
          <div className=" text-[36px] w-[100%] sm:w-[95%] xl:w-[85%] 2xl:w-[95%] xl:text-[64px] font-extrabold leading-[40px] xl:leading-[70px] tracking-[0.2px]">
            <h1
              className={`text-center font-montserrat  sm:text-left transition-all duration-700 ${isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"}`}
            >
              Ser parte del mejor club, ahora a un click
            </h1>

          </div>
          <div className=" w-[92%] sm:w-[85%] ">
            <p className="font-montserrat text-[16px] sm:text-[24px] text-center  sm:text-left   font-medium leading-[20px] sm:leading-[30px]  tracking-[0.2px]">
              Tenemos todo lo que necesitas: deportes, recreación y comunidad.
              Elegí la mejor propuesta y súmate a Central.
            </p>
          </div>
        </div>

        <div className="h-[481px] w-[90%] sm:w-[417px] bg-white/70 backdrop-blur-lg justify-evenly rounded-[16px] p-6 flex flex-col">
          <h3 className="text-[24px] font-bold text-gray-800 mb-4 font-montserrat">
            ¡Hacete socio ahora!
          </h3>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="nombre"
                className="text-gray-700 text-sm font-medium font-montserrat"
              >
                Nombre completo*
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Ingresa tu nombre completo"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-base"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="dni"
                className="font-montserrat text-gray-700 text-sm font-medium"
              >
                DNI*
              </label>
              <input
                id="dni"
                type="text"
                placeholder="Ingresa tu DNI"
                className="font-montserrat p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-base"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="font-montserrat text-gray-700 text-sm font-medium"
              >
                Email*
              </label>
              <input
                id="email"
                type="email"
                placeholder="Ingresa tu email"
                className="font-montserrat p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-base"
              />
            </div>

            <button
              type="submit"
              className="font-montserrat bg-black text-white py-2 px-4 rounded-md mt-4"
            >
              Hacerme socio
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
