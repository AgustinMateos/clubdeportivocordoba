
import Actividades from "@/components/Actividades";
import Historia from "@/components/Historia";
import PrimerComponente from "@/components/PrimerComponente"
import Pesca from "@/components/Pesca"
import Colonia from "@/components/Colonia"
import Tarifas from "@/components/Tarifas";
import HaceteSocio from "@/components/HaceteSocio";
import Beneficios from "@/components/Beneficios";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className=" min-h-screen absolute ">

      <main className="relative">
       <PrimerComponente/>
      {/* <Historia/>
        <Actividades/>
       <Pesca/>
       <Colonia/> */}
       {/* <Tarifas/> */}
       {/* <HaceteSocio/>
       <Beneficios/> 
       <Footer/> */}
      </main>
      
    </div>
  );
}
