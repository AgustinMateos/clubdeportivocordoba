'use client';
import Image from "next/image";

export default function Footer() {
  return (
    <div
      className="h-[1826px] sm:h-[1200px] relative text-white flex flex-col items-center justify-center lg:justify-start bg-cover bg-bottom"
      style={{
        backgroundImage: `linear-gradient(to top, #181818 0%, #181818 30%, rgba(24, 24, 24, 0.75) 50%, rgba(24, 24, 24, 0) 70%), url('/footerIMG.jpg')`,
      }}
    >
      <div className="absolute top-[-60px]">
        <div className="w-[362px] h-[190px] sm:w-[1094px] bg-[#DF3737] rounded-[16px]  sm:h-[190px] flex flex-col justify-center items-center ">
          <div className="w-[314px] text-center sm:w-[727px] flex items-center flex-col justify-center">
            <p>¡Hacete socio ahora y disfrutá de todos los beneficios!</p>
            <p className="bg-[#1C1D1D] rounded-[5px] w-[207px] h-[58px] flex items-center justify-center mt-[20px]">
              Hacerme socio
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[780px] sm:bottom-[480px]">
        <div className=" w-[325px]  sm:w-[1094px]  h-[190px] flex flex-col justify-center items-center ">
            <div className="w-[325px] sm:w-[727px] flex items-center flex-col justify-center"><Image src={"/logo.svg"} width={177} height={163} alt="logo"/></div>
        </div>
      </div>
      <div className="absolute bottom-[80px]">
        <div className="w-[325px] sm:w-[1282px] flex flex-col sm:flex-row justify-around items-start">
          {/* Dirección con iframe */}
          <div className="w-[368px] h-auto  ">
            <h5 className="mb-2 text-lg font-semibold">Dirección</h5>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.667151261035!2d-64.1594247!3d-31.395740099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432981aa628acc9%3A0x52fd7332226dc92d!2sAv.%20las%20Malvinas%201%2C%20X5000%20C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1737993455128!5m2!1ses-419!2sar"
              width="368px"
              height="127px"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
            <p className="mt-2 text-sm">
              Dirección: <span>Av. Las Malvinas 1 5000, Córdoba</span>
            </p>
          </div>

          {/* Placeholder divs */}
          <div className="w-[285px] h-[212px] flex flex-col justify-around">
            <div>
                <h4>Info de Contacto</h4>
            </div>
            <div className="h-[92px]">
                <p>Tel. Secretaría: 3518690765</p>
                <p>Tel. Colonia Vacacional: 3518 097160</p>
                <p>Correo: secretariaclubdcc@yahoo.com</p>
            </div>
            <div className="flex justify-between"><p>Políticas de Privacidad</p> <p>Aviso Legal</p></div>
          </div>
          <div className="w-[321px] h-[212px] ">
            <div className="flex flex-col justify-between ">
                <h4 className="pb-[10px]">Envianos tu consulta</h4>
                <div className="flex flex-col justify-evenly h-[168px]">
                    <input width={321} className="h-[48px] rounded-[5px] pl-[14px]" type="text" placeholder="Email" />
                    <input width={321} className="h-[48px] rounded-[5px] pl-[14px]"  type="text" placeholder="Contraseña" /> 
                    <button className="bg-[#DF3737] w-[117px] h-[40px] rounded-[4px]">Enviar</button>
                </div>
               
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
