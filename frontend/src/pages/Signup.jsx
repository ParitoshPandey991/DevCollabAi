"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import apiService from "../services/api"
import { useNavigate } from "react-router-dom"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  Sparkles,
  User,
  UserCheck,
  Plus,
  X,
  Check,
  Shield,
  Zap,
  Code,
} from "lucide-react"

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
    skills: [],
  })
  const [skillInput, setSkillInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const { addToast } = useToast()
 
  const { login } = useAuth()

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      })
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength += 25
    return strength
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value
    setFormData({ ...formData, password })
    setPasswordStrength(calculatePasswordStrength(password))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    
    try {
      const response = await apiService.signup(formData)
      login(response.user, response.token)
      addToast("Account created successfully!", "success")
    } catch (error) {
      addToast(error.message, "error")
    } finally {
      setLoading(false)
    }
  }

  const suggestedSkills = [
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker",
    "Kubernetes",
    "Vue.js",
    "Angular",
    "Express.js",
    "Next.js",
    "GraphQL",
  ]

  return (
    <div className="signup-container">
      {/* Background Elements */}
      <div className="background-elements">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Main Content */}
      <div className="signup-content">
        <div className="signup-card">
          {/* Header */}
          <div className="signup-header">
            <div className="logo-container">
              <div className="logo-icon">
                <span>DC</span>
                <div className="logo-pulse"></div>
              </div>
              <div className="sparkle-effect">
                <Sparkles className="sparkle-icon" />
              </div>
            </div>
            <h1 className="signup-title">Join Our Community</h1>
            <p className="signup-subtitle">Create your DEVCOLLAB-AI account</p>
            <p className="signup-description">Start collaborating with expert developers worldwide</p>
          </div>

          {/* Form */}
          <form className="signup-form " onSubmit={handleSubmit}>
            <div className="form-fields">
              {/* Email Field */}
              <div className="field-container">
                <label className="field-label">Email Address</label>
                <div className={`input-wrapper ${focusedField === "email" ? "focused" : ""}`}>
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                    className="form-input"
                    placeholder="Enter your email address"
                  />
                  <div className="input-glow"></div>
                </div>
              </div>

              {/* Password Field */}
              <div className="field-container">
                <label className="field-label">Password</label>
                <div className={`input-wrapper ${focusedField === "password" ? "focused" : ""}`}>
                  <Lock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handlePasswordChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField("")}
                    className="form-input"
                    placeholder="Create a strong password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <div className="input-glow"></div>
                </div>
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div
                        className={`strength-fill strength-${passwordStrength}`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                    <div className="strength-text">
                      {passwordStrength < 50 ? "Weak" : passwordStrength < 75 ? "Good" : "Strong"}
                    </div>
                  </div>
                )}
              </div>

              {/* Role Selection */}
              <div className="field-container">
                <label className="field-label">Account Type</label>
                <div className="role-selection">
                  <div
                    className={`role-option ${formData.role === "user" ? "selected" : ""}`}
                    onClick={() => setFormData({ ...formData, role: "user" })}
                  >
                    <div className="role-icon">
                      <User size={20} />
                    </div>
                    <div className="role-content">
                      <h3>User</h3>
                      <p>Get help with your technical issues</p>
                    </div>
                    <div className="role-check">{formData.role === "user" && <Check size={16} />}</div>
                  </div>
                  <div
                    className={`role-option ${formData.role === "moderator" ? "selected" : ""}`}
                    onClick={() => setFormData({ ...formData, role: "moderator" })}
                  >
                    <div className="role-icon">
                      <UserCheck size={20} />
                    </div>
                    <div className="role-content">
                      <h3>Moderator</h3>
                      <p>Help others and earn by solving issues</p>
                    </div>
                    <div className="role-check">{formData.role === "moderator" && <Check size={16} />}</div>
                  </div>
                </div>
              </div>

              {/* Skills Section for Moderators */}
              {formData.role === "moderator" && (
                <div className="field-container skills-section">
                  <label className="field-label">
                    <Code size={16} />
                    Your Skills & Expertise
                  </label>
                  <p className="field-description">Add technologies and skills you can help others with</p>

                  <div className="skill-input-container">
                    <div className={`input-wrapper ${focusedField === "skills" ? "focused" : ""}`}>
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                        onFocus={() => setFocusedField("skills")}
                        onBlur={() => setFocusedField("")}
                        className="form-input skill-input"
                        placeholder="Type a skill and press Enter"
                      />
                      <button type="button" onClick={addSkill} className="add-skill-btn">
                        <Plus size={16} />
                      </button>
                      <div className="input-glow"></div>
                    </div>
                  </div>

                  {/* Suggested Skills */}
                  <div className="suggested-skills">
                    <p className="suggested-label">Popular skills:</p>
                    <div className="suggested-tags">
                      {suggestedSkills
                        .filter((skill) => !formData.skills.includes(skill))
                        .slice(0, 6)
                        .map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                skills: [...formData.skills, skill],
                              })
                            }}
                            className="suggested-tag"
                          >
                            {skill}
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Selected Skills */}
                  {formData.skills.length > 0 && (
                    <div className="selected-skills">
                      <p className="selected-label">Your skills ({formData.skills.length}):</p>
                      <div className="skills-list">
                        {formData.skills.map((skill, index) => (
                          <div key={index} className="skill-tag">
                            <span>{skill}</span>
                            <button type="button" onClick={() => removeSkill(skill)} className="remove-skill">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="submit-button">
              <span className="button-content">
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <div className="button-arrow">→</div>
                  </>
                )}
              </span>
              <div className="button-glow"></div>
            </button>

            {/* Terms */}
            <div className="terms-section">
              <p className="terms-text">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="terms-link">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="terms-link">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </form>

          {/* Footer Links */}
          <div className="signup-footer">
            <div className="login-link">
              <span className="footer-text">Already have an account?</span>
              <Link to="/login" className="footer-link">
                Sign in here
              </Link>
            </div>
            <div className="home-link">
              <Link to="/" className="back-link">
                <ArrowLeft size={16} />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="side-panel">
          <div className="panel-content">
            <div className="panel-header">
              <h2 className="panel-title">Why Join DevCollab-AI?</h2>
              <p className="panel-subtitle">Join thousands of developers in our growing community</p>
            </div>

            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Zap className="icon" />
                </div>
                <div className="benefit-text">
                  <h3>Instant Help</h3>
                  <p>Get matched with experts in seconds, not hours</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Shield className="icon" />
                </div>
                <div className="benefit-text">
                  <h3>Secure Platform</h3>
                  <p>Your code and data are protected with enterprise-grade security</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Code className="icon" />
                </div>
                <div className="benefit-text">
                  <h3>All Technologies</h3>
                  <p>From React to Python, we cover the entire development stack</p>
                </div>
              </div>
            </div>

            <div className="stats-section">
              <div className="stat-item">
                <div className="stat-number">50k+</div>
                <div className="stat-label">Developers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100k+</div>
                <div className="stat-label">Issues Solved</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>

            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "Joining as a moderator was the best decision. I've helped hundreds of developers and earned great
                  income!"
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">SM</div>
                  <div className="author-info">
                    <div className="author-name">Sarah Miller</div>
                    <div className="author-title">Senior Full Stack Developer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .signup-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #1b0c2e 0%, #210e3f 50%, #100c24 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }

        /* Background Elements */
        .background-elements {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
          animation: float 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 250px;
          height: 250px;
          top: 5%;
          left: 5%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 180px;
          height: 180px;
          top: 60%;
          right: 5%;
          animation-delay: 3s;
        }

        .orb-3 {
          width: 120px;
          height: 120px;
          bottom: 10%;
          left: 50%;
          animation-delay: 6s;
        }

        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.03) 1px, transparent 0);
          background-size: 40px 40px;
          animation: gridMove 15s linear infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(40px, 40px);
          }
        }

        /* Main Content */
        .signup-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1400px;
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 1;
          animation: slideUp 0.8s ease-out;
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .signup-card {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-height: 120vh;
          overflow-y: auto;
        }

        .signup-card::-webkit-scrollbar {
          width: 6px;
        }

        .signup-card::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 3px;
        }

        /* Header */
        .signup-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo-container {
          position: relative;
          display: inline-block;
          margin-bottom: 1.5rem;
        }

        .logo-icon {
          position: relative;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.5rem;
          color: white;
          box-shadow: 0 10px 40px rgba(139, 92, 246, 0.4);
          animation: logoFloat 3s ease-in-out infinite;
        }

        @keyframes logoFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .logo-pulse {
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          border-radius: 24px;
          z-index: -1;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }

        .sparkle-effect {
          position: absolute;
          top: -10px;
          right: -10px;
          color: #fbbf24;
          animation: sparkle 2s ease-in-out infinite;
        }

        .sparkle-icon {
          width: 20px;
          height: 20px;
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.8) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
        }

        .signup-title {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .signup-subtitle {
          font-size: 1.25rem;
          font-weight: 600;
          color: #8b5cf6;
          margin-bottom: 0.5rem;
        }

        .signup-description {
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        /* Form */
        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .field-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .field-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #e2e8f0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .field-description {
          font-size: 0.75rem;
          color: #94a3b8;
          margin-top: -0.25rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-wrapper.focused .input-glow {
          opacity: 1;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          width: 18px;
          height: 18px;
          color: #64748b;
          z-index: 2;
          transition: color 0.3s ease;
        }

        .input-wrapper.focused .input-icon {
          color: #8b5cf6;
        }

        .form-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(71, 85, 105, 0.5);
          border-radius: 12px;
          color: white;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .form-input::placeholder {
          color: #64748b;
        }

        .form-input:focus {
          outline: none;
          border-color: #8b5cf6;
          background: rgba(15, 23, 42, 0.9);
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          z-index: 2;
          transition: color 0.3s ease;
        }

        .password-toggle:hover {
          color: #8b5cf6;
        }

        .input-glow {
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          border-radius: 13px;
          z-index: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        /* Password Strength */
        .password-strength {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .strength-bar {
          flex: 1;
          height: 4px;
          background: rgba(71, 85, 105, 0.5);
          border-radius: 2px;
          overflow: hidden;
        }

        .strength-fill {
          height: 100%;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .strength-0 {
          width: 0%;
          background: #ef4444;
        }

        .strength-25 {
          background: #ef4444;
        }

        .strength-50 {
          background: #f59e0b;
        }

        .strength-75 {
          background: #10b981;
        }

        .strength-100 {
          background: #10b981;
        }

        .strength-text {
          font-size: 0.75rem;
          font-weight: 500;
          color: #94a3b8;
          min-width: 50px;
        }

        /* Role Selection */
        .role-selection {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .role-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(71, 85, 105, 0.5);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .role-option:hover {
          background: rgba(15, 23, 42, 0.8);
          border-color: rgba(139, 92, 246, 0.5);
        }

        .role-option.selected {
          background: rgba(139, 92, 246, 0.1);
          border-color: #8b5cf6;
        }

        .role-icon {
          width: 40px;
          height: 40px;
          background: rgba(139, 92, 246, 0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b5cf6;
          flex-shrink: 0;
        }

        .role-content {
          flex: 1;
        }

        .role-content h3 {
          color: white;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .role-content p {
          color: #94a3b8;
          font-size: 0.875rem;
        }

        .role-check {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #8b5cf6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        /* Skills Section */
        .skills-section {
          background: rgba(15, 23, 42, 0.3);
          border: 1px solid rgba(71, 85, 105, 0.3);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .skill-input-container {
          margin-bottom: 1rem;
        }

        .skill-input {
          padding-right: 3rem;
        }

        .add-skill-btn {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          background: #8b5cf6;
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 2;
        }

        .add-skill-btn:hover {
          background: #7c3aed;
          transform: translateY(-50%) scale(1.05);
        }

        .suggested-skills {
          margin-bottom: 1rem;
        }

        .suggested-label {
          font-size: 0.75rem;
          color: #94a3b8;
          margin-bottom: 0.5rem;
        }

        .suggested-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .suggested-tag {
          padding: 0.375rem 0.75rem;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 20px;
          color: #c4b5fd;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .suggested-tag:hover {
          background: rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.5);
          color: white;
          transform: translateY(-1px);
        }

        .selected-skills {
          margin-top: 1rem;
        }

        .selected-label {
          font-size: 0.75rem;
          color: #e2e8f0;
          margin-bottom: 0.75rem;
          font-weight: 500;
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          border-radius: 20px;
          color: white;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .remove-skill {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s ease;
        }

        .remove-skill:hover {
          color: white;
        }

        /* Submit Button */
        .submit-button {
          position: relative;
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
          margin-top: 0.5rem;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          position: relative;
          z-index: 2;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .button-arrow {
          transition: transform 0.3s ease;
        }

        .submit-button:hover:not(:disabled) .button-arrow {
          transform: translateX(4px);
        }

        .button-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .submit-button:hover:not(:disabled) .button-glow {
          left: 100%;
        }

        /* Terms */
        .terms-section {
          text-align: center;
          margin-top: 0.5rem;
        }

        .terms-text {
          font-size: 0.75rem;
          color: #94a3b8;
          line-height: 1.5;
        }

        .terms-link {
          color: #8b5cf6;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .terms-link:hover {
          color: #a855f7;
        }

        /* Footer */
        .signup-footer {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }

        .login-link {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .footer-text {
          color: #94a3b8;
          font-size: 0.875rem;
        }

        .footer-link {
          color: #8b5cf6;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #a855f7;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: #94a3b8;
        }

        /* Side Panel */
        .side-panel {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%);
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .side-panel::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .panel-content {
          position: relative;
          z-index: 1;
        }

        .panel-header {
          margin-bottom: 2rem;
        }

        .panel-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.75rem;
        }

        .panel-subtitle {
          color: #cbd5e1;
          line-height: 1.6;
        }

        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .benefit-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .benefit-icon {
          width: 40px;
          height: 40px;
          background: rgba(139, 92, 246, 0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .benefit-icon .icon {
          width: 20px;
          height: 20px;
          color: #8b5cf6;
        }

        .benefit-text h3 {
          color: white;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .benefit-text p {
          color: #94a3b8;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .stats-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .testimonial {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .testimonial-content p {
          color: #e2e8f0;
          font-style: italic;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .author-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .author-name {
          color: white;
          font-weight: 500;
          font-size: 0.875rem;
        }

        .author-title {
          color: #94a3b8;
          font-size: 0.75rem;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .signup-content {
            grid-template-columns: 1fr;
            max-width: 600px;
          }

          .side-panel {
            display: none;
          }

          .signup-card {
            padding: 2rem;
          }
        }

        @media (max-width: 640px) {
          .signup-container {
            padding: 1rem 0.5rem;
          }

          .signup-card {
            padding: 1.5rem;
          }

          .logo-icon {
            width: 60px;
            height: 60px;
            font-size: 1.25rem;
          }

          .signup-title {
            font-size: 1.75rem;
          }

          .role-selection {
            gap: 0.5rem;
          }

          .role-option {
            padding: 0.75rem;
          }

          .skills-section {
            padding: 1rem;
          }

          .login-link {
            flex-direction: column;
            gap: 0.25rem;
          }

          .stats-section {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Signup

