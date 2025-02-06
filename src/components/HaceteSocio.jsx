'use client'
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
export default function HaceteSocio() {
  const containerRef = useRef(null);
    const [isTitleVisible, setIsTitleVisible] = useState(false);
  
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
  return (
    <div ref={containerRef} className="h-[738px] md:h-[538px] bg-[#141414] flex flex-col sm:flex-row justify-evenly items-center overflow-x-hidden">
      <div className="text-[#FFFFFF] w-[80%] sm:w-[430px] h-[456px] md:h-[256px] flex flex-col justify-evenly">
        <h6 className="font-montserrat">¡Hacete socio ahora!</h6>
        <h4 className={`pb-[20px] pt-[20px] w-[90%] text-[43px] font-extrabold leading-[47px] tracking-[0.13px] transition-all duration-700 ease-in-out ${isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"}`}>
  Ser parte del mejor club, ahora a un click
</h4>

        <p className="font-montserrat w-[90%]">Para vos que queres todo, tenes todo pata estar. Elegí la propuesta de valor más conveniente para vos y sumate.</p>
      </div>
      <div className="w-[80%] sm:w-[50%]">
        <Image
          src={"/seParte.svg"}
          alt="se parte"
          height={325}
          width={779}
          className="max-w-full"
        />
      </div>
    </div>
  );
}
