'use client'
import { useState } from "react";

export default function Tarifas() {
    // Datos iniciales para las filas
    const initialData = [
        ["Servicio", "Socios", "No socios"],
        ["Camping (Adulto)", "Bonificado", "$3.000"],
        ["Camping (Niños)", "Bonificado", "$1.500"],
        ["Carpa", "$2.500", "$5.000"],
        ["Bote", "$6.00", "$12.000"],
        ["Pileta", "$3.000", "$6.000"],
        ["Habitación", "$15.000", "$30.000"],
    ];

    const [tableData, setTableData] = useState(initialData);

    return (
        <div className="h-[690px] bg-[#C32929] relative">
            <div className="p-4 flex flex-col items-center justify-center">
                <div className="w-[90%] flex">
                    <h5 className="text-white w-[60%] text-xl font-semibold mb-4 flex ">
                        Tarifas 2024 - Colonia Vacaciones
                    </h5>
                </div>

                <div className="w-[1282px] h-[350px] rounded-[8px]">
                    <div className="grid grid-rows-7 grid-cols-3 gap-0">
                        {tableData.map((row, rowIndex) =>
                            row.map((cell, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`flex items-center justify-center ${
                                        rowIndex === 0
                                            ? "bg-white font-bold"
                                            : "bg-white/70"
                                    } text-black h-16 ${
                                        rowIndex === 0 && colIndex === 0
                                            ? "rounded-tl-[8px]"
                                            : rowIndex === 0 && colIndex === 2
                                            ? "rounded-tr-[8px]"
                                            : rowIndex === 6 && colIndex === 0
                                            ? "rounded-bl-[8px]"
                                            : rowIndex === 6 && colIndex === 2
                                            ? "rounded-br-[8px]"
                                            : ""
                                    }`}
                                >
                                    <span className="text-center">{cell}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Mensaje superpuesto */}
            <div className="absolute bottom-[90px] left-[50%] transform -translate-x-1/2 flex flex-row items-center">
                <p className="text-white">¡Reservá tu lugar ahora!</p>
                <p className="text-black bg-white ml-4 h-[48px] w-[164px] rounded-[8px] flex justify-center items-center">3518 09-7160</p>
            </div>
        </div>
    );
}
