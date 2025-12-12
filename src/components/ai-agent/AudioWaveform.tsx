import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface AudioWaveformProps {
  audioUrl: string
  isUser?: boolean
}

// Global variable to track currently playing audio
let currentlyPlayingAudio: HTMLAudioElement | null = null

export const AudioWaveform = ({
  audioUrl,
  isUser = false,
}: AudioWaveformProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      if (currentlyPlayingAudio === audio) {
        currentlyPlayingAudio = null
      }
    }
    const handlePause = () => {
      setIsPlaying(false)
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('pause', handlePause)
    }
  }, [])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      // Stop any currently playing audio
      if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
        currentlyPlayingAudio.pause()
        currentlyPlayingAudio.currentTime = 0
      }

      audio.play()
      currentlyPlayingAudio = audio
      setIsPlaying(true)
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Generate 40 bars with fixed pattern heights (like in screenshot)
  const barHeights = [
    31, 35, 40, 45, 35, 30, 31, 35, 40, 45, 35, 30, 31, 35, 40, 45, 35, 30, 31,
    35, 40, 45, 35, 30, 31, 35, 40, 45, 35, 30,
  ]
  const bars = barHeights.map((height, i) => ({
    id: i,
    height: height,
  }))

  // Calculate progress percentage
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="flex flex-row items-center gap-2 sm:gap-3 w-full">
      {/* Play/Pause button */}
      <div className="flex justify-center flex-shrink-0">
        <button
          onClick={togglePlayPause}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
            isUser
              ? 'bg-white text-[#003863] hover:bg-gray-100'
              : 'bg-[#003863] text-white hover:bg-[#002d4d]'
          }`}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" />
          ) : (
            <Play className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" />
          )}
        </button>
      </div>

      {/* Waveform visualization */}
      <div className="flex items-center justify-start gap-[6px] sm:gap-[8px] md:gap-[10px] h-16 sm:h-20 flex-1 overflow-hidden">
        {bars.map((bar, index) => {
          const barProgress = (index / bars.length) * 100
          const isFilled = barProgress <= progress

          return (
            <div
              key={bar.id}
              className={`w-[2px] sm:w-1 rounded-full flex-shrink-0 ${
                isUser
                  ? isFilled
                    ? 'bg-white'
                    : 'bg-white/30'
                  : isFilled
                    ? 'bg-[#003863]'
                    : 'bg-[#003863]/30'
              }`}
              style={{
                height: `${bar.height * 0.8}px`,
              }}
            />
          )
        })}
      </div>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioUrl} />
    </div>
  )
}
