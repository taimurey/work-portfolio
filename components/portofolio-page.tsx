"use client"
import { ArrowRightIcon, DownloadIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaGithub, FaTelegram } from "react-icons/fa";
import _ from 'lodash';
import { COLOR_MAP, Contribution } from "@/app/api/types";
import { BsDiscord } from "react-icons/bs";
import { GithubGraph } from "./ui/github";

// Add global styles for scrollbar
const globalStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  html {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

function Portfolio() {
    const [contributions, setContributions] = useState<Contribution[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Apply global styles to remove scrollbar
        const styleElement = document.createElement('style');
        styleElement.innerHTML = globalStyles;
        document.head.appendChild(styleElement);

        const fetchContributions = async () => {
            try {
                const response = await fetch('/api/contributions');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Contribution[] = await response.json();

                console.log(data);

                // Reverse the array to show the most recent contributions first
                const reversedData = data.reverse();

                // Use the reversed array
                setContributions(reversedData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching contributions:', err);
                setError('Failed to fetch contributions');
                setLoading(false);
            }
        };

        fetchContributions();

        // Cleanup function
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    const renderContributionGrid = () => {
        if (loading) {
            return <div className="text-gray-400">Loading contributions...</div>;
        }

        if (error) {
            return <div className="text-red-500">{error}</div>;
        }

        // Group contributions by week
        const weeks = _.chunk(contributions, 7);

        return (
            <div className="w-full max-w-4xl">
                <div className="rounded-lg p-6">
                    <div className="flex flex-col gap-1">
                        {/* Contribution grid */}
                        <div className="flex gap-1 justify-center">
                            {weeks.map((week: Contribution[], weekIndex: number) => (
                                <div key={weekIndex} className="flex flex-col gap-1">
                                    {week.map((day: Contribution, dayIndex: number) => (
                                        <div
                                            key={`${weekIndex}-${dayIndex}`}
                                            className="w-3 h-3 rounded-sm transition-colors duration-200 hover:ring-2 hover:ring-white/20"
                                            style={{ backgroundColor: day.color }}
                                            title={`${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="flex items-center gap-2 mt-4 text-sm text-gray-400 justify-center">
                            <span>Less</span>
                            {Object.values(COLOR_MAP).map((color: string, index: number) => (
                                <div
                                    key={index}
                                    className="w-3 h-3 rounded-sm"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                            <span>More</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-black text-white overflow-x-hidden">
            <div className="flex flex-col">
                {/* Hero Section */}
                <section className="flex-col flex items-center justify-center py-16 px-8 sm:px-20 w-full h-screen">
                    <main className="flex flex-col gap-8 items-center sm:items-center max-w-4xl w-full">
                        <div className="flex flex-col">
                            <div className="flex gap-4 justify-center items-center mb-8">
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
                                <p className="text-gray-400 text-center">I build high performance distributed systems</p>
                            </div>
                        </div>

                        <div className="w-full max-w-xl mt-8 space-y-3">
                            <div className="flex justify-between items-center text-gray-300 transition-colors">
                                <div className="flex items-center">
                                    <span>Full-stack Developer</span>
                                    <a href="https://bundler.space" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold ml-2">
                                        bundler.space
                                    </a>
                                </div>
                                <span className="text-gray-500 ml-4">July 2022 — Dec 2024</span>
                            </div>

                            <div className="flex justify-between items-center text-gray-300 transition-colors">
                                <div className="flex items-center">
                                    <span>Rust Engineer</span>
                                    <a className="text-white hover:underline font-bold ml-2 cursor-pointer">
                                        Monumental AS
                                    </a>
                                </div>
                                <span className="text-gray-500 ml-4">Aug 2024 — Jan 2025</span>
                            </div>

                            <div className="flex justify-between items-center text-gray-300 transition-colors">
                                <div className="flex items-center">
                                    <span>Lead Software Engineer</span>
                                    <a href="https://puff.space" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold ml-2">
                                        Soda Exchange
                                    </a>
                                </div>
                                <span className="text-gray-500 ml-4">Jan 2025 — Present</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-300 transition-colors">
                                <div className="flex items-center">
                                    <span>Rust Engineer</span>
                                    <a href="https://orbitflare.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold ml-2">
                                        OrbitFlare
                                    </a>
                                </div>
                                <span className="text-gray-500 ml-4">April 2025 — Present</span>
                            </div>
                        </div>
                    </main>

                    {/* Github Graph and Social Links */}
                    <div className="mt-16 flex gap-6 flex-col flex-wrap items-center justify-center text-gray-400 text-sm">
                        <div className="flex justify-center items-center">
                            <GithubGraph username="taimurey" blockMargin={2} />
                        </div>
                        <div className="flex gap-6 items-center justify-center">
                            <a href="https://github.com/taimurey" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold">
                                <FaGithub className="text-white w-6 h-6" />
                            </a>
                            <a href="https://discordapp.com/users/324804129916583936" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold">
                                <BsDiscord className="text-white w-6 h-6" />
                            </a>
                            <a href="https://t.me/taimuri" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold">
                                <FaTelegram className="text-white w-6 h-6" />
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
                        </div>
                    </div>
                </section>

                {/* Projects Section with Bento Grid */}
                {/* <section className="w-full bg-black py-16 border-t border-white/5">
                    <div className="max-w-4xl mx-auto px-8">
                        <h2 className="text-xl font-semibold mb-8 text-left">Projects</h2>
                        <div className="grid grid-cols-6 auto-rows-[120px] gap-4">
                            <div className="relative col-span-4 row-span-2 group rounded-xl bg-gradient-to-br from-white/[.02] to-white/[.06] p-6 hover:from-white/[.04] hover:to-white/[.08] transition-all duration-300 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-lg">Soda Exchange</h3>
                                        <p className="text-gray-400 text-sm mt-1">Crypto Trading Platform</p>
                                        <p className="text-gray-300 mt-3 text-sm">A high-performance trading platform built with Rust and WebAssembly featuring real-time order matching and low-latency data processing.</p>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-wrap gap-2">
                                            <span className="text-xs bg-white/[.08] px-2 py-1 rounded-full">Rust</span>
                                            <span className="text-xs bg-white/[.08] px-2 py-1 rounded-full">WebAssembly</span>
                                        </div>
                                        <a href="https://github.com/taimurey/soda-exchange" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white text-gray-300 flex items-center">
                                            <ArrowRightIcon className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="relative col-span-2 row-span-1 group rounded-xl bg-gradient-to-br from-white/[.02] to-white/[.06] p-4 hover:from-white/[.04] hover:to-white/[.08] transition-all duration-300 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-md">CLI Solana Tools</h3>
                                        <p className="text-gray-400 text-xs mt-1">High-Performance CLI Tools for Solana</p>
                                    </div>
                                    <div className="flex justify-between items-end mt-2">
                                        <span className="text-xs bg-white/[.08] px-2 py-1 rounded-full">Rust</span>
                                        <a href="https://github.com/taimurey/solana-cli-sniper" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white text-gray-300 flex items-center">
                                            <ArrowRightIcon className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="relative col-span-2 row-span-1 group rounded-xl bg-gradient-to-br from-white/[.02] to-white/[.06] p-4 hover:from-white/[.04] hover:to-white/[.08] transition-all duration-300 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-md">Proxy Router</h3>
                                        <p className="text-gray-400 text-xs mt-1"></p>
                                    </div>
                                    <div className="flex justify-between items-end mt-2">
                                        <span className="text-xs bg-white/[.08] px-2 py-1 rounded-full">PyTorch</span>
                                        <a href="https://github.com/taimurey/neural-chain" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white text-gray-300 flex items-center">
                                            <ArrowRightIcon className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </section> */}

                {/* Footer */}
                <footer className="py-8 flex justify-center items-center border-t border-white/5 mt-auto">
                    <a
                        href="https://calendly.com/taimoorshafique541"
                        target="_blank" rel="noopener noreferrer"
                        className="hover:text-white transition-colors flex items-center gap-2 text-gray-300"
                    >
                        Get in touch <ArrowRightIcon size={16} />
                    </a>
                </footer>
            </div>
        </div>
    );
}

export default Portfolio;