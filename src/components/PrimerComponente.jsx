"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { montserrat } from "@/app/fonts/fonts";

export default function PrimerComponente() {
  const containerRef = useRef(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [extraData, setExtraData] = useState({
    dni: "",
    birthdate: "",
    maritalStatus: "",
    nationality: "",
    address: "",
    neighborhood: "",
    cp: "",
    phoneNumber: "",
    disciplines: "",
    gender: "",
  });
  const handleExtraChange = (e) => {
    const { id, value } = e.target;
    setExtraData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const [responseMessage, setResponseMessage] = useState("");

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const [userId, setUserId] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.lastName || !formData.email || !formData.password) {
      setResponseMessage("Todos los campos son obligatorios.");
      return;
    }
  
    try {
      const response = await axios.post("https://api-cdcc.vercel.app/api/v1/users/create", formData);
      setResponseMessage(response.data.message || "Usuario registrado con éxito.");
  
      if (response.data.userId) {
        setUserId(response.data.userId); 
      } else {
        console.error("No se recibió userId.");
      }
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Hubo un error al registrarse.");
    }
  };
  
  const handleExtraSubmit = async (e) => {
    e.preventDefault();
  
    
    if (!userId) {
      console.error("userId no está definido");
      setResponseMessage("Por favor, regístrate antes de completar estos datos.");
      return;
    }
  
    try {
      await axios.post(
        `https://api-cdcc.vercel.app/api/v1/users/dataUser/${userId}`,
        { ...extraData, disciplines: extraData.disciplines.split(",") }
      );
      alert("Datos adicionales guardados con éxito.");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar los datos adicionales:", error);
      alert("Error al guardar datos adicionales.");
    }
  };
  
  
  return (
    <div
      ref={containerRef}
      className="w-full sm:h-[100%] xl:h-[100vh] bg-center sm:bg-right bg-cover lg:bg-center flex items-center relative pt-[5rem] justify-center"
      style={{
        backgroundImage: `
          linear-gradient(180deg, rgba(21, 21, 21, 0) 0%, #151515 100%),
          url('/fondopesca.svg')`,
      }}
    >
      <div className="w-[100%] sm:w-[100%] h-[130vh] items-start content-center sm:h-[597px] flex sm:items-end flex-wrap sm:flex-nowrap pb-[20px] justify-center md:justify-center xl:justify-evenly 2xl:justify-evenly">
        <div className="w-[95%] sm:w-[55%] xl:w-[59%] 2xl:w-[50%] text-white p-[0.2rem] sm:p-4 sm:items-start h-[350px] sm:h-[250px] md:h-[350px] xl:h-[370px] 2xl:h-[350px] flex flex-col items-center justify-evenly">
          <div className="text-[36px] w-[100%] sm:w-[95%] lg:w-[95%] xl:w-[95%] 2xl:w-[95%]">
            <h1
              className={`text-center ${montserrat.className} font-extrabold lg:text-[54px] 2xl:text-[64px] leading-[40px] xl:leading-[70px] tracking-[0.2px] sm:text-left transition-all duration-700 ${isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"
                }`}
            >
              Ser parte del mejor club, ahora a un click
            </h1>
          </div>
          <div className="w-[92%] sm:w-[89%]">
            <p className={`text-[16px] ${montserrat.className} sm:text-[24px] text-center sm:text-left font-medium leading-[20px] sm:leading-[30px] tracking-[0.2px]`}>
              Tenemos todo lo que necesitas: deportes, recreación y comunidad.
              Elegí la mejor propuesta y súmate a Central.
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div className="h-[481px] w-[90%] sm:w-[417px] bg-white/70 backdrop-blur-lg justify-evenly rounded-[16px] p-6 flex flex-col">
          <h3 className="text-[24px] font-bold text-gray-800 mb-4 font-montserrat">
            ¡Hacete socio ahora!
          </h3>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex">
              <div className="w-[50%]">
                <label htmlFor="name" className="text-gray-700 text-sm font-medium">
                  Nombre*
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-2 border w-[95%] border-gray-300 rounded-md focus:outline-none focus:ring-0"
                />
              </div>
              <div className="w-[50%]">
                <label htmlFor="lastName" className="text-gray-700 text-sm font-medium">
                  Apellido*
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Ingresa tu apellido"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 w-[100%] rounded-md focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 text-sm font-medium pb-[10px]">
                Email*
              </label>
              <input
                id="email"
                type="email"
                placeholder="Ingresa tu email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-base"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-700 text-sm font-medium pb-[10px]">
                Contraseña*
              </label>
              <input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-base"
              />
            </div>

            <button
              type="button"
              className="bg-black text-white h-[58px] py-2 px-4 rounded-md mt-4"
              onClick={() => setIsModalOpen(true)} 
            >
              Hacerme socio
            </button>


           
            {responseMessage && (
              <p className="text-center text-sm text-gray-800 mt-2">{responseMessage}</p>
            )}
          </form>
        </div>
      </div>
      {isModalOpen && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[400px]">
      <h2 className="text-xl font-bold mb-4">Completa tus datos</h2>
      <form onSubmit={handleExtraSubmit} className="flex flex-col gap-4">
        <input
          id="dni"
          type="text"
          placeholder="DNI"
          onChange={handleExtraChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          id="birthdate"
          type="date"
          onChange={handleExtraChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          id="maritalStatus"
          type="text"
          placeholder="Estado Civil"
          onChange={handleExtraChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          id="nationality"
          type="text"
          placeholder="Nacionalidad"
          onChange={handleExtraChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          id="address"
          type="text"
          placeholder="Dirección"
          onChange={handleExtraChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          id="neighborhood"
          type="text"
          placeholder="Barrio"
          onChange={handleExtraChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          id="cp"
          type="text"
          placeholder="Código Postal"
          onChange={handleExtraChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          id="phoneNumber"
          type="text"
          placeholder="Teléfono"
          onChange={handleExtraChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          id="disciplines"
          type="text"
          placeholder="Disciplinas (separadas por coma)"
          onChange={handleExtraChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          id="gender"
          type="text"
          placeholder="Género"
          onChange={handleExtraChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-md mt-4"
        >
          Guardar
        </button>
      </form>
      <button
        onClick={() => setIsModalOpen(false)}
        className="mt-4 text-red-600"
      >
        Cerrar
      </button>
    </div>
  </div>
)}

    </div>
  );
}
