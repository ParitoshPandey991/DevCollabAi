
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import apiService from "../services/api"
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Sparkles } from "lucide-react"

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState("")
  const { login } = useAuth()
  const { addToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await apiService.login(formData)
      login(response.user, response.token)
      addToast("Login successful!", "success")
    } catch (error) {
      addToast(error.message, "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      {/* Background Elements */}
      <div className="background-elements">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Main Content */}
      <div className="login-content">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <div className="logo-container">
              <div className="logo-icon">
                <span>DC</span>
                <div className="logo-pulse"></div>
              </div>
              <div className="sparkle-effect">
                <Sparkles className="sparkle-icon" />
              </div>
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to DEVCOLLAB-AI</p>
            <p className="login-description">Connect with expert moderators for your technical issues</p>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit}>
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
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField("")}
                    className="form-input"
                    placeholder="Enter your password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <div className="input-glow"></div>
                </div>
              </div>
            </div>

       

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="submit-button">
              <span className="button-content">
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <div className="button-arrow">→</div>
                  </>
                )}
              </span>
              <div className="button-glow"></div>
            </button>

            {/* Divider */}
            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">or</span>
              <div className="divider-line"></div>
            </div>

            {/* Social Login */}
          
          </form>

          {/* Footer Links */}
          <div className="login-footer">
            <div className="signup-link">
              <span className="footer-text">Don't have an account?</span>
              <Link to="/signup" className="footer-link">
                Sign up here
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
              <h2 className="panel-title">Join Our Community</h2>
              <p className="panel-subtitle">Connect with thousands of developers and get expert help instantly</p>
            </div>

            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">✨</div>
                <div className="feature-text">
                  <h3>AI-Powered Matching</h3>
                  <p>Get matched with the right experts for your specific needs</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div className="feature-text">
                  <h3>Instant Support</h3>
                  <p>Receive help within minutes, not hours or days</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🚀</div>
                <div className="feature-text">
                  <h3>Expert Network</h3>
                  <p>Access to experienced developers across all technologies</p>
                </div>
              </div>
            </div>

            <div className="testimonial">
              <div className="testimonial-content">
                <p>"DevCollab-AI helped me solve a critical bug in minutes. The expert matching is incredible!"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">JS</div>
                  <div className="author-info">
                    <div className="author-name">John Smith</div>
                    <div className="author-title">Senior Developer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style >{`
        .login-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #1b0c2e 0%, #210e3f 50%, #100c24 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
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
          width: 200px;
          height: 200px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 150px;
          height: 150px;
          top: 70%;
          right: 10%;
          animation-delay: 3s;
        }

        .orb-3 {
          width: 100px;
          height: 100px;
          bottom: 20%;
          left: 60%;
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
        .login-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1200px;
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

        .login-card {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Header */
        .login-header {
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

        .login-title {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .login-subtitle {
          font-size: 1.25rem;
          font-weight: 600;
          color: #8b5cf6;
          margin-bottom: 0.5rem;
        }

        .login-description {
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        /* Form */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
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

        .forgot-password {
          text-align: right;
        }

        .forgot-link {
          color: #8b5cf6;
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .forgot-link:hover {
          color: #a855f7;
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

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 0.5rem 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(71, 85, 105, 0.5);
        }

        .divider-text {
          color: #64748b;
          font-size: 0.875rem;
        }

        /* Social Login */
        .social-login {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .social-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 0.875rem;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(71, 85, 105, 0.5);
          border-radius: 12px;
          color: #e2e8f0;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .social-button:hover {
          background: rgba(15, 23, 42, 0.9);
          border-color: rgba(71, 85, 105, 0.8);
          transform: translateY(-1px);
        }

        .social-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .google .social-icon {
          background: linear-gradient(135deg, #4285f4, #34a853, #fbbc05, #ea4335);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .github .social-icon {
          color: #e2e8f0;
        }

        /* Footer */
        .login-footer {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }

        .signup-link {
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

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .feature-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          background: rgba(139, 92, 246, 0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .feature-text h3 {
          color: white;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .feature-text p {
          color: #94a3b8;
          font-size: 0.875rem;
          line-height: 1.5;
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
        @media (max-width: 1024px) {
          .login-content {
            grid-template-columns: 1fr;
            max-width: 500px;
          }

          .side-panel {
            display: none;
          }

          .login-card {
            padding: 2rem;
          }
        }

        @media (max-width: 640px) {
          .login-container {
            padding: 0.5rem;
          }

          .login-card {
            padding: 1.5rem;
          }

          .logo-icon {
            width: 60px;
            height: 60px;
            font-size: 1.25rem;
          }

          .login-title {
            font-size: 1.75rem;
          }

          .social-login {
            gap: 0.5rem;
          }

          .signup-link {
            flex-direction: column;
            gap: 0.25rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Login
