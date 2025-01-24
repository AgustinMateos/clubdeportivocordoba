'use client';
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Actividades() {
  const [isModalOpen, setModalOpen] = useState(null); // Índice de la tarjeta seleccionada
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const actividades = [
    {
      nombre: "Gimnasia Artística",
      descripcion: "Gracia y técnica combinadas en cada movimiento",
      imagen: "/actividad1.svg",
      profesora: "Maite Gonzáles",
      profesor: "Javier Martinez",
      telefono: "3423525253",
      tablaDatos: [
        ["Fila 1 - Col 1", "Fila 1 - Col 2", "Fila 1 - Col 3", "Fila 1 - Col 4"],
        ["Fila 2 - Col 1", "Fila 2 - Col 2", "Fila 2 - Col 3", "Fila 2 - Col 4"],
        // Añadir más filas según sea necesario
      ]
    },{
      nombre: "Vóley",
      descripcion: "Competí o disfrutá del deporte en equipo.",
      imagen: "/Voley.svg",
      profesora: "Maite Gonzáles",
      profesor: "Javier Martinez",
      telefono: "3423525253",
      tablaDatos: [
        ["Fila 1 - Col 1", "Fila 1 - Col 2", "Fila 1 - Col 3", "Fila 1 - Col 4"],
        ["Fila 2 - Col 1", "Fila 2 - Col 2", "Fila 2 - Col 3", "Fila 2 - Col 4"],
        // Añadir más filas según sea necesario
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
        ["Fila 1 - Col 1", "Fila 1 - Col 2", "Fila 1 - Col 3", "Fila 1 - Col 4"],
        ["Fila 2 - Col 1", "Fila 2 - Col 2", "Fila 2 - Col 3", "Fila 2 - Col 4"],
      ]
    },
    {
      nombre: "Karate y Kung Fu",
      descripcion: "La pasión por los aros en cada encuentro.",
      imagen: "/Karate.svg",
      profesora: "Laura Pérez",
      profesor: "Carlos Torres",
      telefono: "3423525254",
      tablaDatos: [
        ["Fila 1 - Col 1", "Fila 1 - Col 2", "Fila 1 - Col 3", "Fila 1 - Col 4"],
        ["Fila 2 - Col 1", "Fila 2 - Col 2", "Fila 2 - Col 3", "Fila 2 - Col 4"],
      ]
    },
    {
      nombre: "Patín",
      descripcion: "La pasión por los aros en cada encuentro.",
      imagen: "/Patin.svg",
      profesora: "Laura Pérez",
      profesor: "Carlos Torres",
      telefono: "3423525254",
      tablaDatos: [
        ["Fila 1 - Col 1", "Fila 1 - Col 2", "Fila 1 - Col 3", "Fila 1 - Col 4"],
        ["Fila 2 - Col 1", "Fila 2 - Col 2", "Fila 2 - Col 3", "Fila 2 - Col 4"],
      ]
    },
    {
      nombre: "Newcom",
      descripcion: "La pasión por los aros en cada encuentro.",
      imagen: "/newcom.svg",
      profesora: "Laura Pérez",
      profesor: "Carlos Torres",
      telefono: "3423525254",
      tablaDatos: [
        ["Fila 1 - Col 1", "Fila 1 - Col 2", "Fila 1 - Col 3", "Fila 1 - Col 4"],
        ["Fila 2 - Col 1", "Fila 2 - Col 2", "Fila 2 - Col 3", "Fila 2 - Col 4"],
      ]
    },
    
  ];
  

  const images = ["/actividad1.svg", "/actividad2.svg", "/actividad3.svg"];

  const handleCardClick = (index) => {
    setModalOpen(index);
    setCurrentImageIndex(0); // Resetea la imagen actual cuando se abre un nuevo modal
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

  return (
    <div className="min-h-screen">
  {/* Sección roja */}
  <div className="bg-[#C32929] py-12 flex justify-center relative h-[543px]">
    <div className="text-white w-[80%] flex flex-col justify-center">
      <p className="text-lg font-medium">Actividades / Deportes</p>
      <h3 className="text-4xl font-bold mt-2">Un deporte para cada pasión</h3>
      <p className="mt-4 text-lg w-[60%] font-semibold">
        Descubrí las actividades y deportes que ofrecemos. Tanto si sos un amante del deporte competitivo como si buscás actividades recreativas, hay algo para vos.
      </p>
    </div>
  </div>
  
  {/* Contenedor de tarjetas con relative */}
  <div className="relative bg-[#F6F6F6] py-12 h-[1200px]">
    <div className="absolute w-[90%] top-[-100px] left-1/2 transform -translate-x-1/2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
      {actividades.map((actividad, index) => (
        <div
          key={index}
          className="rounded-lg  overflow-hidden flex flex-col items-center   transition"
        >
          <div
            onClick={() => handleCardClick(index)}
            className="relative group cursor-pointer w-[300px] h-[400px]"
          >
            <Image
              src={actividad.imagen}
              width={300}
              height={400}
              alt={`Actividad ${index + 1}`}
              className="rounded-lg w-full h-full object-cover"
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
          <h4 className="w-[77%] text-xl font-semibold mt-4">
            {actividad.nombre}
          </h4>
          <p className="w-[85%] mt-2 text-gray-700 px-4">
            {actividad.descripcion}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* Modal */}
  {isModalOpen !== null && (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[95%] max-w-[800px] relative"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-black rounded-full w-8 h-9 flex items-center justify-center z-10"
        >
          ✕
        </button>
        <div className="relative w-full">
          <Image
            src={images[currentImageIndex]}
            alt={`Actividad ${currentImageIndex + 1}`}
            width={600}
            height={500}
            className="rounded-lg w-full h-[300px] object-cover"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handlePagination(index)}
                className={`w-10 h-1 transition ${
                  currentImageIndex === index
                    ? "bg-[#DF3737]"
                    : "bg-[#ffff] hover:bg-[#d66767]"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="p-4">
  <h2 className="text-2xl font-bold mb-4">
    {actividades[isModalOpen].nombre}
  </h2>
  <div className="flex flex-wrap justify-between w-full mb-4">
    <div className="w-[70%] flex flex-wrap">
      <p className="w-full sm:w-[45%]">Profesora: {actividades[isModalOpen].profesora}</p>
      <p className="w-full sm:w-[45%]">Profesor: {actividades[isModalOpen].profesor}</p>
    </div>
    <div className="w-[30%] text-right">
      <p>Tel: {actividades[isModalOpen].telefono}</p>
    </div>
  </div>
  <table className="min-w-full table-auto border-collapse">
    <thead>
      <tr>
        <th className="border px-4 py-2">Columna 1</th>
        <th className="border px-4 py-2">Columna 2</th>
        <th className="border px-4 py-2">Columna 3</th>
        <th className="border px-4 py-2">Columna 4</th>
      </tr>
    </thead>
    <tbody>
      {actividades[isModalOpen].tablaDatos.map((fila, index) => (
        <tr key={index}>
          {fila.map((celda, cellIndex) => (
            <td key={cellIndex} className="border px-4 py-2">{celda}</td>
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
