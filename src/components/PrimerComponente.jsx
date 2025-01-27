export default function PrimerComponente() {
  return (
    <div
      className="w-full min-h-screen sm:h-[500px] lg:h-[100vh] bg-right bg-cover lg:bg-center flex items-center relative pt-[5rem] justify-center"
      style={{
        backgroundImage:
          "url('/bgComponentePrincipal.svg'), linear-gradient(180deg, rgba(21, 21, 21, 0) 0%, #151515 100%)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="w-[100%] sm:w-[100%] h-full flex justify-around items-end flex-wrap sm:flex-nowrap pb-[20px]">
        <div className="w-[90%] sm:w-[50%] text-white p-4 lg:h-[40%] h-[45%] flex flex-col justify-around">
          <div className="text-[30px] w-[95%] sm:w-[90%] md:text-[64px]">
            <h1>Ser parte del mejor club, ahora a un click</h1>
          </div>
          <div className="text-[20px] w-[92%] sm:w-[85%] md:text-[24px]">
            <h2>
              Tenemos todo lo que necesitas: deportes, recreación y comunidad.
              Elegí la mejor propuesta y súmate a Central.
            </h2>
          </div>
        </div>

        <div className="h-[481px] w-[90%] sm:w-[417px] bg-white/70 backdrop-blur-lg justify-evenly rounded-[16px] p-6 flex flex-col">
          <h3 className="text-[24px] font-bold text-gray-800 mb-4">
            ¡Hacete socio ahora!
          </h3>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="nombre"
                className="text-gray-700 text-sm font-medium"
              >
                Nombre completo*
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Ingresa tu nombre completo"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-base"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="dni"
                className="text-gray-700 text-sm font-medium"
              >
                DNI*
              </label>
              <input
                id="dni"
                type="text"
                placeholder="Ingresa tu DNI"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-base"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-gray-700 text-sm font-medium"
              >
                Email*
              </label>
              <input
                id="email"
                type="email"
                placeholder="Ingresa tu email"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-base"
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded-md mt-4"
            >
              Hacerme socio
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
