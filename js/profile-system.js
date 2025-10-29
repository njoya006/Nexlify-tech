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

        // Display in homepage team section(s)
        // Support multiple possible container IDs used across templates
        this.displayInHomepage();
        this.displayInElementId('team-members');
        // After rendering into the DOM, attach inline bio toggles where needed
        // (measures text and injects an inline 'See more' button at end of 6th line)
        this.attachInlineBioToggles();
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
            console.log('Team members displayed in homepage (dynamic-team-members)');
        }
    }

    /**
     * Generic method to display team html into an element by id
     */
    displayInElementId(id) {
        if (!id) return;
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = this.generateTeamHTML();
            console.log(`Team members displayed in ${id}`);
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
        // Use provided photo path directly (associates.json uses assets/*),
        // and fall back to a known avatar in the assets folder.
        const photoSrc = associate.photo ? `${associate.photo}` : 'assets/avatar.png';
        return `
            <div class="team-member-card">
                <div class="member-photo-wrap">
                    <img src="${photoSrc}" alt="${associate.name}" class="member-photo" onerror="this.src='assets/avatar.png'">
                </div>

                <h3 class="member-name">${associate.name}</h3>
                <p class="member-role">${associate.role}</p>
                <div class="bio-wrap">
                    <p class="member-bio">${associate.bio || ''}</p>
                </div>

                <div class="social-links" aria-label="social links">
                    ${this.generateSocialLinks(associate)}
                </div>
            </div>
        `;
    }

    /**
     * Measure and inject an inline 'See more' toggle at the end of the 6th visible line.
     * This function is deliberately conservative: it only changes DOM for paragraphs that
     * need truncation and marks them to avoid double initialization.
     */
    attachInlineBioToggles() {
        const wraps = Array.from(document.querySelectorAll('.bio-wrap'));
        wraps.forEach(wrap => {
            const para = wrap.querySelector('.member-bio');
            if (!para) return;
            // avoid double initialization
            if (para.__inlineInit) return; para.__inlineInit = true;

            const fullText = para.textContent.trim();
            const style = window.getComputedStyle(para);
            let lineHeight = parseFloat(style.lineHeight);
            if (!lineHeight || Number.isNaN(lineHeight)){
                const fontSize = parseFloat(style.fontSize) || 16;
                lineHeight = fontSize * 1.4;
            }
            const maxHeight = Math.ceil(lineHeight * 6);

            // reset any clamp to measure full height
            para.style.maxHeight = '';
            para.style.whiteSpace = 'normal';

            if (para.scrollHeight <= maxHeight){
                // no truncation needed; nothing to do
                return;
            }

            // Create a hidden measuring element that mirrors the paragraph's width and font
            const testPara = document.createElement('p');
            testPara.style.position = 'absolute'; testPara.style.visibility = 'hidden';
            testPara.style.width = (para.clientWidth || para.offsetWidth) + 'px';
            // Copy key typographic properties so height measurements match
            testPara.style.font = style.font || `${style.fontSize} ${style.fontFamily}`;
            testPara.style.lineHeight = style.lineHeight;
            document.body.appendChild(testPara);

            // Binary search for the largest character index that fits within 6 lines when
            // followed by an inline '… See more' marker.
            const marker = '… See more';
            let low = 0, high = fullText.length, best = 0;
            while (low <= high) {
                const mid = Math.floor((low + high) / 2);
                testPara.textContent = fullText.slice(0, mid).trim() + marker;
                if (testPara.scrollHeight <= maxHeight) { best = mid; low = mid + 1; }
                else { high = mid - 1; }
            }

            document.body.removeChild(testPara);

            let truncated = fullText.slice(0, best).trim();
            // Set truncated paragraph text and append an inline button
            para.textContent = truncated + '… ';
            const inlineBtn = document.createElement('button');
            inlineBtn.type = 'button';
            inlineBtn.className = 'bio-inline-toggle';
            inlineBtn.setAttribute('aria-expanded','false');
            inlineBtn.textContent = 'See more';
            para.appendChild(inlineBtn);

            // Constrain visible height to 6 lines for the collapsed state
            para.style.maxHeight = maxHeight + 'px';
            para.style.overflow = 'hidden';

            // If the button caused wrapping to the next line (still overflowing),
            // iteratively trim the truncated text until the button fits within the allowed height.
            // This corrects for differences between measuring plain text and the actual button element width.
            let trimAttempts = 0;
            while (para.scrollHeight > maxHeight && trimAttempts < 300 && truncated.length > 0) {
                // remove the last word (prefer word-based trimming to avoid mid-word chops)
                truncated = truncated.replace(/\s*\S+$/, '').trim();
                para.textContent = truncated + '… ';
                para.appendChild(inlineBtn);
                trimAttempts++;
            }
            // If after many attempts it still doesn't fit, fallback to block display so it's visible
            if (para.scrollHeight > maxHeight) {
                inlineBtn.style.display = 'block';
                inlineBtn.style.marginTop = '6px';
            }

            // Smooth expand/collapse using measured heights and CSS transitions for fluid animation.
            inlineBtn.addEventListener('click', () => {
                const expanded = inlineBtn.getAttribute('aria-expanded') === 'true';
                const ANIM_MS = 320;
                // ensure overflow hidden for animation
                para.style.overflow = 'hidden';

                if (expanded) {
                    // collapse: animate from current height to collapsed height
                    inlineBtn.setAttribute('aria-expanded','false');
                    inlineBtn.textContent = 'See more';

                    const currH = para.getBoundingClientRect().height;
                    // fix current height so content swap doesn't jump
                    para.style.height = currH + 'px';

                    // swap text to truncated content (this will change scrollHeight)
                    para.textContent = truncated + '… ';
                    para.appendChild(inlineBtn);

                    // measure target collapsed height
                    const targetH = para.scrollHeight;

                    // trigger animation to collapsed height
                    requestAnimationFrame(() => {
                        para.style.transition = `height ${ANIM_MS}ms ease`;
                        para.style.height = targetH + 'px';
                    });

                    const cleanup = () => {
                        para.style.transition = '';
                        para.style.height = '';
                        para.style.maxHeight = maxHeight + 'px';
                        para.removeEventListener('transitionend', cleanup);
                    };
                    para.addEventListener('transitionend', cleanup);

                } else {
                    // expand: animate from current (collapsed) height to full height
                    inlineBtn.setAttribute('aria-expanded','true');
                    inlineBtn.textContent = 'See less';

                    const currH = para.getBoundingClientRect().height;

                    // set explicit height to current to prepare animation
                    para.style.height = currH + 'px';

                    // set full text content and append button so we can measure full height
                    para.textContent = fullText + ' ';
                    para.appendChild(inlineBtn);

                    // measure full height
                    const fullH = para.scrollHeight;

                    // trigger animation to full height
                    requestAnimationFrame(() => {
                        para.style.transition = `height ${ANIM_MS}ms ease`;
                        para.style.height = fullH + 'px';
                    });

                    const cleanup = () => {
                        para.style.transition = '';
                        para.style.height = '';
                        para.style.maxHeight = 'none';
                        para.removeEventListener('transitionend', cleanup);
                    };
                    para.addEventListener('transitionend', cleanup);
                }
            });
        });
    }

    /**
     * Generate social media links
     */
    generateSocialLinks(associate) {
        let links = [];
        
        if (associate.linkedin) {
            links.push(`
                    <a href="${associate.linkedin}" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile" class="social-btn social-btn--linkedin">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
            `);
        }
        
        if (associate.whatsapp) {
            links.push(`
                    <a href="${associate.whatsapp}" target="_blank" rel="noopener noreferrer" title="WhatsApp Contact" class="social-btn social-btn--whatsapp">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.863 3.488"/></svg>
                    </a>
            `);
        }
        
        if (associate.x) {
            links.push(`
                    <a href="${associate.x}" target="_blank" rel="noopener noreferrer" title="X (Twitter) Profile" class="social-btn social-btn--x">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
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
