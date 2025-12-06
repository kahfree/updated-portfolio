import Image from "next/image";
import Hero from "./hero";
import Card from "./card";
import myJson from "./projects.json"
import { projectCompilationEventsSubscribe } from "next/dist/build/swc/generated-native";
import { title } from "process";

export default function Home() {
  return (
    <div className="flex items-center justify-center font-sans bg-emerald-950 ">
      <main className="flex min-h-screen w-full flex-col items-center justify-between sm:items-start">
        <Hero/>
        <div className="">
          <img src="/transition-background.svg" ></img>
        </div>
        {/* style={{"backgroundColor": "#ebe2cf" }} */}
        <div style={{"backgroundColor": "#ebe2cf" }} className="w-full h-full justify-items-center justify-center text-center pb-6">
          <div className="sm:w-[85%] lg:w-[60%]">
            <div className="text-5xl text-black font-semibold pt-6 transition delay-150 duration-300 ease-in">My Work</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 px-5 text-base font-medium justify-items-center pt-15 text-left">
              {myJson.projects.map(project => <Card title={project.title} description={project.description} link={project.link} tags={project.tags}/>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
