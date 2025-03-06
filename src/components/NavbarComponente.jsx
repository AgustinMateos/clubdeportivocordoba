"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function NavbarComponente() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false);
  const [isPreapprovedModalOpen, setIsPreapprovedModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);

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

      const userStatus = data.user.status;

      switch (userStatus) {
        case "IN_PROGRESS":
          openLoadingModal();
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
            membershipNumber:data.user.membershipNumber,
            createdAt: data.user.data.createdAt


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
        <div className="hidden lg:flex flex-row gap-4 items-center">
          <ul className="flex flex-row gap-4 items-center pr-[50px]">
            <li><Image width={22} height={22} src="/facebook.svg" alt="Facebook" /></li>
            <li>
              <Link href="https://www.instagram.com/club.deportivo.cordoba?igsh=NjYxeGdhaDNqN3kz" target="_blank" rel="noopener noreferrer">
                <Image width={22} height={22} src="/instagram.svg" alt="Instagram" />
              </Link>
            </li>
            <li onClick={openModal} className="border border-[#F2F2F2] p-[8px] h-[35px] rounded-[4px] text-[#F2F2F2] font-medium cursor-pointer flex items-center">Ingresar</li>
          </ul>
        </div>
      </div>

      {/* Modal de "APPROVED" */}
      {isSuccessModalOpen && userData && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-60">
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-md w-[600px] relative">
            {/* Pseudo-elemento para el fondo con máscara y opacidad */}
            <div className="absolute inset-0 bg-[url('/logonew2.png')] bg-repeat bg-[size:50px_50px] mask-gradient opacity-15 z-0"></div>
            {/* Contenido del modal */}
            <div className="relative z-10 flex flex-col">
              <div className="flex flex-row justify-center">
                <div className="flex flex-col items-center">
                  <h2 className="text-xl font-bold mb-4 text-center">Club Deportivo Central Córdoba</h2>
                  <p className=" font-bold text-center">Fundado el 4 de septiembre de 1932</p>
                  <p className="mb-4 font-bold text-center">Av. Las Malvinas 1 - Cordoba</p>
                  
                </div>
                {/* <div>
                  <Image src="/logonew2.png" alt="Logo" width={96} height={89} />
                </div> */}
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col items-start">
                <p className="font-bold text-center">Nro de Socio: {userData.membershipNumber}.</p>
                <p className="font-bold text-center">Nombre: {userData.name}.</p>
                <p className="font-bold text-center">Apellido: {userData.lastName}.</p>
                <p className="font-bold text-center">Ingreso: {userData.createdAt}.</p>
                  {/* <p className="text-gray-700 text-center">Estado civil: {userData.maritalStatus}</p>
                  <p className="text-gray-700 text-center">Dirección: {userData.address}</p>
                  <p className="text-gray-700 text-center">Barrio: {userData.neighborhood}</p>
                  <p className="text-gray-700 text-center">CP: {userData.cp}</p>
                  <p className="text-gray-700 text-center">Género: {userData.gender}</p> */}
                </div>
                {/* <div className="flex flex-col items-start">
                  <p className="text-gray-700 text-center">Edad: {userData.age}</p>
                  <p className="text-gray-700 text-center">Fecha de cumpleaños: {userData.birthdate}</p>
                  <p className="text-gray-700 text-center">Disciplinas: {userData.disciplines}</p>
                  <p className="text-gray-700 text-center">Nacionalidad: {userData.nationality}</p>
                  <p className="text-gray-700 text-center">Teléfono: {userData.phoneNumber}</p>
                </div> */}
              </div>
              <div className="h-[80px] flex justify-between items-end" >
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
              <div className="flex justify-between items-end">
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