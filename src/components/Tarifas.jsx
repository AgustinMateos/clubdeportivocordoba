'use client';

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Importar js-cookie

export default function Tarifas() {
  const [colony, setColony] = useState([]);
  const [members, setMembers] = useState([]); 
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api-cdcc.vercel.app/api/v1/prices/membersAndcolony");
        
        const colonyData = response.data.colony[0].services.map((service) => ({
          servicio: service.name || "Sin nombre",
          user: service.user ? `$${service.user}` : "Bonificado",
          guest: service.guest ? `$${service.guest}` : "Bonificado",
        }));
        setColony(colonyData);

        const membersData = response.data.members;
        setMembers(membersData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
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

  const cuotaSocietaria = members.find((member) => member.name === "Cuota Societaria") || {
    price: "N/A",
    annual: "N/A",
    retired: "N/A",
  };

  // Guardar en cookies cuando cuotaSocietaria esté disponible
  useEffect(() => {
    if (cuotaSocietaria.price !== "N/A" && cuotaSocietaria.retired !== "N/A") {
      Cookies.set("cuotaSocietariaPrice", cuotaSocietaria.price, { expires: 7 }); // Expira en 7 días
      Cookies.set("cuotaSocietariaRetired", cuotaSocietaria.retired, { expires: 7 });
    }
  }, [cuotaSocietaria]);

  return (
    <div ref={containerRef} className="w-full bg-[#C32929] min-h-[662px] sm:min-h-[632px] items-center flex justify-center py-8">
      <div className="w-[90%] max-w-[1282px]">
        <h4
          className={`text-[32px] text-white sm:text-[48px] font-bold leading-[41px] sm:leading-[54px] pb-4 pt-4 transition-all duration-700 ${
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"
          }`}
        >
          Tarifas 2025
        </h4>

        {/* Tabla Cuota Societaria */}
        <h4 className="font-montserrat text-white font-medium text-[20px] leading-[24px] tracking-[0.2px] mb-6">
          Cuota Societaria
        </h4>
        <div className="overflow-x-auto rounded-[8px] pb-[20px]">
          <table className="w-full bg-[#FFFFFFB2] shadow-lg">
            <thead>
              <tr className="bg-white text-left">
                <th className="font-montserrat px-4 py-2 font-bold text-[14px] md:text-[20px]">Precio Mensual</th>
                <th className="font-montserrat px-4 py-2 font-bold text-[14px] md:text-[20px]">Precio Anual</th>
                <th className="font-montserrat px-4 py-2 font-bold text-[14px] md:text-[20px]">Jubilados</th>
              </tr>
            </thead>
            <tbody className="pb-[20px]">
              <tr className="text-left">
                <td className="font-montserrat px-4 py-2 font-medium text-[14px] md:text-[20px]">
                  ${cuotaSocietaria.price}
                </td>
                <td className="font-montserrat px-4 py-2 font-medium text-[14px] md:text-[20px]">
                  ${cuotaSocietaria.annual}
                </td>
                <td className="font-montserrat px-4 py-2 font-medium text-[14px] md:text-[20px]">
                  ${cuotaSocietaria.retired}
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-white">*Jubilados deben presentar documentación que demuestre el cobro mínimo de haberes.</p>
        </div>

        {/* Tabla Colonia Vacacional */}
        <div className="overflow-x-auto rounded-[8px]">
          <h4 className="font-montserrat text-white font-medium text-[20px] leading-[24px] tracking-[0.2px] mb-6">
            Colonia Vacacional
          </h4>
          <table className="w-full bg-[#FFFFFFB2] shadow-lg">
            <thead>
              <tr className="bg-white text-left">
                <th className="font-montserrat px-4 py-2 font-bold text-[14px] md:text-[20px]">Servicio</th>
                <th className="font-montserrat px-4 py-2 font-bold text-[14px] md:text-[20px]">Socios</th>
                <th className="font-montserrat px-4 py-2 font-bold text-[14px] md:text-[20px]">No Socios</th>
              </tr>
            </thead>
            <tbody>
              {colony.map((item, index) => (
                <tr key={index} className="text-left">
                  <td className="font-montserrat px-4 py-2 font-medium text-[14px] md:text-[20px]">{item.servicio}</td>
                  <td className="font-montserrat px-4 py-2 font-medium text-[14px] md:text-[20px]">{item.user}</td>
                  <td className="font-montserrat px-4 py-2 font-medium text-[14px] md:text-[20px]">{item.guest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:h-[110px] h-auto flex flex-col items-center md:flex-row w-full justify-center">
          <div className="w-[90%] sm:w-[50%] flex flex-col md:flex-row items-center justify-center">
            <p className="md:pr-[40px] text-white">Secretaría:</p>
            <a
              href="https://wa.me/3518690765"
              target="_blank"
              rel="noopener noreferrer"
              className="font-montserrat h-[48px] w-[164px] bg-white rounded-[8px] text-black flex items-center justify-center font-semibold sm:text-[18px] hover:bg-gray-200 transition"
            >
              3518 690-765
            </a>
          </div>
          <div className="w-[90%] sm:w-[50%] flex flex-col md:flex-row items-center justify-center">
            <p className="md:pr-[40px] text-white">Colonia:</p>
            <a
              href="https://wa.me/5493512077020"
              target="_blank"
              rel="noopener noreferrer"
              className="font-montserrat h-[48px] w-[164px] bg-white rounded-[8px] text-black flex items-center justify-center font-semibold sm:text-[18px] hover:bg-gray-200 transition"
            >
              3518 09-7160
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}