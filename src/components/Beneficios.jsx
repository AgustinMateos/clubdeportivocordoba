'use client';

import Image from "next/image";

export default function Beneficios() {
  // Datos de los eventos históricos
  const eventos = [
    { description: "Acceso a la pileta" },
    { description: "Actividades recreativas y deportivas para niños y adultos" },
    { description: "Camping en un entorno natural" },
    { description: "Alquiler de botes y carpas para experiencias completas al aire libre" },
    { description: "Habitación para estadías cómodas" },
  ];

  return (
    <div className="w-full min-h-[100vh] bg-[#F2F2F2] flex justify-center items-center">
      <div className="w-[90%] flex flex-col sm:flex-row items-center justify-between">
        {/* Sección de texto con los eventos */}
        <div className="w-[100%] sm:w-[50%] h-[400px] flex flex-col justify-evenly">
          <div className="h-[40%] flex justify-evenly flex-col w-full">
            <h3 className="pt-4 text-xl font-medium">Beneficios de Socios</h3>
            <h4 className="text-[48px] font-bold leading-[54px] pt-4">
              Tu lugar en Central Córdoba
            </h4>
          </div>

          {/* Mapeo de los eventos */}
          <div className="w-[95%] pl-5">
            <h5 className="pt-12 pb-5 text-lg font-medium">Beneficios</h5>
            {eventos.map((evento, index) => (
              <div key={index} className="flex flex-row pb-4 items-center">
                {/* Imagen del círculo */}
                <Image
                  src="/circulocolonia.svg"
                  width={20}
                  height={20}
                  alt="circulo"
                  className="mr-4"
                />
                <p>{evento.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Imagen fija */}
        <div className="w-[447px] h-[592px] hidden sm:block">
          <Image
            src="/beneficios.svg"
            width={447}
            height={592}
            alt="Beneficio"
            className=" w-full h-full "
          />
        </div>
      </div>
    </div>
  );
}
