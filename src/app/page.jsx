
import Actividades from "@/components/Actividades";
import Historia from "@/components/Historia";
import PrimerComponente from "@/components/PrimerComponente"
export default function Home() {
  return (
    <div className=" min-h-screen absolute ">

      <main className="relative">
       <PrimerComponente/>
       <Historia/>
       <Actividades/>
      </main>
      
    </div>
  );
}
