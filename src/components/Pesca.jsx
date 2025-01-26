import Image from "next/image";

export default function Pesca() {
  const images = [
    { src: "/pesca3.svg", title: "Camping" },
    { src: "/pesca4.svg", title: "Torneos y Competencias" },
    { src: "/pesca5.svg", title: "Guardería de Lanchas" },
    { src: "/pesca6.svg", title: "Comunidad" },
  ];

  return (
    <div className="min-h-[100vh] sm:h-[900px] bg-[#1A1A1A] relative w-full">
      <div className="absolute top-[-100px] w-[100%] flex">
        <div className="flex flex-col sm:flex-row w-full justify-evenly items-center">
          <Image width={842} height={335} className="w-[328px] h-[156px] sm:w-[842px] sm:h-[335px]" alt="pesca" src={"/pesca1.svg"} />
          <Image width={406} height={335} className="w-[325px] h-[406px] sm:w-[325px] sm:h-[335px] " alt="pesca" src={"/pesca2.svg"} />
        </div>
      </div>

      <div className="absolute top-[400px]">
        <div className="text-white w-[100%] flex flex-col items-center justify-center">
          <h4 className="w-[50%] text-center text-[48px]">Pesca</h4>
          <p className="w-[60%] text-center text-[20px] pt-[20px]">
            Sumate a nuestra comunidad de pescadores y disfrutá de salidas al aire libre en un entorno natural. Instalaciones especialmente preparadas para camping, botes y pesca recreativa.
          </p>
        </div>

        <div className="flex flex-col h-[250px] justify-center pt-[80px]">
          <div className="flex flex-row justify-evenly pt-[20px]">
            {images.map((image, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image
                  width={210}
                  height={210}
                  alt={`pesca ${index + 3}`}
                  src={image.src}
                />
                <p className="text-white text-center pt-2">{image.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

