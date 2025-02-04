"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavbarComponente() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-[20px]">
      <div className="w-[95%] text-white bg-black rounded-[16px] h-[64px] p-[1.5rem] flex items-center justify-between relative">
        
        {/* Menú hamburguesa (Móvil - Izquierda) */}
        <div className="lg:hidden absolute left-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            
            <Image src="/menuHamburguesa.svg" alt="Menú" width={24} height={24} />
          </button>
        </div>

        {/* Logo (Centrado en Mobile) */}
        <Link href='#' className="absolute left-1/2 transform -translate-x-1/2">
          <Image src="/logo.svg" alt="Logo" width={96} height={89} />
        </Link>

        {/* Icono de Login (Móvil - Derecha) */}
        <div className="lg:hidden absolute right-4">
          <button className="text-white focus:outline-none">
            <Image src="/login.svg" alt="Login" width={40} height={40} />
          </button>
        </div>

        {/* Menú de navegación (Desktop) */}
        <div className="hidden lg:flex flex-row gap-4">
          <ul className="flex flex-row gap-4 pl-[50px]">
          <li>
  <Link href="#nuestroClub" className="relative group text-[16px] text-[#F2F2F2] font-medium leading-[19.5px]">
    Nuestro Club
    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full lg:block hidden"></span>
  </Link>
</li>
<li>
  <Link href="#actividades" className="relative group text-[16px] text-[#F2F2F2] font-medium leading-[19.5px]">
    Actividades
    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full lg:block hidden"></span>
  </Link>
</li>
<li>
  <Link href="#colonia" className="relative group text-[16px] text-[#F2F2F2] font-medium leading-[19.5px]">
    Colonia
    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full lg:block hidden"></span>
  </Link>
</li>
<li>
  <Link href="#beneficios" className="relative group text-[16px] text-[#F2F2F2] font-medium leading-[19.5px]">
    Beneficios
    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full lg:block hidden"></span>
  </Link>
</li>

          </ul>
        </div>

        {/* Redes y botones (Desktop) */}
        <div className="hidden lg:flex flex-row gap-4 items-center">
          <ul className="flex flex-row gap-4 items-center pr-[50px]">
            <li><Image width={22} height={22} src="/facebook.svg" alt="Facebook" /></li>
            <li><Image width={22} height={22} src="/instagram.svg" alt="Instagram" /></li>
            <li className="border border-[#F2F2F2]  p-[8px] h-[35px] rounded-[4px] flex items-center text-[16px] text-[#F2F2F2] font-medium leading-[19.5px] ">Ingresar</li>
            <li className="bg-[#F2F2F2] text-[#101232] p-[8px] h-[35px] rounded-[4px] text-[16px] flex items-center font-medium leading-[19.5px]">Ser Socio</li>
          </ul>
        </div>
      </div>

   
      {/* Menú desplegable móvil (Pantalla completa) */}
{isMenuOpen && (
  <div className="fixed top-0 left-0 w-full h-full bg-black flex text-white justify-start flex-col z-50 pt-[30px] pr-[40px] pl-[40px]">
    {/* Botón de cierre (✕) alineado a la izquierda */}
    <button
      onClick={() => setIsMenuOpen(false)}
      className="text-white text-2xl mb-8 absolute left-4 pl-[20px]"
    >
      ✕
    </button>

    {/* Opciones del menú alineadas a la izquierda */}
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


    {/* Redes sociales y botones alineados a la izquierda */}
    <div className="flex space-x-6 mt-[3.5rem]">
      <Image width={32} height={32} src="/facebook.svg" alt="Facebook" />
      <Image width={32} height={32} src="/instagram.svg" alt="Instagram" />
    </div>

    <div className="mt-[3.5rem] flex flex-col space-y-4">
      <button className="border border-[#F2F2F2] text-white px-6 py-3 rounded-[4px]">
        Ingresar
      </button>
      <button className="bg-[#F2F2F2] text-black px-6 py-3 rounded-[4px]">
        Ser Socio
      </button>
    </div>
  </div>
)}

    </div>
  );
}

