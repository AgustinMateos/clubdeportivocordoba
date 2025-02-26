"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function NavbarComponente() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null); // Estado para guardar datos del usuario

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
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

      // Guardar el token y datos del usuario
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Guardar el nombre y estado civil en el estado
      setUserData({
        name: data.user.name,
        lastName: data.user.lastName, // Asegúrate de que el campo es correcto según la API
        maritalStatus: data.user.data.maritalStatus, 
        address: data.user.data.address,
        age: data.user.data.age,
        gender: data.user.data.gender,
        birthdate:data.user.data.birthdate,
        disciplines:data.user.data.disciplines,
        neighborhood:data.user.data.neighborhood,
        cp:data.user.data.cp,
        nacionalidad:data.user.data.nationality,
        phoneNumber:data.user.data.phoneNumber
        

        // Ajusta el nombre del campo según la API
      });

      // Cerrar modal de login y limpiar inputs
      closeModal();
      setEmail("");
      setPassword("");

      // Abrir modal de éxito
      openSuccessModal();

    } catch (error) {
      console.error("Error en el login:", error.response?.data || error.message);
      setError("Error en el inicio de sesión. Verifica tus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-[20px]">
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
            <li onClick={openModal} className="border border-[#F2F2F2] p-[8px] h-[35px] rounded-[4px] text-[#F2F2F2] font-medium cursor-pointer">Ingresar</li>
          </ul>
        </div>
      </div>

      {/* Modal de Login */}
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
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-md"
                  disabled={loading}
                >
                  {loading ? "Ingresando..." : "Ingresar"}
                </button>
                <button type="button" onClick={closeModal} className="text-gray-500 ">Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Éxito */}
      {isSuccessModalOpen && userData && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-60">
          <div className=" bg-white/70 backdrop-blur-lg p-6 rounded-md w-[700px]">
            <div className="flex flex-col ">
             
              <div className="flex flex-row justify-between">
                <div className="flex flex-col items-start">
                   <h2 className="text-xl mb-4 text-center">¡Inicio de sesión exitoso!</h2>
                  <p className=" font-bold text-center">Bienvenido, {userData.name} {userData.lastName}.</p></div>
                <div>  <Image src="/logonew2.png" alt="Logo" width={96} height={89} /></div>
                 
              </div>
            
            <div className="flex flex-row justify-between">
              <div className="flex flex-col items-start">

            <p className="text-gray-700 text-center">Estado civil: {userData.maritalStatus}</p>
            <p className="text-gray-700 text-center">Direccion: {userData.address}</p>
            <p className="text-gray-700 text-center">Barrio: {userData. neighborhood}</p>
            <p className="text-gray-700 text-center">Cp: {userData.cp}</p>
            <p className="text-gray-700 text-center">Generó: {userData.gender}</p>
            </div>
            <div className="flex flex-col items-start">
            <p className="text-gray-700 text-center">Edad: {userData.age}</p>
            <p className="text-gray-700 text-center">Fecha de cumpleaños: {userData.birthdate}</p>
            <p className="text-gray-700 text-center">Diciplinas: {userData.disciplines}</p>
            <p className="text-gray-700 text-center">Nacionalidad: {userData.nationality}</p>
            <p className="text-gray-700 text-center">Telefonó: {userData.phoneNumber}</p>
            </div>
            </div>
            
            
           
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                onClick={closeSuccessModal}
                className="bg-black text-white px-4 py-2 rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

