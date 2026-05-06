

import { useState, useEffect } from "react"
import apiService from "../services/api"
import { useAuth } from "../context/AuthContext"
import {
  Loader2,
  Plus,
 
  Code,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Star,
  TrendingUp,
  Zap,
  Award,
  Target,
  BookOpen,
  ArrowLeft
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const EditSkills = () => {
  const { token } = useAuth()
  const [skills, setSkills] = useState([])
  const [newSkill, setNewSkill] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const navigate = useNavigate()
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [focusedInput, setFocusedInput] = useState(false)

  // Fetch user info to pre-fill skills
  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    setFetchLoading(true)
    try {
      const response = await apiService.getuser(token)
      setSkills(response.skills || [])
    } catch (err) {
      console.error("Error fetching user:", err)
      setMessage("Error loading skills")
      setMessageType("error")
    } finally {
      setFetchLoading(false)
    }
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
      setMessage("")
    }
  }

  const handleRemoveSkill = (index) => {
    const updated = [...skills]
    updated.splice(index, 1)
    setSkills(updated)
    setMessage("")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    // Ensure the new skill is included before sending
    const updatedSkills = newSkill.trim() && !skills.includes(newSkill.trim()) ? [...skills, newSkill.trim()] : skills

    try {
      await apiService.updateuser({ skills: updatedSkills })
      setNewSkill("") // clear the input
      await fetchSkills() // refetch updated skills
      setMessage("Skills updated successfully!")
      setMessageType("success")
    } catch (err) {
      console.error(err)
      setMessage("Error updating skills")
      setMessageType("error")
    } finally {
      setLoading(false)
    }
  }

  const suggestedSkills = [
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "Go",
    "Rust",
    "PHP",
    "Vue.js",
    "Angular",
    "Next.js",
    "Express.js",
    "Django",
    "Flask",
    "Spring Boot",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "GCP",
    "GraphQL",
    "REST API",
    "Git",
    "Linux",
  ]

  const availableSuggestions = suggestedSkills.filter((skill) => !skills.includes(skill))

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Loading Your Skills</h3>
              <p className="text-slate-300">Please wait while we fetch your information...</p>
            </div>
          </div>
        </div>
      </div>
    )
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-lg">
              <Code className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              Manage Your Skills
            </h1>
            <p className="text-slate-300 text-xl max-w-2xl mx-auto leading-relaxed">
              Update your expertise to get matched with the right tickets and opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Add New Skill */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                      <Plus className="w-5 h-5" />
                      Add New Skill
                    </label>
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={handleKeyPress}
                          onFocus={() => setFocusedInput(true)}
                          onBlur={() => setFocusedInput(false)}
                          className={`w-full px-4 py-4 bg-white/5 border-2 rounded-xl text-white placeholder-slate-400 transition-all duration-300  ${
                            focusedInput
                              ? "border-blue-400 bg-white/10 shadow-lg shadow-blue-500/20"
                              : "border-white/20 hover:border-white/30"
                          }`}
                          placeholder="Enter a skill (e.g., React, Python, AWS...)"
                        />
                        {focusedInput && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 blur-xl"></div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        disabled={!newSkill.trim() || skills.includes(newSkill.trim())}
                        className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 cursor-pointer disabled:to-gray-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50 shadow-lg hover:shadow-xl disabled:shadow-none"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Suggested Skills */}
                  {availableSuggestions.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                        <Sparkles className="w-5 h-5" />
                        Suggested Skills
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {availableSuggestions.slice(0, 12).map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => {
                              setSkills([...skills, skill])
                              setMessage("")
                            }}
                            className="px-3 py-2 bg-white/5 hover:bg-blue-500/20 border border-white/20 hover:border-blue-400/50 rounded-lg text-slate-300 cursor-pointer hover:text-white text-sm transition-all duration-300 hover:scale-105"
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Current Skills */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                        <Award className="w-5 h-5" />
                        Your Skills ({skills.length})
                      </h3>
                   
                    </div>

                    {skills.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-white/20 rounded-xl">
                        <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-white mb-2">No skills added yet</h4>
                        <p className="text-slate-400">Add your first skill to get started with ticket matching</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {skills.map((skill, index) => (
                          <div
                            key={index}
                            className="group flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-xl hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Star className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-white font-medium">{skill}</span>
                            </div>
                     
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 flex flex-col sm:flex-row gap-4 ">
                       <button
                      type="button"
                      onClick={() => navigate("/dashboard")}
                      className="flex-1 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all duration-300 hover:border-white/30 font-medium cursor-pointer"
                      disabled={loading}
                    >
                      <ArrowLeft className="w-4 h-4 inline mr-2" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-500 cursor-pointer disabled:to-gray-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-50 shadow-lg hover:shadow-xl disabled:shadow-none"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Updating Skills...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Update Skills
                        </div>
                      )}
                    </button>


                  </div>

                  {/* Message */}
                  {message && (
                    <div
                      className={`p-4 rounded-xl border ${
                        messageType === "success"
                          ? "bg-green-500/10 border-green-400/30 text-green-300"
                          : "bg-red-500/10 border-red-400/30 text-red-300"
                      } animate-fade-in`}
                    >
                      <div className="flex items-center gap-2">
                        {messageType === "success" ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <AlertCircle className="w-5 h-5" />
                        )}
                        <span className="font-medium">{message}</span>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Skills Impact */}
              <div className="bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-blue-400 font-semibold text-lg">Skills Impact</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Target className="w-3 h-3 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm mb-1">Better Matching</p>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        More skills = better ticket matching with your expertise
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="w-3 h-3 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm mb-1">Higher Priority</p>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Skilled moderators get priority access to premium tickets
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Award className="w-3 h-3 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm mb-1">Earn More</p>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Specialized skills often command higher rates
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Skills */}
              <div className="bg-purple-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-purple-400 font-semibold text-lg">Most In-Demand</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { skill: "React", demand: "Very High", color: "text-green-400" },
                    { skill: "Node.js", demand: "High", color: "text-blue-400" },
                    { skill: "Python", demand: "High", color: "text-blue-400" },
                    { skill: "TypeScript", demand: "Growing", color: "text-yellow-400" },
                    { skill: "AWS", demand: "Critical", color: "text-red-400" },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-white text-sm font-medium">{item.skill}</span>
                      <span className={`text-xs font-semibold ${item.color}`}>{item.demand}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-green-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-green-400 font-semibold text-lg">Pro Tips</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-sm">Add both frontend and backend skills for versatility</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-sm">Include cloud platforms (AWS, Azure, GCP)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-sm">Keep skills updated with latest technologies</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-sm">Be specific (e.g., "React Hooks" vs just "React")</p>
                  </div>
                </div>
              </div>
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
      `}</style>
    </div>
  )
}

export default EditSkills
