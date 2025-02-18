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
    <div className="w-full bg-[#C32929] h-[662px] sm:h-[632px] items-center flex justify-center py-8">
      <div className="w-[90%] max-w-[1282px]">
        <h4 className="font-montserrat text-white font-medium text-[20px] leading-[24px] tracking-[0.2px]  mb-6">
          Tarifas 2024 - Colonia Vacaciones
        </h4>

        <div className="overflow-x-auto rounded-[8px]">
          <table className="w-full bg-[#FFFFFFB2]  shadow-lg ">
            <thead>
              <tr className="bg-white text-left">
                <th className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 font-bold text-[14px] md:text-[20px] leading-[24px] tracking-[0.2px]">Servicio</th>
                <th className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 font-bold text-[14px] md:text-[20px] leading-[24px] tracking-[0.2px]">Socios</th>
                <th className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 font-bold text-[14px] md:text-[20px] leading-[24px] tracking-[0.2px]">No Socios</th>
              </tr>
            </thead>
            <tbody>
              {tarifas.map((item, index) => (
                <tr key={index} className="text-left  ">
                  <td className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4  font-medium text-[14px] md:text-[20px] md:leading-[24px] tracking-[0.2px]">{item.servicio}</td>
                  <td className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 font-medium text-[14px] md:text-[20px] leading-[24px] tracking-[0.2px]">{item.socios}</td>
                  <td className="font-montserrat px-[0.5rem]  sm:px-6  py-[0.5rem] sm:py-4 font-medium text-[14px] md:text-[20px] leading-[24px] tracking-[0.2px]">{item.noSocios}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className=" h-[110px] flex flex-row w-full justify-center"> 
          <div className="w-[90%] sm:w-[50%] justify-center items-center  flex flex-row ">
            <p className="pr-[40px] text-white">Secretaría: </p>
            <a
  href="https://wa.me/3518690765"
  target="_blank"
  rel="noopener noreferrer"
  className="font-montserrat h-[48px] w-[164px] bg-[white] rounded-[8px] text-black flex items-center justify-center font-semibold sm:text-[18px] sm:leading-[24px] sm:tracking-[0.2px] hover:bg-gray-200 transition"
>
3518690765
</a></div>
<div className="w-[90%] sm:w-[50%] justify-center items-center  flex flex-row ">
<p className="pr-[40px] text-white"> Colonia: </p>
  <a
  href="https://wa.me/5493512077020"
  target="_blank"
  rel="noopener noreferrer"
  className="font-montserrat h-[48px] w-[164px] bg-[white] rounded-[8px] text-black flex items-center justify-center font-semibold sm:text-[18px] sm:leading-[24px] sm:tracking-[0.2px] hover:bg-gray-200 transition"
>
  3518 09-7160
</a></div>
</div>
      </div>
    </div>
  );
}


