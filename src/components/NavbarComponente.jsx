"use client";
import { useState,useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie"; // Necesitamos Cookies para manejar userId y token

export default function NavbarComponente() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false);
  const [isPreapprovedModalOpen, setIsPreapprovedModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isExtraDataModalOpen, setIsExtraDataModalOpen] = useState(false); // Nuevo estado para el modal de extraData
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  
  const [extraData, setExtraData] = useState({
    dni: "",
    birthdate: "",
    maritalStatus: "",
    nationality: "",
    address: "",
    neighborhood: "",
    cp: "",
    phoneNumber: "",
    disciplines: [],
    gender: "",
  });
  const [extraErrors, setExtraErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openLoadingModal = () => setIsLoadingModalOpen(true);
  const closeLoadingModal = () => setIsLoadingModalOpen(false);
  const openPendingModal = () => setIsPendingModalOpen(true);
  const closePendingModal = () => setIsPendingModalOpen(false);
  const openPreapprovedModal = () => setIsPreapprovedModalOpen(true);
  const closePreapprovedModal = () => setIsPreapprovedModalOpen(false);
  const openSuccessModal = () => setIsSuccessModalOpen(true);
  const closeSuccessModal = () => setIsSuccessModalOpen(false);
  const openExtraDataModal = () => setIsExtraDataModalOpen(true);
  const closeExtraDataModal = () => setIsExtraDataModalOpen(false);
  // Agregar un efecto para cargar los datos del usuario al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData({
        name: parsedUser.name,
        lastName: parsedUser.lastName,
       
      });
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    Cookies.remove("userId");
    Cookies.remove("access_token");
    setUserData(null); // Limpiar el estado del usuario
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post("https://api-cdcc.vercel.app/api/v1/users/login", {
        email,
        password,
      });

      console.log("Login exitoso:", data);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      Cookies.set("userId", data.user._id, { expires: 7, secure: true, sameSite: "Lax" }); // Guardamos userId en cookies
      Cookies.set("access_token", data.access_token, { expires: 7, secure: true, sameSite: "Lax" });

      const userStatus = data.user.status;

      switch (userStatus) {
        case "IN_PROGRESS":
          openExtraDataModal(); // Abrimos el modal de datos adicionales
          break;
        case "PENDING":
          openPendingModal();
          break;
        case "PREAPPROVED":
          openPreapprovedModal();
          break;
        case "APPROVED":
          setUserData({
            name: data.user.name,
            lastName: data.user.lastName,
            maritalStatus: data.user.data.maritalStatus,
            address: data.user.data.address,
            age: data.user.data.age,
            gender: data.user.data.gender,
            birthdate: data.user.data.birthdate,
            disciplines: data.user.data.disciplines,
            neighborhood: data.user.data.neighborhood,
            cp: data.user.data.cp,
            nationality: data.user.data.nationality,
            phoneNumber: data.user.data.phoneNumber,
            membershipNumber: data.user.membershipNumber,
            createdAt: data.user.createdAt, // Ajustado a createdAt del usuario
            qr: data.user.payment.qr.img,
          });
          openSuccessModal();
          break;
        default:
          setError("Estado desconocido.");
      }

      closeModal();
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error en el login:", error.response?.data || error.message);
      setError("Error en el inicio de sesión. Verifica tus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  const handleExtraChange = (e) => {
    const { id, value } = e.target;
    setExtraData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    clearExtraError(id);
  };

  const handleDisciplineChange = (e) => {
    const { value, checked } = e.target;
    setExtraData((prevData) => ({
      ...prevData,
      disciplines: checked
        ? [...prevData.disciplines, value]
        : prevData.disciplines.filter((d) => d !== value),
    }));
    if (checked) clearExtraError("disciplines");
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
    if (!extraData.nationality) newExtraErrors.nationality = "La nacionalidad es obligatoria";
    if (!extraData.address) newExtraErrors.address = "La dirección es obligatoria";
    if (!extraData.neighborhood) newExtraErrors.neighborhood = "El barrio es obligatorio";
    if (!extraData.cp) newExtraErrors.cp = "El código postal es obligatorio";
    if (!extraData.phoneNumber) newExtraErrors.phoneNumber = "El teléfono es obligatorio";
    else if (!/^\d{10}$/.test(extraData.phoneNumber)) newExtraErrors.phoneNumber = "El teléfono debe tener 10 dígitos";
    if (extraData.disciplines.length === 0) newExtraErrors.disciplines = "Debes seleccionar al menos una disciplina";
    if (!extraData.gender) newExtraErrors.gender = "El género es obligatorio";

    if (Object.keys(newExtraErrors).length > 0) {
      setExtraErrors(newExtraErrors);
      setResponseMessage("Por favor completa todos los campos adicionales correctamente");
      return;
    }

    const storedUserId = Cookies.get("userId");
    const token = Cookies.get("access_token");

    if (!storedUserId || !token) {
      console.error("userId o access_token no están definidos en las cookies.");
      setResponseMessage("Por favor, inicia sesión de nuevo.");
      return;
    }

    try {
      await axios.post(
        `https://api-cdcc.vercel.app/api/v1/users/dataUser/${storedUserId}`,
        { ...extraData, disciplines: extraData.disciplines },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setExtraErrors({});
      setIsExtraDataModalOpen(false); // Cerrar el modal de datos adicionales
      setResponseMessage("Datos guardados con éxito. Tu solicitud está pendiente de aprobación.");
      openPendingModal(); // Mostrar modal de "PENDING" tras guardar
    } catch (error) {
      console.error("Error al guardar los datos adicionales:", error);
      const errorMessage = error.response?.data?.message || "Error al guardar datos adicionales.";
      setResponseMessage(errorMessage);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-[20px]">
      {/* Navbar existente */}
      <div className="w-[95%] text-white bg-black rounded-[16px] h-[64px] p-[1.5rem] flex items-center justify-between relative">
        <div className="lg:hidden absolute left-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <Image src="/menuHamburguesa.svg" alt="Menú" width={24} height={24} />
          </button>
        </div>
        <Link href="#" className="absolute left-1/2 transform -translate-x-1/2">
          <Image src="/logonew2.png" alt="Logo" width={96} height={89} />
        </Link>
        <div className="lg:hidden absolute right-4">
          <button onClick={openModal} className="text-white focus:outline-none">
            <Image src="/login.svg" alt="Login" width={40} height={40} />
          </button>
        </div>
        <div className="hidden lg:flex flex-row gap-4">
          <ul className="flex flex-row gap-4 pl-[50px]">
            <li><Link href="#nuestroClub" className="text-[#F2F2F2] font-medium">Nuestro Club</Link></li>
            <li><Link href="#actividades" className="text-[#F2F2F2] font-medium">Actividades</Link></li>
            <li><Link href="#colonia" className="text-[#F2F2F2] font-medium">Colonia</Link></li>
            <li><Link href="#beneficios" className="text-[#F2F2F2] font-medium">Beneficios</Link></li>
          </ul>
        </div>
        <div className="lg:hidden absolute right-4">
          {userData ? (
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">{userData.name}</span>
              <button onClick={handleLogout} className="text-white focus:outline-none">
                <Image src="/logout.svg" alt="Logout" width={24} height={24} /> {/* Asegúrate de tener un ícono de logout */}
              </button>
            </div>
          ) : (
            <button onClick={openModal} className="text-white focus:outline-none">
              <Image src="/login.svg" alt="Login" width={40} height={40} />
            </button>
          )}
        </div>

        <div className="hidden lg:flex flex-row gap-4 items-center">
          <ul className="flex flex-row gap-4 items-center pr-[50px]">
            <li><Image width={22} height={22} src="/facebook.svg" alt="Facebook" /></li>
            <li>
              <Link href="https://www.instagram.com/club.deportivo.cordoba?igsh=NjYxeGdhaDNqN3kz" target="_blank" rel="noopener noreferrer">
                <Image width={22} height={22} src="/instagram.svg" alt="Instagram" />
              </Link>
            </li>
            {userData ? (
              <li className="flex items-center gap-2">
                <span className="text-[#F2F2F2] font-medium">{userData.name}</span>
                <button onClick={handleLogout} className="text-[#F2F2F2] font-medium border border-[#F2F2F2] p-[8px] rounded-[4px]">
                  Salir
                </button>
              </li>
            ) : (
              <li onClick={openModal} className="border border-[#F2F2F2] p-[8px] h-[35px] rounded-[4px] text-[#F2F2F2] font-medium cursor-pointer flex items-center">
                Ingresar
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Modal de "APPROVED" */}
      {isSuccessModalOpen && userData && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-60">
    <div className="bg-white/70 backdrop-blur-lg p-6 rounded-md w-[650px] relative">
      <div className="absolute inset-0 bg-[url('/logonew2.png')] bg-repeat bg-[size:40px_40px] mask-gradient opacity-10 z-0"></div>
      <div className="relative z-10 flex flex-col">
        <div className="flex flex-row justify-center">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-center">Club Deportivo Central Córdoba</h2>
            <p className="font-bold text-center">Fundado el 4 de septiembre de 1932</p>
            <p className="font-bold text-center">Av. Las Malvinas 1 - Cordoba</p>
          </div>
        </div>
        <div className="flex flex-row justify-between relative h-[200px]">
          <div className="absolute inset-0 bg-[url('/logonew2.png')] bg-[position:170px_20px] bg-[size:180px_160px] mask-gradient opacity-30 bg-no-repeat z-0"></div>
          <div className="relative z-10 flex flex-col justify-evenly items-start">
            <p className="font-bold text-center">
              Nro de Socio: <span className="font-bold text-center border-b-4 border-dotted border-b-black">{userData.membershipNumber}.</span>
            </p>
            <p className="font-bold text-center">
              Nombre: <span className="font-bold text-center border-b-4 border-dotted border-b-black">{userData.name}.</span>
            </p>
            <p className="font-bold text-center">
              Apellido: <span className="font-bold text-center border-b-4 border-dotted border-b-black">{userData.lastName}</span>
            </p>
            <p className="font-bold text-center">
              Ingreso: <span className="font-bold text-center border-b-4 border-dotted border-b-black">{userData.createdAt}</span>
            </p>
          </div>
          <div className="relative z-10 flex items-center">
            {console.log("QR URL:", userData.qr)}
            {userData.qr ? (
              <Image src={userData.qr} alt="QR Code" width={180} height={180} className="border-2" />
            ) : (
              <p className="text-red-500">QR no disponible</p>
            )}
          </div>
        </div>
        <div className="h-[80px] flex justify-between items-end">
          <div className="w-[200px]">
            <div className="border-t-4 border-dotted border-t-black text-center font-bold">Secretario</div>
          </div>
          <div className="w-[200px]">
            <div className="border-t-4 border-dotted border-t-black text-center font-bold">Presidente</div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button onClick={closeSuccessModal} className="bg-black text-white px-4 py-2 rounded-md">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
)}
{isMenuOpen && (
   <div className="fixed top-0 left-0 w-full h-full bg-black flex text-white justify-start flex-col z-50 pt-[30px] pr-[40px] pl-[40px]">
 
     <button
       onClick={() => setIsMenuOpen(false)}
       className="text-white text-2xl mb-8 absolute left-4 pl-[20px]"
     >
       ✕
     </button>
 
 
     <ul className="text-xl space-y-6 pt-[70px]">
   <li className="h-[48px]">
     <Link href="#nuestroClub" onClick={() => setIsMenuOpen(false)} className="text-[16px] text-[#F2F2F2] font-medium leading-[19.5px]">
       Nuestro Club
     </Link>
   </li>
   <li className="h-[48px]">
     <Link href="#actividades" onClick={() => setIsMenuOpen(false)} className="text-[16px] text-[#F2F2F2] font-medium leading-[19.5px]">
       Actividades
     </Link>
   </li>
   <li className="h-[48px]">
     <Link href="#colonia" onClick={() => setIsMenuOpen(false)} className="text-[16px] text-[#F2F2F2] font-medium leading-[19.5px]">
       Colonia
     </Link>
   </li>
   <li className="h-[48px]">
     <Link href="#beneficios" onClick={() => setIsMenuOpen(false)} className="text-[16px] text-[#F2F2F2] font-medium leading-[19.5px]">
       Beneficios
     </Link>
   </li>
 </ul>
 
 
 
     <div className="flex space-x-6 mt-[3.5rem]">
       <Image width={32} height={32} src="/facebook.svg" alt="Facebook" />
       <Image width={32} height={32} src="/instagram.svg" alt="Instagram" />
     </div>
 
     <div className="mt-[3.5rem] flex flex-col space-y-4">
       <button className="border border-[#F2F2F2] text-white px-6 py-3 rounded-[4px] font-inter">
         Ingresar
       </button>
       <button className="bg-[#F2F2F2] text-black px-6 py-3 rounded-[4px]">
         Ser Socio
       </button>
     </div>
   </div>
 )}
{/* Modal de datos adicionales */}
{isExtraDataModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-lg w-[90%] h-[80%] sm:w-[1200px] overflow-auto">
            <h2 className="text-xl font-bold mb-4 text-center">Completa tus datos</h2>
            <form onSubmit={handleExtraSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  id="dni"
                  type="text"
                  placeholder="DNI"
                  onChange={handleExtraChange}
                  className={`p-2 border border-gray-300 rounded-md w-full ${extraErrors.dni ? "border-red-500" : ""}`}
                />
                {extraErrors.dni && <p className="text-red-500 text-xs mt-1">{extraErrors.dni}</p>}
              </div>
              <div>
                <input
                  id="birthdate"
                  type="date"
                  onChange={handleExtraChange}
                  className={`p-2 border border-gray-300 rounded-md w-full ${extraErrors.birthdate ? "border-red-500" : ""}`}
                />
                {extraErrors.birthdate && <p className="text-red-500 text-xs mt-1">{extraErrors.birthdate}</p>}
              </div>
              <div>
                <select
                  id="maritalStatus"
                  value={extraData.maritalStatus}
                  onChange={handleExtraChange}
                  className={`p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-base w-full ${extraErrors.maritalStatus ? "border-red-500" : ""}`}
                >
                  <option value="">Selecciona tu Estado Civil</option>
                  <option value="MARIED">Casado/a</option>
                  <option value="SINGLE">Soltero/a</option>
                </select>
                {extraErrors.maritalStatus && <p className="text-red-500 text-xs mt-1">{extraErrors.maritalStatus}</p>}
              </div>
              <div>
                <input
                  id="nationality"
                  type="text"
                  placeholder="Nacionalidad"
                  onChange={handleExtraChange}
                  className={`p-2 border border-gray-300 rounded-md w-full ${extraErrors.nationality ? "border-red-500" : ""}`}
                />
                {extraErrors.nationality && <p className="text-red-500 text-xs mt-1">{extraErrors.nationality}</p>}
              </div>
              <div>
                <input
                  id="address"
                  type="text"
                  placeholder="Dirección"
                  onChange={handleExtraChange}
                  className={`p-2 border border-gray-300 rounded-md w-full ${extraErrors.address ? "border-red-500" : ""}`}
                />
                {extraErrors.address && <p className="text-red-500 text-xs mt-1">{extraErrors.address}</p>}
              </div>
              <div>
                <input
                  id="neighborhood"
                  type="text"
                  placeholder="Barrio"
                  onChange={handleExtraChange}
                  className={`p-2 border border-gray-300 rounded-md w-full ${extraErrors.neighborhood ? "border-red-500" : ""}`}
                />
                {extraErrors.neighborhood && <p className="text-red-500 text-xs mt-1">{extraErrors.neighborhood}</p>}
              </div>
              <div>
                <input
                  id="cp"
                  type="text"
                  placeholder="Código Postal"
                  onChange={handleExtraChange}
                  className={`p-2 border border-gray-300 rounded-md w-full ${extraErrors.cp ? "border-red-500" : ""}`}
                />
                {extraErrors.cp && <p className="text-red-500 text-xs mt-1">{extraErrors.cp}</p>}
              </div>
              <div>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="Teléfono"
                  onChange={handleExtraChange}
                  className={`p-2 border border-gray-300 rounded-md w-full ${extraErrors.phoneNumber ? "border-red-500" : ""}`}
                />
                {extraErrors.phoneNumber && <p className="text-red-500 text-xs mt-1">{extraErrors.phoneNumber}</p>}
              </div>
              <div className="col-span-1 sm:col-span-2">
                <select
                  id="gender"
                  value={extraData.gender}
                  onChange={handleExtraChange}
                  className={`p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-base w-full ${extraErrors.gender ? "border-red-500" : ""}`}
                >
                  <option value="">Selecciona tu género</option>
                  <option value="MALE">Masculino</option>
                  <option value="FEMALE">Femenino</option>
                </select>
                {extraErrors.gender && <p className="text-red-500 text-xs mt-1">{extraErrors.gender}</p>}
              </div>
              <div className="col-span-1 sm:col-span-2 flex flex-col">
                <label className="text-gray-700 text-sm font-medium pb-[10px]">Disciplinas</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["ARTISTIC_GYMNASTICS", "BASKETBALL", "VOLLEYBALL", "KARATE", "SKATE", "NEWCOM", "FISHING"].map((discipline) => (
                    <label key={discipline} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={discipline}
                        checked={extraData.disciplines.includes(discipline)}
                        onChange={handleDisciplineChange}
                        className="w-4 h-4"
                      />
                      {discipline.replace("_", " ")}
                    </label>
                  ))}
                </div>
                {extraErrors.disciplines && <p className="text-red-500 text-xs mt-1">{extraErrors.disciplines}</p>}
              </div>
              {responseMessage && (
                <p className={`col-span-1 sm:col-span-2 text-center text-sm ${responseMessage.includes("éxito") ? "text-green-600" : "text-red-500"}`}>
                  {responseMessage}
                </p>
              )}
              <div className="col-span-1 sm:col-span-2 flex justify-center gap-4">
                <button type="submit" className="bg-black text-white py-2 px-6 rounded-md">Guardar</button>
                <button onClick={closeExtraDataModal} className="text-red-600">Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Otros modales permanecen igual */}
      {isLoadingModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-60">
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-md w-[350px] flex flex-col items-center">
            <Image src="/logonew2.png" alt="Logo" width={96} height={89} />
            <h2 className="text-xl mb-4 text-center">Solicitud en proceso</h2>
            <div className="loader" />
            <button onClick={closeLoadingModal} className="mt-4 bg-black text-white px-4 py-2 rounded-md">
              Cerrar
            </button>
          </div>
        </div>
      )}
      {isPendingModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-60">
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-md w-[350px] flex flex-col items-center">
            <Image src="/logonew2.png" alt="Logo" width={96} height={89} />
            <h2 className="text-xl mb-4 text-center">Solicitud pendiente de aprobación</h2>
            <p className="text-gray-700 text-center">Se le notificará por mail cuando esté aprobada.</p>
            <button onClick={closePendingModal} className="mt-4 bg-black text-white px-4 py-2 rounded-md">
              Cerrar
            </button>
          </div>
        </div>
      )}
      {isPreapprovedModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-60">
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-md w-[350px] flex flex-col items-center">
            <Image src="/logonew2.png" alt="Logo" width={96} height={89} />
            <h2 className="text-xl mb-4 text-center">Solicitud preaprobada</h2>
            <p className="text-gray-700 text-center">Se le notificará por mail cuando esté aprobada.</p>
            <button onClick={closePreapprovedModal} className="mt-4 bg-black text-white px-4 py-2 rounded-md">
              Cerrar
            </button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-60">
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-md w-[350px] flex flex-col items-center">
            <Image src="/logonew2.png" alt="Logo" width={96} height={89} />
            <h2 className="text-xl mb-4 text-center">Iniciar Sesión</h2>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">Usuario</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <button type="submit" className="bg-black text-white px-4 py-2 rounded-md" disabled={loading}>
                  {loading ? "Ingresando..." : "Ingresar"}
                </button>
                <button type="button" onClick={closeModal} className="text-gray-500 flex items-center">Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}