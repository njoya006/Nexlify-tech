// CV Creator JS - Professional Design based on sample_cv.jpg

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
                        ${email ? `<div class="contact-item-left"><i class="icon">✉️</i>${email}</div>` : ''}
                        ${location ? `<div class="contact-item-left"><i class="icon">📍</i>${location}</div>` : ''}
                        ${linkedin ? `<div class="contact-item-left"><i class="icon">💼</i>LinkedIn</div>` : ''}
                        ${github ? `<div class="contact-item-left"><i class="icon">🐙</i>GitHub</div>` : ''}
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

    // If photo uploaded, set preview src
    if (profilePhotoInput && profilePhotoInput.files && profilePhotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('cvPhoto');
            if (img) img.src = e.target.result;
        };
        reader.readAsDataURL(profilePhotoInput.files[0]);
    }

    // Store latest CV HTML for export
    window.latestCVHtml = cvHtml;
});

// Download CV functionality
document.getElementById('downloadBtn').addEventListener('click', function() {
    const profilePhotoInput = document.getElementById('profilePhoto');
    if (profilePhotoInput && profilePhotoInput.files && profilePhotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoDataUrl = e.target.result;
            const htmlContent = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>My CV</title><style>body{font-family:'Segoe UI',sans-serif;margin:0;padding:20px;background:#f5f5f5;} .cv-document-professional{display:grid;grid-template-columns:300px 1fr;max-width:900px;margin:0 auto;background:white;box-shadow:0 4px 20px rgba(0,0,0,0.1);} .cv-left-column{background:#2c3e50;color:white;padding:30px;} .cv-right-column{padding:30px;background:white;} .cv-profile-photo{width:120px;height:120px;border-radius:50%;margin-bottom:20px;border:4px solid white;} .cv-name-left{font-size:1.8em;font-weight:bold;margin:10px 0;} .cv-title-left{font-size:1.1em;margin-bottom:20px;opacity:0.9;} .cv-section-title-left{color:#3498db;font-size:1em;font-weight:bold;margin:20px 0 10px 0;border-bottom:2px solid #3498db;padding-bottom:5px;} .cv-section-title-right{color:#2c3e50;font-size:1.1em;font-weight:bold;margin:20px 0 10px 0;border-bottom:2px solid #3498db;padding-bottom:5px;} .contact-item-left{margin:8px 0;font-size:0.9em;} .skill-badge{display:inline-block;background:#3498db;color:white;padding:4px 8px;margin:2px;border-radius:12px;font-size:0.8em;} .language-item,.interest-item{margin:5px 0;font-size:0.9em;} .summary-text-right{line-height:1.6;margin:10px 0;} .exp-item,.edu-item,.project-item,.cert-item,.award-item{margin:10px 0;line-height:1.5;border-left:3px solid #3498db;padding-left:10px;} </style></head><body>${window.latestCVHtml.replace("src=''",`src='${photoDataUrl}'`)}</body></html>`;
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
        const htmlContent = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>My CV</title><style>body{font-family:'Segoe UI',sans-serif;margin:0;padding:20px;background:#f5f5f5;} .cv-document-professional{display:grid;grid-template-columns:300px 1fr;max-width:900px;margin:0 auto;background:white;box-shadow:0 4px 20px rgba(0,0,0,0.1);} .cv-left-column{background:#2c3e50;color:white;padding:30px;} .cv-right-column{padding:30px;background:white;} .cv-name-left{font-size:1.8em;font-weight:bold;margin:10px 0;} .cv-title-left{font-size:1.1em;margin-bottom:20px;opacity:0.9;} .cv-section-title-left{color:#3498db;font-size:1em;font-weight:bold;margin:20px 0 10px 0;border-bottom:2px solid #3498db;padding-bottom:5px;} .cv-section-title-right{color:#2c3e50;font-size:1.1em;font-weight:bold;margin:20px 0 10px 0;border-bottom:2px solid #3498db;padding-bottom:5px;} .contact-item-left{margin:8px 0;font-size:0.9em;} .skill-badge{display:inline-block;background:#3498db;color:white;padding:4px 8px;margin:2px;border-radius:12px;font-size:0.8em;} .language-item,.interest-item{margin:5px 0;font-size:0.9em;} .summary-text-right{line-height:1.6;margin:10px 0;} .exp-item,.edu-item,.project-item,.cert-item,.award-item{margin:10px 0;line-height:1.5;border-left:3px solid #3498db;padding-left:10px;} </style></head><body>${window.latestCVHtml}</body></html>`;
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
                    .cv-document-professional { display: grid; grid-template-columns: 300px 1fr; max-width: 900px; margin: 0 auto; background: white; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
                    .cv-left-column { background: #2c3e50; color: white; padding: 30px; }
                    .cv-right-column { padding: 30px; background: white; }
                    .cv-profile-photo { width: 120px; height: 120px; border-radius: 50%; margin-bottom: 20px; border: 4px solid white; }
                    .cv-name-left { font-size: 1.8em; font-weight: bold; margin: 10px 0; }
                    .cv-title-left { font-size: 1.1em; margin-bottom: 20px; opacity: 0.9; }
                    .cv-section-title-left { color: #3498db; font-size: 1em; font-weight: bold; margin: 20px 0 10px 0; border-bottom: 2px solid #3498db; padding-bottom: 5px; }
                    .cv-section-title-right { color: #2c3e50; font-size: 1.1em; font-weight: bold; margin: 20px 0 10px 0; border-bottom: 2px solid #3498db; padding-bottom: 5px; }
                    .contact-item-left { margin: 8px 0; font-size: 0.9em; }
                    .skill-badge { display: inline-block; background: #3498db; color: white; padding: 4px 8px; margin: 2px; border-radius: 12px; font-size: 0.8em; }
                    .language-item, .interest-item { margin: 5px 0; font-size: 0.9em; }
                    .summary-text-right { line-height: 1.6; margin: 10px 0; }
                    .exp-item, .edu-item, .project-item, .cert-item, .award-item { margin: 10px 0; line-height: 1.5; border-left: 3px solid #3498db; padding-left: 10px; }
                </style>
            </head>
            <body>${window.latestCVHtml}</body>
            </html>
        `);
        newWindow.document.close();
    }
});
