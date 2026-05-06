
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import apiService from '../services/api';
import {
  Ticket,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  User,
  Calendar,
  Search,
  Filter,
  MoreVertical,

  ArrowRight,
  LogOutIcon,
  BanIcon,
  Check,
  Edit
} from "lucide-react"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, token } = useAuth()
  const [tickets, setTickets] = useState([])
  const [assignedTickets, setAssignedTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const {logout} = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    assigned: 0,
    cancelled:0,
    completed:0
  })

  const [statsAssigned, setStatsAssigned] = useState({
    total: 0,
    assigned: 0,
    completed: 0
  })



  useEffect(() => {
   if (user.role === "user") {
     fetchTickets()
   }
  
    if (user?.role === "moderator") {
      fetchAssignedTickets()
    }
  }, [user])

  const fetchTickets = async () => {
    setLoading(true)
    
        const response  = await apiService.getUserTickets(token)
        console.log(response)
       if(response){
        setTickets(response)
        calculateStats(response)}
        else{
          setTickets([])
        }
        
   
      setLoading(false)
    
  }

  const handleLogout = async () => {
    try {
      await apiService.logout()
      logout()
      addToast("Logged out successfully", "success")
      navigate("/")
    } catch (error) {
      addToast("Logout failed", "error")
    }
  }

  const fetchAssignedTickets = async () => {
     setLoading(true)
  
      const response = await apiService.getAssignedTickets(token)
      
      if(response.length > 0){
      setAssignedTickets(response)
      calculateStats(response)}
      
  else{
       setTickets([]) }
  
    
      setLoading(false)
    
  }

  const calculateStats = (tickets) => {
    
if (user?.role === "moderator") {
      let total = tickets.length
      let assigned = tickets.filter(ticket => ticket.status === "ASSIGNED").length
      let completed = tickets.filter(ticket => ticket.status === "COMPLETED").length
      let statsAssigned = {
        total,
        assigned,
        completed
      }
      setStatsAssigned(statsAssigned)
} else {
      let total = tickets.length
      let pending = tickets.filter(ticket => ticket.status === "TODO").length
      let inProgress = tickets.filter(ticket => ticket.status === "IN_PROGRESS").length
      let assigned = tickets.filter(ticket => ticket.status === "ASSIGNED").length
      let cancelled = tickets.filter(ticket => ticket.status === "CANCELLED").length
      let completed = tickets.filter(ticket => ticket.status === "COMPLETED").length
      let stats = {
        total,
        pending,
        inProgress,
        assigned,
        cancelled,
        completed
      }
      
      setStats(stats)
}
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      TODO: { label: "To Do", className: "status-badge status-todo" },
      IN_PROGRESS: { label: "In Progress", className: "status-badge status-progress" },
      ASSIGNED: { label: "Assigned", className: "status-badge status-assigned" },
      CANCELLED: { label: "Cancelled", className: "status-badge status-cancelled" },
      COMPLETED: { label: "Completed", className: "status-badge status-completed" },
    }
    return statusMap[status] || statusMap.TODO
  }

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="loading-content">
            {/* Header Skeleton */}
            <div className="loading-header">
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-subtitle"></div>
            </div>

            {/* Stats Skeleton */}
            <div className="loading-stats">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="loading-stat-card">
                  <div className="skeleton skeleton-stat-label"></div>
                  <div className="skeleton skeleton-stat-value"></div>
                  <div className="skeleton skeleton-stat-icon"></div>
                </div>
              ))}
            </div>

            {/* Content Skeleton */}
            <div className="loading-content-grid">
              <div className="loading-main">
                <div className="skeleton skeleton-card-header"></div>
                <div className="loading-tickets">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="skeleton skeleton-ticket"></div>
                  ))}
                </div>
              </div>
              <div className="loading-sidebar">
                <div className="skeleton skeleton-card-header"></div>
                <div className="loading-assigned">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="skeleton skeleton-assigned"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <div className="header-text">
              <h1 className="dashboard-title">Welcome back, {user?.email?.split("@")[0]}</h1>
              <p className="dashboard-subtitle">
                {user?.role === "moderator"
                  ? "Manage and resolve incoming tickets efficiently."
                  : "Track your support requests and get help faster."}
              </p>
            </div>
            <div className="header-actions">
                {user.role === "moderator" &&  <button className="icon-button logout-btn " onClick={()=>navigate("/edit")}>
                <Edit size={20} />
              </button>}
             
                            <button className="icon-button logout-btn " onClick={handleLogout}>
                <LogOutIcon size={20} />
              </button>
              <div className="user-avatar">{user?.email?.split("@")[0].slice(0, 2).toUpperCase()}</div>
              
            </div>
          </div>
        </div>

        {/* Stats Cards */}
       {user?.role === "user" && <div className="stats-grid">
          {[
            {
              label: "Total Tickets",
              value: stats.total,
              icon: Ticket,
              gradient: "gradient-blue",
             
            },
            {
              label: "Todo",
              value: stats.pending,
              icon: Clock,
              gradient: "gradient-yellow",
            
            },
            {
              label: "In Progress",
              value: stats.inProgress,
              icon: TrendingUp,
              gradient: "gradient-blue",
            
            },
            {
              label: "Assigned",
              value: stats.assigned,
              icon: CheckCircle,
              gradient: "gradient-purple",
            
            },
             {
              label: "Cancelled",
              value: stats.cancelled,
              icon: BanIcon,
              gradient: "gradient-red",
            
            },
              {
              label: "Completed",
              value: stats.completed,
              icon: Check,
              gradient: "gradient-green",
            
            },
          ].map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="stat-content">
                <div className="stat-info">
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-value">{stat.value}</p>
                 
                </div>
                <div className={`stat-icon ${stat.gradient}`}>
                  <stat.icon size={24} />
                </div>
              </div>
              <div className={`stat-accent ${stat.gradient}`}></div>
            </div>
          ))}
        </div>}

      {user?.role === "moderator" &&   <div className="stats-grid">
          {[
            {
              label: "Total Tickets",
              value: statsAssigned.total,
              icon: Ticket,
              gradient: "gradient-blue",
             
            },
        
            {
              label: "Assigned",
              value: statsAssigned.assigned,
              icon: CheckCircle,
              gradient: "gradient-green",
            
            },
             {
              label: "Completed",
              value: statsAssigned.completed,
              icon: Check,
              gradient: "gradient-green",
            
            },
         
          ].map((statsAssigned, i) => (
            <div key={i} className="stat-card">
              <div className="stat-content">
                <div className="stat-info">
                  <p className="stat-label">{statsAssigned.label}</p>
                  <p className="stat-value">{statsAssigned.value}</p>
                 
                </div>
                <div className={`stat-icon ${statsAssigned.gradient}`}>
                  <statsAssigned.icon size={24} />
                </div>
              </div>
              <div className={`stat-accent ${statsAssigned.gradient}`}></div>
            </div>
          ))}
        </div>}

        {/* Main Content */}
        <div className="main-grid">
          {/* Tickets List */}
          {user?.role !== "moderator" && <div className="tickets-section">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">{user?.role === "moderator" ? "All Tickets" : "My Tickets"}</h2>
                <div className="header-controls">
                  <div className="search-container">
                    <Search className="search-icon" size={16} />
                    <input
                      type="text"
                      placeholder="Search tickets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input text-black"
                    />
                  </div>
                  <button className="icon-button">
                    <Filter size={16} />
                  </button>
                  {user?.role !== "moderator" && (
                    <button onClick={() => (window.location.href = "/create-ticket")} className="primary-button">
                      <Plus size={16} />
                      <span>New Ticket</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="card-content">
                {filteredTickets.length === 0 ? (
                  <div className="empty-state">
                    <Ticket className="empty-icon" size={48} />
                    <h3 className="empty-title">No tickets found</h3>
                    <p className="empty-description">
                      {searchQuery ? "Try adjusting your search terms." : "Create your first ticket to get started."}
                    </p>
                  </div>
                ) : (
                  <div className="tickets-list">
                    {filteredTickets.map((ticket) => {
                      const statusInfo = getStatusBadge(ticket.status)
                      return (
                        <div
                          key={ticket._id}
                          className="ticket-card"
                          onClick={() => (window.location.href = `/ticket/${ticket._id}`)}
                        >
                          <div className="ticket-header">
                            <h3 className="ticket-title">{ticket.title}</h3>
                            <button className="ticket-menu">
                              <MoreVertical size={16} />
                            </button>
                          </div>

                          <p className="ticket-description">{ticket.description}</p>

                          <div className="ticket-footer">
                            <div className="ticket-badges">
                              <span className={statusInfo.className}>{statusInfo.label}</span>
                            </div>
                            <div className="ticket-meta">
                              <div className="meta-item">
                                <Calendar size={12} />
                                <span>{formatDate(ticket.createdAt)}</span>
                              </div>
                              <ArrowRight className="ticket-arrow" size={16} />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>}

          {/* Assigned Tickets for Moderators */}
          {user?.role === "moderator" && (
            <div className="assigned-section">
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">
                    <User size={20} />
                    Assigned to Me
                  </h2>
                </div>

                <div className="card-content">
                  {assignedTickets.length === 0 ? (
                    <div className="empty-state small">
                      <AlertCircle className="empty-icon" size={32} />
                      <h3 className="empty-title">No assigned tickets</h3>
                      <p className="empty-description">You're all caught up!</p>
                    </div>
                  ) : (
                    <div className="assigned-list">
                      {assignedTickets.map((ticket) => {
                        const statusInfo = getStatusBadge(ticket.status)
                        return (
                          <div
                            key={ticket._id}  
                            className="assigned-card"
                            onClick={() => (window.location.href = `/moderator/${ticket._id}`)}
                          >
                            <h3 className="assigned-title">{ticket.title}</h3>
                            <div className="assigned-footer">
                              <span className={statusInfo.className}>{statusInfo.label}</span>
                              <div className="meta-item">
                                <Calendar size={12} />
                                <span>{formatDate(ticket.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
            
            </div>
          )}
        </div>
      </div>

      <style >{`
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem 1rem;
        }

        .dashboard-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Header Styles */
        .dashboard-header {
          margin-bottom: 2rem;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .dashboard-title {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .dashboard-subtitle {
          color: #64748b;
          font-size: 1.125rem;
          line-height: 1.6;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .icon-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .logout-btn{
          background: #f1f5f9;
          border-color: #cbd5e1;
          color: #475569;
        }

        .icon-button:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
          color: #475569;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .stat-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .stat-label {
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          color: #1e293b;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .stat-change {
          color: #059669;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: transform 0.3s ease;
        }

        .stat-card:hover .stat-icon {
          transform: scale(1.1);
        }

        .stat-accent {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
        }

        .gradient-blue {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        }

        .gradient-yellow {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        }

        .gradient-purple {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
        }

        .gradient-green {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

          .gradient-blue {
          background: linear-gradient(135deg, #1043b9 0%, #054996 100%);
        }

                  .gradient-red {
          background: linear-gradient(135deg,   #db4848 0%, #960505 100%);
        }

        /* Main Grid */
        .main-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 2rem;
        }

        @media (max-width: 1200px) {
          .main-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Card Styles */
        .card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .card-header {
          padding: 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .card-content {
          padding: 1.5rem;
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .search-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          color: #94a3b8;
          pointer-events: none;
        }

        .search-input {
          padding: 8px 12px 8px 36px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          font-size: 0.875rem;
          width: 240px;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .primary-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 8px 16px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .primary-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        /* Tickets List */
        .tickets-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: 600px;
          overflow-y: auto;
          padding-right: 8px;
        }

        .tickets-list::-webkit-scrollbar {
          width: 6px;
        }

        .tickets-list::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .tickets-list::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .ticket-card {
          padding: 1.25rem;
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          background: #fafbfc;
          cursor: pointer;
          transition: all 0.2s ease;
          border-left: 4px solid #e2e8f0;
        }

        .ticket-card:hover {
          background: white;
          border-color: #e2e8f0;
          border-left-color: #3b82f6;
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .ticket-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .ticket-title {
          font-weight: 600;
          color: #1e293b;
          font-size: 1rem;
          line-height: 1.4;
          transition: color 0.2s ease;
        }

        .ticket-card:hover .ticket-title {
          color: #3b82f6;
        }

        .ticket-menu {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .ticket-menu:hover {
          background: #f1f5f9;
          color: #64748b;
        }

        .ticket-description {
          color: #64748b;
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ticket-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ticket-badges {
          display: flex;
          gap: 0.5rem;
        }

        .ticket-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #94a3b8;
          font-size: 0.75rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .ticket-arrow {
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .ticket-card:hover .ticket-arrow {
          opacity: 1;
        }

        /* Status Badges */
        .status-badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .status-todo {
          background: #fef3c7;
          color: #92400e;
        }

        .status-progress {
          background: #dbeafe;
          color: #1e40af;
        }

        .status-assigned {
          background: #f0d5eb;
          color: #77127c;
        }

        .status-cancelled {
          background: #fad1d1;
          color: #5f0606;
        }
         

        .status-completed {
          background: #d1fae5;
          color: #075e54;
        }

        /* Assigned Section */
        .assigned-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .assigned-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 400px;
          overflow-y: auto;
          padding-right: 8px;
        }

        .assigned-card {
          padding: 1rem;
          border: 1px solid #f1f5f9;
          border-radius: 8px;
          background: #fafbfc;
          cursor: pointer;
          transition: all 0.2s ease;
          border-left: 3px solid #e2e8f0;
        }

        .assigned-card:hover {
          background: white;
          border-left-color: #3b82f6;
          transform: translateX(2px);
        }

        .assigned-title {
          font-weight: 500;
          color: #1e293b;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          transition: color 0.2s ease;
        }

        .assigned-card:hover .assigned-title {
          color: #3b82f6;
        }

        .assigned-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* Quick Actions */
        .quick-actions {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem;
          background: transparent;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          color: #475569;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 0.5rem;
        }

        .action-button:hover {
          background: white;
          border-color: #cbd5e1;
          color: #1e293b;
        }

        .action-button:last-child {
          margin-bottom: 0;
        }

        /* Empty States */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
        }

        .empty-state.small {
          padding: 2rem 1rem;
        }

        .empty-icon {
          color: #cbd5e1;
          margin-bottom: 1rem;
        }

        .empty-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .empty-description {
          color: #64748b;
          font-size: 0.875rem;
        }

        /* Loading States */
        .loading-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem 1rem;
        }

        .loading-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .loading-header {
          margin-bottom: 2rem;
        }

        .loading-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .loading-stat-card {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .loading-content-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 2rem;
        }

        @media (max-width: 1200px) {
          .loading-content-grid {
            grid-template-columns: 1fr;
          }
        }

        .loading-main,
        .loading-sidebar {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .skeleton {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 8px;
        }

        .skeleton-title {
          height: 32px;
          width: 300px;
          margin-bottom: 8px;
        }

        .skeleton-subtitle {
          height: 20px;
          width: 400px;
        }

        .skeleton-stat-label {
          height: 16px;
          width: 80px;
          margin-bottom: 8px;
        }

        .skeleton-stat-value {
          height: 32px;
          width: 60px;
        }

        .skeleton-stat-icon {
          height: 48px;
          width: 48px;
          border-radius: 12px;
        }

        .skeleton-card-header {
          height: 24px;
          width: 150px;
          margin-bottom: 1rem;
        }

        .skeleton-ticket {
          height: 120px;
          margin-bottom: 1rem;
        }

        .skeleton-assigned {
          height: 80px;
          margin-bottom: 0.75rem;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1rem 0.5rem;
          }

          .dashboard-title {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .header-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-controls {
            width: 100%;
            justify-content: space-between;
          }

          .search-input {
            width: 200px;
          }

          .card-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .search-input {
            width: 150px;
          }

          .primary-button span {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default Dashboard
