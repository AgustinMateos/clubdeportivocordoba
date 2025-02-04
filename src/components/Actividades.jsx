'use client';
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Actividades() {
  const [isModalOpen, setModalOpen] = useState(null); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const actividades = [
    {
      nombre: "Gimnasia Artística",
      descripcion: "Gracia y técnica combinadas en cada movimiento",
      imagen: "/actividad1.svg",
      profesora: "Maite Gonzáles",
      profesor: "Javier Martinez",
      telefono: "3423525253",
      tablaDatos: [
        ["Adultos", "13:34", "$2.500", "$3.000"],
        ["Adolescentes", "13:34", "$2.500", "$1.500"],
        ["Niños +6", "13:34", "$2.500", "$5.000"],
        ["Infantes", "13:34", "$2.500", "$5.000"],
       
      ]
    },{
      nombre: "Vóley",
      descripcion: "Competí o disfrutá del deporte en equipo.",
      imagen: "/Voley.svg",
      profesora: "Maite Gonzáles",
      profesor: "Javier Martinez",
      telefono: "3423525253",
      tablaDatos: [
        ["Adultos", "13:34", "$2.500", "$3.000"],
        ["Adolescentes", "13:34", "$2.500", "$1.500"],
        ["Niños +6", "13:34", "$2.500", "$5.000"],
        ["Infantes", "13:34", "$2.500", "$5.000"],
      ]
    },
    {
      nombre: "Básquet",
      descripcion: "La pasión por los aros en cada encuentro.",
      imagen: "/Basket.svg",
      profesora: "Laura Pérez",
      profesor: "Carlos Torres",
      telefono: "3423525254",
      tablaDatos: [
        ["Adultos", "13:34", "$2.500", "$3.000"],
        ["Adolescentes", "13:34", "$2.500", "$1.500"],
        ["Niños +6", "13:34", "$2.500", "$5.000"],
        ["Infantes", "13:34", "$2.500", "$5.000"],
      ]
    },
    {
      nombre: "Karate y Kung Fu",
      descripcion: "Disciplina, fuerza y defensa personal.",
      imagen: "/Karate.svg",
      profesora: "Laura Pérez",
      profesor: "Carlos Torres",
      telefono: "3423525254",
      tablaDatos: [
        ["Adultos", "13:34", "$2.500", "$3.000"],
        ["Adolescentes", "13:34", "$2.500", "$1.500"],
        ["Niños +6", "13:34", "$2.500", "$5.000"],
        ["Infantes", "13:34", "$2.500", "$5.000"],
      ]
    },
    {
      nombre: "Patín",
      descripcion: "Elegancia sobre ruedas para todas las edades.",
      imagen: "/Patin.svg",
      profesora: "Laura Pérez",
      profesor: "Carlos Torres",
      telefono: "3423525254",
      tablaDatos: [
        ["Adultos", "13:34", "$2.500", "$3.000"],
        ["Adolescentes", "13:34", "$2.500", "$1.500"],
        ["Niños +6", "13:34", "$2.500", "$5.000"],
        ["Infantes", "13:34", "$2.500", "$5.000"],
      ]
    },
    {
      nombre: "Newcom",
      descripcion: "Especialmente diseñado para mayores de 60 años, con el equipo Los Imparables",
      imagen: "/newcom.svg",
      profesora: "Laura Pérez",
      profesor: "Carlos Torres",
      telefono: "3423525254",
      tablaDatos: [
        ["Adultos", "13:34", "$2.500", "$3.000"],
        ["Adolescentes", "13:34", "$2.500", "$1.500"],
        ["Niños +6", "13:34", "$2.500", "$5.000"],
        ["Infantes", "13:34", "$2.500", "$5.000"],
      ]
    },
    
  ];
  

  const images = ["/actividad1.svg", "/actividad2.svg", "/actividad3.svg"];

  const handleCardClick = (index) => {
    setModalOpen(index);
    setCurrentImageIndex(0); 
  };

  const handleCloseModal = () => {
    setModalOpen(null);
  };

  const handlePagination = (index) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    if (isModalOpen === null) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isModalOpen, images.length]);
  useEffect(() => {
  const thresholdValue = window.innerWidth < 768 ? 0.05 : 0.3; // 5% en móviles, 30% en pantallas grandes

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setIsTitleVisible(true);
      }
    },
    { threshold: thresholdValue }
  );

  if (containerRef.current) {
    observer.observe(containerRef.current);
  }

  return () => observer.disconnect();
}, []);


  return (
    <div id="actividades"  ref={containerRef} className="min-h-screen">
  
  <div className="bg-[#C32929] py-12 flex justify-center relative h-[543px]">
    <div className="text-white w-[70%] sm:w-[80%]  flex flex-col h-[350px] justify-center sm:justify-center">
      <p className="pt-4 leading-[24px] text-[16px] tracking-[0.2px] font-medium">Actividades / Deportes</p>
      <h3
  className={`text-[32px] sm:text-[48px] font-bold leading-[38px] sm:leading-[54px] 
    tracking-[0.2px] pt-4 w-full sm:w-[70%] transition-all duration-700 ${isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"}`}
>
  Un deporte para cada pasión
</h3>

      <p className="mt-4 text-[16px] w-[100%] sm:w-[60%] font-semibold">
        Descubrí las actividades y deportes que ofrecemos. Tanto si sos un amante del deporte competitivo como si buscás actividades recreativas, hay algo para vos.
      </p>
    </div>
  </div>
  
 
  <div className="relative bg-[#F6F6F6] py-12 h-[3286px] sm:h-[160vh] md:h-[150vh] xl:h-[1200px]">
    <div className="absolute sm:w-[80%] md:w-[84%] top-[-100px] left-1/2 transform -translate-x-1/2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  w-[100%] gap-8 px-8">
      {actividades.map((actividad, index) => (
        <div
          key={index}
          className="rounded-lg  overflow-hidden flex flex-col items-center w-auto md:w-[350px] lg:w-auto  transition"
        >
          <div
            onClick={() => handleCardClick(index)}
            className="relative group cursor-pointer w-auto  md:w-[400px] 2xl:w-[100%] h-[400px]"
          >
            <Image
              src={actividad.imagen}
              width={300}
              height={400}
              alt={`Actividad ${index + 1}`}
              className="rounded-lg w-[435px] 2xl:w-[100%]  sm:w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Image
                src="/verMasInfo.svg"
                width={50}
                height={50}
                alt="Icono de información"
              />
              <p className="text-white font-bold text-md mt-2">
                Haz click para ver más información
              </p>
            </div>
          </div>
          <h4 className= " max-w-[435px] w-[100%]  sm:px-4 md:px-0  lg:px-3 xl:px-0 font-semibold mt-4 text-[22px]  leading-[24px]  tracking-[0.2px]">
            {actividad.nombre}
          </h4>
          <p className="max-w-[435px] w-[100%]  mt-2 text-[#101232] px-[0px] sm:px-4 xl:px-0 md:px-0 lg:px-3 font-normal text-[16px]  leading-[19.5px]  tracking-[0.2px]">
            {actividad.descripcion}
          </p>
        </div>
      ))}
    </div>
  </div>


  {isModalOpen !== null && (
   <div
   className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
   onClick={handleCloseModal}
 >
   <div
     className="bg-white rounded-lg shadow-lg w-[90%] max-w-[600px] max-h-[90vh] relative flex flex-col"
     onClick={(event) => event.stopPropagation()}
   >
     <button
       onClick={handleCloseModal}
       className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-black rounded-full w-8 h-8 flex items-center justify-center z-10"
     >
       ✕
     </button>
     <div className="relative w-full h-[30vh] sm:h-[40vh]">
       <Image
         src={images[currentImageIndex]}
         alt={`Actividad ${currentImageIndex + 1}`}
         fill
         className="rounded-t-lg object-cover"
       />
       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
         {images.map((_, index) => (
           <button
             key={index}
             onClick={() => handlePagination(index)}
             className={`w-10 h-1 transition ${
               currentImageIndex === index
                 ? "bg-[#DF3737]"
                 : "bg-[#fff] hover:bg-[#d66767]"
             }`}
           />
         ))}
       </div>
     </div>
     <div className="p-[10px] sm:p-4 overflow-y-auto flex-1">
       <h2 className="text-2xl font-bold mb-4">
         {actividades[isModalOpen].nombre}
       </h2>
       <div className="flex flex-wrap justify-between w-full mb-4">
         <div className="w-[70%] flex flex-wrap">
           <p className="w-full sm:w-[45%]">
             Profesora: {actividades[isModalOpen].profesora}
           </p>
           <p className="w-full sm:w-[45%]">
             Profesor: {actividades[isModalOpen].profesor}
           </p>
         </div>
         <div className="w-[30%] text-right">
           <p>Tel: {actividades[isModalOpen].telefono}</p>
         </div>
       </div>
       <table className="min-w-full table-auto  rounded-[8px]">
         <thead className="bg-[#D4D4D4F2] ">
           <tr>
             <th className=" py-0 sm:px-4 sm:py-2">Categoría</th>
             <th className=" py-0 sm:px-4 sm:py-2">Horario</th>
             <th className=" py-0 sm:px-4 sm:py-2">Socios</th>
             <th className=" py-0 sm:px-4 sm:py-2">No Socios</th>
           </tr>
         </thead>
         <tbody className="bg-[#F2F1F1]">
           {actividades[isModalOpen].tablaDatos.map((fila, filaIndex) => (
             <tr key={filaIndex}>
               {fila.map((dato, colIndex) => (
                 <td key={colIndex} className="px-0 py-0 sm:px-4 sm:py-2 text-center">
                   {dato}
                 </td>
               ))}
             </tr>
           ))}
         </tbody>
       </table>
     </div>
   </div>
 </div>
 
  )}
</div>

  );
}
