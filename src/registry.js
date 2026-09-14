// Una entrada por exposición. Cada módulo conserva su propio contenido e interacciones.
export const pages = [
  { id: 'corneteria', preview: { background: '#FDA10D', logo: '/assets/corneteria/logo-white.webp' }, label: 'La Cornetería', number: '01', color: '#FDA10D', icon: '<img src="/assets/corneteria/icon-white.webp" alt="" />', load: () => import('./pages/corneteria/index.js') },
  { id: 'calmeh', preview: { background: '#657153', logo: '/assets/calmeh/brand-white.webp' }, label: 'Cal.Meh', number: '02', color: '#657153', icon: '<img src="/assets/calmeh/icon-white.webp" alt="" />', load: () => import('./pages/calmeh/index.js') },
  { id: 'dentalmas', label: 'Dental Más', number: '03', color: '#D61017', preview: { background: '#D61017', logo: '/assets/dentalmas/brand-white.webp' }, icon: '<img src="/assets/dentalmas/icon-white.webp" alt="" />', load: () => import('./pages/dentalmas/index.js') },
];
