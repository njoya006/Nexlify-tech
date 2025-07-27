// associates.js
fetch('associates.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('associatesList');
    container.innerHTML = data.map(associate => `
      <div class="cv-section-card text-center">
        <img src="${associate.photo}" alt="${associate.name}" class="modern-logo mb-10" style="width:80px;height:80px;object-fit:cover;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h3 style="margin:10px 0 4px 0;">${associate.name}</h3>
        <p style="color:#6366f1;font-weight:500;margin-bottom:8px;">${associate.role}</p>
        <p style="font-size:0.98rem;color:#4a4e69;margin-bottom:10px;">${associate.bio}</p>
        <div style="display:flex;justify-content:center;gap:10px;margin-top:10px;flex-wrap:wrap;">
          <a href="${associate.linkedin}" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;background:#1BA098;color:#fff;border-radius:50%;text-decoration:none;box-shadow:0 2px 8px rgba(27,160,152,0.12);transition:background 0.2s;" title="LinkedIn">
            <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='currentColor'><path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.867-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.599 2 3.599 4.594v5.602z'/></svg>
          </a>
          ${associate.whatsapp ? `<a href="${associate.whatsapp}" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;background:#25D366;color:#fff;border-radius:50%;text-decoration:none;box-shadow:0 2px 8px rgba(37,211,102,0.12);transition:background 0.2s;" title="WhatsApp">
            <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 32 32' fill='currentColor'><path d='M16 0c-8.837 0-16 7.163-16 16 0 2.837.742 5.527 2.148 7.938l-2.148 8.062 8.25-2.156c2.344 1.289 4.992 1.969 7.75 1.969 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.938c-2.563 0-5.063-.656-7.25-1.938l-.5-.281-4.906 1.281 1.312-4.781-.312-.5c-1.344-2.188-2.094-4.688-2.094-7.219 0-7.188 5.844-13.031 13.031-13.031s13.031 5.844 13.031 13.031c0 7.188-5.844 13.031-13.031 13.031zM23.438 19.219c-.406-.219-2.406-1.188-2.781-1.344-.375-.156-.656-.219-.938.219-.281.438-1.094 1.344-1.344 1.625-.25.281-.5.313-.906.094-.406-.219-1.719-.625-3.281-1.969-1.211-1.063-2.031-2.375-2.281-2.781-.25-.406-.027-.625.188-.844.188-.188.438-.5.656-.75.219-.25.281-.438.438-.719.156-.281.078-.531-.031-.75-.109-.219-.938-2.25-1.281-3.094-.344-.844-.688-.719-.938-.719-.25 0-.531-.031-.812-.031-.281 0-.719.094-1.094.438-.375.344-1.438 1.406-1.438 3.438s1.469 3.969 1.688 4.25c.219.281 2.875 4.406 7.031 5.969.984.344 1.75.547 2.344.719.984.313 1.875.25 2.594.156.781-.094 2.406-.969 2.75-1.906.344-.938.344-1.75.25-1.906-.094-.156-.344-.25-.75-.438z'/></svg>
          </a>` : ''}
          ${associate.x ? `<a href="${associate.x}" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;background:#14171A;color:#fff;border-radius:50%;text-decoration:none;box-shadow:0 2px 8px rgba(20,23,26,0.12);transition:background 0.2s;" title="X">
            <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 1200 1227' fill='currentColor'><path d='M1200 0h-278l-322 441-322-441h-278l461 631-461 596h278l322-441 322 441h278l-461-631z'/></svg>
          </a>` : ''}
        </div>
      </div>
    `).join('');
  });
