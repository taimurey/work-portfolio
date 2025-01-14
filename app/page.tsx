import { ArrowRightIcon, DownloadIcon, GithubIcon } from "lucide-react";
import Image from "next/image";
import { BsGithub } from "react-icons/bs";
import { FaDownload, FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex-col flex items-center justify-center bg-black text-white min-h-screen p-8 pb-20 gap-16 sm:p-20 w-full">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <div className="flex flex-col">
          <div className="flex gap-4 justify-center items-center">
            <button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
              <span>
                <span className="spark mask-gradient absolute inset-0 h-full w-full animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
              </span>
              <span className="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
              <span className="h-full w-full blur-md absolute bottom-0 inset-x-0 bg-gradient-to-tr from-primary/20"></span>
              <span className="z-10 py-0.5 text-sm text-neutral-100 flex items-center justify-center gap-1">
                PST {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
              </span>
            </button>
          </div>
          <h1 className="text-4xl font-semibold text-center">Taimoor Shafique</h1>

          <div className="space-y-3 mt-4 flex items-center flex-col justify-between">
            <h3 className="text-2xl font-semibold">
              <code className="bg-white/[.06] px-2 py-1 rounded font-medium">
                Software Engineer - Rust
              </code>
            </h3>
            <p className="text-gray-400">B.S. in Artificial Intelligence</p>
            <p className="text-gray-400 text-center">Specialized in building high performance applications</p>
          </div>
        </div>

        <div className="w-full max-w-xl mt-8 space-y-3">
          <div className="flex justify-between items-center text-gray-300 hover:text-white transition-colors">
            <div className="flex items-center">
              <span>Founding Engineer and designer</span>
              <a href="https://bundler.space" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold ml-2">
                bundler.space
              </a>
            </div>
            <span className="text-gray-500 ml-4">July 2022 — Dec 2024</span>
          </div>

          <div className="flex justify-between items-center text-gray-300 hover:text-white transition-colors">
            <div className="flex items-center">
              <span>Blockchain developer at</span>
              <a href="https://aurix.app" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold ml-2">
                Monumental AS
              </a>
            </div>
            <span className="text-gray-500 ml-4">Aug 2024 — Jan 2025</span>
          </div>

          <div className="flex justify-between items-center text-gray-300 hover:text-white transition-colors">
            <div className="flex items-center">
              <span>Founding Engineer and designer</span>
              <a href="https://aurix.app" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold ml-2">
                aurix.app
              </a>
            </div>
            <span className="text-gray-500 ml-4">Nov 2024 — Now</span>
          </div>
        </div>
      </main>

      <footer className="row-start-4 flex gap-6 flex-wrap items-center justify-center text-gray-400 text-sm">
        <a href="https://github.com/taimurey" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold">
          <FaGithub className="text-white w-6 h-6" />
        </a>
        <a
          href="/taimoor-shafique-cv.pdf"
          download
          className="group relative grid overflow-hidden rounded-lg px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
          <span>
            <span className="spark mask-gradient absolute inset-0 h-full w-full animate-flip overflow-hidden rounded-lg [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
          </span>
          <span className="backdrop absolute inset-[1px] rounded-lg bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
          <span className="h-full w-full blur-md absolute bottom-0 inset-x-0 bg-gradient-to-tr from-primary/20"></span>
          <span className="z-10 py-0.5 text-sm text-neutral-100 flex items-center justify-center gap-1">
            Download CV<DownloadIcon className="w-3" />
          </span>
        </a>
        <a
          href="contact@tamur.dev"
          className="hover:text-white transition-colors flex items-center gap-2"
        >
          Get in touch <ArrowRightIcon size={16} />
        </a>
      </footer>
    </div>
  );
}