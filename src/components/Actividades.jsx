'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Actividades() {
  const [isModalOpen, setModalOpen] = useState(null); // Guarda el índice de la tarjeta seleccionada
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const actividades = [
    { nombre: "Gimnasia Artística", descripcion: "Gracia y técnica combinadas en cada movimiento", imagen: "/actividad1.svg" },
    { nombre: "Básquet", descripcion: "La pasión por los aros en cada encuentro.", imagen: "/actividad1.svg" },
    { nombre: "Karate y Kung Fu", descripcion: "Disciplina, fuerza y defensa personal.", imagen: "/actividad1.svg" },
    { nombre: "Patín", descripcion: "Elegancia sobre ruedas para todas las edades.", imagen: "/actividad1.svg" },
    { nombre: "Newcom", descripcion: "Especialmente diseñado para mayores de 60 años, con el equipo Los Imparables ", imagen: "/actividad1.svg" },
  ];

  const images = [
    "/actividad1.svg",
    "/actividad2.svg",
    "/actividad3.svg",
  ];

  const handleCardClick = (index) => {
    setModalOpen(index); // Abre el modal correspondiente al índice de la tarjeta
  };

  const handleCloseModal = () => {
    setModalOpen(null); // Cierra el modal
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
    <div className="h-[1540px]">
      {/* Sección roja */}
      <div className="bg-[#C32929] h-[40%] flex justify-center">
        <div className="text-white w-[80%] h-[50%] flex pt-4 flex-col justify-evenly">
          <p className="pt-4">Actividades / Deportes</p>
          <h3 className="text-[48px] font-bold">Un deporte para cada pasión</h3>
          <p className="w-[60%] font-semibold text-[20px]">
            Descubrí las actividades y deportes que ofrecemos. Tanto si sos un amante del deporte competitivo como si buscás actividades recreativas, hay algo para vos.
          </p>
        </div>
      </div>

      {/* Contenedor de tarjetas con flex */}
      <div className="relative bg-[#F6F6F6] h-[60%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8 mx-auto">
        {actividades.map((actividad, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className="cursor-pointer  rounded-lg w-full overflow-hidden relative"
          >
            <Image
              src={actividad.imagen}
              width={300}
              height={400}
              alt={`Actividad ${index + 1}`}
              className="rounded-lg transition-transform duration-300"
            />
            {/* Contenedor del hover */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Image
                src="/verMasInfo.svg"
                width={50}
                height={50}
                alt="Icono de información"
              />
              <p className="text-white font-bold text-lg mb-2">
                Haz click para ver más información
              </p>
            </div>
            <h4 className="text-center text-xl font-semibold mt-4">
              {actividad.nombre}
            </h4>
            <p className="text-center mt-2 text-gray-700">
              {actividad.descripcion}
            </p>
          </div>
        ))}
      </div>

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
                className="rounded-lg w-full h-[200px] object-cover"
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
              <h2 className="text-2xl font-bold mb-4">{actividades[isModalOpen].nombre}</h2>
              <div className="flex flex-row justify-between w-full mb-4">
                <div className="flex flex-row w-[80%]">
                  <p className="w-[40%]">Profesora: Maite Gonzáles</p>
                  <p className="w-[30%]">Profesor: Javier Martinez</p>
                </div>
                <div className="w-[20%]">
                  <p>Tel: 3423525253</p>
                </div>
              </div>
              {/* Tabla debajo de profesoras y teléfono */}
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
                  {[...Array(5)].map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="border px-4 py-2">Fila {rowIndex + 1} - Col 1</td>
                      <td className="border px-4 py-2">Fila {rowIndex + 1} - Col 2</td>
                      <td className="border px-4 py-2">Fila {rowIndex + 1} - Col 3</td>
                      <td className="border px-4 py-2">Fila {rowIndex + 1} - Col 4</td>
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
