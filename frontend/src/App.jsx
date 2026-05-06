


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateTicket from './pages/CreateTicket';
import TicketDetails from './pages/TicketDetails';
import AssignedTicket from './pages/AssignedTicket';
import EditSkills from './pages/EditSkills';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ServerDown from './pages/ServerDown';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import './App.css';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Router>
        
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/create-ticket" element={user ? <CreateTicket /> : <Navigate to="/login" />} />
          <Route path="/ticket/:id" element={user ? <TicketDetails /> : <Navigate to="/login" />} />
          <Route path="/moderator/:mid" element={user ? <AssignedTicket /> : <Navigate to="/login" />} />
          <Route path="/edit" element={user ? <EditSkills /> : <Navigate to="/login" />} />
          <Route path='*' element={<NotFound/>}/>
          <Route path="/server-down" element={<ServerDown />} />
        </Routes>
      </Router>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;