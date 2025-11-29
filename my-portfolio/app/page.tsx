import Image from "next/image";
import Hero from "./hero";
import Card from "./card";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-teal-950 ">
      <main className="flex min-h-screen w-full flex-col items-center justify-between pb-32 sm:items-start">
        <Hero/>
        <div className="">
          <img src="/transition-background.svg" ></img>
        </div>
        
        <div style={{"backgroundColor": "#ebe2cf" }} className="w-full h-full justify-items-center justify-center text-center">
          <div className="w-[60%]">
            <div className="text-7xl text-black font-semibold">My Work</div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-5 text-base font-medium justify-items-center pt-15 text-left">
              <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
