'use client'

import { useState } from "react";
import Image from "next/image";

export default function NavbarComponente() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-[20px]">
            <div className="w-[95%] text-white bg-black rounded-[16px] h-[64px] p-[1.5rem] flex items-center justify-between">
                {/* Links de navegación (para desktop) */}
                <div className="hidden lg:flex flex-row gap-4">
                    <ul className="flex flex-row gap-4">
                        <li>Nuestro Club</li>
                        <li>Actividades</li>
                        <li>Colonia</li>
                        <li>Beneficios</li>
                    </ul>
                </div>

                {/* Logo central */}
                <div className="flex justify-center z-20">
                    <Image
                        src="/logo.svg"
                        alt="sempen combustible sustentable"
                        width={96}
                        height={89}
                    />
                </div>

                {/* Links de redes sociales y botones (para desktop) */}
                <div className="hidden lg:flex flex-row gap-4 items-center">
                    <ul className="flex flex-row gap-4 items-center">
                        <li>
                            <Image width={22} height={22} src="/facebook.svg" alt="Facebook" />
                        </li>
                        <li>
                            <Image
                                width={22}
                                height={22}
                                src="/instagram.svg"
                                alt="Instagram"
                            />
                        </li>
                        <li className="border border-[#F2F2F2] text-white p-[8px]">
                            Ingresar
                        </li>
                        <li className="bg-[#F2F2F2] text-black p-[8px]">Ser Socio</li>
                    </ul>
                </div>

                {/* Menú hamburguesa (para móviles) */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white focus:outline-none"
                    >
                        {/* Icono de menú hamburguesa */}
                        <Image src="/menuHamburguesa.svg" alt="Menu" width={24} height={24} />
                    </button>
                </div>
            </div>

            {/* Menú desplegable para móviles */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-[60px]  w-[80%] bg-black text-white p-4 rounded-b-[16px]">
                    <ul className="flex flex-col gap-4">
                        <li>Nuestro Club</li>
                        <li>Actividades</li>
                        <li>Colonia</li>
                        <li>Beneficios</li>
                    </ul>
                    <ul className="flex flex-col gap-4 mt-4">
                        <li>
                            <Image width={22} height={22} src="/facebook.svg" alt="Facebook" />
                        </li>
                        <li>
                            <Image
                                width={22}
                                height={22}
                                src="/instagram.svg"
                                alt="Instagram"
                            />
                        </li>
                        <li className="border border-[#F2F2F2] text-white p-[8px]">
                            Ingresar
                        </li>
                        <li className="bg-[#F2F2F2] text-black p-[8px]">Ser Socio</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
