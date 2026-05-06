

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import apiService from "../services/api"
import {
  ArrowLeft,
  FileText,
  MessageSquare,
  Sparkles,
  Zap,
 
  CheckCircle,

} from "lucide-react"

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",

  })

  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState("")

  const { token } = useAuth()
  const navigate = useNavigate()
  const { addToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.description.trim()) {
      addToast("Please fill in all fields", "error")
      return
    }
    setLoading(true)
    try {
      const response = await apiService.createTicket(formData, token)
      console.log("Ticket created:", response)
      addToast("Ticket created successfully!", "success")
      navigate(`/ticket/${response.ticket._id}`)
    } catch (error) {
      console.error("Error creating ticket:", error)
      addToast("Network error. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }




  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text ">
              Create New Ticket
            </h1>
            <p className="text-slate-300 text-xl max-w-2xl mx-auto leading-relaxed">
              Describe your issue and our AI will find the perfect moderator to help you solve it quickly
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Title Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-3">
                      <MessageSquare className="w-4 h-4" />
                      Ticket Title *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("title")}
                        onBlur={() => setFocusedField("")}
                        placeholder="Brief, clear description of your issue..."
                        className={`w-full px-4 py-4 bg-white/5 border-2 rounded-xl text-white placeholder-slate-400 transition-all duration-300 ${
                          focusedField === "title"
                            ? "border-blue-400 bg-white/10 shadow-lg shadow-blue-500/20"
                            : "border-white/20 hover:border-white/30"
                        }`}
                        disabled={loading}
                      />
                      {focusedField === "title" && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 blur-xl"></div>
                      )}
                    </div>
                  </div>



                  {/* Priority Selection */}


                  {/* Description Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-3">
                      <FileText className="w-4 h-4" />
                      Detailed Description *
                    </label>
                    <div className="relative">
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("description")}
                        onBlur={() => setFocusedField("")}
                        placeholder="Please provide detailed information about your issue:&#10;• Steps to reproduce&#10;• Expected behavior&#10;• Actual behavior&#10;• Error messages (if any)&#10;• Environment details"
                        rows={8}
                        className={`w-full px-4 py-4 bg-white/5 border-2 rounded-xl text-white placeholder-slate-400 transition-all duration-300 resize-none ${
                          focusedField === "description"
                            ? "border-blue-400 bg-white/10 shadow-lg shadow-blue-500/20"
                            : "border-white/20 hover:border-white/30"
                        }`}
                        disabled={loading}
                      />
                      {focusedField === "description" && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 blur-xl"></div>
                      )}
                    </div>
                  </div>

                
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => navigate("/dashboard")}
                      className="flex-1 px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all duration-300 hover:border-white/30 font-medium cursor-pointer"
                      disabled={loading}
                    >
                      <ArrowLeft className="w-4 h-4 inline mr-2" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !formData.title.trim() || !formData.description.trim() }
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl disabled:shadow-none"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Creating Ticket...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Create Ticket
                        </div>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* How it Works */}
              <div className="bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-blue-400" />
                  </div>
                  <h3 className="text-blue-400 font-semibold text-lg">How it works</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-400 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        <strong className="text-white">AI Analysis:</strong> Our system analyzes your ticket content and
                        determines the best category and priority.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-400 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        <strong className="text-white">Smart Matching:</strong> We match you with moderators who have
                        expertise in your specific technology stack.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-400 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        <strong className="text-white">Real-time Updates:</strong> Get notifications and track progress
                        as your issue gets resolved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-purple-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                  </div>
                  <h3 className="text-purple-400 font-semibold text-lg">Tips for better help</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-sm">Be specific about your environment and setup</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-sm">Include error messages and stack traces</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-sm">Add relevant code snippets or screenshots</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-sm">Use descriptive tags for better matching</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
           
            </div>
          </div>
        </div>
      </div>

      <style >{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.6s ease-out 0.2s both;
        }

        .animate-slide-up {
          animation: fade-in 0.8s ease-out 0.1s both;
        }
      `}</style>
    </div>
  )
}

export default CreateTicket
