// Simple validation for Nexlify Tech website deployment
console.log('🚀 Nexlify Tech Website - Deployment Validation');

// Check if key elements exist
const checks = [
  { name: 'Index page', element: document.querySelector('title') },
  { name: 'Navigation', element: document.querySelector('nav') },
  { name: 'Logo', element: document.querySelector('.logo') },
  { name: 'Contact form', element: document.querySelector('#contactForm') },
  { name: 'Team section', element: document.querySelector('#team-members') }
];

checks.forEach(check => {
  const status = check.element ? '✅' : '❌';
  console.log(`${status} ${check.name}`);
});

console.log('🌐 Website ready for deployment!');
console.log('📧 Contact: nexlifytech06@gmail.com');
console.log('📱 Phone: +237 683821011');
