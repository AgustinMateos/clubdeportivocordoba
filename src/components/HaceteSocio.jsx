import Image from "next/image";

export default function HaceteSocio() {
  return (
    <div className="h-[538px] bg-[#141414] flex flex-col sm:flex-row justify-evenly items-center overflow-x-hidden">
      <div className="text-[#FFFFFF] w-[80%] sm:w-[424px] h-[256px] flex flex-col justify-evenly">
        <h6>¡Hacete socio ahora!</h6>
        <h4 className="text-[43px] font-extrabold leading-[47px] tracking-[0.13px]">Ser parte del mejor club, ahora a un click</h4>
        <p>Para vos que queres todo, tenes todo pata estar. Elegí la propuesta de valor más conveniente para vos y sumate.</p>
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
