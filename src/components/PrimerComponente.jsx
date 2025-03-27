"use client";
import Cookies from "js-cookie";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { montserrat } from "@/app/fonts/fonts";

export default function PrimerComponente() {
  const containerRef = useRef(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({});
  const [extraErrors, setExtraErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    access_token: "",
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
    familyGroup: [],
  });

  const [responseMessage, setResponseMessage] = useState("");

  const addFamilyMember = () => {
    setExtraData((prevData) => ({
      ...prevData,
      familyGroup: [
        ...prevData.familyGroup,
        {
          relationship: "",
          firstName: "",
          lastName: "",
          dni: "",
          birthdate: "",
          disciplines: "",
        },
      ],
    }));
  };

  const removeFamilyMember = (index) => {
    setExtraData((prevData) => ({
      ...prevData,
      familyGroup: prevData.familyGroup.filter((_, i) => i !== index),
    }));
  };
  const handleFamilyMemberChange = (index, field, value) => {
    setExtraData((prevData) => {
      const newFamilyGroup = [...prevData.familyGroup];
      newFamilyGroup[index] = {
        ...newFamilyGroup[index],
        [field]: value,
      };
      return {
        ...prevData,
        familyGroup: newFamilyGroup,
      };
    });
  };

  const handleFamilyMemberDisciplineChange = (index, discipline) => {
    setExtraData((prevData) => {
      const newFamilyGroup = [...prevData.familyGroup];
      newFamilyGroup[index] = {
        ...newFamilyGroup[index],
        disciplines: discipline,
      };
      return {
        ...prevData,
        familyGroup: newFamilyGroup,
      };
    });
  };

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
    clearError(id);
  };

  const handleExtraChange = (e) => {
    const { id, value } = e.target;
    setExtraData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    clearExtraError(id);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = "El nombre es obligatorio";
    if (!formData.lastName) newErrors.lastName = "El apellido es obligatorio";
    if (!formData.email) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResponseMessage("Por favor completa todos los campos correctamente");
      return;
    }

    try {
      const response = await axios.post("https://api-cdcc.vercel.app/api/v1/users/create", formData);
      setResponseMessage(response.data.message || "Usuario registrado con éxito");
      setErrors({});

      if (response.data.user?._id && response.data.access_token) {
        setUserId(response.data.user._id);
        setFormData((prevData) => ({
          ...prevData,
          access_token: response.data.access_token,
        }));

        Cookies.set("userId", response.data.user._id, { expires: 7, secure: true, sameSite: "Lax" });
        Cookies.set("access_token", response.data.access_token, { expires: 7, secure: true, sameSite: "Lax" });
        setIsModalOpen(true);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error al registrar";
      setResponseMessage(errorMessage);
      if (errorMessage.toLowerCase().includes("ya registrado")) {
        setErrors({ email: "Este email ya está registrado" });
      }
    }
  };

  const clearError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const clearExtraError = (field) => {
    setExtraErrors((prevErrors) => {
      const newExtraErrors = { ...prevErrors };
      delete newExtraErrors[field];
      return newExtraErrors;
    });
  };

  const handleExtraSubmit = async (e) => {
    e.preventDefault();

    const newExtraErrors = {};
    if (!extraData.dni) newExtraErrors.dni = "El DNI es obligatorio";
    else if (!/^\d{7,8}$/.test(extraData.dni)) newExtraErrors.dni = "El DNI debe tener entre 7 y 8 dígitos";
    if (!extraData.birthdate) newExtraErrors.birthdate = "La fecha de nacimiento es obligatoria";
    if (!extraData.maritalStatus) newExtraErrors.maritalStatus = "El estado civil es obligatorio";
    else if (!["SINGLE", "MARRIED"].includes(extraData.maritalStatus))
      newExtraErrors.maritalStatus = "Estado civil no válido";
    if (!extraData.nationality) newExtraErrors.nationality = "La nacionalidad es obligatoria";
    if (!extraData.address) newExtraErrors.address = "La dirección es obligatoria";
    if (!extraData.neighborhood) newExtraErrors.neighborhood = "El barrio es obligatorio";
    if (!extraData.cp) newExtraErrors.cp = "El código postal es obligatorio";
    if (!extraData.phoneNumber) newExtraErrors.phoneNumber = "El teléfono es obligatorio";
    else if (!/^\d{10}$/.test(extraData.phoneNumber))
      newExtraErrors.phoneNumber = "El teléfono debe tener 10 dígitos";
    if (!extraData.disciplines) newExtraErrors.disciplines = "Debes seleccionar al menos una disciplina";
    else if (
      ![
        "ARTISTIC_GYMNASTICS",
        "BASKETBALL",
        "VOLLEYBALL",
        "KARATE",
        "SKATE",
        "NEWCOM",
        "FISHING",
        "ONLY_MEMBER",
      ].includes(extraData.disciplines)
    )
      newExtraErrors.disciplines = "Disciplina no válida";
    if (!extraData.gender) newExtraErrors.gender = "El género es obligatorio";
    else if (!["MALE", "FEMALE"].includes(extraData.gender)) newExtraErrors.gender = "Género no válido";

    if (Object.keys(newExtraErrors).length > 0) {
      setExtraErrors(newExtraErrors);
      setResponseMessage("Por favor completa todos los campos adicionales correctamente");
      return;
    }

    const storedUserId = Cookies.get("userId");
    const token = Cookies.get("access_token");

    if (!storedUserId || !token) {
      console.error("userId o access_token no están definidos en las cookies.");
      setResponseMessage("Por favor, regístrate antes de completar estos datos.");
      return;
    }

    try {
      const filteredFamilyGroup = extraData.familyGroup.filter((member) =>
        Object.values(member).some((value) => value !== "" && value !== null && value !== undefined)
      );

      const dataToSend = {
        dni: extraData.dni,
        birthdate: extraData.birthdate,
        maritalStatus: extraData.maritalStatus,
        nationality: extraData.nationality,
        address: extraData.address,
        neighborhood: extraData.neighborhood,
        cp: extraData.cp,
        phoneNumber: extraData.phoneNumber,
        disciplines: [extraData.disciplines],
        gender: extraData.gender,
      };

      if (filteredFamilyGroup.length > 0) {
        dataToSend.familyGroup = filteredFamilyGroup.map((member) => ({
          relationship: member.relationship,
          firstName: member.firstName,
          lastName: member.lastName,
          dni: member.dni,
          birthdate: member.birthdate,
          disciplines: member.disciplines ? [member.disciplines] : [],
        }));
      }

      console.log("Datos enviados:", dataToSend);

      await axios.post(
        `https://api-cdcc.vercel.app/api/v1/users/dataUser/${storedUserId}`,
        dataToSend,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setExtraErrors({});
      setIsModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error al guardar los datos adicionales:", error);
      const errorMessage = error.response?.data?.message || "Error al guardar datos adicionales.";
      setResponseMessage(errorMessage);
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
            <p
              className={`text-[16px] ${montserrat.className} sm:text-[24px] text-center sm:text-left font-medium leading-[20px] sm:leading-[30px] tracking-[0.2px]`}
            >
              Tenemos todo lo que necesitas: deportes, recreación y comunidad. Elegí la mejor propuesta y sumate al Club Deportivo Central Córdoba.
            </p>
          </div>
        </div>

        {/* Formulario inicial */}
        <div className="h-[490px] w-[90%] sm:w-[417px] bg-white/70 backdrop-blur-lg justify-evenly rounded-[16px] p-6 flex flex-col">
          <h3 className="text-[24px] font-bold text-gray-800 mb-4 font-montserrat">¡Hacete socio ahora!</h3>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-2">
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
                  className={`p-2 border w-[95%] rounded-md focus:outline-none focus:ring-0 ${errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
                  className={`p-2 border w-[100%] rounded-md focus:outline-none focus:ring-0 ${errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
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
                className={`p-2 border rounded-md focus:outline-none focus:ring-0 ${errors.email ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="password" className="text-gray-700 text-sm font-medium pb-[10px]">
                Contraseña*
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  className={`p-2 border rounded-md focus:outline-none focus:ring-0 w-full pr-10 ${errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (

                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            {responseMessage && (
              <p
                className={`text-center text-sm ${responseMessage.includes("éxito") ? "text-green-600" : "text-red-500"
                  }`}
              >
                {responseMessage}
              </p>
            )}
            <button
              type="submit"
              className="bg-black text-white h-[58px] py-2 px-4 rounded-md mt-4 disabled:bg-gray-500 disabled:cursor-not-allowed"
              disabled={Object.keys(errors).length > 0}
            >
              Hacerme socio
            </button>
          </form>
        </div>
      </div>

      {/* Modal de datos adicionales */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-lg w-[90%] h-[80%] sm:w-[1200px] overflow-auto">
            <h2 className="text-xl font-bold mb-4 text-center">Completa tus datos</h2>
            <form onSubmit={handleExtraSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <input
                  id="dni"
                  type="text"
                  placeholder="DNI"
                  value={extraData.dni}
                  maxLength="8"
                  onChange={(e) => handleExtraChange({ target: { id: "dni", value: e.target.value.replace(/\D/g, "") } })}
                  className={`p-2 border border-gray-300 rounded-md w-full ${extraErrors.dni ? "border-red-500" : ""}`}
                />
                {extraErrors.dni && <p className="text-red-500 text-xs mt-1">{extraErrors.dni}</p>}
              </div>
              <div>
                <input
                  id="birthdate"
                  type="date"
                  onChange={handleExtraChange}
                  className={`p-2 border border-gray-300 rounded-md w-full ${extraErrors.birthdate ? "border-red-500" : ""
                    }`}
                />
                {extraErrors.birthdate && (
                  <p className="text-red-500 text-xs mt-1">{extraErrors.birthdate}</p>
                )}
              </div>
              <div>
                <select
                  id="maritalStatus"
                  value={extraData.maritalStatus}
                  onChange={handleExtraChange}
                  className={`p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-base w-full ${extraErrors.maritalStatus ? "border-red-500" : ""
                    }`}
                >
                  <option value="">Selecciona tu Estado Civil</option>
                  <option value="SINGLE">Soltero/a</option>
                  <option value="MARRIED">Casado/a</option>
                </select>
                {extraErrors.maritalStatus && (
                  <p className="text-red-500 text-xs mt-1">{extraErrors.maritalStatus}</p>
                )}
              </div>
              <div>
                <input
                  id="nationality"
                  type="text"
                  placeholder="Nacionalidad"
                  onChange={handleExtraChange}
                  className={`p-2 border border-gray-300 rounded-md w-full ${extraErrors.nationality ? "border-red-500" : ""
                    }`}
                />
                {extraErrors.nationality && (
                  <p className="text-red-500 text-xs mt-1">{extraErrors.nationality}</p>
                )}
              </div>
              <div>
                <input
                  id="address"
                  type="text"
                  placeholder="Dirección"
                  onChange={handleExtraChange}
                  className={`p-2 border border-gray-300 rounded-md w-full ${extraErrors.address ? "border-red-500" : ""
                    }`}
                />
                {extraErrors.address && <p className="text-red-500 text-xs mt-1">{extraErrors.address}</p>}
              </div>
              <div>
                <input
                  id="neighborhood"
                  type="text"
                  placeholder="Barrio"
                  onChange={handleExtraChange}
                  className={`p-2 border border-gray-300 rounded-md w-full ${extraErrors.neighborhood ? "border-red-500" : ""
                    }`}
                />
                {extraErrors.neighborhood && (
                  <p className="text-red-500 text-xs mt-1">{extraErrors.neighborhood}</p>
                )}
              </div>
              <div>
                <input
                  id="cp"
                  type="text"
                  placeholder="Código Postal"
                  onChange={handleExtraChange}
                  className={`p-2 border border-gray-300 rounded-md w-full ${extraErrors.cp ? "border-red-500" : ""
                    }`}
                />
                {extraErrors.cp && <p className="text-red-500 text-xs mt-1">{extraErrors.cp}</p>}
              </div>
              <div>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="Teléfono"
                  value={extraData.phoneNumber}
                  maxLength="10"
                  onChange={(e) => handleExtraChange({ target: { id: "phoneNumber", value: e.target.value.replace(/\D/g, "") } })}
                  className={`p-2 border border-gray-300 rounded-md w-full ${extraErrors.phoneNumber ? "border-red-500" : ""}`}
                />
                {extraErrors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">{extraErrors.phoneNumber}</p>
                )}
              </div>
              <div className="col-span-1 sm:col-span-2">
                <select
                  id="gender"
                  value={extraData.gender}
                  onChange={handleExtraChange}
                  className={`p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-base w-full ${extraErrors.gender ? "border-red-500" : ""
                    }`}
                >
                  <option value="">Selecciona tu género</option>
                  <option value="MALE">Masculino</option>
                  <option value="FEMALE">Femenino</option>
                </select>
                {extraErrors.gender && <p className="text-red-500 text-xs mt-1">{extraErrors.gender}</p>}
              </div>
              <div className="col-span-1 sm:col-span-2 flex flex-col">
                <label htmlFor="disciplines" className="text-gray-700">
                  Disciplina:
                </label>
                <select
                  id="disciplines"
                  value={extraData.disciplines}
                  onChange={handleExtraChange}
                  className={`p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-base w-full ${extraErrors.disciplines ? "border-red-500" : ""
                    }`}
                >
                  <option value="">Selecciona una disciplina</option>
                  <option value="ONLY_MEMBER">Solo Socio</option>
                  <option value="ARTISTIC_GYMNASTICS">Gimnasia Artística</option>
                  <option value="BASKETBALL">Básquet</option>
                  <option value="VOLLEYBALL">Vóley</option>
                  <option value="KARATE">Karate</option>
                  <option value="SKATE">Skate</option>
                  <option value="NEWCOM">Newcom</option>
                  <option value="FISHING">Pesca</option>
                </select>
                {extraErrors.disciplines && (
                  <p className="text-red-500 text-xs mt-1">{extraErrors.disciplines}</p>
                )}
              </div>
              {/* Sección del grupo familiar */}
              <div className="col-span-1 sm:col-span-2 mt-6">
                <h3 className="text-lg font-semibold mb-2">Grupo Familiar (Opcional)</h3>
                {extraData.familyGroup.length > 0 && (
                  extraData.familyGroup.map((member, index) => (
                    <div key={index} className="border p-4 rounded-lg mb-4 relative">
                      <button
                        type="button"
                        onClick={() => removeFamilyMember(index)}
                        className="absolute top-[-5px] right-[0.2rem] text-red-500 hover:text-red-700 text-2xl"
                      >
                        x
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <select
                            value={member.relationship}
                            onChange={(e) => handleFamilyMemberChange(index, "relationship", e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                          >
                            <option value="">Selecciona relación</option>
                            <option value="SPOUSE">Cónyuge</option>
                            <option value="CHILD">Hijo/a</option>
                            <option value="PARENT">Padre/Madre</option>
                            <option value="SIBLING">Hermano/a</option>
                          </select>
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Nombre"
                            value={member.firstName}
                            onChange={(e) => handleFamilyMemberChange(index, "firstName", e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Apellido"
                            value={member.lastName}
                            onChange={(e) => handleFamilyMemberChange(index, "lastName", e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="DNI"
                            value={member.dni}
                            onChange={(e) => handleFamilyMemberChange(index, "dni", e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                        <div>
                          <input
                            type="date"
                            value={member.birthdate}
                            onChange={(e) => handleFamilyMemberChange(index, "birthdate", e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                          <label className="text-gray-700">Disciplina:</label>
                          <select
                            value={member.disciplines}
                            onChange={(e) => handleFamilyMemberDisciplineChange(index, e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                          >
                            <option value="">Selecciona una disciplina</option>
                            <option value="ONLY_MEMBER">Solo Socio</option>
                            <option value="ARTISTIC_GYMNASTICS">Gimnasia Artística</option>
                            <option value="BASKETBALL">Básquet</option>
                            <option value="VOLLEYBALL">Vóley</option>
                            <option value="KARATE">Karate</option>
                            <option value="SKATE">Skate</option>
                            <option value="NEWCOM">Newcom</option>
                            <option value="FISHING">Pesca</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <button
                  type="button"
                  onClick={addFamilyMember}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Agregar miembro familiar
                </button>
              </div>

              {responseMessage && (
                <p
                  className={`col-span-1 sm:col-span-2 text-center text-sm ${responseMessage.includes("éxito") ? "text-green-600" : "text-red-500"
                    }`}
                >
                  {responseMessage}
                </p>
              )}
              <div className="col-span-1 sm:col-span-2 flex justify-center gap-4">
                <button type="submit" className="bg-black text-white py-2 px-6 rounded-md">
                  Guardar
                </button>
                <button onClick={() => setIsModalOpen(false)} className="text-red-600">
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-lg w-[90%] max-w-[400px] flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-center text-green-600">¡Datos guardados con éxito!</h2>
            <p className="text-gray-700 text-center mb-4">
              Tu solicitud está en estado <span className="font-bold">pendiente</span>. Te notificaremos
              cuando sea aprobada.
            </p>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="bg-black text-white py-2 px-6 rounded-md"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}