// CV Storage System for Nexlify Tech
// Handles saving, retrieving, and managing created CVs

class CVStorage {
    constructor() {
        this.storageKey = 'nexlify_saved_cvs';
        this.init();
    }

    init() {
        // Initialize storage if it doesn't exist
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
    }

    // Save a CV to localStorage
    saveCV(cvData) {
        try {
            const savedCVs = this.getAllCVs();
            
            // Generate unique ID
            const cvId = 'cv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            
            const cvToSave = {
                id: cvId,
                fullName: cvData.fullName || 'Unnamed CV',
                jobTitle: cvData.jobTitle || 'No Title',
                email: cvData.email || '',
                phone: cvData.phone || '',
                createdAt: new Date().toISOString(),
                lastModified: new Date().toISOString(),
                cvHtml: cvData.cvHtml || '',
                photoDataUrl: cvData.photoDataUrl || null,
                formData: cvData.formData || {},
                isPublic: cvData.isPublic || true // Whether to show in public gallery
            };

            savedCVs.push(cvToSave);
            localStorage.setItem(this.storageKey, JSON.stringify(savedCVs));
            
            return cvId;
        } catch (error) {
            console.error('Error saving CV:', error);
            return null;
        }
    }

    // Get all saved CVs
    getAllCVs() {
        try {
            const savedCVs = localStorage.getItem(this.storageKey);
            return savedCVs ? JSON.parse(savedCVs) : [];
        } catch (error) {
            console.error('Error retrieving CVs:', error);
            return [];
        }
    }

    // Get public CVs only (for display in gallery)
    getPublicCVs() {
        return this.getAllCVs().filter(cv => cv.isPublic);
    }

    // Get a specific CV by ID
    getCVById(id) {
        const savedCVs = this.getAllCVs();
        return savedCVs.find(cv => cv.id === id);
    }

    // Update an existing CV
    updateCV(id, updatedData) {
        try {
            const savedCVs = this.getAllCVs();
            const cvIndex = savedCVs.findIndex(cv => cv.id === id);
            
            if (cvIndex !== -1) {
                savedCVs[cvIndex] = {
                    ...savedCVs[cvIndex],
                    ...updatedData,
                    lastModified: new Date().toISOString()
                };
                
                localStorage.setItem(this.storageKey, JSON.stringify(savedCVs));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating CV:', error);
            return false;
        }
    }

    // Delete a CV
    deleteCV(id) {
        try {
            const savedCVs = this.getAllCVs();
            const filteredCVs = savedCVs.filter(cv => cv.id !== id);
            localStorage.setItem(this.storageKey, JSON.stringify(filteredCVs));
            return true;
        } catch (error) {
            console.error('Error deleting CV:', error);
            return false;
        }
    }

    // Toggle CV visibility (public/private)
    toggleCVVisibility(id) {
        const cv = this.getCVById(id);
        if (cv) {
            return this.updateCV(id, { isPublic: !cv.isPublic });
        }
        return false;
    }

    // Get CV statistics
    getStats() {
        const allCVs = this.getAllCVs();
        return {
            total: allCVs.length,
            public: allCVs.filter(cv => cv.isPublic).length,
            private: allCVs.filter(cv => !cv.isPublic).length,
            recentCount: allCVs.filter(cv => {
                const createdDate = new Date(cv.createdAt);
                const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                return createdDate > weekAgo;
            }).length
        };
    }

    // Export CV data for backup
    exportData() {
        return {
            version: '1.0',
            exportDate: new Date().toISOString(),
            cvs: this.getAllCVs()
        };
    }

    // Import CV data from backup
    importData(data) {
        try {
            if (data.version && data.cvs && Array.isArray(data.cvs)) {
                localStorage.setItem(this.storageKey, JSON.stringify(data.cvs));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error importing CV data:', error);
            return false;
        }
    }

    // Clear all CVs (with confirmation)
    clearAllCVs() {
        if (confirm('Are you sure you want to delete all saved CVs? This action cannot be undone.')) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
            return true;
        }
        return false;
    }
}

// CV Gallery Display Functions
class CVGallery {
    constructor(cvStorage) {
        this.storage = cvStorage;
    }

    // Generate HTML for CV gallery
    generateGalleryHTML(cvs = null) {
        const cvsToDisplay = cvs || this.storage.getPublicCVs();
        
        if (cvsToDisplay.length === 0) {
            return `
                <div class="no-cvs-message">
                    <div style="text-align: center; padding: 40px; color: #666;">
                        <h3>No CVs Found</h3>
                        <p>No CVs have been created yet. <a href="cv-creator.html" style="color: #1BA098;">Create your first CV</a> to get started!</p>
                    </div>
                </div>
            `;
        }

        let galleryHTML = `
            <div class="cv-gallery-header" style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #06142E; margin-bottom: 10px;">Our Team's CVs</h2>
                <p style="color: #666; font-size: 1.1em;">Discover the talents and expertise of our associates</p>
                <div class="cv-stats" style="margin-top: 20px; display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                    <div style="text-align: center;">
                        <div style="font-size: 2em; font-weight: bold; color: #1BA098;">${cvsToDisplay.length}</div>
                        <div style="color: #666; font-size: 0.9em;">Total CVs</div>
                    </div>
                </div>
            </div>
            <div class="cv-gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-bottom: 40px;">
        `;

        cvsToDisplay.forEach(cv => {
            const createdDate = new Date(cv.createdAt).toLocaleDateString();
            const photoDisplay = cv.photoDataUrl ? 
                `<img src="${cv.photoDataUrl}" alt="${cv.fullName}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid #1BA098;">` :
                `<div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #1BA098, #06142E); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5em; font-weight: bold;">${cv.fullName.charAt(0)}</div>`;

            galleryHTML += `
                <div class="cv-gallery-card" style="background: white; border-radius: 15px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer;" 
                     onclick="viewSavedCV('${cv.id}')">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        ${photoDisplay}
                        <div style="margin-left: 15px; flex: 1;">
                            <h3 style="margin: 0; color: #06142E; font-size: 1.2em;">${cv.fullName}</h3>
                            <p style="margin: 5px 0 0 0; color: #1BA098; font-weight: 500;">${cv.jobTitle}</p>
                        </div>
                    </div>
                    <div style="color: #666; font-size: 0.9em; margin-bottom: 15px;">
                        <div style="margin-bottom: 5px;">📧 ${cv.email || 'No email provided'}</div>
                        <div style="margin-bottom: 5px;">📱 ${cv.phone || 'No phone provided'}</div>
                        <div>📅 Created: ${createdDate}</div>
                    </div>
                    <div style="display: flex; gap: 10px; margin-top: 15px;">
                        <button class="btn" style="flex: 1; padding: 8px 12px; background: #1BA098; color: white; border: none; border-radius: 5px; font-size: 0.9em; cursor: pointer;"
                                onclick="event.stopPropagation(); viewSavedCV('${cv.id}')">
                            👁️ View CV
                        </button>
                        <button class="btn" style="flex: 1; padding: 8px 12px; background: #06142E; color: white; border: none; border-radius: 5px; font-size: 0.9em; cursor: pointer;"
                                onclick="event.stopPropagation(); downloadSavedCV('${cv.id}')">
                            📥 Download
                        </button>
                    </div>
                </div>
            `;
        });

        galleryHTML += '</div>';
        return galleryHTML;
    }

    // Load and display gallery in a container
    loadGallery(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = this.generateGalleryHTML();
            this.addGalleryStyles();
        }
    }

    // Add responsive styles for the gallery
    addGalleryStyles() {
        if (!document.getElementById('cv-gallery-styles')) {
            const style = document.createElement('style');
            style.id = 'cv-gallery-styles';
            style.textContent = `
                .cv-gallery-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
                }
                
                .cv-gallery-card .btn:hover {
                    opacity: 0.9;
                    transform: scale(1.02);
                }
                
                @media (max-width: 768px) {
                    .cv-gallery-grid {
                        grid-template-columns: 1fr !important;
                        gap: 15px !important;
                    }
                    
                    .cv-stats {
                        gap: 20px !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Global functions for CV operations
function viewSavedCV(cvId) {
    const storage = new CVStorage();
    const cv = storage.getCVById(cvId);
    
    if (cv && cv.cvHtml) {
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='UTF-8'>
                <title>${cv.fullName} - CV</title>
                <style>
                    body { font-family: 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
                    .cv-document-professional { display: grid; grid-template-columns: 300px 1fr; max-width: 900px; margin: 0 auto; background: white; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
                    .cv-left-column { background: #2c3e50; color: white; padding: 30px; }
                    .cv-right-column { padding: 30px; background: white; }
                    .cv-profile-photo { width: 120px; height: 120px; border-radius: 50%; margin-bottom: 20px; border: 4px solid white; }
                    .cv-name-left { font-size: 1.8em; font-weight: bold; margin: 10px 0; }
                    .cv-title-left { font-size: 1.1em; margin-bottom: 20px; opacity: 0.9; }
                    .cv-section-title-left { color: #3498db; font-size: 1em; font-weight: bold; margin: 20px 0 10px 0; border-bottom: 2px solid #3498db; padding-bottom: 5px; }
                    .cv-section-title-right { color: #2c3e50; font-size: 1.1em; font-weight: bold; margin: 20px 0 10px 0; border-bottom: 2px solid #3498db; padding-bottom: 5px; }
                    .contact-item-left { margin: 8px 0; font-size: 0.9em; display: flex; align-items: center; gap: 8px; }
                    .contact-link { color: white; text-decoration: none; transition: all 0.3s ease; }
                    .contact-link:hover { color: #3498db; text-decoration: underline; }
                    .cv-logo-section { margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2); text-align: center; }
                    .cv-logo { width: 60px; height: 60px; border-radius: 8px; margin-bottom: 10px; object-fit: contain; background: white; padding: 5px; box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
                    .cv-logo-title { font-size: 0.9em; font-weight: bold; margin: 5px 0; color: #3498db; }
                    .cv-logo-tagline { font-size: 0.7em; margin: 0; opacity: 0.8; font-style: italic; }
                    .skill-badge { display: inline-block; background: #3498db; color: white; padding: 4px 8px; margin: 2px; border-radius: 12px; font-size: 0.8em; }
                    .language-item, .interest-item { margin: 5px 0; font-size: 0.9em; }
                    .summary-text-right { line-height: 1.6; margin: 10px 0; }
                    .exp-item, .edu-item, .project-item, .cert-item, .award-item { margin: 10px 0; line-height: 1.5; border-left: 3px solid #3498db; padding-left: 10px; }
                    @media (max-width: 768px) {
                        .cv-document-professional { grid-template-columns: 1fr; }
                        .cv-left-column, .cv-right-column { padding: 20px; }
                    }
                </style>
            </head>
            <body>
                ${cv.cvHtml}
            </body>
            </html>
        `);
        newWindow.document.close();
    } else {
        alert('CV not found or corrupted.');
    }
}

function downloadSavedCV(cvId) {
    const storage = new CVStorage();
    const cv = storage.getCVById(cvId);
    
    if (cv && cv.cvHtml) {
        const htmlContent = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>${cv.fullName} - CV</title><style>body{font-family:'Segoe UI',sans-serif;margin:0;padding:20px;background:#f5f5f5;} .cv-document-professional{display:grid;grid-template-columns:300px 1fr;max-width:900px;margin:0 auto;background:white;box-shadow:0 4px 20px rgba(0,0,0,0.1);} .cv-left-column{background:#2c3e50;color:white;padding:30px;} .cv-right-column{padding:30px;background:white;} .cv-profile-photo{width:120px;height:120px;border-radius:50%;margin-bottom:20px;border:4px solid white;} .cv-name-left{font-size:1.8em;font-weight:bold;margin:10px 0;} .cv-title-left{font-size:1.1em;margin-bottom:20px;opacity:0.9;} .cv-section-title-left{color:#3498db;font-size:1em;font-weight:bold;margin:20px 0 10px 0;border-bottom:2px solid #3498db;padding-bottom:5px;} .cv-section-title-right{color:#2c3e50;font-size:1.1em;font-weight:bold;margin:20px 0 10px 0;border-bottom:2px solid #3498db;padding-bottom:5px;} .contact-item-left{margin:8px 0;font-size:0.9em;display:flex;align-items:center;gap:8px;} .contact-link{color:white;text-decoration:none;transition:all 0.3s ease;} .contact-link:hover{color:#3498db;text-decoration:underline;} .cv-logo-section{margin-top:30px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.2);text-align:center;} .cv-logo{width:60px;height:60px;border-radius:8px;margin-bottom:10px;object-fit:contain;background:white;padding:5px;box-shadow:0 2px 8px rgba(0,0,0,0.2);} .cv-logo-title{font-size:0.9em;font-weight:bold;margin:5px 0;color:#3498db;} .cv-logo-tagline{font-size:0.7em;margin:0;opacity:0.8;font-style:italic;} .skill-badge{display:inline-block;background:#3498db;color:white;padding:4px 8px;margin:2px;border-radius:12px;font-size:0.8em;} .language-item,.interest-item{margin:5px 0;font-size:0.9em;} .summary-text-right{line-height:1.6;margin:10px 0;} .exp-item,.edu-item,.project-item,.cert-item,.award-item{margin:10px 0;line-height:1.5;border-left:3px solid #3498db;padding-left:10px;} @media (max-width: 768px) { .cv-document-professional { grid-template-columns: 1fr; } .cv-left-column, .cv-right-column { padding: 20px; } } </style></head><body>${cv.cvHtml}</body></html>`;
        
        const blob = new Blob([htmlContent], {type: 'text/html'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${cv.fullName.replace(/[^a-z0-9]/gi, '_')}_CV.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else {
        alert('CV not found or corrupted.');
    }
}

// Initialize storage when script loads
window.cvStorage = new CVStorage();
window.cvGallery = new CVGallery(window.cvStorage);
