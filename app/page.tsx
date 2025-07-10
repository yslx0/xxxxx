"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Plus, MoreHorizontal, Play, Heart, Share2, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoveCounterWithSpotify() {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [isDayTime, setIsDayTime] = useState(true)
  const [showQR, setShowQR] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  // Start date
  const startDate = new Date("2025-06-06T00:00:00")

  // Generate floating hearts particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = []
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 5,
        })
      }
      setParticles(newParticles)
    }
    generateParticles()
  }, [])

  // Check if it's day or night
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours()
      setIsDayTime(hour >= 6 && hour < 18)
    }
    checkTime()
    const interval = setInterval(checkTime, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [])

  // Update time counter
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeElapsed({ years, days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [startDate])

  const playlistSongs = [
    {
      title: "Not Allowed",
      artist: "TV Girl",
      album: "Who Really Cares",
      duration: "2:47",
      addedBy: "pусский",
      dateAdded: "Jun 6, 2025",
    },
    {
      title: "Nope your too late i already died",
      artist: "wifiskeleton, i wanna be a jack-o-lantern",
      album: "suburban daredevil",
      duration: "1:30",
      addedBy: "pусский",
      dateAdded: "Jun 6, 2025",
    },
    {
      title: "Dark Red",
      artist: "Steve Lacy",
      album: "Dark Red",
      duration: "2:53",
      addedBy: "pусский",
      dateAdded: "Jun 6, 2025",
    },
    {
      title: "Lovers Rock",
      artist: "TV Girl",
      album: "French Exit",
      duration: "3:33",
      addedBy: "pусский",
      dateAdded: "Jun 6, 2025",
    },
    {
      title: "The Blonde",
      artist: "TV Girl",
      album: "French Exit",
      duration: "3:47",
      addedBy: "pусский",
      dateAdded: "Jun 6, 2025",
    },
    {
      title: "Mrs Magic",
      artist: "Strawberry Guy",
      album: "Mrs Magic",
      duration: "3:28",
      addedBy: "nina🖤",
      dateAdded: "Jun 6, 2025",
    },
    {
      title: "Always Forever",
      artist: "Cults",
      album: "Static",
      duration: "3:44",
      addedBy: "nina🖤",
      dateAdded: "Jun 6, 2025",
    },
    {
      title: "Heart To Heart",
      artist: "Mac DeMarco",
      album: "Here Comes The Cowboy",
      duration: "3:31",
      addedBy: "nina🖤",
      dateAdded: "Jun 6, 2025",
    },
  ]

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${
        isDayTime
          ? "bg-gradient-to-br from-pink-200 via-orange-100 to-yellow-200 animate-gradient-day"
          : "bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 animate-gradient-night"
      }`}
    >
      {/* Animated Background Gradient */}
      <div
        className={`absolute inset-0 opacity-50 ${
          isDayTime
            ? "bg-gradient-to-r from-pink-300 via-orange-200 to-yellow-300"
            : "bg-gradient-to-r from-purple-800 via-pink-800 to-indigo-800"
        } animate-gradient-x`}
      ></div>

      {/* Floating Hearts Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          <Heart className={`w-4 h-4 ${isDayTime ? "text-pink-400" : "text-pink-300"} fill-current opacity-60`} />
        </div>
      ))}

      {/* Sparkle Effects */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-sparkle"></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-300 rounded-full animate-sparkle-delayed"></div>
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-orange-300 rounded-full animate-sparkle"></div>
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-purple-300 rounded-full animate-sparkle-delayed"></div>

      {/* Day/Night Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-sm ${
            isDayTime ? "bg-white/20 text-orange-800" : "bg-black/20 text-yellow-300"
          }`}
        >
          {isDayTime ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className="text-sm font-medium">{isDayTime ? "Dia" : "Noite"}</span>
        </div>
      </div>

      {/* Share Button */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          onClick={() => setShowQR(!showQR)}
          className={`backdrop-blur-sm ${
            isDayTime ? "bg-white/20 hover:bg-white/30 text-pink-800" : "bg-black/20 hover:bg-black/30 text-pink-300"
          }`}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Compartilhar
        </Button>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Compartilhe nosso amor! 💕</h3>
            <div className="bg-white p-4 rounded-lg shadow-inner mb-4">
              <Image
                src={qrCodeUrl || "/placeholder.svg"}
                alt="QR Code para compartilhar"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
            <p className="text-gray-600 text-sm mb-4">Escaneie o QR Code para ver nosso contador de amor!</p>
            <Button onClick={() => setShowQR(false)} className="bg-pink-500 hover:bg-pink-600 text-white">
              Fechar
            </Button>
          </div>
        </div>
      )}

      {/* Background decorative elements */}
      <div
        className={`absolute top-20 left-8 text-2xl animate-bounce ${
          isDayTime ? "text-orange-400" : "text-yellow-400"
        }`}
      >
        💛
      </div>
      <div
        className={`absolute top-32 right-12 text-xl animate-pulse ${isDayTime ? "text-pink-400" : "text-yellow-400"}`}
      >
        💛
      </div>
      <div
        className={`absolute bottom-40 left-6 text-lg animate-bounce ${
          isDayTime ? "text-orange-400" : "text-yellow-400"
        }`}
      >
        💛
      </div>
      <div
        className={`absolute bottom-60 right-8 text-xl animate-pulse ${
          isDayTime ? "text-pink-400" : "text-yellow-400"
        }`}
      >
        💛
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-20">
        {/* Photo Frame */}
        <div className="relative">
          <div
            className={`w-64 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 ${
              isDayTime ? "border-pink-300/50" : "border-orange-400/30"
            } sparkle-border`}
          >
            <Image
              src="/images/couple-photo.jpg"
              alt="Couple photo"
              width={256}
              height={320}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Photo corner indicators */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>

        {/* Love Counter */}
        <div className="mt-8 text-center mb-8">
          <h2 className={`text-2xl font-bold mb-4 ${isDayTime ? "text-pink-600" : "text-orange-300"} animate-glow`}>
            Eu te amo há:
          </h2>

          <div className={`text-lg font-medium mb-6 ${isDayTime ? "text-pink-700" : "text-orange-200"} animate-pulse`}>
            {timeElapsed.years} anos, {timeElapsed.days} dias, {timeElapsed.hours} horas, {timeElapsed.minutes} minutos
            e {timeElapsed.seconds} segundos
          </div>

          <p className={`text-sm leading-relaxed max-w-xs mx-auto ${isDayTime ? "text-gray-700" : "text-gray-300"}`}>
            Te ter na minha vida é como encontrar paz no meio do caos. Seu olhar me acalma, seu toque me ancora, e o seu
            sorriso transforma os dias comuns em momentos inesquecíveis.
          </p>
        </div>
      </div>

      {/* Spotify Playlist Section */}
      <div className="relative z-10 w-full max-w-sm mx-auto px-6">
        <div
          className={`backdrop-blur-sm border rounded-lg p-4 ${
            isDayTime ? "bg-white/30 border-pink-200/50" : "bg-red-900/40 border-red-400/30"
          }`}
        >
          {/* Playlist Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden shadow-lg sparkle-border">
              <Image
                src="/images/playlist-cover.jpg"
                alt="Playlist cover - cute kittens"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className={`text-xs uppercase tracking-wide ${isDayTime ? "text-gray-600" : "text-gray-400"}`}>
                Public Playlist
              </div>
              <h3 className={`text-xl font-bold ${isDayTime ? "text-gray-800" : "text-white"}`}>Eu e ela ❤️</h3>
              <div className={`text-xs ${isDayTime ? "text-gray-600" : "text-gray-400"}`}>
                pусский and nina🖤 • 22 songs, 1hr 4 min
              </div>
            </div>
          </div>

          {/* Music Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Button className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full animate-pulse">
              <Play className="w-5 h-5 text-black fill-current" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`${isDayTime ? "text-gray-700 hover:bg-white/20" : "text-white/70 hover:bg-white/10"}`}
            >
              <Plus className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`${isDayTime ? "text-gray-700 hover:bg-white/20" : "text-white/70 hover:bg-white/10"}`}
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/* Featured Songs */}
          <div className="space-y-2 mb-4">
            {playlistSongs.slice(0, 4).map((song, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded transition-colors ${
                  isDayTime ? "hover:bg-white/20" : "hover:bg-white/5"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className={`text-sm truncate ${isDayTime ? "text-gray-800" : "text-white"}`}>{song.title}</div>
                  <div className={`text-xs truncate ${isDayTime ? "text-gray-600" : "text-gray-400"}`}>
                    {song.artist}
                  </div>
                </div>
                <div className={`text-xs ml-2 ${isDayTime ? "text-gray-600" : "text-gray-400"}`}>{song.duration}</div>
              </div>
            ))}
          </div>

          {/* Spotify Link */}
          <div className={`pt-4 border-t ${isDayTime ? "border-pink-200/50" : "border-white/10"}`}>
            <a
              href="https://open.spotify.com/playlist/5Oj01ekqd545pZEQ0LEbMb?si=868e167d43fa494c"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full transition-colors text-sm animate-glow"
            >
              🎵 Abrir no Spotify
            </a>
          </div>
        </div>
      </div>

      {/* Bottom decorative hearts */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <Heart className={`w-6 h-6 fill-current animate-bounce ${isDayTime ? "text-pink-400" : "text-red-400"}`} />
      </div>
    </div>
  )
}
