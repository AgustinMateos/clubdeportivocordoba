
import Actividades from "@/components/Actividades";
import Historia from "@/components/Historia";
import PrimerComponente from "@/components/PrimerComponente"
import Pesca from "@/components/Pesca"
import Colonia from "@/components/Colonia"
export default function Home() {
  return (
    <div className=" min-h-screen absolute ">

      <main className="relative">
       <PrimerComponente/>
       <Historia/>
       <Actividades/>
       <Pesca/>
       <Colonia/>
      </main>
      
    </div>
  );
}
