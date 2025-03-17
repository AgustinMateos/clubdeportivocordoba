'use client';
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div
  className="h-[1500px] sm:h-[1200px] relative text-white flex flex-col items-center justify-center lg:justify-start bg-cover bg-bottom"
  style={{
    backgroundImage: `
      linear-gradient(to top, #181818 0%, #181818 30%, rgba(24, 24, 24, 0.75) 50%, rgba(24, 24, 24, 0) 70%),
      url('/footerIMG.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center calc(100% - 450px)", 
    backgroundRepeat: "no-repeat",
    backgroundColor: "#181818",
  }}
>
  <style jsx>{`
    @media (min-width: 640px) {
      div {
        background-position: center calc(100% - 10px) !important; 
      }
    }
    @media (min-width: 1536px) {
      div {
        background-position: center calc(100% - -400px) !important;
      }
    }
  `}</style>


  
     
      <div className="absolute inset-x-0 top-[-60px] flex justify-center">
        <div className=" w-[300px] sm:w-[700px] md:w-[994px] lg:w-[1094px] h-[190px] md:h-[150px] bg-[#DF3737] rounded-[16px] flex flex-col justify-center items-center">
          <div className="w-full max-w-[314px] sm:max-w-[727px] text-center flex flex-col items-center p-[20px]">
            <p className="text-[18px] leading-[28px] md:text-[26px] md:tracking-[0.2px] font-semibold ">¡Hacete socio ahora y disfrutá de todos los beneficios!</p>
            <Link href='#'  className="font-montserrat bg-[#1C1D1D] rounded-[5px] w-[207px] h-[58px] flex items-center justify-center mt-[20px] text-[16px] md:text-[16px]">
              Hacerme socio
            </Link>
          </div>
        </div>
      </div>

     
      <div className="absolute bottom-[1150px]  sm:bottom-[480px]">
        <div className="w-full max-w-[325px] sm:max-w-[1094px] flex flex-col justify-center items-center">
          <div className="w-full max-w-[177px] h-auto">
            <Image src="/logonew2.png" width={177} height={163} alt="logo" layout="responsive" />
          </div>
        </div>
      </div>

     
      <div className="absolute bottom-[80px] flex-col w-full flex justify-center h-[915px] sm:h-[292px] 2xl:h-[192px]">
        <div className="w-[80%] sm:w-full max-w-full flex flex-col sm:flex-row justify-around items-start">
          
          <div className="w-full max-w-[368px] md:h-[203px]">
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col  ">
                <h5 className="font-montserrat mb-2 text-lg font-semibold">Club:</h5>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.667151261035!2d-64.1594247!3d-31.395740099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432981aa628acc9%3A0x52fd7332226dc92d!2sAv.%20las%20Malvinas%201%2C%20X5000%20C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1737993455128!5m2!1ses-419!2sar"
              className="w-[95%] h-[127px] rounded-md border-0"
              loading="lazy"
            ></iframe>
            </div>
            
            </div>
            
            <p className="font-montserrat mt-2 text-sm">
           <span className="font-montserrat"> Dirección  Av. Las Malvinas 1 5000, Córdoba</span>
            </p>
           
          </div>

          
          <div className="w-full max-w-[285px] lg:max-w-[350px] h-[204px] flex flex-col justify-around">
            <div>
              <h4>Info de Contacto</h4>
            </div>
            <div className="h-[92px]">
              <p className="font-montserrat">Tel. Secretaría: 3518690765</p>
              <p className="font-montserrat">Tel. Colonia Vacacional: 3518 097160</p>
              <p className="font-montserrat">Correo: secretariaclubdcc@yahoo.com</p>
            </div>
            <div className=" font-montserrat max-w-[290px] flex justify-between">
              <p className="font-montserrat  ">Políticas de Privacidad</p> <p>Aviso Legal</p>
            </div>
          </div>
          <div className="w-full max-w-[368px] md:h-[203px]">
            <div className="flex flex-col md:flex-row">
              
            <div>
              <h5 className="font-montserrat mb-2 text-lg font-semibold">Colonia:</h5>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3406.8975956419176!2d-64.45819472439476!3d-31.361804974286954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDIxJzQyLjUiUyA2NMKwMjcnMjAuMiJX!5e0!3m2!1ses!2sar!4v1742221488652!5m2!1ses!2sar"
              className="w-[95%] h-[127px] rounded-md border-0"
              loading="lazy"
            ></iframe></div>
            </div>
            
            <p className="font-montserrat mt-2 text-sm">
             <span className="font-montserrat">Dirección: Ruta provincial e55 km 26.</span>
            </p>
            
          </div>
         
          {/* <div className="w-full max-w-[321px] h-[212px] ">
            <div className="flex flex-col justify-between">
              <h4 className="pb-[10px] font-montserrat ">Envianos tu consulta</h4>
              <div className="flex flex-col justify-evenly h-[168px]">
                <input
                  className="h-[48px] w-full rounded-[5px] pl-[14px] border border-gray-300"
                  type="text"
                  placeholder="Email"
                />
                <input
                  className="h-[48px] w-full rounded-[5px] pl-[14px] border border-gray-300"
                  type="text"
                  placeholder="Contraseña"
                />
                <button className="font-montserrat bg-[#DF3737] w-[117px] h-[40px] rounded-[4px]">
                  Enviar
                </button>
              </div>
             
            </div>
          </div> */}
        </div>

<div className="w-full h-[70px] flex justify-center items-center" ><p>Copyright 2024© Club de Córdoba. Todos los derechos reservados.</p></div>      </div>
    </div>
  );
}
