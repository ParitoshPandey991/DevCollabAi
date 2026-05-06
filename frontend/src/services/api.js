const API_BASE = import.meta.env.VITE_API_BASE;

class APIService {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const url = `${API_BASE}${endpoint}`;

    console.log('dhfhhf', API_BASE, url);
    
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }


    
    const response = await fetch(url, config);
    const data = await response.json();
    console.log('responsewwww:',data)
    if (!response.ok) {
      window.location.href = '/server-down'
    }

    return data;
  }

  // Auth endpoints
  login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  }

  signup(userData) {
  
    
    return this.request('/auth/signup', {
      method: 'POST',
      body: userData,
    });
  }

  logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  updateUser(userData) {
    return this.request('/auth/updateuser', {
      method: 'POST',
      body: userData,
    });
  }

  // Ticket endpoints
  createTicket(ticketData) {
    return this.request('/ticket', {
      method: 'POST',
      body: ticketData,
    });
  }

  getUserTickets() {
    return this.request('/ticket/all');
  }

  getTicketById(id) {
    return this.request(`/ticket/${encodeURIComponent(id)}`);
  }

    getTicketBymodId(mid) {
    return this.request(`/ticket/moderator/${encodeURIComponent(mid)}`);
  }

  getupdatestatus(mid){
    return this.request(`/auth/updatestatus/${encodeURIComponent(mid)}`,{
      method:"POST"
    })
  }

  updateuser(userData){
    return this.request("/auth/update-user",{
      method:"POST",
      body:userData
    })
  }

  getAssignedTickets() {
    return this.request('/ticket/assigned');
  }

  getuser(){
    return this.request('/auth/getuser')
  }
}

export default new APIService();
