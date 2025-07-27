// Nexlify Tech Dynamic Profile System
// This system manages associate profiles and dynamically updates all website sections

class ProfileManager {
  constructor() {
    this.associates = this.loadAssociates();
    this.init();
  }

  // Load associates data (in production, this would come from a database)
  loadAssociates() {
    const defaultAssociates = [
      {
        id: 1,
        fullName: "Njoya Perfect",
        email: "njoya@nexlifytech.com",
        phone: "+237 683821011",
        location: "Yaoundé, Cameroon",
        jobTitle: "Co-founder & Backend Developer",
        department: "Development",
        experience: "7-10",
        linkedin: "https://linkedin.com/in/njoyaperfect",
        bio: "Expert in Django, PostgreSQL, Security, and API Optimization. Passionate about building secure, scalable backend systems that power modern businesses. 7+ years of experience in full-stack development with a focus on robust architectures.",
        skills: ["Django", "Python", "PostgreSQL", "API Development", "Security", "Docker", "AWS", "Redis"],
        joinDate: "2025-01-01",
        isFounder: true,
        status: "active",
        profileImage: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='%23E0E7FF'/><text x='50' y='55' text-anchor='middle' font-size='24' fill='%236B7280'>NP</text></svg>",
        projects: [
          { name: "Nexlify Shop", status: "active", role: "Backend Lead" },
          { name: "Client Portal", status: "active", role: "System Architect" },
          { name: "API Gateway", status: "planning", role: "Technical Lead" }
        ],
        achievements: [
          "Built secure API serving 10k+ requests daily",
          "Reduced server response time by 40%",
          "Led team of 3 developers on enterprise project"
        ]
      },
      {
        id: 2,
        fullName: "Sarah Johnson",
        email: "sarah@nexlifytech.com",
        phone: "+237 683821011",
        location: "Douala, Cameroon",
        jobTitle: "Frontend Developer",
        department: "Development", 
        experience: "4-6",
        linkedin: "https://linkedin.com/in/sarahjohnson",
        bio: "Passionate frontend developer with 5+ years of experience creating beautiful, responsive web applications. I specialize in React, JavaScript, and modern CSS frameworks. I love turning complex problems into simple, beautiful designs that users love.",
        skills: ["React", "JavaScript", "CSS", "HTML", "TypeScript", "Figma", "Git", "Responsive Design"],
        joinDate: "2025-02-15",
        isFounder: true,
        status: "active", 
        profileImage: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='%23FEF3C7'/><text x='50' y='55' text-anchor='middle' font-size='24' fill='%236B7280'>SJ</text></svg>",
        projects: [
          { name: "Nexlify Shop", status: "active", role: "Lead Frontend" },
          { name: "Client Portal", status: "active", role: "UI Developer" },
          { name: "Company Website", status: "completed", role: "Frontend Developer" }
        ],
        achievements: [
          "Improved website performance by 60%",
          "Created reusable component library",
          "Designed mobile-first responsive interfaces"
        ]
      }
    ];

    // Try to load from localStorage, fallback to default
    const saved = localStorage.getItem('nexlify_associates');
    return saved ? JSON.parse(saved) : defaultAssociates;
  }

  // Save associates to localStorage (in production, this would save to database)
  saveAssociates() {
    localStorage.setItem('nexlify_associates', JSON.stringify(this.associates));
  }

  // Initialize the system
  init() {
    this.updateAllSections();
    this.setupEventListeners();
  }

  // Add new associate
  addAssociate(associateData) {
    const newAssociate = {
      id: this.generateId(),
      ...associateData,
      joinDate: new Date().toISOString().split('T')[0],
      isFounder: false,
      status: 'pending',
      projects: [],
      achievements: []
    };
    
    this.associates.push(newAssociate);
    this.saveAssociates();
    this.updateAllSections();
    return newAssociate;
  }

  // Update associate profile
  updateAssociate(id, updateData) {
    const index = this.associates.findIndex(a => a.id === id);
    if (index !== -1) {
      this.associates[index] = { ...this.associates[index], ...updateData };
      this.saveAssociates();
      this.updateAllSections();
      return this.associates[index];
    }
    return null;
  }

  // Remove associate
  removeAssociate(id) {
    this.associates = this.associates.filter(a => a.id !== id);
    this.saveAssociates();
    this.updateAllSections();
  }

  // Get associate by ID
  getAssociate(id) {
    return this.associates.find(a => a.id === id);
  }

  // Get all active associates
  getActiveAssociates() {
    return this.associates.filter(a => a.status === 'active');
  }

  // Generate unique ID
  generateId() {
    return Math.max(...this.associates.map(a => a.id), 0) + 1;
  }

  // Update all website sections that display associates
  updateAllSections() {
    this.updateTeamSection();
    this.updateAboutPage();
    this.updateCVPage();
    this.updateProjectsPage();
  }

  // Update team section on homepage
  updateTeamSection() {
    const teamContainer = document.getElementById('team-members');
    if (!teamContainer) return;

    const activeAssociates = this.getActiveAssociates();
    
    teamContainer.innerHTML = activeAssociates.map(associate => {
      const initials = associate.fullName.split(' ').map(n => n[0]).join('');
      const skillsBadges = associate.skills.slice(0, 3).map(skill => 
        `<span class="skill-badge">${skill}</span>`
      ).join('');

      return `
        <div class="team-member" data-aos="fade-up" style="text-align: center; position: relative;">
          <div class="member-avatar" style="width: 120px; height: 120px; margin: 0 auto 25px; border-radius: 50%; overflow: hidden; box-shadow: 0 8px 25px rgba(27, 160, 152, 0.3);">
            ${associate.profileImage ? 
              `<img src="${associate.profileImage}" alt="${associate.fullName}" style="width: 100%; height: 100%; object-fit: cover;">` : 
              `<div class="avatar-placeholder" style="width: 100%; height: 100%; background: linear-gradient(135deg, #1BA098, #06142E); display: flex; align-items: center; justify-content: center; font-size: 3em; color: white;">${associate.fullName.includes('Njoya') ? '👨‍💻' : '👩‍💻'}</div>`
            }
          </div>
          <h3 style="margin-bottom: 10px; font-size: 1.5em;">${associate.fullName}</h3>
          <p style="color: #1BA098; font-weight: bold; margin-bottom: 15px;">${associate.jobTitle}</p>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">${associate.bio.substring(0, 120)}...</p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin: 20px 0;">
            ${skillsBadges}
            ${associate.skills.length > 3 ? `<span class="skill-badge">+${associate.skills.length - 3}</span>` : ''}
          </div>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <a href="cv.html#${associate.id}" class="btn">View CV</a>
            <a href="mailto:${associate.email}" style="background: transparent; border: 2px solid #1BA098; color: #1BA098;" class="btn">Contact</a>
          </div>
        </div>
      `;
    }).join('');
  }

  // Update about page team section
  updateAboutPage() {
    const aboutTeamContainer = document.getElementById('about-team-members');
    if (!aboutTeamContainer) return;

    const activeAssociates = this.getActiveAssociates();
    
    aboutTeamContainer.innerHTML = activeAssociates.map(associate => {
      const initials = associate.fullName.split(' ').map(n => n[0]).join('');
      
      return `
        <div class="team-member">
          <div style="display: flex; align-items: flex-start; gap: 30px; margin-bottom: 20px;">
            <div style="flex-shrink: 0;">
              <div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                ${associate.profileImage ? 
                  `<img src="${associate.profileImage}" alt="${associate.fullName}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                  `<div style="width: 100%; height: 100%; background: linear-gradient(135deg, #1BA098, #06142E); display: flex; align-items: center; justify-content: center; color: white; font-size: 2.5em;">${associate.fullName.includes('Njoya') ? '👨‍💻' : '👩‍💻'}</div>`
                }
              </div>
            </div>
            <div style="flex: 1;">
              <h3>${associate.fullName}</h3>
              <p style="color: #1BA098; font-weight: bold; margin-bottom: 10px;">${associate.jobTitle}</p>
              <p style="color: #666; margin-bottom: 15px;">${this.formatExperience(associate.experience)} experience</p>
              <p style="line-height: 1.6; margin-bottom: 20px;">${associate.bio}</p>
              <div style="margin-bottom: 20px;">
                <strong>Expertise:</strong>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  ${associate.skills.slice(0, 6).map(skill => `<li>${skill}</li>`).join('')}
                </ul>
              </div>
              ${associate.achievements && associate.achievements.length > 0 ? `
                <div>
                  <strong>Key Achievements:</strong>
                  <ul style="margin: 10px 0; padding-left: 20px;">
                    ${associate.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
              <a href="cv.html#${associate.id}" class="btn" style="margin-top: 15px;">View CV</a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Update CV page
  updateCVPage() {
    const cvContainer = document.getElementById('cv-profiles');
    if (!cvContainer) return;

    const activeAssociates = this.getActiveAssociates();
    
    cvContainer.innerHTML = activeAssociates.map(associate => {
      const initials = associate.fullName.split(' ').map(n => n[0]).join('');
      
      return `
        <div class="cv-card">
          <div class="cv-header">
            <div class="cv-photo">
              ${associate.profileImage ? 
                `<img src="${associate.profileImage}" alt="${associate.fullName}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                `<div class="cv-avatar" style="background: linear-gradient(135deg, #1BA098, #06142E); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.5em;">${associate.fullName.includes('Njoya') ? '👨‍💻' : '👩‍💻'}</div>`
              }
            </div>
            <div class="cv-info">
              <h3>${associate.fullName}</h3>
              <p class="cv-title">${associate.jobTitle}</p>
              <p class="cv-location">📍 ${associate.location || 'Cameroon'}</p>
            </div>
          </div>
          <div class="cv-content">
            <div class="cv-section">
              <h4>Professional Summary</h4>
              <p>${associate.bio}</p>
            </div>
            <div class="cv-section">
              <h4>Technical Skills</h4>
              <div class="cv-skills">
                ${associate.skills.map(skill => `<span class="cv-skill">${skill}</span>`).join('')}
              </div>
            </div>
            <div class="cv-section">
              <h4>Current Projects</h4>
              <ul class="cv-projects">
                ${associate.projects.map(project => 
                  `<li><strong>${project.name}</strong> - ${project.role} (${project.status})</li>`
                ).join('')}
              </ul>
            </div>
            <div class="cv-contact">
              <p>📧 ${associate.email}</p>
              ${associate.phone ? `<p>📞 ${associate.phone}</p>` : ''}
              ${associate.linkedin ? `<p>💼 <a href="${associate.linkedin}" target="_blank">LinkedIn Profile</a></p>` : ''}
            </div>
          </div>
          <div class="cv-actions">
            <button class="btn btn-outline" onclick="downloadCV('${associate.id}')">📄 Download CV</button>
            <button class="btn btn-primary" onclick="contactAssociate('${associate.email}')">📧 Contact</button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Update projects page with team assignments
  updateProjectsPage() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    // Group associates by their projects
    const projectTeams = {};
    this.getActiveAssociates().forEach(associate => {
      associate.projects.forEach(project => {
        if (!projectTeams[project.name]) {
          projectTeams[project.name] = [];
        }
        projectTeams[project.name].push({
          associate: associate,
          role: project.role,
          status: project.status
        });
      });
    });

    // Update existing project cards with team information
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      const projectName = card.querySelector('h3')?.textContent;
      if (projectName && projectTeams[projectName]) {
        const teamSection = card.querySelector('.project-team') || document.createElement('div');
        teamSection.className = 'project-team';
        
        teamSection.innerHTML = `
          <h4>Team Members:</h4>
          <div class="team-avatars">
            ${projectTeams[projectName].map(member => {
              const initials = member.associate.fullName.split(' ').map(n => n[0]).join('');
              return `
                <div class="team-avatar" title="${member.associate.fullName} - ${member.role}">
                  ${member.associate.profileImage ? 
                    `<img src="${member.associate.profileImage}" alt="${member.associate.fullName}">` : 
                    `<span>${initials}</span>`
                  }
                </div>
              `;
            }).join('')}
          </div>
        `;
        
        if (!card.querySelector('.project-team')) {
          card.appendChild(teamSection);
        }
      }
    });
  }

  // Format experience text
  formatExperience(experience) {
    const expMap = {
      '0-1': '0-1 years',
      '2-3': '2-3 years', 
      '4-6': '4-6 years',
      '7-10': '7-10 years',
      '10+': '10+ years'
    };
    return expMap[experience] || experience;
  }

  // Setup event listeners
  setupEventListeners() {
    // Listen for form submissions from associate portal
    document.addEventListener('associateProfileUpdated', (event) => {
      const { associateId, profileData } = event.detail;
      this.updateAssociate(associateId, profileData);
    });

    // Listen for admin actions
    document.addEventListener('adminAssociateAction', (event) => {
      const { action, associateId, data } = event.detail;
      
      switch(action) {
        case 'add':
          this.addAssociate(data);
          break;
        case 'update':
          this.updateAssociate(associateId, data);
          break;
        case 'remove':
          this.removeAssociate(associateId);
          break;
        case 'activate':
          this.updateAssociate(associateId, { status: 'active' });
          break;
        case 'deactivate':
          this.updateAssociate(associateId, { status: 'inactive' });
          break;
      }
    });
  }
}

// Authentication & Access Control
class AccessManager {
  constructor() {
    this.currentUser = this.getCurrentUser();
  }

  // Get current user from session/localStorage
  getCurrentUser() {
    const saved = localStorage.getItem('nexlify_current_user');
    return saved ? JSON.parse(saved) : null;
  }

  // Login user
  login(email, password, role = 'associate') {
    // In production, this would validate against a secure backend
    if (role === 'admin' && email === 'njoya@nexlifytech.com') {
      const user = {
        id: 1,
        email: email,
        role: 'admin',
        fullName: 'Njoya Perfect',
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('nexlify_current_user', JSON.stringify(user));
      return user;
    } else {
      // For associates, find in the associates list
      const profileManager = new ProfileManager();
      const associate = profileManager.associates.find(a => a.email === email);
      if (associate) {
        const user = {
          id: associate.id,
          email: email,
          role: 'associate',
          fullName: associate.fullName,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('nexlify_current_user', JSON.stringify(user));
        return user;
      }
    }
    return null;
  }

  // Logout user
  logout() {
    localStorage.removeItem('nexlify_current_user');
    this.currentUser = null;
  }

  // Check if user has admin access
  isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  // Check if user can edit profile
  canEditProfile(associateId) {
    if (!this.currentUser) return false;
    return this.currentUser.role === 'admin' || this.currentUser.id === associateId;
  }
}

// Utility functions for website interactions
function downloadCV(associateId) {
  const profileManager = new ProfileManager();
  const associate = profileManager.getAssociate(parseInt(associateId));
  
  if (associate) {
    // In production, this would generate and download a PDF CV
    alert(`Downloading CV for ${associate.fullName}...\n\nThis would generate a PDF with their complete profile information.`);
  }
}

function contactAssociate(email) {
  window.location.href = `mailto:${email}?subject=Inquiry from Nexlify Tech Website`;
}

// Initialize the system when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Initialize profile management system
  window.profileManager = new ProfileManager();
  window.accessManager = new AccessManager();
  
  // Add some CSS for dynamic elements if not already present
  if (!document.getElementById('dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'dynamic-styles';
    style.textContent = `
      .team-member .member-avatar .avatar-placeholder,
      .team-member-detailed .photo-placeholder,
      .cv-card .cv-avatar {
        background: linear-gradient(135deg, #1BA098, #06142E);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
      
      .project-team {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #e1e8ed;
      }
      
      .project-team h4 {
        font-size: 1em;
        color: #06142E;
        margin-bottom: 10px;
      }
      
      .team-avatars {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }
      
      .team-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #1BA098, #06142E);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 0.9em;
        cursor: pointer;
        transition: transform 0.3s ease;
      }
      
      .team-avatar:hover {
        transform: scale(1.1);
      }
      
      .team-avatar img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
      
      .skill-badge, .skill-tag, .cv-skill {
        background: #e7f3ff;
        color: #0366d6;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.8em;
        font-weight: 500;
        margin: 2px;
        display: inline-block;
      }
      
      .member-achievements ul {
        padding-left: 20px;
        margin-top: 10px;
      }
      
      .member-achievements li {
        margin-bottom: 5px;
        color: #666;
      }
      
      .cv-projects {
        padding-left: 20px;
      }
      
      .cv-projects li {
        margin-bottom: 8px;
      }
    `;
    document.head.appendChild(style);
  }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ProfileManager, AccessManager };
}
