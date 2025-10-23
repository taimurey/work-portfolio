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
                <section className="flex-col flex items-center justify-center py-8 px-8 sm:px-20 w-full min-h-screen">
                    <main className="flex flex-col gap-6 items-center sm:items-center max-w-4xl w-full">
                        <div className="flex flex-col">
                            <div className="flex gap-4 justify-center items-center mb-4">
                                <div className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                                    PST {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                </div>
                            </div>
                            <h1 className="text-3xl font-semibold text-center text-white">Taimoor Shafique</h1>

                            <div className="space-y-2 mt-4 flex items-center flex-col justify-between">
                                <h2 className="text-lg text-zinc-200">
                                    Software Engineer - Rust
                                </h2>
                                <p className="text-zinc-400 text-sm">B.S. in Artificial Intelligence</p>
                                <p className="text-zinc-300 text-center text-sm">Building high performance distributed systems</p>
                            </div>
                        </div>

                        <div className="w-full max-w-2xl mt-6 space-y-0">
                            <div className="flex justify-between items-start py-2 border-b border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
                                <div className="flex flex-col gap-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-zinc-200 text-sm">Lead Software Engineer</span>
                                        <span className="text-zinc-600">·</span>
                                        <a href="https://sodae.io" target="_blank" rel="noopener noreferrer" className="text-white hover:underline transition-all text-sm">
                                            Soda Exchange
                                        </a>
                                        <span className="px-1.5 py-0.5 rounded text-xs bg-zinc-800 text-zinc-400 border border-zinc-700">Personal Project</span>
                                        <span className="px-1.5 py-0.5 rounded text-xs bg-amber-950/50 text-amber-400 border border-amber-800">WIP</span>
                                    </div>
                                    <span className="text-zinc-400 text-xs">Jan 2025 — Present</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-start py-2 border-b border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
                                <div className="flex flex-col gap-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-zinc-200 text-sm">Rust Engineer</span>
                                        <span className="text-zinc-600">·</span>
                                        <a href="https://orbitflare.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline transition-all text-sm">
                                            OrbitFlare
                                        </a>
                                    </div>
                                    <span className="text-zinc-400 text-xs">April 2025 — Present</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-start py-2 border-b border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
                                <div className="flex flex-col gap-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-zinc-200 text-sm">Smart Contract Engineer</span>
                                        <span className="text-zinc-600">·</span>
                                        <span className="text-white text-sm">Monumental AS</span>
                                    </div>
                                    <span className="text-zinc-400 text-xs">Aug 2024 — Jan 2025</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-start py-2 border-b border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
                                <div className="flex flex-col gap-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-zinc-200 text-sm">Full-stack Developer</span>
                                        <span className="text-zinc-600">·</span>
                                        <a href="https://puff.space" target="_blank" rel="noopener noreferrer" className="text-white hover:underline transition-all text-sm">
                                            Solana Toolkit
                                        </a>
                                    </div>
                                    <span className="text-zinc-400 text-xs">July 2022 — Dec 2024</span>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Github Graph and Social Links */}
                    <div className="mt-8 flex gap-4 flex-col flex-wrap items-center justify-center">
                        <div className="flex justify-center items-center scale-90">
                            <GithubGraph blockMargin={2} />
                        </div>
                        <div className="flex gap-4 items-center justify-center">
                            <a href="https://github.com/taimurey" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors">
                                <FaGithub className="w-5 h-5" />
                            </a>
                            <a href="https://discordapp.com/users/324804129916583936" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors">
                                <BsDiscord className="w-5 h-5" />
                            </a>
                            <a href="https://t.me/taimuri" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors">
                                <FaTelegram className="w-5 h-5" />
                            </a>
                            <a
                                href="/taimoor-shafique-cv.pdf"
                                download
                                className="px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 transition-colors text-xs text-zinc-200 flex items-center gap-1.5">
                                Download CV<DownloadIcon className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </section>
                <footer className="py-8 flex justify-center items-center border-t border-zinc-800/50 mt-auto">
                    <a
                        href="https://calendly.com/taimoorshafique541"
                        target="_blank" rel="noopener noreferrer"
                        className="hover:text-white transition-colors flex items-center gap-2 text-zinc-400 text-sm"
                    >
                        Get in touch <ArrowRightIcon size={14} />
                    </a>
                </footer>
            </div>
        </div>
    );
}

export default Portfolio;