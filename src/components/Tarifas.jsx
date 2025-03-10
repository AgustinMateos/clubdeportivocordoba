
'use client'

import { useState, useEffect } from "react";
import axios from "axios";

export default function Tarifas() {
  const [colony, setColony] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api-cdcc.vercel.app/api/v1/prices/colony");
        const data = response.data.colony[0].services.map((service) => ({
          servicio: service.name || "Sin nombre",
          user: service.user ? `$${service.user}` : "Bonificado",
          guest: service.guest ? `$${service.guest}` : "Bonificado",
        }));
        setColony(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full bg-[#C32929] h-[662px] sm:h-[632px] items-center flex justify-center py-8">
      <div className="w-[90%] max-w-[1282px]">
        <h4 className="font-montserrat text-white font-medium text-[20px] leading-[24px] tracking-[0.2px] mb-6">
          Tarifas 2025 - Colonia Vacaciones
        </h4> 
        {/* agrgear funcion de fecha */}

        <div className="overflow-x-auto rounded-[8px]">
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

        <div className="h-[110px] flex flex-row w-full justify-center">
          <div className="w-[90%] sm:w-[50%] flex flex-row items-center justify-center">
            <p className="pr-[40px] text-white">Secretaría:</p>
            <a
              href="https://wa.me/3518690765"
              target="_blank"
              rel="noopener noreferrer"
              className="font-montserrat h-[48px] w-[164px] bg-white rounded-[8px] text-black flex items-center justify-center font-semibold sm:text-[18px] hover:bg-gray-200 transition"
            >
              3518690765
            </a>
          </div>
          <div className="w-[90%] sm:w-[50%] flex flex-row items-center justify-center">
            <p className="pr-[40px] text-white">Colonia:</p>
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



// export default function Tarifas() {
//   const colony = [
//     { servicio: "Camping (Adulto)", user: "Bonificado", guest: "$3.000" },
//     { servicio: "Camping (Niños)", user: "Bonificado", guest: "$1.500" },
//     { servicio: "Carpa", user: "$2.500", guest: "$5.000" },
//     { servicio: "Bote", user: "$6.000", guest: "$12.000" },
//     { servicio: "Pileta", user: "$3.000", guest: "$6.000" },
//     { servicio: "Habitación", user: "$15.000", guest: "$30.000" },
//   ];

//   return (
//     <div className="w-full bg-[#C32929] h-[662px] sm:h-[632px] items-center flex justify-center py-8">
//       <div className="w-[90%] max-w-[1282px]">
//         <h4 className="font-montserrat text-white font-medium text-[20px] leading-[24px] tracking-[0.2px]  mb-6">
//           Tarifas 2024 - Colonia Vacaciones
//         </h4>

//         <div className="overflow-x-auto rounded-[8px]">
//           <table className="w-full bg-[#FFFFFFB2]  shadow-lg ">
//             <thead>
//               <tr className="bg-white text-left">
//                 <th className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 font-bold text-[14px] md:text-[20px] leading-[24px] tracking-[0.2px]">Servicio</th>
//                 <th className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 font-bold text-[14px] md:text-[20px] leading-[24px] tracking-[0.2px]">Socios</th>
//                 <th className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 font-bold text-[14px] md:text-[20px] leading-[24px] tracking-[0.2px]">No Socios</th>
//               </tr>
//             </thead>
//             <tbody>
//               {colony.map((item, index) => (
//                 <tr key={index} className="text-left  ">
//                   <td className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4  font-medium text-[14px] md:text-[20px] md:leading-[24px] tracking-[0.2px]">{item.servicio}</td>
//                   <td className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 font-medium text-[14px] md:text-[20px] leading-[24px] tracking-[0.2px]">{item.user}</td>
//                   <td className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 font-medium text-[14px] md:text-[20px] leading-[24px] tracking-[0.2px]">{item.guest}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className=" h-[110px] flex flex-row w-full justify-center"> 
//           <div className="w-[90%] sm:w-[50%] justify-center items-center  flex flex-row ">
//             <p className="pr-[40px] text-white">Secretaría: </p>
//             <a
//   href="https://wa.me/3518690765"
//   target="_blank"
//   rel="noopener noreferrer"
//   className="font-montserrat h-[48px] w-[164px] bg-[white] rounded-[8px] text-black flex items-center justify-center font-semibold sm:text-[18px] sm:leading-[24px] sm:tracking-[0.2px] hover:bg-gray-200 transition"
// >
// 3518690765
// </a></div>
// <div className="w-[90%] sm:w-[50%] justify-center items-center  flex flex-row ">
// <p className="pr-[40px] text-white"> Colonia: </p>
//   <a
//   href="https://wa.me/5493512077020"
//   target="_blank"
//   rel="noopener noreferrer"
//   className="font-montserrat h-[48px] w-[164px] bg-[white] rounded-[8px] text-black flex items-center justify-center font-semibold sm:text-[18px] sm:leading-[24px] sm:tracking-[0.2px] hover:bg-gray-200 transition"
// >
//   3518 09-7160
// </a></div>
// </div>
//       </div>
//     </div>
//   );
// }


