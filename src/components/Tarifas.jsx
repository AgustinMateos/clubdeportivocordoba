export default function Tarifas() {
  const tarifas = [
    { servicio: "Camping (Adulto)", socios: "Bonificado", noSocios: "$3.000" },
    { servicio: "Camping (Niños)", socios: "Bonificado", noSocios: "$1.500" },
    { servicio: "Carpa", socios: "$2.500", noSocios: "$5.000" },
    { servicio: "Bote", socios: "$6.000", noSocios: "$12.000" },
    { servicio: "Pileta", socios: "$3.000", noSocios: "$6.000" },
    { servicio: "Habitación", socios: "$15.000", noSocios: "$30.000" },
  ];

  return (
    <div className="w-full bg-[#C32929] h-[662px] sm:h-[632px] flex justify-center py-8">
      <div className="w-[90%] max-w-[1282px]">
        <h4 className="text-white text-2xl font-bold  mb-6">
          Tarifas 2024 - Colonia Vacaciones
        </h4>

        <div className="overflow-x-auto rounded-[8px]">
          <table className="w-full bg-[#FFFFFFB2]  shadow-lg ">
            <thead>
              <tr className="bg-white text-left">
                <th className=" px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4">Servicio</th>
                <th className="px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 ">Precio Socios</th>
                <th className="px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4">Precio No Socios</th>
              </tr>
            </thead>
            <tbody>
              {tarifas.map((item, index) => (
                <tr key={index} className="text-left  ">
                  <td className="px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 ">{item.servicio}</td>
                  <td className=" px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4">{item.socios}</td>
                  <td className="px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 ">{item.noSocios}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-[110px] flex flex-row w-full justify-center"> <div className="w-[90%] sm:w-[50%] justify-evenly items-center  flex flex-row "><p className="text-white"> ¡Reservá tu lugar ahora! </p> <p className="h-[48px] w-[164px] bg-[white] rounded-[8px] text-black flex items-center justify-center"> 3518 09-7160 </p></div></div>
      </div>
    </div>
  );
}





// 'use client'
// import { useState } from "react";

// export default function Tarifas() {
//     // Datos iniciales para las filas
//     const initialData = [
//         ["Servicio", "Socios", "No socios"],
//         ["Camping (Adulto)", "Bonificado", "$3.000"],
//         ["Camping (Niños)", "Bonificado", "$1.500"],
//         ["Carpa", "$2.500", "$5.000"],
//         ["Bote", "$6.00", "$12.000"],
//         ["Pileta", "$3.000", "$6.000"],
//         ["Habitación", "$15.000", "$30.000"],
//     ];

//     const [tableData, setTableData] = useState(initialData);

//     return (
//         <div className="h-[690px] bg-[#C32929] relative">
//             <div className="p-4 flex flex-col items-center justify-center">
//                 <div className="w-[90%] flex">
//                     <h5 className="text-white w-[60%] text-xl font-semibold mb-4 flex ">
//                         Tarifas 2024 - Colonia Vacaciones
//                     </h5>
//                 </div>

//                 <div className="w-[1282px] h-[350px] rounded-[8px]">
//                     <div className="grid grid-rows-7 grid-cols-3 gap-0">
//                         {tableData.map((row, rowIndex) =>
//                             row.map((cell, colIndex) => (
//                                 <div
//                                     key={`${rowIndex}-${colIndex}`}
//                                     className={`flex items-center justify-center ${
//                                         rowIndex === 0
//                                             ? "bg-white font-bold"
//                                             : "bg-white/70"
//                                     } text-black h-16 ${
//                                         rowIndex === 0 && colIndex === 0
//                                             ? "rounded-tl-[8px]"
//                                             : rowIndex === 0 && colIndex === 2
//                                             ? "rounded-tr-[8px]"
//                                             : rowIndex === 6 && colIndex === 0
//                                             ? "rounded-bl-[8px]"
//                                             : rowIndex === 6 && colIndex === 2
//                                             ? "rounded-br-[8px]"
//                                             : ""
//                                     }`}
//                                 >
//                                     <span className="text-center">{cell}</span>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Mensaje superpuesto */}
//             <div className="absolute bottom-[90px] left-[50%] transform -translate-x-1/2 flex flex-row items-center">
//                 <p className="text-white">¡Reservá tu lugar ahora!</p>
//                 <p className="text-black bg-white ml-4 h-[48px] w-[164px] rounded-[8px] flex justify-center items-center">3518 09-7160</p>
//             </div>
//         </div>
//     );
// }
