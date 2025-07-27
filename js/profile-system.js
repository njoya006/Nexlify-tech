/**
 * Profile System - Loads and displays team members from associates.json
 * This system loads associates data and displays it in team sections across the website
 */

class ProfileManager {
    constructor() {
        this.associates = [];
        this.localStorageKey = 'nexlify_associates';
    }

    /**
     * Initialize the profile system
     */
    async init() {
        await this.loadAssociates();
        this.displayTeamMembers();
    }

    /**
     * Load associates from associates.json and localStorage
     */
    async loadAssociates() {
        try {
            // Load from associates.json file
            const response = await fetch('./associates.json');
            if (response.ok) {
                const jsonAssociates = await response.json();
                this.associates = [...jsonAssociates];
            }

            // Load additional associates from localStorage (saved through portal)
            const localAssociates = localStorage.getItem(this.localStorageKey);
            if (localAssociates) {
                const parsedLocal = JSON.parse(localAssociates);
                // Merge with existing associates, avoiding duplicates
                parsedLocal.forEach(localAssociate => {
                    const existingIndex = this.associates.findIndex(a => a.name === localAssociate.name);
                    if (existingIndex >= 0) {
                        // Update existing associate with localStorage data
                        this.associates[existingIndex] = localAssociate;
                    } else {
                        // Add new associate from localStorage
                        this.associates.push(localAssociate);
                    }
                });
            }

            console.log('Loaded associates:', this.associates);
        } catch (error) {
            console.error('Error loading associates:', error);
            // Fallback to localStorage only if JSON fails
            const localAssociates = localStorage.getItem(this.localStorageKey);
            if (localAssociates) {
                this.associates = JSON.parse(localAssociates);
            }
        }
    }

    /**
     * Display team members in the appropriate sections
     */
    displayTeamMembers() {
        // Display in about page team section
        this.displayInAboutPage();
        
        // Display in homepage team section
        this.displayInHomepage();
    }

    /**
     * Display team members in about page
     */
    displayInAboutPage() {
        const aboutTeamContainer = document.getElementById('about-team-members');
        if (aboutTeamContainer) {
            aboutTeamContainer.innerHTML = this.generateTeamHTML();
            console.log('Team members displayed in about page');
        }
    }

    /**
     * Display team members in homepage
     */
    displayInHomepage() {
        const homeTeamContainer = document.getElementById('dynamic-team-members');
        if (homeTeamContainer) {
            homeTeamContainer.innerHTML = this.generateTeamHTML();
            console.log('Team members displayed in homepage');
        }
    }

    /**
     * Generate HTML for team members
     */
    generateTeamHTML() {
        if (this.associates.length === 0) {
            return '<p style="text-align: center; color: #666; font-style: italic;">No team members found. Associates can add their profiles through our portal.</p>';
        }

        return this.associates.map(associate => this.createMemberCard(associate)).join('');
    }

    /**
     * Create individual member card HTML
     */
    createMemberCard(associate) {
        const photoSrc = associate.photo ? `./images/${associate.photo}` : './images/default-avatar.jpg';
        
        return `
            <div class="team-member-card" style="
                background: white;
                border-radius: 15px;
                padding: 30px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                text-align: center;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                border: 1px solid #eee;
            " onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.15)'" 
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 20px rgba(0,0,0,0.1)'">
                
                <div style="margin-bottom: 20px;">
                    <img src="${photoSrc}" 
                         alt="${associate.name}" 
                         style="
                            width: 120px;
                            height: 120px;
                            border-radius: 50%;
                            object-fit: cover;
                            border: 4px solid #1BA098;
                            margin-bottom: 15px;
                         "
                         onerror="this.src='./images/default-avatar.jpg'">
                </div>
                
                <h3 style="
                    color: #06142E;
                    margin-bottom: 10px;
                    font-size: 1.4em;
                    font-weight: 600;
                ">${associate.name}</h3>
                
                <p style="
                    color: #1BA098;
                    font-weight: 500;
                    margin-bottom: 15px;
                    font-size: 1.1em;
                ">${associate.role}</p>
                
                <p style="
                    color: #666;
                    line-height: 1.6;
                    margin-bottom: 20px;
                    font-size: 0.95em;
                ">${associate.bio}</p>
                
                <div class="social-links" style="
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    flex-wrap: wrap;
                ">
                    ${this.generateSocialLinks(associate)}
                </div>
            </div>
        `;
    }

    /**
     * Generate social media links
     */
    generateSocialLinks(associate) {
        let links = [];
        
        if (associate.linkedin) {
            links.push(`
                <a href="${associate.linkedin}" target="_blank" rel="noopener noreferrer" 
                   style="
                        background: #0077B5;
                        color: white;
                        padding: 8px 12px;
                        border-radius: 5px;
                        text-decoration: none;
                        font-size: 0.9em;
                        transition: background 0.3s ease;
                   "
                   onmouseover="this.style.background='#005885'"
                   onmouseout="this.style.background='#0077B5'">
                    LinkedIn
                </a>
            `);
        }
        
        if (associate.whatsapp) {
            links.push(`
                <a href="${associate.whatsapp}" target="_blank" rel="noopener noreferrer"
                   style="
                        background: #25D366;
                        color: white;
                        padding: 8px 12px;
                        border-radius: 5px;
                        text-decoration: none;
                        font-size: 0.9em;
                        transition: background 0.3s ease;
                   "
                   onmouseover="this.style.background='#1eb757'"
                   onmouseout="this.style.background='#25D366'">
                    WhatsApp
                </a>
            `);
        }
        
        if (associate.x) {
            links.push(`
                <a href="${associate.x}" target="_blank" rel="noopener noreferrer"
                   style="
                        background: #1DA1F2;
                        color: white;
                        padding: 8px 12px;
                        border-radius: 5px;
                        text-decoration: none;
                        font-size: 0.9em;
                        transition: background 0.3s ease;
                   "
                   onmouseover="this.style.background='#0d8bd9'"
                   onmouseout="this.style.background='#1DA1F2'">
                    X (Twitter)
                </a>
            `);
        }
        
        return links.join('');
    }

    /**
     * Refresh team display (useful after new associate saves through portal)
     */
    async refresh() {
        await this.loadAssociates();
        this.displayTeamMembers();
    }
}

// Initialize the profile system when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const profileManager = new ProfileManager();
    await profileManager.init();
    
    // Make it globally available for refreshing from associates portal
    window.profileManager = profileManager;
});

// Export for module use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfileManager;
}
