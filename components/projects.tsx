"use client"
import { useState } from 'react'
import { VinylPlayer } from './common/vinyl'
import { SiGithub } from 'react-icons/si'
import { FiExternalLink } from 'react-icons/fi'

interface Project {
    id: number
    name: string
    artist: string
    year: string
    coverColor: string
    techStack: string[]
    genre: string
    description: string
    github?: string
    live?: string
}

const Projects = () => {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null)

    const projects: Project[] = [
        {
            id: 1,
            name: "ClubSync",
            artist: "Full Stack",
            year: "2024",
            coverColor: "#a855f7",
            techStack: ["Next.js", "Firebase"],
            genre: "Web App",
            description: "Role-based club management system with 3 dashboards for tracking member progress.",
            github: "https://github.com/pranjal-kumar-0/tracking",
            live: "https://clubsync-vit.vercel.app/"
        },
        {
            id: 2,
            name: "Hireability",
            artist: "AI Engineering",
            year: "2024",
            coverColor: "#3b82f6",
            techStack: ["Next.js", "Express", "Postgres"],
            genre: "SaaS",
            description: "Voice-based AI interviewer for practice sessions with facial analysis.",
            github: "https://github.com/0xteamMuffin/Hireability",
            live: "https://hireability.rkr.cx/"
        },
        {
            id: 3,
            name: "FacePay",
            artist: "Frontend",
            year: "2023",
            coverColor: "#ec4899",
            techStack: ["Next.js", "Supabase", "Face-API"],
            genre: "Creative",
            description: "Face recognition payment system integrated with UPI.",
            github: "https://github.com/pranjal-kumar-0/facepay",
            live: "https://face-scan-pay.vercel.app/"
        },
        {
            id: 4,
            name: "LearnAbility",
            artist: "Mobile Dev",
            year: "2024",
            coverColor: "#10b981",
            techStack: ["Flutter", "AI/ML"],
            genre: "Mobile",
            description: "AI co-pilot transforming course materials into interactive lessons.",
            github: "https://github.com/0xteamMuffin/Hireability-frontend"
        },
        {
            id: 5,
            name: "Vectr",
            artist: "Frontend",
            year: "2024",
            coverColor: "#f59e0b",
            techStack: ["Next.js", "Three.js"],
            genre: "Internship",
            description: "Frontend-heavy 3D interactive project during first internship.",
            live: "https://vectr.co.in/"
        }
    ]

    return (
        <section className="min-h-screen w-full bg-neutral-950 relative py-20 overflow-x-hidden">

            {/* Sticky Header */}
            <div className="sticky top-0 z-50 w-full py-6 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5 mb-16 flex justify-center items-center">
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase select-none">
                    Discography
                </h2>
            </div>

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">

                {/* The Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
                    {projects.map((project) => {
                        const isDimmed = hoveredProject !== null && hoveredProject !== project.id;

                        return (
                            <div
                                key={project.id}
                                className={`
                                    group relative w-full aspect-square cursor-pointer transition-all duration-500 ease-out
                                    ${isDimmed ? 'opacity-20 blur-sm scale-95 grayscale' : 'opacity-100 scale-100 grayscale-0'}
                                `}
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                {/* 1. The Vinyl (Behind) */}
                                <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center z-0 pointer-events-none">
                                    <div
                                        className="relative transition-transform duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) group-hover:translate-x-[60%] group-hover:rotate-[120deg]"
                                    >
                                        {/* THE GLOW EFFECT */}
                                        <div
                                            className="absolute inset-0 rounded-full transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                                            style={{
                                                boxShadow: `0 0 60px 10px ${project.coverColor}`
                                            }}
                                        ></div>

                                        {/* Vinyl Shadow */}
                                        <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.8)]"></div>

                                        <VinylPlayer
                                            centerColor={project.coverColor}
                                            isPlaying={hoveredProject === project.id}
                                            size={220}
                                        />
                                    </div>
                                </div>

                                {/* 2. The Sleeve (Front) */}
                                <div className="relative z-10 w-full h-full bg-[#0a0a0a] rounded-xl border border-neutral-800 p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">

                                    {/* Top: Labels */}
                                    <div className="flex justify-between items-start">
                                        <div
                                            className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-white bg-neutral-900"
                                            style={{ color: project.coverColor }}
                                        >
                                            <span className="text-sm font-bold font-mono">0{project.id}</span>
                                        </div>
                                        <div className="flex gap-4 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                                            {project.github && (
                                                <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                                    <SiGithub className="text-neutral-400 hover:text-white text-xl transition-colors" />
                                                </a>
                                            )}
                                            {project.live && (
                                                <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                                    <FiExternalLink className="text-neutral-400 hover:text-white text-xl transition-colors" />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Middle: Info */}
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-3xl font-bold text-white leading-none mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-neutral-500 transition-colors">
                                                {project.name}
                                            </h3>
                                            <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                                                {project.genre}
                                            </p>
                                        </div>
                                        <p className="text-neutral-400 text-sm leading-relaxed border-l-2 border-neutral-800 pl-4 py-1">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-neutral-800/50">
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="text-[10px] uppercase font-bold text-neutral-500 bg-neutral-900/50 px-3 py-1.5 rounded-full border border-neutral-800"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Projects