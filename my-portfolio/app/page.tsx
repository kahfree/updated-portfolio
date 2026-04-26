import Image from "next/image";
import Hero from "./hero";
import Card from "./card";
import myJson from "./projects.json"

export default function Home() {
  return (
    <div className="flex items-center justify-center font-sans animated-bg">
      <main className="flex min-h-screen w-full flex-col items-center justify-between sm:items-start">
        <Hero/>
        <div className="">
          <Image src="/transition-background.svg" alt="" width={2560} height={1024} className="w-full h-auto" />
        </div>
        <div style={{"backgroundColor": "#ebe2cf"}} className="w-full h-full text-center pb-6">
          <div className="sm:w-[85%] lg:w-[60%] mx-auto">
            <div className="text-5xl text-black font-semibold pt-6 transition delay-150 duration-300 ease-in gradient-heading">My Work</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 px-5 text-base font-medium justify-items-center pt-15 text-left">
              {myJson.projects.map((project, index) => (
                <Card key={project.title} index={index} title={project.title} description={project.description} link={project.link} tags={project.tags}/>
              ))}
            </div>
            <div className="mt-10 mb-4">
              <a href="https://github.com/kahfree" target="_blank" rel="noopener noreferrer" className="btn-shimmer inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 border-stone-800 text-stone-800 text-sm font-semibold hover:bg-stone-800 hover:text-white transition duration-200">
                More on GitHub →
              </a>
            </div>
          </div>
        </div>
        <div className="w-full animated-bg text-center py-20 px-6">
          <div className="text-3xl font-semibold text-zinc-50 mb-4">Get in touch</div>
          <p className="text-zinc-300 mb-8 max-w-sm mx-auto leading-7">Open to opportunities and collaborations. Drop me a line.</p>
          <a href="mailto:ethancaff@gmail.com" className="inline-block px-6 py-3 rounded-full bg-zinc-50 text-emerald-950 font-semibold hover:bg-zinc-200 transition duration-200">ethancaff@gmail.com</a>
        </div>
      </main>
    </div>
  );
}
