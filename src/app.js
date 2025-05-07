
// DOM Elements
const mobileToggle = document.getElementById('mobile-toggle');
const sidebar = document.querySelector('.sidebar');
const navLinks = document.querySelectorAll('.sidebar-nav a');
const pageContainer = document.getElementById('page-container');
const logoutBtn = document.getElementById('logout-btn');

// Sample data for our app
const stations = [
  {
    id: "1",
    name: "Central EV Station",
    location: "123 Downtown St, City Center",
    available: 5,
    total: 8,
    type: "Fast",
    distance: 1.2,
    description: "Our flagship charging station in the heart of downtown.",
    chargerTypes: [
      { type: "Fast DC", power: "150 kW", count: 4, available: 2 },
      { type: "Standard AC", power: "22 kW", count: 4, available: 3 },
    ],
    amenities: ["Restrooms", "Cafe", "Wifi", "Waiting Area"],
    price: 0.35
  },
  {
    id: "2",
    name: "Westside Charging Hub",
    location: "456 West Ave, Westpark",
    available: 2,
    total: 6,
    type: "Standard",
    distance: 2.5,
    description: "Convenient charging station in the Westpark area.",
    chargerTypes: [
      { type: "Standard AC", power: "22 kW", count: 6, available: 2 },
    ],
    amenities: ["Restrooms", "Convenience Store"],
    price: 0.30
  },
  {
    id: "3",
    name: "North City Chargers",
    location: "789 North Blvd, Northside",
    available: 1,
    total: 4,
    type: "Fast",
    distance: 3.7,
    description: "Fast charging options in the northern part of the city.",
    chargerTypes: [
      { type: "Fast DC", power: "100 kW", count: 2, available: 0 },
      { type: "Standard AC", power: "22 kW", count: 2, available: 1 },
    ],
    amenities: ["Restrooms", "Park Nearby"],
    price: 0.40
  }
];

const activities = [
  {
    station: "Westside Charging Hub",
    date: "Yesterday, 2:30 PM",
    energy: "35 kWh",
    cost: 8.75
  },
  {
    station: "Central EV Station",
    date: "May 5, 10:15 AM",
    energy: "42 kWh",
    cost: 14.70
  },
  {
    station: "North City Chargers",
    date: "May 2, 3:45 PM",
    energy: "28 kWh",
    cost: 11.20
  }
];

// Initialize the application
function init() {
  // Set up event listeners
  setupEventListeners();
  
  // Load default page (dashboard)
  loadPage('dashboard');
}

// Set up event listeners
function setupEventListeners() {
  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
  
  // Navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update active link
      navLinks.forEach(item => {
        item.parentElement.classList.remove('active');
      });
      link.parentElement.classList.add('active');
      
      // Load page
      const page = link.getAttribute('data-page');
      loadPage(page);
      
      // Close mobile menu
      sidebar.classList.remove('active');
    });
  });
  
  // Logout button
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Logout functionality would be implemented here');
  });
}

// Load page content
function loadPage(page) {
  switch(page) {
    case 'dashboard':
      loadDashboard();
      break;
    case 'stations':
      loadStations();
      break;
    case 'booking':
      loadBooking();
      break;
    case 'charging':
      loadCharging();
      break;
    case 'profile':
      loadProfile();
      break;
    case 'admin':
      loadAdmin();
      break;
    default:
      loadDashboard();
  }
}

// Load dashboard page
function loadDashboard() {
  const html = `
    <div class="section-header">
      <h2 class="section-title">Welcome to EV Charge Hub</h2>
      <p class="section-subtitle">Find and book charging stations near you</p>
    </div>
    
    <div class="card mb-4">
      <div class="card-header">
        <div>
          <h3 class="card-title">Active Charging</h3>
        </div>
        <div>
          <span class="badge badge-success"><i class="fas fa-bolt pulse"></i> Active</span>
        </div>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h4>Central EV Station - Port #3</h4>
            <p class="text-sm text-muted">Started at 10:30 AM</p>
          </div>
          <div class="text-right">
            <p class="font-bold text-xl">45%</p>
            <p class="text-sm text-muted">22 min</p>
          </div>
        </div>
        
        <div class="charging-progress">
          <div class="charging-progress-bar" style="width: 45%"></div>
        </div>
        
        <div class="d-flex justify-content-between mt-3">
          <div>
            <p class="text-sm text-muted">Charge Speed</p>
            <p class="font-semibold">50 kW</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-muted">Estimated Completion</p>
            <p class="font-semibold">11:15 AM</p>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-outline btn-sm">Details</button>
        <button class="btn btn-danger btn-sm">Stop Charging</button>
      </div>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <p class="stat-title">Total Energy</p>
        <p class="stat-value">245 kWh</p>
        <p class="stat-description">This month</p>
      </div>
      <div class="stat-card">
        <p class="stat-title">Sessions</p>
        <p class="stat-value">12</p>
        <p class="stat-description">This month</p>
      </div>
      <div class="stat-card">
        <p class="stat-title">CO₂ Saved</p>
        <p class="stat-value text-secondary">98 kg</p>
        <p class="stat-description">vs. gasoline</p>
      </div>
      <div class="stat-card">
        <p class="stat-title">Favorite Station</p>
        <p class="stat-value">Central EV</p>
        <p class="stat-description">6 visits</p>
      </div>
    </div>
    
    <div class="tabs">
      <div class="tab-item active" data-tab="stations-list"><i class="fas fa-list mr-1"></i> Stations List</div>
      <div class="tab-item" data-tab="map-view"><i class="fas fa-map mr-1"></i> Map View</div>
    </div>
    
    <div id="stations-list" class="tab-content active">
      <div class="row">
        ${stations.map(station => createStationCard(station)).join('')}
      </div>
    </div>
    
    <div id="map-view" class="tab-content">
      <div class="map-container">
        <div class="text-center">
          <i class="fas fa-map-marker-alt fa-3x mb-2"></i>
          <p>Map view will be integrated here</p>
        </div>
      </div>
      
      <div class="row">
        ${stations.slice(0, 3).map(station => `
          <div class="col-12 col-md-6 col-4 mb-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h4>${station.name}</h4>
                    <p class="text-sm text-muted">${station.distance.toFixed(1)} km</p>
                  </div>
                  <span class="badge ${station.type.toLowerCase() === 'fast' ? 'badge-primary' : 'badge-outline'}">${station.type}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-2">
                  <span class="text-sm">${station.available}/${station.total} available</span>
                  <a href="#" class="text-primary">Details</a>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="row mt-4">
      <div class="col-12 col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Recent Activity</h3>
            <p class="card-subtitle">Your recent charging sessions</p>
          </div>
          <div class="card-body">
            ${activities.map((activity, index) => `
              <div class="d-flex justify-content-between mb-3 ${index !== activities.length - 1 ? 'pb-3' : ''}" style="${index !== activities.length - 1 ? 'border-bottom: 1px solid var(--color-border)' : ''}">
                <div class="d-flex">
                  <div style="background-color: var(--color-accent); border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                    <i class="fas fa-charging-station text-primary"></i>
                  </div>
                  <div>
                    <p class="font-semibold">${activity.station}</p>
                    <p class="text-sm text-muted">${activity.date}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-semibold">${activity.energy}</p>
                  <p class="text-sm text-muted">$${activity.cost.toFixed(2)}</p>
                </div>
              </div>
            `).join('')}
            <button class="btn btn-outline btn-full mt-2">View All Activity</button>
          </div>
        </div>
      </div>
      
      <div class="col-12 col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Quick Stats</h3>
            <p class="card-subtitle">Your charging overview</p>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-6 mb-3">
                <p class="text-sm text-muted">Total Energy</p>
                <p class="text-2xl font-bold">245 kWh</p>
                <p class="text-sm text-muted">This month</p>
              </div>
              <div class="col-6 mb-3">
                <p class="text-sm text-muted">Sessions</p>
                <p class="text-2xl font-bold">12</p>
                <p class="text-sm text-muted">This month</p>
              </div>
              <div class="col-6">
                <p class="text-sm text-muted">CO₂ Saved</p>
                <p class="text-2xl font-bold text-secondary">98 kg</p>
                <p class="text-sm text-muted">vs. gasoline</p>
              </div>
              <div class="col-6">
                <p class="text-sm text-muted">Favorite Station</p>
                <p class="text-lg font-bold">Central EV</p>
                <p class="text-sm text-muted">6 visits</p>
              </div>
            </div>
            <button class="btn btn-outline btn-full mt-3">View Full Report</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  renderPage(html);
  setupTabs();
}

// Load stations page
function loadStations() {
  const html = `
    <div class="section-header">
      <h2 class="section-title">Charging Stations</h2>
      <p class="section-subtitle">Find available charging stations near you</p>
    </div>
    
    <div class="row mb-4">
      <div class="col-12 col-md-6">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search stations...">
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
        <div class="d-flex">
          <button class="btn btn-outline mr-2"><i class="fas fa-filter mr-1"></i> Filter</button>
          <button class="btn btn-primary"><i class="fas fa-sort-amount-down mr-1"></i> Sort</button>
        </div>
      </div>
    </div>
    
    <div class="map-container mb-4">
      <div class="text-center">
        <i class="fas fa-map-marker-alt fa-3x mb-2"></i>
        <p>Map view with station locations will be integrated here</p>
      </div>
    </div>
    
    <div class="row">
      ${stations.map(station => createStationCard(station)).join('')}
    </div>
  `;
  
  renderPage(html);
}

// Load booking page
function loadBooking() {
  const html = `
    <div class="section-header">
      <h2 class="section-title">Book a Charging Session</h2>
      <p class="section-subtitle">Reserve your charging slot in advance</p>
    </div>
    
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Select Station</h3>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">Charging Station</label>
              <select class="form-control">
                <option value="">Select a station</option>
                ${stations.map(station => `<option value="${station.id}">${station.name} - ${station.location}</option>`).join('')}
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Date</label>
              <input type="date" class="form-control">
            </div>
            
            <div class="form-group">
              <label class="form-label">Time Slot</label>
              <select class="form-control">
                <option value="">Select a time slot</option>
                <option>08:00 AM - 09:00 AM</option>
                <option>09:00 AM - 10:00 AM</option>
                <option>10:00 AM - 11:00 AM</option>
                <option>11:00 AM - 12:00 PM</option>
                <option>12:00 PM - 01:00 PM</option>
                <option>01:00 PM - 02:00 PM</option>
                <option>02:00 PM - 03:00 PM</option>
                <option>03:00 PM - 04:00 PM</option>
                <option>04:00 PM - 05:00 PM</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Charger Type</label>
              <select class="form-control">
                <option value="">Select charger type</option>
                <option>Fast DC (150 kW)</option>
                <option>Standard AC (22 kW)</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Duration (estimated)</label>
              <select class="form-control">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>1.5 hours</option>
                <option>2 hours</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-12 col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h3 class="card-title">Booking Summary</h3>
          </div>
          <div class="card-body">
            <p class="mb-3">Please select a station and time slot to see the booking summary.</p>
            
            <div class="d-flex justify-content-between mb-2">
              <span>Station fee:</span>
              <span>$0.00</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Estimated energy (40 kWh):</span>
              <span>$0.00</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Service fee:</span>
              <span>$0.00</span>
            </div>
            <div class="d-flex justify-content-between font-bold mt-3 pt-3" style="border-top: 1px solid var(--color-border)">
              <span>Total:</span>
              <span>$0.00</span>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary btn-full">Proceed to Payment</button>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Payment Methods</h3>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3 pb-2" style="border-bottom: 1px solid var(--color-border)">
              <div class="d-flex align-items-center">
                <i class="fas fa-credit-card mr-2"></i>
                <div>
                  <p class="font-semibold">Credit Card</p>
                  <p class="text-sm text-muted">**** 1234</p>
                </div>
              </div>
              <span class="badge badge-outline">Default</span>
            </div>
            
            <div class="d-flex justify-content-between align-items-center mb-3 pb-2" style="border-bottom: 1px solid var(--color-border)">
              <div class="d-flex align-items-center">
                <i class="fab fa-paypal mr-2"></i>
                <div>
                  <p class="font-semibold">PayPal</p>
                  <p class="text-sm text-muted">user@example.com</p>
                </div>
              </div>
              <button class="btn btn-sm btn-outline">Use</button>
            </div>
            
            <button class="btn btn-outline btn-full"><i class="fas fa-plus mr-1"></i> Add Payment Method</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  renderPage(html);
}

// Load charging page
function loadCharging() {
  const html = `
    <div class="section-header">
      <h2 class="section-title">Charging Status</h2>
      <p class="section-subtitle">Monitor your current and upcoming charging sessions</p>
    </div>
    
    <div class="tabs mb-4">
      <div class="tab-item active" data-tab="active-charging">Active Sessions</div>
      <div class="tab-item" data-tab="upcoming-charging">Upcoming Reservations</div>
      <div class="tab-item" data-tab="history-charging">Charging History</div>
    </div>
    
    <div id="active-charging" class="tab-content active">
      <div class="card mb-4">
        <div class="card-header">
          <div>
            <h3 class="card-title">Central EV Station - Port #3</h3>
            <p class="text-sm text-muted">Started at 10:30 AM</p>
          </div>
          <span class="badge badge-success"><i class="fas fa-bolt pulse"></i> Active</span>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="d-flex align-items-center">
              <i class="fas fa-battery-half fa-2x text-primary mr-2"></i>
              <span class="text-2xl font-bold">45%</span>
            </div>
            <div class="text-right">
              <p class="font-semibold">22 minutes</p>
              <p class="text-sm text-muted">Duration</p>
            </div>
          </div>
          
          <div class="charging-progress">
            <div class="charging-progress-bar" style="width: 45%"></div>
          </div>
          
          <div class="row mt-3">
            <div class="col-4">
              <p class="text-sm text-muted">Charge Speed</p>
              <p class="font-semibold">50 kW</p>
            </div>
            <div class="col-4">
              <p class="text-sm text-muted">Energy</p>
              <p class="font-semibold">18 kWh</p>
            </div>
            <div class="col-4">
              <p class="text-sm text-muted">Est. Completion</p>
              <p class="font-semibold">11:15 AM</p>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-outline">Station Details</button>
          <button class="btn btn-danger">Stop Charging</button>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Charging Statistics</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-6 col-md-3 mb-3">
              <p class="text-sm text-muted">Current Session</p>
              <p class="text-xl font-bold">18 kWh</p>
            </div>
            <div class="col-6 col-md-3 mb-3">
              <p class="text-sm text-muted">Estimated Cost</p>
              <p class="text-xl font-bold">$6.30</p>
            </div>
            <div class="col-6 col-md-3 mb-3">
              <p class="text-sm text-muted">Charging Rate</p>
              <p class="text-xl font-bold">50 kW</p>
            </div>
            <div class="col-6 col-md-3 mb-3">
              <p class="text-sm text-muted">CO₂ Saved</p>
              <p class="text-xl font-bold text-secondary">7.2 kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div id="upcoming-charging" class="tab-content">
      <div class="card mb-4">
        <div class="card-header">
          <div>
            <h3 class="card-title">Westside Charging Hub - Port #2</h3>
            <p class="text-sm text-muted">Reserved for: Tomorrow, 2:30 PM</p>
          </div>
          <span class="badge badge-outline"><i class="fas fa-calendar mr-1"></i> Upcoming</span>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-6 col-md-4 mb-3">
              <p class="text-sm text-muted">Date</p>
              <p class="font-semibold">May 8, 2023</p>
            </div>
            <div class="col-6 col-md-4 mb-3">
              <p class="text-sm text-muted">Time</p>
              <p class="font-semibold">2:30 PM - 4:00 PM</p>
            </div>
            <div class="col-12 col-md-4 mb-3">
              <p class="text-sm text-muted">Charger Type</p>
              <p class="font-semibold">Standard AC (22 kW)</p>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-outline">Modify</button>
          <button class="btn btn-danger">Cancel</button>
        </div>
      </div>
      
      <div class="text-center mt-4">
        <button class="btn btn-primary"><i class="fas fa-plus mr-1"></i> Book New Session</button>
      </div>
    </div>
    
    <div id="history-charging" class="tab-content">
      <div class="card mb-4">
        <div class="card-body">
          <div class="d-flex justify-content-between mb-3 pb-3" style="border-bottom: 1px solid var(--color-border)">
            <div>
              <h4>Central EV Station</h4>
              <p class="text-sm text-muted">May 5, 10:15 AM - 11:45 AM</p>
            </div>
            <div class="text-right">
              <p class="font-bold">42 kWh</p>
              <p class="text-sm text-muted">$14.70</p>
            </div>
          </div>
          
          <div class="d-flex justify-content-between mb-3 pb-3" style="border-bottom: 1px solid var(--color-border)">
            <div>
              <h4>North City Chargers</h4>
              <p class="text-sm text-muted">May 2, 3:45 PM - 5:00 PM</p>
            </div>
            <div class="text-right">
              <p class="font-bold">28 kWh</p>
              <p class="text-sm text-muted">$11.20</p>
            </div>
          </div>
          
          <div class="d-flex justify-content-between">
            <div>
              <h4>Westside Charging Hub</h4>
              <p class="text-sm text-muted">April 28, 9:00 AM - 10:30 AM</p>
            </div>
            <div class="text-right">
              <p class="font-bold">35 kWh</p>
              <p class="text-sm text-muted">$10.50</p>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-outline btn-full">View All History</button>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Monthly Summary</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-6 col-md-3 mb-3">
              <p class="text-sm text-muted">Total Energy</p>
              <p class="text-xl font-bold">245 kWh</p>
            </div>
            <div class="col-6 col-md-3 mb-3">
              <p class="text-sm text-muted">Total Cost</p>
              <p class="text-xl font-bold">$85.75</p>
            </div>
            <div class="col-6 col-md-3 mb-3">
              <p class="text-sm text-muted">Sessions</p>
              <p class="text-xl font-bold">12</p>
            </div>
            <div class="col-6 col-md-3 mb-3">
              <p class="text-sm text-muted">CO₂ Saved</p>
              <p class="text-xl font-bold text-secondary">98 kg</p>
            </div>
          </div>
          
          <div class="text-center mt-3">
            <button class="btn btn-outline">Download Invoice</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  renderPage(html);
  setupTabs();
}

// Load profile page
function loadProfile() {
  const html = `
    <div class="section-header">
      <h2 class="section-title">User Profile</h2>
      <p class="section-subtitle">Manage your account and preferences</p>
    </div>
    
    <div class="row">
      <div class="col-12 col-md-4">
        <div class="card mb-4">
          <div class="card-body text-center">
            <div style="width: 100px; height: 100px; background-color: var(--color-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
              <i class="fas fa-user fa-3x" style="color: white;"></i>
            </div>
            <h3 class="font-bold text-xl mb-1">John Doe</h3>
            <p class="text-muted mb-3">john.doe@example.com</p>
            <button class="btn btn-outline btn-sm">Edit Profile</button>
          </div>
        </div>
        
        <div class="card mb-4">
          <div class="card-header">
            <h3 class="card-title">My Vehicles</h3>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3 pb-3" style="border-bottom: 1px solid var(--color-border)">
              <div class="d-flex align-items-center">
                <div style="background-color: var(--color-accent); border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <i class="fas fa-car text-primary"></i>
                </div>
                <div>
                  <p class="font-semibold">Tesla Model 3</p>
                  <p class="text-sm text-muted">75 kWh</p>
                </div>
              </div>
              <span class="badge badge-outline">Default</span>
            </div>
            
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <div style="background-color: var(--color-accent); border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <i class="fas fa-car text-primary"></i>
                </div>
                <div>
                  <p class="font-semibold">Nissan Leaf</p>
                  <p class="text-sm text-muted">40 kWh</p>
                </div>
              </div>
              <button class="btn btn-sm btn-outline">Set Default</button>
            </div>
            
            <button class="btn btn-outline btn-full mt-3"><i class="fas fa-plus mr-1"></i> Add Vehicle</button>
          </div>
        </div>
      </div>
      
      <div class="col-12 col-md-8">
        <div class="card mb-4">
          <div class="card-header">
            <h3 class="card-title">Account Details</h3>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label class="form-label">First Name</label>
                  <input type="text" class="form-control" value="John">
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label class="form-label">Last Name</label>
                  <input type="text" class="form-control" value="Doe">
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label class="form-label">Email Address</label>
                  <input type="email" class="form-control" value="john.doe@example.com">
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label class="form-label">Phone Number</label>
                  <input type="tel" class="form-control" value="+1 (555) 123-4567">
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label class="form-label">Date of Birth</label>
                  <input type="date" class="form-control" value="1985-06-15">
                </div>
              </div>
            </div>
            
            <button class="btn btn-primary mt-2">Save Changes</button>
          </div>
        </div>
        
        <div class="card mb-4">
          <div class="card-header">
            <h3 class="card-title">Payment Methods</h3>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3 pb-2" style="border-bottom: 1px solid var(--color-border)">
              <div class="d-flex align-items-center">
                <i class="fas fa-credit-card fa-lg mr-3"></i>
                <div>
                  <p class="font-semibold">Visa ending in 1234</p>
                  <p class="text-sm text-muted">Expires 05/2025</p>
                </div>
              </div>
              <div>
                <span class="badge badge-outline mr-2">Default</span>
                <button class="btn btn-sm btn-outline">Edit</button>
              </div>
            </div>
            
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <i class="fab fa-paypal fa-lg mr-3"></i>
                <div>
                  <p class="font-semibold">PayPal</p>
                  <p class="text-sm text-muted">john.doe@example.com</p>
                </div>
              </div>
              <div>
                <button class="btn btn-sm btn-outline mr-2">Set Default</button>
                <button class="btn btn-sm btn-outline">Edit</button>
              </div>
            </div>
            
            <button class="btn btn-outline btn-full mt-3"><i class="fas fa-plus mr-1"></i> Add Payment Method</button>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Preferences</h3>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3 pb-2" style="border-bottom: 1px solid var(--color-border)">
              <div>
                <p class="font-semibold">Email Notifications</p>
                <p class="text-sm text-muted">Receive emails about bookings and promotions</p>
              </div>
              <div class="form-check form-switch">
                <input type="checkbox" checked id="emailNotif">
              </div>
            </div>
            
            <div class="d-flex justify-content-between align-items-center mb-3 pb-2" style="border-bottom: 1px solid var(--color-border)">
              <div>
                <p class="font-semibold">SMS Notifications</p>
                <p class="text-sm text-muted">Receive text messages about your charging status</p>
              </div>
              <div class="form-check form-switch">
                <input type="checkbox" id="smsNotif">
              </div>
            </div>
            
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <p class="font-semibold">Dark Mode</p>
                <p class="text-sm text-muted">Use dark theme for the application</p>
              </div>
              <div class="form-check form-switch">
                <input type="checkbox" id="darkMode">
              </div>
            </div>
            
            <button class="btn btn-primary mt-3">Save Preferences</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  renderPage(html);
}

// Load admin page
function loadAdmin() {
  const html = `
    <div class="section-header">
      <h2 class="section-title">Admin Dashboard</h2>
      <p class="section-subtitle">Manage charging stations and user data</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <p class="stat-title">Total Stations</p>
        <p class="stat-value">12</p>
        <p class="stat-description">3 inactive</p>
      </div>
      <div class="stat-card">
        <p class="stat-title">Active Users</p>
        <p class="stat-value">247</p>
        <p class="stat-description">+12% this month</p>
      </div>
      <div class="stat-card">
        <p class="stat-title">Total Revenue</p>
        <p class="stat-value">$8,459</p>
        <p class="stat-description">This month</p>
      </div>
      <div class="stat-card">
        <p class="stat-title">Total Energy</p>
        <p class="stat-value">24,180 kWh</p>
        <p class="stat-description">This month</p>
      </div>
    </div>
    
    <div class="tabs mb-4">
      <div class="tab-item active" data-tab="stations-admin">Manage Stations</div>
      <div class="tab-item" data-tab="users-admin">Manage Users</div>
      <div class="tab-item" data-tab="analytics-admin">Analytics</div>
    </div>
    
    <div id="stations-admin" class="tab-content active">
      <div class="card mb-4">
        <div class="card-header">
          <h3 class="card-title">Charging Stations</h3>
          <button class="btn btn-primary btn-sm"><i class="fas fa-plus mr-1"></i> Add Station</button>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 1px solid var(--color-border);">
                  <th style="text-align: left; padding: 10px;">Name</th>
                  <th style="text-align: left; padding: 10px;">Location</th>
                  <th style="text-align: left; padding: 10px;">Status</th>
                  <th style="text-align: center; padding: 10px;">Ports</th>
                  <th style="text-align: right; padding: 10px;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${stations.map((station, index) => `
                  <tr style="border-bottom: 1px solid var(--color-border);">
                    <td style="padding: 10px;"><strong>${station.name}</strong></td>
                    <td style="padding: 10px;">${station.location}</td>
                    <td style="padding: 10px;">
                      <span class="badge ${station.available > 0 ? 'badge-success' : 'badge-warning'}">
                        ${station.available > 0 ? 'Active' : 'Limited'}
                      </span>
                    </td>
                    <td style="text-align: center; padding: 10px;">${station.available}/${station.total}</td>
                    <td style="text-align: right; padding: 10px;">
                      <button class="btn btn-sm btn-outline">Edit</button>
                      <button class="btn btn-sm btn-outline">View</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Maintenance Alerts</h3>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between mb-3 pb-2" style="border-bottom: 1px solid var(--color-border)">
            <div>
              <p class="font-semibold">North City Chargers - Port #2</p>
              <p class="text-sm text-muted">Offline since May 6, 2023</p>
            </div>
            <span class="badge badge-danger">Critical</span>
          </div>
          
          <div class="d-flex justify-content-between mb-3 pb-2" style="border-bottom: 1px solid var(--color-border)">
            <div>
              <p class="font-semibold">Westside Charging Hub - Port #5</p>
              <p class="text-sm text-muted">Low power output detected</p>
            </div>
            <span class="badge badge-warning">Warning</span>
          </div>
          
          <div class="d-flex justify-content-between">
            <div>
              <p class="font-semibold">Central EV Station</p>
              <p class="text-sm text-muted">Scheduled maintenance: May 10, 2023</p>
            </div>
            <span class="badge badge-outline">Info</span>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-outline btn-full">View All Alerts</button>
        </div>
      </div>
    </div>
    
    <div id="users-admin" class="tab-content">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">User Management</h3>
          <div class="d-flex">
            <input type="search" class="form-control mr-2" placeholder="Search users...">
            <button class="btn btn-outline"><i class="fas fa-filter"></i></button>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 1px solid var(--color-border);">
                  <th style="text-align: left; padding: 10px;">User</th>
                  <th style="text-align: left; padding: 10px;">Email</th>
                  <th style="text-align: center; padding: 10px;">Status</th>
                  <th style="text-align: center; padding: 10px;">Sessions</th>
                  <th style="text-align: right; padding: 10px;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--color-border);">
                  <td style="padding: 10px;"><strong>John Doe</strong></td>
                  <td style="padding: 10px;">john.doe@example.com</td>
                  <td style="text-align: center; padding: 10px;">
                    <span class="badge badge-success">Active</span>
                  </td>
                  <td style="text-align: center; padding: 10px;">12</td>
                  <td style="text-align: right; padding: 10px;">
                    <button class="btn btn-sm btn-outline">View</button>
                    <button class="btn btn-sm btn-outline">Edit</button>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid var(--color-border);">
                  <td style="padding: 10px;"><strong>Jane Smith</strong></td>
                  <td style="padding: 10px;">jane.smith@example.com</td>
                  <td style="text-align: center; padding: 10px;">
                    <span class="badge badge-success">Active</span>
                  </td>
                  <td style="text-align: center; padding: 10px;">8</td>
                  <td style="text-align: right; padding: 10px;">
                    <button class="btn btn-sm btn-outline">View</button>
                    <button class="btn btn-sm btn-outline">Edit</button>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid var(--color-border);">
                  <td style="padding: 10px;"><strong>Robert Johnson</strong></td>
                  <td style="padding: 10px;">robert@example.com</td>
                  <td style="text-align: center; padding: 10px;">
                    <span class="badge badge-outline">Inactive</span>
                  </td>
                  <td style="text-align: center; padding: 10px;">3</td>
                  <td style="text-align: right; padding: 10px;">
                    <button class="btn btn-sm btn-outline">View</button>
                    <button class="btn btn-sm btn-outline">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <span class="text-sm text-muted">Showing 3 of 247 users</span>
            </div>
            <div>
              <button class="btn btn-sm btn-outline mr-1">Previous</button>
              <button class="btn btn-sm btn-outline">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div id="analytics-admin" class="tab-content">
      <div class="card mb-4">
        <div class="card-header">
          <h3 class="card-title">Usage Analytics</h3>
          <div>
            <select class="form-control">
              <option>Last 7 days</option>
              <option>This month</option>
              <option>Last month</option>
              <option>Custom range</option>
            </select>
          </div>
        </div>
        <div class="card-body">
          <div class="map-container">
            <div class="text-center">
              <i class="fas fa-chart-line fa-3x mb-2"></i>
              <p>Usage chart will be displayed here</p>
            </div>
          </div>
          
          <div class="row mt-4">
            <div class="col-12 col-md-4">
              <p class="text-sm text-muted">Total Sessions</p>
              <p class="text-2xl font-bold">583</p>
              <p class="text-sm text-success">+12.5% vs last period</p>
            </div>
            <div class="col-12 col-md-4">
              <p class="text-sm text-muted">Peak Usage Time</p>
              <p class="text-2xl font-bold">5-7 PM</p>
              <p class="text-sm text-muted">Weekdays</p>
            </div>
            <div class="col-12 col-md-4">
              <p class="text-sm text-muted">Most Popular Station</p>
              <p class="text-2xl font-bold">Central EV</p>
              <p class="text-sm text-muted">42% of all sessions</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Revenue Breakdown</h3>
        </div>
        <div class="card-body">
          <div class="map-container">
            <div class="text-center">
              <i class="fas fa-chart-pie fa-3x mb-2"></i>
              <p>Revenue chart will be displayed here</p>
            </div>
          </div>
          
          <div class="row mt-4">
            <div class="col-12 col-md-3">
              <p class="text-sm text-muted">Total Revenue</p>
              <p class="text-2xl font-bold">$8,459</p>
              <p class="text-sm text-success">+8.3% vs last month</p>
            </div>
            <div class="col-12 col-md-3">
              <p class="text-sm text-muted">Avg. Revenue per Station</p>
              <p class="text-2xl font-bold">$704.92</p>
              <p class="text-sm text-muted">This month</p>
            </div>
            <div class="col-12 col-md-3">
              <p class="text-sm text-muted">Avg. Revenue per Session</p>
              <p class="text-2xl font-bold">$14.51</p>
              <p class="text-sm text-muted">This month</p>
            </div>
            <div class="col-12 col-md-3">
              <p class="text-sm text-muted">Avg. Session Duration</p>
              <p class="text-2xl font-bold">47 mins</p>
              <p class="text-sm text-muted">This month</p>
            </div>
          </div>
          
          <button class="btn btn-outline btn-full mt-4">Download Full Report</button>
        </div>
      </div>
    </div>
  `;
  
  renderPage(html);
  setupTabs();
}

// Helper function to create station card
function createStationCard(station) {
  const availability = (station.available / station.total) * 100;
  let statusColor = "bg-danger";
  
  if (availability > 60) {
    statusColor = "bg-success";
  } else if (availability > 30) {
    statusColor = "bg-warning";
  }

  return `
    <div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="station-card">
        <div style="padding: 1rem;">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h3 class="font-bold">${station.name}</h3>
              <p class="text-sm text-muted">${station.location}</p>
            </div>
            <span class="badge ${station.type.toLowerCase() === 'fast' ? 'badge-primary' : 'badge-outline'}">
              ${station.type === 'Fast' ? `<i class="fas fa-bolt mr-1"></i>` : ''}${station.type}
            </span>
          </div>

          <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="text-sm">Availability:</div>
            <div class="d-flex align-items-center">
              <span class="h-2 w-2 rounded-full ${statusColor}" style="width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>
              <span class="font-medium">${station.available}/${station.total} ports</span>
            </div>
          </div>

          <div class="station-availability">
            <div class="station-availability-bar ${statusColor}" style="width: ${availability}%"></div>
          </div>

          <div class="text-sm text-muted mt-2">
            ${station.distance.toFixed(1)} km away
          </div>
        </div>
        
        <div style="border-top: 1px solid var(--color-border); padding: 1rem;">
          <a href="#" class="btn btn-primary btn-full">View Details</a>
        </div>
      </div>
    </div>
  `;
}

// Helper function to render page content
function renderPage(html) {
  pageContainer.innerHTML = html;
}

// Setup tab functionality
function setupTabs() {
  const tabItems = document.querySelectorAll('.tab-item');
  
  tabItems.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      
      // Update active tab
      document.querySelectorAll('.tab-item').forEach(item => {
        item.classList.remove('active');
      });
      tab.classList.add('active');
      
      // Show active content
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', init);
