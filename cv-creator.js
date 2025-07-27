// CV Creator JS - Professional Design based on sample_cv.jpg

// Load CV storage system
const cvStorage = new CVStorage();

document.getElementById('generateBtn').addEventListener('click', function() {
    const fullName = document.getElementById('fullName').value || 'Your Name';
    const jobTitle = document.getElementById('jobTitle').value || 'Your Job Title';
    const email = document.getElementById('email').value || '';
    const phone = document.getElementById('phone').value || '';
    const location = document.getElementById('location').value || '';
    const linkedin = document.getElementById('linkedin').value || '';
    const github = document.getElementById('github').value || '';
    const website = document.getElementById('website').value || '';
    const twitter = document.getElementById('twitter').value || '';
    const stackoverflow = document.getElementById('stackoverflow').value || '';
    const summary = document.getElementById('summary').value || '';
    const techstack = document.getElementById('techstack').value || '';
    const skills = document.getElementById('skills').value || '';
    const experience = document.getElementById('experience').value || '';
    const education = document.getElementById('education').value || '';
    const awards = document.getElementById('awards').value || '';
    const volunteer = document.getElementById('volunteer').value || '';
    const certifications = document.getElementById('certifications').value || '';
    const projects = document.getElementById('projects').value || '';
    const languages = document.getElementById('languages').value || '';
    const interests = document.getElementById('interests').value || '';
    const references = document.getElementById('references').value || '';
    const availability = document.getElementById('availability').value || '';
    const custom = document.getElementById('custom').value || '';

    // Handle profile photo
    const profilePhotoInput = document.getElementById('profilePhoto');
    let photoHtml = '';
    if (profilePhotoInput && profilePhotoInput.files && profilePhotoInput.files[0]) {
        photoHtml = `<img id='cvPhoto' src='' alt='Profile Photo' class='cv-profile-photo'>`;
    }

    // Format skills
    let skillsHtml = '';
    if (skills.trim()) {
        skills.split(',').forEach(skill => {
            skillsHtml += `<span class="skill-badge">${skill.trim()}</span>`;
        });
    }

    // Format languages
    let languagesHtml = '';
    if (languages.trim()) {
        languages.split(',').forEach(lang => {
            languagesHtml += `<div class="language-item">${lang.trim()}</div>`;
        });
    }

    // Format interests
    let interestsHtml = '';
    if (interests.trim()) {
        interests.split(',').forEach(interest => {
            interestsHtml += `<div class="interest-item">${interest.trim()}</div>`;
        });
    }

    // Format tech stack
    let techstackHtml = '';
    if (techstack.trim()) {
        techstack.split(',').forEach(tech => {
            techstackHtml += `<span class="tech-badge">${tech.trim()}</span>`;
        });
    }

    // Format experience
    let experienceHtml = '';
    if (experience.trim()) {
        experienceHtml = experience.split('\n').map(line => line.trim() ? `<div class="exp-item">${line}</div>` : '').join('');
    }

    // Format education
    let educationHtml = '';
    if (education.trim()) {
        educationHtml = education.split('\n').map(line => line.trim() ? `<div class="edu-item">${line}</div>` : '').join('');
    }

    // Format projects
    let projectsHtml = '';
    if (projects.trim()) {
        projectsHtml = projects.split('\n').map(line => line.trim() ? `<div class="project-item">${line}</div>` : '').join('');
    }

    // Format certifications
    let certificationsHtml = '';
    if (certifications.trim()) {
        certificationsHtml = certifications.split('\n').map(line => line.trim() ? `<div class="cert-item">${line}</div>` : '').join('');
    }

    // Build CV HTML based on sample design
    const cvHtml = `
        <div class="cv-document-professional">
            <!-- Left Column - Dark Blue -->
            <div class="cv-left-column">
                <!-- Profile Section -->
                <div class="cv-profile-section">
                    ${photoHtml}
                    <h1 class="cv-name-left">${fullName}</h1>
                    <h2 class="cv-title-left">${jobTitle}</h2>
                </div>
                
                <!-- Contact Info -->
                <div class="cv-section-left">
                    <h3 class="cv-section-title-left">CONTACT</h3>
                    <div class="cv-contact-list">
                        ${phone ? `<div class="contact-item-left"><i class="icon">📞</i>${phone}</div>` : ''}
                        ${email ? `<div class="contact-item-left"><i class="icon">✉️</i><a href="mailto:${email}" class="contact-link">${email}</a></div>` : ''}
                        ${location ? `<div class="contact-item-left"><i class="icon">📍</i>${location}</div>` : ''}
                        ${linkedin ? `<div class="contact-item-left"><i class="icon">💼</i><a href="${linkedin}" target="_blank" class="contact-link">LinkedIn</a></div>` : ''}
                        ${github ? `<div class="contact-item-left"><i class="icon">🐙</i><a href="${github}" target="_blank" class="contact-link">GitHub</a></div>` : ''}
                        ${website ? `<div class="contact-item-left"><i class="icon">🌐</i><a href="${website}" target="_blank" class="contact-link">Website</a></div>` : ''}
                        ${twitter ? `<div class="contact-item-left"><i class="icon">🐦</i><a href="${twitter}" target="_blank" class="contact-link">Twitter</a></div>` : ''}
                        ${stackoverflow ? `<div class="contact-item-left"><i class="icon">💻</i><a href="${stackoverflow}" target="_blank" class="contact-link">Stack Overflow</a></div>` : ''}
                    </div>
                </div>
                
                <!-- Skills -->
                ${skills ? `
                <div class="cv-section-left">
                    <h3 class="cv-section-title-left">SKILLS</h3>
                    <div class="skills-list-left">
                        ${skillsHtml}
                    </div>
                </div>` : ''}
                
                <!-- Languages -->
                ${languages ? `
                <div class="cv-section-left">
                    <h3 class="cv-section-title-left">LANGUAGES</h3>
                    <div class="languages-list-left">
                        ${languagesHtml}
                    </div>
                </div>` : ''}
                
                <!-- Interests -->
                ${interests ? `
                <div class="cv-section-left">
                    <h3 class="cv-section-title-left">INTERESTS</h3>
                    <div class="interests-list-left">
                        ${interestsHtml}
                    </div>
                </div>` : ''}
                
                <!-- Logo Section -->
                <div class="cv-logo-section">
                    <img src="nexlify-logo.jpg" alt="Nexlify Tech" class="cv-logo">
                    <div class="cv-logo-text">
                        <h4 class="cv-logo-title">Nexlify Tech</h4>
                        <p class="cv-logo-tagline">Building Smart Solutions</p>
                    </div>
                </div>
            </div>
            
            <!-- Right Column - White -->
            <div class="cv-right-column">
                <!-- Professional Summary -->
                ${summary ? `
                <div class="cv-section-right">
                    <h3 class="cv-section-title-right">PROFESSIONAL SUMMARY</h3>
                    ${techstackHtml ? `<div class="tech-stack-right">${techstackHtml}</div>` : ''}
                    <p class="summary-text-right">${summary}</p>
                </div>` : ''}
                
                <!-- Experience -->
                ${experience ? `
                <div class="cv-section-right">
                    <h3 class="cv-section-title-right">WORK EXPERIENCE</h3>
                    <div class="experience-list-right">
                        ${experienceHtml}
                    </div>
                </div>` : ''}
                
                <!-- Education -->
                ${education ? `
                <div class="cv-section-right">
                    <h3 class="cv-section-title-right">EDUCATION</h3>
                    <div class="education-list-right">
                        ${educationHtml}
                    </div>
                </div>` : ''}
                
                <!-- Projects -->
                ${projects ? `
                <div class="cv-section-right">
                    <h3 class="cv-section-title-right">PROJECTS</h3>
                    <div class="projects-list-right">
                        ${projectsHtml}
                    </div>
                </div>` : ''}
                
                <!-- Certifications -->
                ${certifications ? `
                <div class="cv-section-right">
                    <h3 class="cv-section-title-right">CERTIFICATIONS</h3>
                    <div class="certifications-list-right">
                        ${certificationsHtml}
                    </div>
                </div>` : ''}
                
                <!-- Awards -->
                ${awards ? `
                <div class="cv-section-right">
                    <h3 class="cv-section-title-right">AWARDS & HONORS</h3>
                    <div class="awards-list-right">
                        ${awards.split('\n').map(line => line.trim() ? `<div class="award-item">${line}</div>` : '').join('')}
                    </div>
                </div>` : ''}
            </div>
        </div>
    `;

    // Use decorated preview area if present
    const previewContent = document.querySelector('.cv-preview-content');
    if (previewContent) {
        previewContent.innerHTML = cvHtml;
    } else {
        document.getElementById('cvPreview').innerHTML = cvHtml;
    }

    // If photo uploaded, set preview src and store photo data
    if (profilePhotoInput && profilePhotoInput.files && profilePhotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('cvPhoto');
            if (img) img.src = e.target.result;
            
            // Store the photo data URL for view CV functionality
            window.latestPhotoDataUrl = e.target.result;
            
            // Update the stored CV HTML with the photo
            window.latestCVHtml = cvHtml.replace("src=''", `src='${e.target.result}'`);
        };
        reader.readAsDataURL(profilePhotoInput.files[0]);
    } else {
        // No photo selected, clear stored photo data
        window.latestPhotoDataUrl = null;
        window.latestCVHtml = cvHtml;
    }

    // Store form data for saving
    window.latestFormData = {
        fullName, jobTitle, email, phone, location, linkedin, github, website, 
        twitter, stackoverflow, summary, techstack, skills, experience, 
        education, awards, volunteer, certifications, projects, languages, 
        interests, references, availability, custom
    };
});

// Download CV functionality
document.getElementById('downloadBtn').addEventListener('click', function() {
    const profilePhotoInput = document.getElementById('profilePhoto');
    if (profilePhotoInput && profilePhotoInput.files && profilePhotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoDataUrl = e.target.result;
            const htmlContent = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>My CV</title><style>body{font-family:'Segoe UI',sans-serif;margin:0;padding:20px;background:#f5f5f5;} .cv-document-professional{display:grid;grid-template-columns:300px 1fr;max-width:900px;margin:0 auto;background:white;box-shadow:0 4px 20px rgba(0,0,0,0.1);} .cv-left-column{background:#2c3e50;color:white;padding:30px;} .cv-right-column{padding:30px;background:white;} .cv-profile-photo{width:120px;height:120px;border-radius:50%;margin-bottom:20px;border:4px solid white;} .cv-name-left{font-size:1.8em;font-weight:bold;margin:10px 0;} .cv-title-left{font-size:1.1em;margin-bottom:20px;opacity:0.9;} .cv-section-title-left{color:#3498db;font-size:1em;font-weight:bold;margin:20px 0 10px 0;border-bottom:2px solid #3498db;padding-bottom:5px;} .cv-section-title-right{color:#2c3e50;font-size:1.1em;font-weight:bold;margin:20px 0 10px 0;border-bottom:2px solid #3498db;padding-bottom:5px;} .contact-item-left{margin:8px 0;font-size:0.9em;display:flex;align-items:center;gap:8px;} .contact-link{color:white;text-decoration:none;transition:all 0.3s ease;} .contact-link:hover{color:#3498db;text-decoration:underline;} .cv-logo-section{margin-top:30px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.2);text-align:center;} .cv-logo{width:60px;height:60px;border-radius:8px;margin-bottom:10px;object-fit:contain;background:white;padding:5px;box-shadow:0 2px 8px rgba(0,0,0,0.2);} .cv-logo-title{font-size:0.9em;font-weight:bold;margin:5px 0;color:#3498db;} .cv-logo-tagline{font-size:0.7em;margin:0;opacity:0.8;font-style:italic;} .skill-badge{display:inline-block;background:#3498db;color:white;padding:4px 8px;margin:2px;border-radius:12px;font-size:0.8em;} .language-item,.interest-item{margin:5px 0;font-size:0.9em;} .summary-text-right{line-height:1.6;margin:10px 0;} .exp-item,.edu-item,.project-item,.cert-item,.award-item{margin:10px 0;line-height:1.5;border-left:3px solid #3498db;padding-left:10px;} </style></head><body>${window.latestCVHtml.replace("src=''",`src='${photoDataUrl}'`)}</body></html>`;
            const blob = new Blob([htmlContent], {type: 'text/html'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'My_CV.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };
        reader.readAsDataURL(profilePhotoInput.files[0]);
    } else {
        const htmlContent = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>My CV</title><style>body{font-family:'Segoe UI',sans-serif;margin:0;padding:20px;background:#f5f5f5;} .cv-document-professional{display:grid;grid-template-columns:300px 1fr;max-width:900px;margin:0 auto;background:white;box-shadow:0 4px 20px rgba(0,0,0,0.1);} .cv-left-column{background:#2c3e50;color:white;padding:30px;} .cv-right-column{padding:30px;background:white;} .cv-name-left{font-size:1.8em;font-weight:bold;margin:10px 0;} .cv-title-left{font-size:1.1em;margin-bottom:20px;opacity:0.9;} .cv-section-title-left{color:#3498db;font-size:1em;font-weight:bold;margin:20px 0 10px 0;border-bottom:2px solid #3498db;padding-bottom:5px;} .cv-section-title-right{color:#2c3e50;font-size:1.1em;font-weight:bold;margin:20px 0 10px 0;border-bottom:2px solid #3498db;padding-bottom:5px;} .contact-item-left{margin:8px 0;font-size:0.9em;display:flex;align-items:center;gap:8px;} .contact-link{color:white;text-decoration:none;transition:all 0.3s ease;} .contact-link:hover{color:#3498db;text-decoration:underline;} .cv-logo-section{margin-top:30px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.2);text-align:center;} .cv-logo{width:60px;height:60px;border-radius:8px;margin-bottom:10px;object-fit:contain;background:white;padding:5px;box-shadow:0 2px 8px rgba(0,0,0,0.2);} .cv-logo-title{font-size:0.9em;font-weight:bold;margin:5px 0;color:#3498db;} .cv-logo-tagline{font-size:0.7em;margin:0;opacity:0.8;font-style:italic;} .skill-badge{display:inline-block;background:#3498db;color:white;padding:4px 8px;margin:2px;border-radius:12px;font-size:0.8em;} .language-item,.interest-item{margin:5px 0;font-size:0.9em;} .summary-text-right{line-height:1.6;margin:10px 0;} .exp-item,.edu-item,.project-item,.cert-item,.award-item{margin:10px 0;line-height:1.5;border-left:3px solid #3498db;padding-left:10px;} </style></head><body>${window.latestCVHtml}</body></html>`;
        const blob = new Blob([htmlContent], {type: 'text/html'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'My_CV.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});

// View CV functionality
document.getElementById('viewBtn').addEventListener('click', function() {
    if (window.latestCVHtml) {
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='UTF-8'>
                <title>CV Preview</title>
                <style>
                    body { font-family: 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
                    .cv-document-professional { display: grid; grid-template-columns: 300px 1fr; max-width: 900px; margin: 0 auto; background: white; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
                    .cv-left-column { background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color: white; padding: 30px; }
                    .cv-right-column { padding: 30px; background: white; }
                    .cv-profile-section { text-align: center; margin-bottom: 20px; }
                    .cv-profile-photo { width: 120px; height: 120px; border-radius: 50%; margin-bottom: 20px; border: 4px solid white; object-fit: cover; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); }
                    .cv-name-left { font-size: 1.8em; font-weight: bold; margin: 10px 0; text-align: center; }
                    .cv-title-left { font-size: 1.1em; margin-bottom: 20px; opacity: 0.9; text-align: center; }
                    .cv-section-title-left { color: #3498db; font-size: 1em; font-weight: bold; margin: 20px 0 10px 0; border-bottom: 2px solid #3498db; padding-bottom: 5px; text-transform: uppercase; }
                    .cv-section-title-right { color: #2c3e50; font-size: 1.1em; font-weight: bold; margin: 20px 0 10px 0; border-bottom: 2px solid #3498db; padding-bottom: 5px; text-transform: uppercase; }
                    .contact-item-left { margin: 8px 0; font-size: 0.9em; display: flex; align-items: center; gap: 8px; }
                    .contact-link { color: white; text-decoration: none; transition: all 0.3s ease; }
                    .contact-link:hover { color: #3498db; text-decoration: underline; }
                    .cv-logo-section { margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2); text-align: center; }
                    .cv-logo { width: 60px; height: 60px; border-radius: 8px; margin-bottom: 10px; object-fit: contain; background: white; padding: 5px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); }
                    .cv-logo-title { font-size: 0.9em; font-weight: bold; margin: 5px 0; color: #3498db; }
                    .cv-logo-tagline { font-size: 0.7em; margin: 0; opacity: 0.8; font-style: italic; }
                    .skill-badge { display: inline-block; background: #3498db; color: white; padding: 4px 8px; margin: 2px; border-radius: 12px; font-size: 0.8em; }
                    .tech-badge { display: inline-block; background: #ecf0f1; color: #2c3e50; padding: 4px 8px; margin: 2px; border-radius: 12px; font-size: 0.8em; border: 1px solid #bdc3c7; }
                    .language-item, .interest-item { margin: 5px 0; font-size: 0.9em; }
                    .summary-text-right { line-height: 1.6; margin: 10px 0; color: #34495e; }
                    .exp-item, .edu-item, .project-item, .cert-item, .award-item { margin: 10px 0; line-height: 1.5; border-left: 3px solid #3498db; padding-left: 10px; color: #34495e; }
                </style>
            </head>
            <body>${window.latestCVHtml}</body>
            </html>
        `);
        newWindow.document.close();
    } else {
        alert('Please generate a CV first before viewing it.');
    }
});

// Save CV functionality
document.getElementById('saveBtn').addEventListener('click', function() {
    if (!window.latestCVHtml || !window.latestFormData) {
        showSaveStatus('Please generate a CV first before saving it.', 'error');
        return;
    }

    const formData = window.latestFormData;
    
    // Validate required fields
    if (!formData.fullName.trim() || !formData.jobTitle.trim()) {
        showSaveStatus('Please fill in at least the Full Name and Job Title before saving.', 'error');
        return;
    }

    const cvData = {
        fullName: formData.fullName,
        jobTitle: formData.jobTitle,
        email: formData.email,
        phone: formData.phone,
        cvHtml: window.latestCVHtml,
        photoDataUrl: window.latestPhotoDataUrl,
        formData: formData,
        isPublic: true
    };

    const cvId = cvStorage.saveCV(cvData);
    
    if (cvId) {
        showSaveStatus(`CV saved successfully! ID: ${cvId}`, 'success');
        
        // Update button to show CV is saved
        const saveBtn = document.getElementById('saveBtn');
        const originalText = saveBtn.textContent;
        saveBtn.textContent = '✅ CV Saved!';
        saveBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.style.background = '';
        }, 3000);
    } else {
        showSaveStatus('Error saving CV. Please try again.', 'error');
    }
});

// View Saved CVs functionality
document.getElementById('viewSavedBtn').addEventListener('click', function() {
    window.open('cv.html#saved-cvs', '_blank');
});

// Show save status messages
function showSaveStatus(message, type = 'info') {
    // Remove existing status messages
    const existingStatus = document.querySelector('.save-status');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    // Create new status message
    const statusDiv = document.createElement('div');
    statusDiv.className = `save-status ${type}`;
    statusDiv.textContent = message;
    
    document.body.appendChild(statusDiv);
    
    // Show the message
    setTimeout(() => {
        statusDiv.classList.add('show');
    }, 100);
    
    // Hide and remove the message after 4 seconds
    setTimeout(() => {
        statusDiv.classList.remove('show');
        setTimeout(() => {
            if (statusDiv.parentNode) {
                statusDiv.parentNode.removeChild(statusDiv);
            }
        }, 300);
    }, 4000);
}
