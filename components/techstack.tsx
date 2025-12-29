"use client"
import React, { useEffect, useState, useRef } from 'react'
import { 
    SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, 
    SiExpress, SiMongodb, SiFlutter, SiFirebase 
} from 'react-icons/si' 

const TechSequencer = () => {
    const [playhead, setPlayhead] = useState(0)
    const [activeTech, setActiveTech] = useState<string | null>(null)
    const [isHovering, setIsHovering] = useState(false)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [isPaused, setIsPaused] = useState(false)
    const [bpm, setBpm] = useState(68)
    const [sequencerGlow, setSequencerGlow] = useState(0)
    const audioRefs = useRef<(HTMLAudioElement | null)[]>([])
    const lastPlayedRef = useRef<Set<number>>(new Set())
    const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const glowIntervalRef = useRef<NodeJS.Timeout | null>(null)

    const speed = (bpm / 68) * 0.3

    useEffect(() => {
        let animationFrameId: number

        const animate = () => {
            if (!isPaused) {
                setPlayhead(prev => {
                    const nextValue = prev >= 100 ? 0 : prev + speed
                    return nextValue
                })
            }
            animationFrameId = requestAnimationFrame(animate)
        }

        animationFrameId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrameId)
    }, [isPaused, speed])

    const techItems = [
        { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', pos: 10, audioIndex: 0 },
        { name: 'React Native', icon: SiReact, color: '#61DAFB', pos: 22, audioIndex: 1 },
        { name: 'Tailwind', icon: SiTailwindcss, color: '#38B2AC', pos: 34, audioIndex: 2 },
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933', pos: 46, audioIndex: 3 },
        { name: 'Express', icon: SiExpress, color: '#ffffff', pos: 58, audioIndex: 4 },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248', pos: 70, audioIndex: 5 },
        { name: 'Flutter', icon: SiFlutter, color: '#02569B', pos: 82, audioIndex: 6 },
        { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', pos: 94, audioIndex: 7 },
    ]

    const playSound = (index: number) => {
        if (!isHovering) return
        
        const audio = audioRefs.current[index]
        if (audio) {
            audio.currentTime = 0
            audio.play().catch(err => console.log('Audio play failed:', err))
        }
    }

    const handleTechClick = (tech: typeof techItems[0]) => {
        setIsPaused(true)
        playSound(tech.audioIndex)
        setActiveTech(tech.name)
        
        if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current)
        }
        
        pauseTimeoutRef.current = setTimeout(() => {
            setIsPaused(false)
            setActiveTech(null)
        }, 4000)
    }

    const handleSequencerMouseEnter = () => {
        setIsHovering(true)
        
        if (glowIntervalRef.current) {
            clearInterval(glowIntervalRef.current)
        }

        const startGlow = sequencerGlow
        const targetGlow = 1
        const duration = 1500
        const steps = 30
        const stepDuration = duration / steps
        const glowIncrement = (targetGlow - startGlow) / steps

        let currentStep = 0
        glowIntervalRef.current = setInterval(() => {
            if (currentStep < steps) {
                setSequencerGlow(Math.min(1, startGlow + (glowIncrement * currentStep)))
                currentStep++
            } else {
                if (glowIntervalRef.current) {
                    clearInterval(glowIntervalRef.current)
                }
            }
        }, stepDuration)
    }

    const handleSequencerMouseLeave = () => {
        setIsHovering(false)
        
        if (glowIntervalRef.current) {
            clearInterval(glowIntervalRef.current)
        }

        const startGlow = sequencerGlow
        const targetGlow = 0
        const duration = 1500
        const steps = 30
        const stepDuration = duration / steps
        const glowDecrement = startGlow / steps

        let currentStep = 0
        glowIntervalRef.current = setInterval(() => {
            if (currentStep < steps) {
                setSequencerGlow(Math.max(0, startGlow - (glowDecrement * currentStep)))
                currentStep++
            } else {
                if (glowIntervalRef.current) {
                    clearInterval(glowIntervalRef.current)
                }
            }
        }, stepDuration)
    }

    useEffect(() => {
        techItems.forEach((tech) => {
            const isHit = playhead >= tech.pos - 5 && playhead <= tech.pos + 2
            
            if (isHit && !lastPlayedRef.current.has(tech.audioIndex)) {
                lastPlayedRef.current.add(tech.audioIndex)
                playSound(tech.audioIndex)
                setActiveTech(tech.name)
                
                setTimeout(() => {
                    lastPlayedRef.current.delete(tech.audioIndex)
                    if (Math.abs(playhead - tech.pos) > 10) {
                        setActiveTech(null)
                    }
                }, 500)
            }
        })
    }, [playhead, isHovering])

    useEffect(() => {
        return () => {
            if (pauseTimeoutRef.current) {
                clearTimeout(pauseTimeoutRef.current)
            }
            if (glowIntervalRef.current) {
                clearInterval(glowIntervalRef.current)
            }
        }
    }, [])

    return (
        <section className="w-full bg-neutral-950 py-12 select-none flex flex-col items-center justify-center">
            
            {techItems.map((tech) => (
                <audio 
                    key={tech.audioIndex}
                    ref={(el) => { audioRefs.current[tech.audioIndex] = el }}
                    src={`/music/${tech.audioIndex + 1}.mp3`}
                    preload="auto"
                />
            ))}

            <div 
                className="w-full max-w-5xl px-4 relative"
                onMouseEnter={handleSequencerMouseEnter}
                onMouseLeave={handleSequencerMouseLeave}
            >
                <div className="mb-8 flex justify-between items-end border-b border-neutral-800 pb-2">
                    <div className="flex flex-col">
                        <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest mb-1">Active Input</span>
                        <div className="h-8">
                            <span 
                                className="text-2xl font-bold font-mono transition-colors duration-100"
                                style={{ 
                                    color: activeTech ? techItems.find(t => t.name === activeTech)?.color : '#333',
                                    textShadow: activeTech ? `0 0 15px ${techItems.find(t => t.name === activeTech)?.color}80` : 'none'
                                }}
                            >
                                {activeTech || "WAITING..."}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className="text-neutral-500 font-mono text-xs uppercase">BPM</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min="30"
                                    max="150"
                                    value={bpm}
                                    onChange={(e) => setBpm(Number(e.target.value))}
                                    className="w-24 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer
                                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500
                                    [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all
                                    [&::-webkit-slider-thumb]:hover:bg-purple-400 [&::-webkit-slider-thumb]:hover:scale-110
                                    [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full 
                                    [&::-moz-range-thumb]:bg-purple-500 [&::-moz-range-thumb]:border-0
                                    [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:hover:bg-purple-400"
                                />
                                <span className="text-neutral-400 font-mono text-sm w-10 text-right">{bpm}</span>
                            </div>
                        </div>
                        
                        <div className="text-neutral-600 font-mono text-xs flex items-center gap-4">
                            <span className="text-neutral-700">
                                {isHovering ? '🔊' : '🔇'}
                            </span>
                            {isPaused && (
                                <span className="text-yellow-500">⏸</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div 
                        className="absolute -inset-4 bg-purple-600/40 blur-3xl rounded-xl transition-all duration-300 pointer-events-none"
                        style={{ 
                            opacity: sequencerGlow * 0.3,
                            transform: `scale(${1 + (sequencerGlow * 0.05)})`
                        }}
                    ></div>

                    <div className="relative h-28 md:h-32 bg-neutral-900 rounded-xl border border-neutral-800 shadow-2xl flex items-center overflow-hidden transition-all duration-300"
                         style={{
                             borderColor: `rgba(168, 85, 247, ${sequencerGlow * 0.3})`
                         }}
                    >
                        
                        <div className="absolute inset-0 opacity-20 pointer-events-none" 
                             style={{ 
                                 backgroundImage: 'linear-gradient(#262626 1px, transparent 1px), linear-gradient(90deg, #262626 1px, transparent 1px)', 
                                 backgroundSize: '40px 40px' 
                             }}>
                        </div>

                        <div 
                            className="absolute top-0 bottom-0 w-0.5 bg-purple-700 z-30 shadow-[0_0_20px_rgba(126,34,206,0.8)]"
                            style={{ left: `${playhead}%` }}
                        ></div>

                        <div className="flex justify-around w-full px-2 md:px-8 relative z-20">
                            {techItems.map((tech, index) => {
                                const isHit = playhead >= tech.pos - 5 && playhead <= tech.pos + 2
                                const isHovered = hoveredIndex === index

                                return (
                                    <div 
                                        key={tech.name} 
                                        className="flex flex-col items-center gap-3"
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        onClick={() => handleTechClick(tech)}
                                    >
                                        <div 
                                            className={`
                                                w-10 h-10 md:w-14 md:h-14 rounded-lg flex items-center justify-center 
                                                transition-all duration-150 border cursor-pointer
                                                ${isHit ? 'bg-neutral-800 -translate-y-1 border-white/50' : 'bg-neutral-900/50 border-neutral-800'}
                                                ${isHovered ? 'bg-neutral-800/80' : ''}
                                            `}
                                            style={{
                                                boxShadow: isHit ? `0 0 30px ${tech.color}50` : isHovered ? `0 0 15px ${tech.color}30` : 'none',
                                                borderColor: isHit ? tech.color : isHovered ? `${tech.color}50` : '#262626'
                                            }}
                                        >
                                            <tech.icon 
                                                className="text-xl md:text-3xl transition-all duration-75"
                                                style={{ 
                                                    color: isHit ? tech.color : isHovered ? `${tech.color}80` : '#404040',
                                                    filter: isHit ? `drop-shadow(0 0 10px ${tech.color})` : 'none',
                                                    transform: isHit ? 'scale(1.2)' : isHovered ? 'scale(1.1)' : 'scale(1)'
                                                }}
                                            />
                                        </div>
                                        
                                        <div 
                                            className="w-1.5 h-1.5 rounded-full transition-colors duration-200"
                                            style={{ backgroundColor: isHit ? tech.color : isHovered ? `${tech.color}60` : '#262626' }}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mt-4 px-2">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center"><div className="w-full h-[1px] bg-neutral-900 rotate-45"></div></div>
                        <div className="w-3 h-3 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center"><div className="w-full h-[1px] bg-neutral-900 rotate-45"></div></div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center"><div className="w-full h-[1px] bg-neutral-900 rotate-45"></div></div>
                        <div className="w-3 h-3 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center"><div className="w-full h-[1px] bg-neutral-900 rotate-45"></div></div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default TechSequencer