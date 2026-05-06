import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Calendar, User, AlertCircle, Clock, CheckCircle, TrendingUp, Lightbulb, Tag, Star,BanIcon } from 'lucide-react';
import apiService from "../services/api"
const AssignedTicket = () => {
  const { mid } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchTicketDetails();
  }, [mid]);


  const fetchTicketDetails = async () => {
    try {
        const response = await apiService.getTicketBymodId(mid,token);
        
        setTicket(response);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlecomplete =async () =>{
    setLoading(true)
    try {
      await apiService.getupdatestatus(mid)
     
      fetchTicketDetails()
    } catch (error) {
      console.error('Error fetching ticket:', error);
      setError('Network error occurred');
    }finally{
      setLoading(false);
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'TODO':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'IN_PROGRESS':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'ASSIGNED':
        return <User className="w-5 h-5 text-purple-500" />;
      case 'CANCELLED':
        return <BanIcon className="w-5 h-5 text-red-500" />;
      case 'COMPLETED':
        return <CheckCircle className="w-5 h-5 text-green-500" />;  
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'TODO':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ASSIGNED':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';  
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 animate-pulse">Loading ticket details...</p>
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ticket Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'This ticket might have been deleted or you may not have access to it.'}</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-white text-red-500 px-6 py-3 rounded-xl hover:bg-white transition-colors duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center cursor-pointer space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors duration-200 mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{ticket.title}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(ticket.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(ticket.status)}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
                
                {ticket.priority && (
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-orange-500" />
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority} Priority
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 animate-fade-in-up delay-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <AlertCircle className="w-6 h-6 text-indigo-600" />
                <span>Description</span>
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                  {ticket.description || 'No description provided.'}
                </p>
              </div>
            </div>

            {/* AI Analysis */}
            {ticket.helpfulNotes && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-lg border border-indigo-100 p-8 animate-fade-in-up delay-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Lightbulb className="w-6 h-6 text-indigo-600" />
                  <span>AI Analysis & Helpful Notes</span>
                </h2>
                <div className="bg-white rounded-xl p-6 border border-indigo-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {ticket.helpfulNotes}
                  </p>
                </div>
              </div>
            )}

            {/* Related Skills */}
            {ticket.relatedSkills && ticket.relatedSkills.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 animate-fade-in-up delay-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Tag className="w-6 h-6 text-indigo-600" />
                  <span>Required Skills</span>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {ticket.relatedSkills.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-xl font-medium border border-indigo-200 animate-scale-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-fade-in-up delay-400">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ticket Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Created</p>
                    <p className="text-gray-900">{formatDate(ticket.createdAt)}</p>
                  </div>
                </div>

                {ticket.updatedAt && ticket.updatedAt !== ticket.createdAt && (
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Last Updated</p>
                      <p className="text-gray-900">{formatDate(ticket.updatedAt)}</p>
                    </div>
                  </div>
                )}

                {ticket.createdBy && (
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Given By</p>
                      <p className="text-gray-900">{ticket.createdBy.email}</p>
                    </div>
                  </div>
                )}

            
              </div>
            </div>

        

            {/* Action Buttons */}
            {user?.role === 'moderator' && ticket.assignedTo &&  ticket.status !== 'COMPLETED' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-fade-in-up delay-600">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Actions</h3>
                
                <div className="space-y-3">
              
                    <button className="w-full bg-green-600 text-white py-3 px-4 rounded-xl cursor-pointer hover:bg-green-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2" onClick={() => handlecomplete()} >
                      <CheckCircle className="w-4 h-4" />
                      <span>Mark as Resolved</span>
                    </button>
                  
                  
                
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style >{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out forwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }

        .prose {
          color: inherit;
        }
        
        .prose p {
          margin-bottom: 1em;
        }
      `}</style>
    </div>
    
  );
};

export default AssignedTicket;