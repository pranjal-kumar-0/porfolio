"use client"
import { useState, useRef } from 'react'
import { SiGithub, SiLinkedin, SiInstagram } from 'react-icons/si'
import { FiMail, FiCheck } from 'react-icons/fi'
import { FaPlay, FaPause } from 'react-icons/fa'

const Contact = () => {
    const [copied, setCopied] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    const handleCopy = () => {
        navigator.clipboard.writeText('kpranjal219@gmail.com')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
                setIsPlaying(false)
            } else {
                audioRef.current.play()
                setIsPlaying(true)
            }
        }
    }

    const socialLinks = [
        { 
            name: 'GitHub', 
            icon: SiGithub, 
            url: 'https://github.com/pranjal-kumar-0',
            label: 'WORK'
        },
        { 
            name: 'LinkedIn', 
            icon: SiLinkedin, 
            url: 'https://www.linkedin.com/in/pranjal-kumar-780942308/',
            label: 'CONNECT'
        },
        { 
            name: 'Instagram', 
            icon: SiInstagram, 
            url: 'https://instagram.com/pranjal.kumar_',
            label: 'SOCIAL'
        }
    ]

    return (
        <section className="min-h-[80vh] w-full bg-neutral-950 flex flex-col items-center justify-center relative py-20 border-t border-neutral-900">
            
            <audio ref={audioRef} src="/music/end.mp3" loop />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[40px_40px] opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10 flex flex-col items-center">
                
                <div className="text-center mb-12 space-y-2">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
                        Contacts
                    </h2>
                    <p className="text-neutral-500 font-mono text-sm tracking-widest uppercase">
                        Open for work
                    </p>
                </div>

                <div 
                    className="relative w-full max-w-lg aspect-[1.6/1] bg-[#1a1a1a] rounded-3xl border-4 border-[#2a2a2a] shadow-2xl p-4 md:p-6 flex flex-col items-center justify-between group select-none transition-transform"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-[#0a0a0a] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] flex items-center justify-center"><div className="w-full h-0.5 bg-[#333] rotate-45"></div></div>
                    <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#0a0a0a] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] flex items-center justify-center"><div className="w-full h-0.5 bg-[#333] rotate-45"></div></div>
                    <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-[#0a0a0a] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] flex items-center justify-center"><div className="w-full h-0.5 bg-[#333] rotate-45"></div></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-[#0a0a0a] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] flex items-center justify-center"><div className="w-full h-0.5 bg-[#333] rotate-45"></div></div>

                    <div 
                        className="w-full h-[65%] bg-[#eee] rounded-xl relative overflow-hidden flex flex-col items-center justify-center cursor-pointer shadow-inner"
                        onClick={handleCopy}
                        title="Click to copy email"
                    >
                        <div className="absolute inset-0 bg-yellow-50 opacity-50"></div>
                        <div className="absolute top-2 w-full h-4 bg-orange-500/20"></div>
                        <div className="absolute bottom-2 w-full h-4 bg-blue-500/20"></div>

                        <div className="relative w-[70%] h-16 bg-[#222] rounded-full border-2 border-[#999] flex items-center justify-center gap-8 md:gap-12 px-4 shadow-[inset_0_0_10px_black] my-2">
                            <div className={`w-10 h-10 rounded-full border-4 border-white border-dashed bg-transparent ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
                                <div className="w-full h-full rounded-full bg-white/10"></div>
                            </div>
                            <div className="flex-1 h-8 bg-[#111] relative overflow-hidden">
                                <div className="absolute top-1/2 left-0 w-full h-px bg-brown-600"></div>
                            </div>
                            <div className={`w-10 h-10 rounded-full border-4 border-white border-dashed bg-transparent ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s', animationDirection: 'reverse' }}>
                                <div className="w-full h-full rounded-full bg-white/10"></div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-2 font-mono text-neutral-800 text-sm md:text-base font-bold tracking-tight flex items-center gap-2 group-active:scale-95 transition-transform">
                            {copied ? (
                                <span className="text-green-600 flex items-center gap-2">
                                    <FiCheck /> COPIED TO CLIPBOARD
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <FiMail className="text-neutral-500" /> kpranjal219@gmail.com
                                </span>
                            )}
                        </div>
                        
                        <div className="absolute bottom-2 right-4 text-[8px] font-mono text-neutral-400 rotate-180">
                            SIDE A: 60 MIN
                        </div>
                    </div>

                    <div className="w-[60%] h-[15%] bg-[#151515] mt-auto rounded-b-lg border-x-2 border-b-2 border-[#252525] relative flex items-center justify-center">
                        <div className="absolute left-4 w-2 h-2 rounded-full bg-red-900"></div>
                        
                        <button
                            onClick={togglePlay}
                            className="relative w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-10"
                            style={{
                                backgroundColor: isPlaying ? '#fbbf24' : '#404040',
                                boxShadow: isPlaying ? '0 0 15px rgba(251, 191, 36, 0.6), inset 0 0 8px rgba(251, 191, 36, 0.3)' : '0 2px 4px rgba(0,0,0,0.3)'
                            }}
                        >
                            {isPlaying ? (
                                <FaPause className="text-neutral-900 text-xs md:text-sm" />
                            ) : (
                                <FaPlay className="text-neutral-200 text-xs md:text-sm ml-0.5" />
                            )}
                        </button>
                        
                        <div className="absolute right-4 w-2 h-2 rounded-full bg-red-900"></div>
                    </div>
                </div>

                <div className="mt-12 flex items-center gap-4 md:gap-8">
                    {socialLinks.map((link, idx) => (
                        <a 
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex flex-col items-center gap-3 group/btn"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-neutral-800 rounded-lg shadow-[0_4px_0_rgb(30,30,30)] active:shadow-none active:translate-y-1 border border-neutral-700 flex items-center justify-center transition-all group-hover/btn:bg-neutral-700 group-hover/btn:border-purple-500/50">
                                <link.icon className="text-2xl md:text-3xl text-neutral-400 group-hover/btn:text-purple-400 transition-colors" />
                            </div>
                            <span className="text-[10px] font-mono font-bold text-neutral-600 uppercase tracking-widest group-hover/btn:text-purple-500">
                                {link.label}
                            </span>
                        </a>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-neutral-600 text-xs font-mono">
                        PRODUCED & MASTERED BY PRANJAL KUMAR © 2025
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Contact