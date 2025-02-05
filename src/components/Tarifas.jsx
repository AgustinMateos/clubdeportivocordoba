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
        <h4 className="font-montserrat text-white font-medium text-[20px] leading-[24px] tracking-[0.2px]  mb-6">
          Tarifas 2024 - Colonia Vacaciones
        </h4>

        <div className="overflow-x-auto rounded-[8px]">
          <table className="w-full bg-[#FFFFFFB2]  shadow-lg ">
            <thead>
              <tr className="bg-white text-left">
                <th className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 font-bold text-[20px] leading-[24px] tracking-[0.2px]">Servicio</th>
                <th className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 font-bold text-[20px] leading-[24px] tracking-[0.2px]">Precio Socios</th>
                <th className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 font-bold text-[20px] leading-[24px] tracking-[0.2px]">Precio No Socios</th>
              </tr>
            </thead>
            <tbody>
              {tarifas.map((item, index) => (
                <tr key={index} className="text-left  ">
                  <td className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4  font-medium text-[20px] leading-[24px] tracking-[0.2px]">{item.servicio}</td>
                  <td className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 font-medium text-[20px] leading-[24px] tracking-[0.2px]">{item.socios}</td>
                  <td className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 font-medium text-[20px] leading-[24px] tracking-[0.2px]">{item.noSocios}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className=" h-[110px] flex flex-row w-full justify-center"> <div className="w-[90%] sm:w-[50%] justify-evenly items-center  flex flex-row "><p className=" text-white font-bold  text-[16px] leading-[18px] tracking-[0.2px] md:text-[24px] md:leading-[24px] md:tracking-[0.2px]"> ¡Reservá tu lugar ahora! </p> <p className="font-montserrat h-[48px] w-[164px] bg-[white] rounded-[8px] text-black flex items-center justify-center font-semibold sm:text-[18px] sm:leading-[24px] sm:tracking-[0.2px]"> 3518 09-7160 </p></div></div>
      </div>
    </div>
  );
}


