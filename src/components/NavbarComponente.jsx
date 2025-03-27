"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

export default function NavbarComponente() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false);
  const [isPreapprovedModalOpen, setIsPreapprovedModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isExtraDataModalOpen, setIsExtraDataModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const MEMBERSHIP_FEE = 8000;

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
  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setPaymentLink("");
  };
  const openExtraDataModal = () => setIsExtraDataModalOpen(true);
  const closeExtraDataModal = () => setIsExtraDataModalOpen(false);

  const handleNameClick = () => {
    console.log("Clic en el nombre, userData:", userData);
    if (userData && userData.status === "APPROVED") {
      console.log("Abriendo modal para usuario APPROVED");
      openSuccessModal();
    } else {
      console.log("No se abre el modal: usuario no APPROVED o userData incompleto");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Datos recuperados de localStorage:", parsedUser);
      console.log("Payments en localStorage:", parsedUser.payment?.payments);
      setUserData({
        name: parsedUser.name,
        lastName: parsedUser.lastName,
        membershipNumber: parsedUser.membershipNumber,
        createdAt: parsedUser.createdAt,
        qr: parsedUser.payment?.qr?.img,
        status: parsedUser.status,
        payment: {
          status: parsedUser.payment?.status,
          expiration: parsedUser.payment?.expiration,
          payments: parsedUser.payment?.payments || [],
        },
        address: parsedUser.data?.address,
        birthdate: parsedUser.data?.birthdate,
        cp: parsedUser.data?.cp,
        disciplines: parsedUser.data?.disciplines,
        dni: parsedUser.data?.dni,
        familyGroup: parsedUser.data?.familyGroup || [],
        gender: parsedUser.data?.gender,
        maritalStatus: parsedUser.data?.maritalStatus,
        nationality: parsedUser.data?.nationality,
        neighborhood: parsedUser.data?.neighborhood,
        phoneNumber: parsedUser.data?.phoneNumber,
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    Cookies.remove("userId");
    Cookies.remove("access_token");
    setUserData(null);
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
  
      console.log("Login exitoso, datos recibidos:", data); // Log general de la respuesta
      console.log("Estado del usuario (userStatus):", data.user.status); // Log del estado
  
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      Cookies.set("userId", data.user._id, { expires: 7, secure: true, sameSite: "Lax" });
      Cookies.set("access_token", data.access_token, { expires: 7, secure: true, sameSite: "Lax" });
  
      const userStatus = data.user.status;
      console.log("Valor de userStatus antes del switch:", userStatus);
  
      switch (userStatus) {
        case "IN_PROGRESS":
          console.log("Entrando en caso IN_PROGRESS");
          openExtraDataModal();
          break;
        case "PENDING":
          console.log("Entrando en caso PENDING");
          openPendingModal();
          break;
        case "PREAPPROVED":
          console.log("Entrando en caso PREAPPROVED");
          openPreapprovedModal();
          break;
        case "APPROVED":
          console.log("Entrando en caso APPROVED");
          console.log("Payments en respuesta:", data.user.payment?.payments); // Movemos el log aquí
          const updatedUserData = {
            name: data.user.name,
            lastName: data.user.lastName,
            membershipNumber: data.user.membershipNumber,
            createdAt: data.user.createdAt,
            qr: data.user.payment?.qr?.img || "", // Manejo seguro si payment no existe
            status: data.user.status,
            payment: {
              status: data.user.payment?.status || "N/A", // Valor por defecto si no existe
              expiration: data.user.payment?.expiration || null, // Valor por defecto si no existe
              payments: data.user.payment?.payments || [], // Arreglo vacío si no existe
            },
            address: data.user.data?.address,
            birthdate: data.user.data?.birthdate,
            cp: data.user.data?.cp,
            disciplines: data.user.data?.disciplines,
            dni: data.user.data?.dni,
            familyGroup: data.user.data?.familyGroup || [],
            gender: data.user.data?.gender,
            maritalStatus: data.user.data?.maritalStatus,
            nationality: data.user.data?.nationality,
            neighborhood: data.user.data?.neighborhood,
            phoneNumber: data.user.data?.phoneNumber,
          };
          setUserData(updatedUserData);
          console.log("userData después de setUserData:", updatedUserData);
          openSuccessModal();
          break;
        default:
          console.log("Entrando en caso default, estado no reconocido:", userStatus);
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

  const handlePaymentMonthsChange = (e) => {
    setSelectedMonths(e.target.value);
    setPaymentLink("");
  };

  const handleMercadoPagoPayment = async () => {
    if (!selectedMonths) {
      alert("Por favor, selecciona un número de meses antes de proceder al pago.");
      return;
    }

    const monthsToAdd = parseInt(selectedMonths);
    if (isNaN(monthsToAdd) || monthsToAdd <= 0) {
      alert("El número de meses debe ser un valor numérico mayor a 0.");
      return;
    }

    const totalAmount = monthsToAdd * MEMBERSHIP_FEE;
    if (isNaN(totalAmount) || totalAmount <= 0) {
      alert("El monto total no es válido.");
      return;
    }

    const token = Cookies.get("access_token");
    const userId = Cookies.get("userId");

    if (!token || !userId) {
      alert("No estás autenticado. Por favor, inicia sesión de nuevo.");
      return;
    }

    console.log("Datos enviados:", { userId, monthsToAdd, amount: totalAmount, token });

    try {
      const response = await axios.post(
        `https://api-cdcc.vercel.app/api/v1/payment/mercado-pago/${userId}`,
        {
          monthsToAdd: monthsToAdd,
          amount: totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Respuesta de Mercado Pago:", response.data);

      if (response.data.link) {
        setPaymentLink(response.data.link);
      } else {
        alert("No se recibió un enlace de pago válido. Contacta al soporte.");
      }
    } catch (error) {
      console.error("Error completo:", error.response?.status, error.response?.data);
      alert("Hubo un error al obtener el enlace de pago. Intenta de nuevo más tarde.");
    }
  };

  const handleRedirectToPayment = () => {
    if (paymentLink) {
      window.location.href = paymentLink;
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
      setIsExtraDataModalOpen(false);
      setResponseMessage("Datos guardados con éxito. Tu solicitud está pendiente de aprobación.");
      openPendingModal();
    } catch (error) {
      console.error("Error al guardar los datos adicionales:", error);
      const errorMessage = error.response?.data?.message || "Error al guardar datos adicionales.";
      setResponseMessage(errorMessage);
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
          {userData ? (
            <div className="flex items-center gap-2">
              <span
                onClick={handleNameClick}
                className="text-white font-medium cursor-pointer hover:underline"
              >
                {userData.name} {userData.lastName}
              </span>
              <button onClick={handleLogout} className="text-white focus:outline-none">
                <Image src="/logout.svg" alt="Logout" width={24} height={24} />
              </button>
            </div>
          ) : (
            <button onClick={openModal} className="text-white focus:outline-none">
              <Image src="/login.svg" alt="Login" width={40} height={40} />
            </button>
          )}
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
            {userData ? (
              <li className="flex items-center gap-2">
                <span
                  onClick={handleNameClick}
                  className="text-[#F2F2F2] font-medium cursor-pointer hover:underline"
                >
                  {userData.name} {userData.lastName}
                </span>
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

      {isSuccessModalOpen && userData && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-60 pt-4 md:pt-0">
    <div className="flex justify-end mt-4">
      <button onClick={closeSuccessModal} className="text-white px-4 py-2">
        Cerrar
      </button>
    </div>
    <div className="flex justify-center items-start md:items-center">
      {/* Contenedor principal con scroll horizontal en escritorio */}
      <div className="flex flex-col md:flex-row w-full max-w-[1050px] md:max-w-none max-h-[90vh] overflow-y-auto md:overflow-x-auto md:overflow-y-visible rounded-md mx-4 md:mx-0 gap-4 whitespace-nowrap">
        {/* Bloque de Pagos */}
        <div className="bg-white/70 rounded-md backdrop-blur-lg h-auto w-full md:w-[650px] p-4 md:p-6 relative max-h-[70vh] overflow-y-auto flex-shrink-0">
          <div className="absolute inset-0 bg-[url('/logonew2.png')] min-h-[80vh] bg-repeat bg-[size:40px_40px] opacity-10 mask-gradient z-0"></div>
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-center mb-4">Pagos</h2>
            <div className="mb-6">
              <select
                name="paymentMonths"
                id="paymentMonths"
                value={selectedMonths}
                onChange={handlePaymentMonthsChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Selecciona un número de meses</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              {selectedMonths && (
                <div className="mt-2 text-center">
                  <p>Total a pagar: {(selectedMonths * MEMBERSHIP_FEE).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                  <button
                    onClick={handleMercadoPagoPayment}
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Generar enlace de pago
                  </button>
                </div>
              )}
              {paymentLink && (
                <div className="mt-4 text-center">
                  <p>Enlace de pago generado exitosamente:</p>
                  <button
                    onClick={handleRedirectToPayment}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Ir a Mercado Pago
                  </button>
                </div>
              )}
            </div>
            {userData.payment?.payments?.length > 0 ? (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2 text-left">Fecha de Pago</th>
                      <th className="border border-gray-300 p-2 text-left">Meses Pagados</th>
                      <th className="border border-gray-300 p-2 text-left">Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.payment.payments.map((payment) => (
                      <tr key={payment._id} className="bg-gray-100">
                        <td className="border border-gray-300 p-2">{new Date(payment.paymentDate).toLocaleDateString('es-AR')}</td>
                        <td className="border border-gray-300 p-2">{payment.monthsPaid}</td>
                        <td className="border border-gray-300 p-2">{payment.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-6">No hay pagos registrados.</p>
            )}
            <div className="mt-6">
              <p className="font-bold text-center">
                Pago: <span className="font-bold border-b-4 border-dotted border-b-black">{userData.payment?.status}</span>
              </p>
              <p className="font-bold text-center">
                Expiración: <span className="font-bold border-b-4 border-dotted border-b-black">
                  {new Date(userData.payment?.expiration).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bloque de Carnet */}
        <div className="bg-white/70 backdrop-blur-lg p-4 md:p-6 max-h-[70vh] rounded-md w-full md:w-[650px] relative mt-4 md:mt-0 flex-shrink-0">
          <div className="absolute inset-0 bg-[url('/logonew2.png')] bg-repeat bg-[size:40px_40px] mask-gradient opacity-10 z-0"></div>
          <div className="relative z-10 flex flex-col">
            <div className="flex flex-row justify-center">
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold text-center">Club Deportivo Central Córdoba</h2>
                <p className="font-bold text-center">Fundado el 4 de septiembre de 1932</p>
                <p className="font-bold text-center">Av. Las Malvinas 1 - Cordoba</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between relative h-auto md:h-[200px] mt-4">
              <div className="absolute inset-0 bg-[url('/logonew2.png')] bg-[position:center] md:bg-[position:170px_20px] bg-[size:180px_160px] mask-gradient opacity-30 bg-no-repeat z-0"></div>
              <div className="relative z-10 flex flex-col justify-evenly items-start">
                <p className="font-bold text-center">
                  Nro de Socio: <span className="font-bold border-b-4 border-dotted border-b-black">{userData.membershipNumber}.</span>
                </p>
                <p className="font-bold text-center">
                  Nombre: <span className="font-bold border-b-4 border-dotted border-b-black">{userData.name}.</span>
                </p>
                <p className="font-bold text-center">
                  Apellido: <span className="font-bold border-b-4 border-dotted border-b-black">{userData.lastName}</span>
                </p>
                <p className="font-bold text-center">
                  Ingreso: <span className="font-bold border-b-4 border-dotted border-b-black">
                    {new Date(userData.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
              <div className="relative z-10 flex justify-center items-center mt-4 md:mt-0">
                {userData.qr ? (
                  <Image src={userData.qr} alt="QR Code" width={180} height={180} className="border-2" />
                ) : (
                  <p className="text-red-500">QR no disponible</p>
                )}
              </div>
            </div>
            <div className="h-[80px] flex justify-between items-end mt-4">
              <div className="w-[200px]">
                <div className="border-t-4 border-dotted border-t-black text-center font-bold">Secretario</div>
              </div>
              <div className="w-[200px]">
                <div className="border-t-4 border-dotted border-t-black text-center font-bold">Presidente</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bloque de Grupo Familiar */}
        <div className="h-auto w-full md:w-[650px] rounded-md max-h-[70vh] bg-white/70 backdrop-blur-lg relative mt-4 md:mt-0 p-4 md:p-6 flex-shrink-0">
          <div className="absolute inset-0 bg-[url('/logonew2.png')] bg-repeat bg-[size:40px_40px] opacity-10 mask-gradient"></div>
          <div className="relative z-10">
            {userData.familyGroup && userData.familyGroup.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-center text-black mb-4">Grupo Familiar</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2 text-left">Nombre</th>
                        <th className="border border-gray-300 p-2 text-left">Apellido</th>
                        <th className="border border-gray-300 p-2 text-left">Relación</th>
                        <th className="border border-gray-300 p-2 text-left">DNI</th>
                        <th className="border border-gray-300 p-2 text-left">Ingreso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.familyGroup.map((familyMember, index) => (
                        <tr key={familyMember._id || index} className="bg-gray-100">
                          <td className="border border-gray-300 p-2">{familyMember.firstName}</td>
                          <td className="border border-gray-300 p-2">{familyMember.lastName}</td>
                          <td className="border border-gray-300 p-2">{familyMember.relationship}</td>
                          <td className="border border-gray-300 p-2">{familyMember.dni}</td>
                          <td className="border border-gray-300 p-2">
                            {new Date(familyMember.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
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
                  <option value="MARRIED">Casado/a</option>
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