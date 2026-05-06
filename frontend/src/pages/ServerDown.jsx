

import { useState, useEffect } from "react"
import { RefreshCw, Server, Wifi, WifiOff, Clock } from "lucide-react"

const ServerDown = () => {
  const [isRetrying, setIsRetrying] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleRetry = () => {
    setIsRetrying(true)
    setTimeout(() => {
      setIsRetrying(false)
      window.location.reload()
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center p-8 bg-white/10 border border-white/20 rounded-3xl shadow-2xl backdrop-blur-xl max-w-md w-full mx-4">
        {/* Connection Status */}
        <div className="mb-6">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
              isOnline
                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                : "bg-red-500/20 text-red-300 border border-red-500/30"
            }`}
          >
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isOnline ? "Connected" : "Offline"}
          </div>
        </div>

        {/* Server Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl border border-red-500/30">
            <Server className="w-8 h-8 text-red-400" />
          </div>
        </div>

        {/* Main Content */}
        <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text ">
          Server Unavailable
        </h2>
        <p className="text-lg text-slate-200 mb-2 leading-relaxed">Oops! It seems our backend is not responding.</p>
        <p className="text-sm text-slate-400 mb-6">Please check your internet or try again later.</p>

        {/* Countdown */}
        <div className="mb-6 p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-sm font-medium">Auto-retry in</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, "0")}
          </div>
        </div>

        {/* Retry Button */}
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none"
        >
          <RefreshCw className={`w-5 h-5 ${isRetrying ? "animate-spin" : ""}`} />
          {isRetrying ? "Retrying..." : "Try Again"}
        </button>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-slate-500 text-xs">Error occurred at {new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  )
}

export default ServerDown
