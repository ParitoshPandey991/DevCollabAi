"use client"
import { Bot, Zap, Users, ArrowRight, Sparkles, Star, CheckCircle, Globe } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    navigate(path)
  }

  return (
    <main className="home-container">
      {/* Animated Background Elements */}
      <div className="background-elements">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <span>DC</span>
              <div className="logo-glow"></div>
            </div>
            <span className="logo-text">DEVCOLLAB-AI</span>
          </div>
          <nav className="nav-section">
            <button onClick={() => handleNavigation("/login")} className="nav-button signin-btn">
              Sign In
            </button>
            <button onClick={() => handleNavigation("/signup")} className="nav-button cta-btn">
              <span>Get Started</span>
              <div className="button-glow"></div>
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles className="badge-icon" />
            <span>AI-Powered Ticket Management</span>
            <div className="badge-glow"></div>
          </div>

          <h1 className="hero-title">
            Connect with Expert{" "}
            <span className="gradient-text">
              Moderators
              <div className="text-underline"></div>
            </span>
          </h1>

          <p className="hero-description">
            Automatically assign your technical issues to skilled moderators. Get help faster with intelligent ticket
            routing and real-time collaboration.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">10k+</div>
              <div className="stat-label">Tickets Resolved</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Expert Moderators</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
          </div>

          <div className="hero-actions">
            <button onClick={() => handleNavigation("/signup")} className="primary-cta">
              <span>Start Collaborating</span>
              <ArrowRight className="cta-icon" />
              <div className="cta-glow"></div>
            </button>
         
          </div>

       
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-header">
          <h2 className="section-title">Why Choose DevCollab-AI?</h2>
          <p className="section-subtitle">Experience the future of technical support with our AI-powered platform</p>
        </div>

        <div className="features-grid">
          {[
            {
              title: "AI-Powered Matching",
              desc: "Smart algorithms analyze your tickets and match them with moderators who have the exact skills needed for your specific issue.",
              icon: <Bot className="feature-icon" />,
              gradient: "gradient-purple",
              delay: "0ms",
            },
            {
              title: "Instant Processing",
              desc: "Tickets are analyzed, categorized, and assigned within seconds, not hours. Get immediate attention for critical issues.",
              icon: <Zap className="feature-icon" />,
              gradient: "gradient-pink",
              delay: "100ms",
            },
            {
              title: "Expert Network",
              desc: "Connect with experienced moderators across various technologies, from frontend frameworks to cloud infrastructure.",
              icon: <Users className="feature-icon" />,
              gradient: "gradient-green",
              delay: "200ms",
            },
          ].map((feature, i) => (
            <div key={i} className={`feature-card ${feature.gradient}`} style={{ animationDelay: feature.delay }}>
              <div className="feature-icon-container">
                {feature.icon}
                <div className="icon-glow"></div>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.desc}</p>
              </div>
              <div className="feature-hover-effect"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-section">
        <div className="tech-header">
          <h2 className="section-title">Supported Technologies</h2>
          <p className="section-subtitle">Our experts cover the entire modern development stack</p>
        </div>

        <div className="tech-categories">
          <div className="tech-category">
            <h3 className="category-title">
              <Globe className="category-icon" />
              Frontend
            </h3>
            <div className="tech-tags">
              {["React", "Vue.js", "Angular", "TypeScript", "Next.js"].map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="tech-category">
            <h3 className="category-title">
              <Bot className="category-icon" />
              Backend
            </h3>
            <div className="tech-tags">
              {["Node.js", "Python", "Java", "Go", "PHP"].map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="tech-category">
            <h3 className="category-title">
              <Zap className="category-icon" />
              Cloud & DevOps
            </h3>
            <div className="tech-tags">
              {["AWS", "Docker", "Kubernetes", "MongoDB", "PostgreSQL"].map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="social-proof-section">
        <div className="social-proof-content">
          <h2 className="section-title">Trusted by Developers Worldwide</h2>
          <div className="testimonials">
            <div className="testimonial">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-icon filled" />
                ))}
              </div>
              <p className="testimonial-text">
                "DevCollab-AI reduced our ticket resolution time by 70%. The AI matching is incredibly accurate."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">JS</div>
                <div className="author-info">
                  <div className="author-name">John Smith</div>
                  <div className="author-title">Senior Developer at TechCorp</div>
                </div>
              </div>
            </div>

            <div className="testimonial">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-icon filled" />
                ))}
              </div>
              <p className="testimonial-text">
                "The expert network is amazing. I always get connected with someone who knows exactly what they're
                doing."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">MJ</div>
                <div className="author-info">
                  <div className="author-name">Maria Johnson</div>
                  <div className="author-title">Full Stack Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Your Support Experience?</h2>
          <p className="cta-description">
            Join thousands of developers who trust DevCollab-AI for their technical support needs.
          </p>
          <button onClick={() => handleNavigation("/signup")} className="final-cta-button">
            <span>Get Started for Free</span>
            <ArrowRight className="cta-arrow" />
            <div className="final-cta-glow"></div>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo-icon small">
              <span>DC</span>
            </div>
            <span className="logo-text">DEVCOLLAB-AI</span>
          </div>
          <p className="footer-text">© 2025 DevCollab-AI. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        .home-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #1b0c2e 0%, #210e3f 50%, #100c24 100%);
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
          overflow-x: hidden;
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
          background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
          animation: float 6s ease-in-out infinite;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          left: -10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 200px;
          height: 200px;
          top: 60%;
          right: -5%;
          animation-delay: 2s;
        }

        .orb-3 {
          width: 150px;
          height: 150px;
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }

        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
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
            transform: translate(50px, 50px);
          }
        }

        /* Header Styles */
        .header {
          position: relative;
          z-index: 10;
          padding: 1.5rem 2rem;
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          position: relative;
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
          transition: all 0.3s ease;
        }

        .logo-icon:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 40px rgba(139, 92, 246, 0.4);
        }

        .logo-icon.small {
          width: 32px;
          height: 32px;
          font-size: 0.75rem;
        }

        .logo-glow {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          border-radius: 14px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .logo-icon:hover .logo-glow {
          opacity: 0.5;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .nav-button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .signin-btn {
          background: transparent;
          color: #cbd5e1;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .signin-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .cta-btn {
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: white;
          border: none;
          position: relative;
          overflow: hidden;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
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

        .cta-btn:hover .button-glow {
          left: 100%;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          z-index: 5;
          padding: 5rem 2rem;
          text-align: center;
        }

        .hero-content {
          max-width: 900px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
        }

        .badge-icon {
          width: 16px;
          height: 16px;
          color: #a855f7;
        }

        .hero-badge span {
          font-size: 0.875rem;
          font-weight: 500;
          color: #e2e8f0;
        }

        .badge-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.3), transparent);
          animation: badgeGlow 3s ease-in-out infinite;
        }

        @keyframes badgeGlow {
          0%,
          100% {
            left: -100%;
          }
          50% {
            left: 100%;
          }
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .gradient-text {
          position: relative;
          background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .text-underline {
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
          border-radius: 2px;
          animation: underlineGrow 2s ease-out;
        }

        @keyframes underlineGrow {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .hero-description {
          font-size: 1.125rem;
          line-height: 1.7;
          color: #cbd5e1;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #94a3b8;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .primary-cta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .primary-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(139, 92, 246, 0.4);
        }

        .cta-icon {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }

        .primary-cta:hover .cta-icon {
          transform: translateX(4px);
        }

        .cta-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .primary-cta:hover .cta-glow {
          left: 100%;
        }

        .secondary-cta {
          padding: 1rem 2rem;
          background: transparent;
          color: #e2e8f0;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          font-weight: 500;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .secondary-cta:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
          color: white;
        }

        .trust-indicators {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #94a3b8;
          font-size: 0.875rem;
        }

        .trust-icon {
          width: 16px;
          height: 16px;
          color: #10b981;
        }

        /* Features Section */
        .features-section {
          position: relative;
          z-index: 5;
          padding: 5rem 2rem;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
        }

        .features-header {
          text-align: center;
          margin-bottom: 4rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-subtitle {
          font-size: 1.125rem;
          color: #94a3b8;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .feature-icon-container {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .gradient-purple .feature-icon-container {
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
        }

        .gradient-pink .feature-icon-container {
          background: linear-gradient(135deg, #ec4899 0%, #ef4444 100%);
        }

        .gradient-green .feature-icon-container {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .feature-card:hover .feature-icon-container {
          transform: scale(1.1) rotate(5deg);
        }

        .feature-icon {
          width: 28px;
          height: 28px;
          color: white;
        }

        .icon-glow {
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gradient-purple .icon-glow {
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
        }

        .gradient-pink .icon-glow {
          background: linear-gradient(135deg, #ec4899, #ef4444);
        }

        .gradient-green .icon-glow {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .feature-card:hover .icon-glow {
          opacity: 0.3;
        }

        .feature-content {
          position: relative;
          z-index: 2;
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1rem;
        }

        .feature-description {
          color: #cbd5e1;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .feature-hover-effect {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .feature-card:hover .feature-hover-effect {
          left: 100%;
        }

        /* Tech Section */
        .tech-section {
          position: relative;
          z-index: 5;
          padding: 5rem 2rem;
        }

        .tech-header {
          text-align: center;
          margin-bottom: 4rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .tech-categories {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .tech-category {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .tech-category:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .category-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1.5rem;
        }

        .category-icon {
          width: 20px;
          height: 20px;
          color: #8b5cf6;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }

        .tech-tag {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          color: #c4b5fd;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .tech-tag:hover {
          background: rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.5);
          color: white;
          transform: translateY(-2px);
        }

        /* Social Proof Section */
        .social-proof-section {
          position: relative;
          z-index: 5;
          padding: 5rem 2rem;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
        }

        .social-proof-content {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }

        .testimonials {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .testimonial {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          text-align: left;
          transition: all 0.3s ease;
        }

        .testimonial:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .testimonial-stars {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }

        .star-icon {
          width: 16px;
          height: 16px;
          color: #fbbf24;
        }

        .star-icon.filled {
          fill: currentColor;
        }

        .testimonial-text {
          color: #e2e8f0;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .author-avatar {
          width: 48px;
          height: 48px;
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
          font-weight: 600;
          color: white;
          margin-bottom: 0.25rem;
        }

        .author-title {
          font-size: 0.875rem;
          color: #94a3b8;
        }

        /* Final CTA Section */
        .final-cta-section {
          position: relative;
          z-index: 5;
          padding: 5rem 2rem;
          text-align: center;
        }

        .cta-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cta-description {
          font-size: 1.125rem;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .final-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem 2.5rem;
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: white;
          border: none;
          border-radius: 16px;
          font-weight: 600;
          font-size: 1.125rem;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .final-cta-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(139, 92, 246, 0.4);
        }

        .cta-arrow {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }

        .final-cta-button:hover .cta-arrow {
          transform: translateX(6px);
        }

        .final-cta-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }

        .final-cta-button:hover .final-cta-glow {
          left: 100%;
        }

        /* Footer */
        .footer {
          position: relative;
          z-index: 5;
          padding: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .footer-text {
          color: #64748b;
          font-size: 0.875rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .header {
            padding: 1rem;
          }

          .header-content {
            flex-direction: column;
            gap: 1rem;
          }

          .hero-section {
            padding: 3rem 1rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .stat-divider {
            width: 40px;
            height: 1px;
          }

          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .tech-categories {
            grid-template-columns: 1fr;
          }

          .testimonials {
            grid-template-columns: 1fr;
          }

          .footer-content {
            flex-direction: column;
            text-align: center;
          }

          .section-title {
            font-size: 2rem;
          }

          .cta-title {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .primary-cta,
          .secondary-cta {
            width: 100%;
            justify-content: center;
          }

          .trust-indicators {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </main>
  )
}

export default Home
