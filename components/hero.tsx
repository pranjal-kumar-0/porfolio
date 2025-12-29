"use client"
import { VinylPlayer } from './common/vinyl'
import { useState, useRef, useEffect } from 'react'

const Hero = () => {
    const [isSpinning, setIsSpinning] = useState(false)
    const [glowOpacity, setGlowOpacity] = useState(0)
    const [musicNotes, setMusicNotes] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number; note: string }>>([])
    const audioRef = useRef<HTMLAudioElement>(null)
    const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const noteIntervalRef = useRef<NodeJS.Timeout | null>(null)

    const musicNoteSymbols = ['♪', '♫', '♬', '♩', '♭', '♮', '♯']

    const handleMouseEnter = () => {
        if (audioRef.current) {
            if (fadeIntervalRef.current) {
                clearInterval(fadeIntervalRef.current)
            }

            if (audioRef.current.paused) {
                audioRef.current.play()
            }

            // Fade in from current volume to 1 over 2.5 seconds
            const startVolume = audioRef.current.volume
            const startGlow = glowOpacity
            const targetVolume = 1
            const targetGlow = 1
            const duration = 2500 
            const steps = 50
            const stepDuration = duration / steps
            const volumeIncrement = (targetVolume - startVolume) / steps
            const glowIncrement = (targetGlow - startGlow) / steps

            setIsSpinning(true)

            let currentStep = 0
            fadeIntervalRef.current = setInterval(() => {
                if (audioRef.current && currentStep < steps) {
                    audioRef.current.volume = Math.min(1, startVolume + (volumeIncrement * currentStep))
                    setGlowOpacity(Math.min(1, startGlow + (glowIncrement * currentStep)))
                    currentStep++
                } else {
                    if (fadeIntervalRef.current) {
                        clearInterval(fadeIntervalRef.current)
                    }
                }
            }, stepDuration)

            noteIntervalRef.current = setInterval(() => {
                const newNote = {
                    id: Date.now() + Math.random(),
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    delay: Math.random() * 0.5,
                    duration: 3 + Math.random() * 2,
                    note: musicNoteSymbols[Math.floor(Math.random() * musicNoteSymbols.length)]
                }
                setMusicNotes(prev => [...prev, newNote])

                setTimeout(() => {
                    setMusicNotes(prev => prev.filter(note => note.id !== newNote.id))
                }, (newNote.duration + newNote.delay) * 1000)
            }, 800)
        }
    }

    const handleMouseLeave = () => {
        if (audioRef.current) {
            // Clear any existing fade interval
            if (fadeIntervalRef.current) {
                clearInterval(fadeIntervalRef.current)
            }

            if (noteIntervalRef.current) {
                clearInterval(noteIntervalRef.current)
            }

            const startVolume = audioRef.current.volume
            const startGlow = glowOpacity
            const duration = 2500 
            const steps = 50
            const stepDuration = duration / steps
            const volumeDecrement = startVolume / steps
            const glowDecrement = startGlow / steps

            let currentStep = 0
            fadeIntervalRef.current = setInterval(() => {
                if (audioRef.current && currentStep < steps) {
                    audioRef.current.volume = Math.max(0, startVolume - (volumeDecrement * currentStep))
                    setGlowOpacity(Math.max(0, startGlow - (glowDecrement * currentStep)))
                    currentStep++
                } else {
                    if (audioRef.current) {
                        audioRef.current.pause()
                    }
                    setIsSpinning(false)
                    if (fadeIntervalRef.current) {
                        clearInterval(fadeIntervalRef.current)
                    }
                }
            }, stepDuration)
        }
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (fadeIntervalRef.current) {
                clearInterval(fadeIntervalRef.current)
            }
            if (noteIntervalRef.current) {
                clearInterval(noteIntervalRef.current)
            }
        }
    }, [])

    return (
        <section className="min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center relative overflow-hidden">
            
            <audio ref={audioRef} src="/music/hero-m.mp3" loop />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-purple-900/20 blur-[100px] rounded-full pointer-events-none"></div>

            {musicNotes.map(note => (
                <div
                    key={note.id}
                    className="absolute text-purple-500/20 text-4xl pointer-events-none select-none"
                    style={{
                        left: `${note.x}%`,
                        top: `${note.y}%`,
                        animation: `float-up ${note.duration}s ease-out ${note.delay}s forwards`,
                        opacity: 0
                    }}
                >
                    {note.note}
                </div>
            ))}

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center gap-12">
                
                <div 
                    className="relative group cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div 
                        className="absolute inset-0 bg-purple-600/40 blur-3xl rounded-full transition-all duration-300"
                        style={{ 
                            opacity: glowOpacity * 0.4,
                            transform: `scale(${0.9 + (glowOpacity * 0.2)})`
                        }}
                    ></div>
                    
                    <div 
                        className="relative drop-shadow-2xl transition-all duration-500"
                        style={{
                            filter: `grayscale(${100 - (glowOpacity * 100)}%)`
                        }}
                    >
                         <VinylPlayer 
                            centerColor="#171717" 
                            isPlaying={isSpinning} 
                            size={320} 
                        />
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter select-none">
                        PRANJAL KUMAR
                    </h1>
                    
                    <div className="flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-purple-500/50"></span>
                        <p className="text-lg md:text-xl text-neutral-400 font-light tracking-widest uppercase">
                            Full Stack Developer
                        </p>
                        <span className="h-px w-8 bg-purple-500/50"></span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float-up {
                    0% {
                        opacity: 0;
                        transform: translateY(0) rotate(0deg);
                    }
                    20% {
                        opacity: 0.3;
                    }
                    80% {
                        opacity: 0.3;
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-100px) rotate(15deg);
                    }
                }
            `}</style>
        </section>
    )
}

export default Hero