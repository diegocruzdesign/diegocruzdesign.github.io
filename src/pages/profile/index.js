import { pages } from '../../registry.js';

const software = [
  ['Ps','Photoshop','Imagen y retoque','adobe'], ['Ai','Illustrator','Diseño vectorial','adobe'],
  ['affinity','Affinity by Canva','Diseño gráfico','custom'], ['Ae','After Effects','Motion graphics','adobe'],
  ['blender','Blender','Modelado 3D','custom'],
  ['nodes','ComfyUI','Flujos de IA','custom'],
];
const icons = {
  blender: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12h18M8 6l17 9M4 24l12-12"/><ellipse cx="24" cy="23" rx="13" ry="10"/><ellipse cx="24" cy="23" rx="6" ry="4"/></svg>',
  nodes: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="11" height="9" rx="2"/><rect x="25" y="24" width="11" height="9" rx="2"/><path d="M14 10h8v19h3M8 15v14h17"/><circle cx="30" cy="10" r="4"/></svg>',
  affinity: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 31 21 5l14 26H6ZM13 31l11-19M18 22h12M10 26h7"/></svg>',
  ux: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="5" width="32" height="27" rx="3"/><path d="M4 13h32M10 9h2m3 0h2M10 19h9v7h-9Z"/><path d="m25 21 10 5-5 2-2 5Z"/></svg>',
  thinking: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 26c0-4-5-5-5-12a12 12 0 0 1 24 0c0 7-5 8-5 12ZM14 31h12m-10 5h8M16 15l4 4 5-6M20 19v7"/></svg>',
  branding: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2"><path d="m20 5 15 15-15 15L5 20Z"/><circle cx="20" cy="20" r="6"/><path d="M3 3h5M3 3v5m34-5h-5m5 0v5M3 37h5m-5 0v-5m34 5h-5m5 0v-5"/></svg>',
};

export function render() {
return `<div class="profile-page">
  <section class="profile-grid" aria-label="Presentación profesional">
    <article class="intro-panel panel"><h1>Diego<br><span>Cruz</span></h1><div class="intro-bottom"><p>Ideas claras.<br>Identidades que se sienten.</p></div></article>
    <article class="portrait-panel panel"><img src="/assets/profile/portrait.webp" alt="Retrato de Diego Cruz" fetchpriority="high" /></article>
    <article class="about-panel panel"><div class="panel-top"><span class="eyebrow">DISEÑADOR GRÁFICO</span></div><h2>Del concepto<br>a la imagen.</h2><p>Branding, retoque fotográfico y fotocomposición. Integro herramientas de inteligencia artificial al proceso de diseño.</p><div class="location"><span class="location-dot"></span>Tuxtla Gutiérrez, Chiapas, México</div></article>
    <article class="experience-stat panel"><strong>+2<span>años</span></strong><p>En branding y<br>comunicación visual.</p><a href="#experience" data-scroll="experience" class="round-arrow" aria-label="Ver experiencia">↘</a></article>
    <article class="project-panel panel project-rotation" aria-label="Proyectos seleccionados">${pages.filter(page => page.id !== 'profile').map((page,i)=>`<div class="project-slide${i === 0 ? ' is-current' : ''}" data-project="${page.id}" aria-hidden="${i !== 0}" style="background:${page.preview?.background || page.color}">${page.preview?.logo ? `<img src="${page.preview.logo}" alt="${page.label}" />` : `<span class="project-preview-icon" role="img" aria-label="${page.label}">${page.icon}</span>`}</div>`).join('')}</article>
    <article class="contact-panel panel"><a href="mailto:dace.anim@gmail.com">Hablemos.<span>↗</span></a><div><span>dace.anim@gmail.com</span><a class="cv-link" href="/assets/Diego-Cruz-CV.pdf" target="_blank" rel="noopener">Ver CV ↓</a></div></article>
  </section>
  <section class="toolbox" aria-labelledby="tools-title"><h2 class="section-label" id="tools-title">HERRAMIENTAS</h2><div class="tools-grid">${software.map(([icon,name,detail,type])=>`<div class="tool"><span class="software-icon ${type}" aria-hidden="true">${icons[icon] || icon}</span><span class="tool-name">${name}</span><span class="tool-detail">${detail}</span></div>`).join('')}</div></section>
  <section class="toolbox skillbox" aria-labelledby="skills-title"><h2 class="section-label" id="skills-title">HABILIDADES</h2><div class="tools-grid skills-grid">${[['ux','UX/UI','Experiencias e interfaces'],['thinking','Design Thinking','Resolución de problemas'],['branding','Branding','Identidad de marca']].map(([icon,name,detail])=>`<div class="tool"><span class="software-icon custom" aria-hidden="true">${icons[icon]}</span><span class="tool-name">${name}</span><span class="tool-detail">${detail}</span></div>`).join('')}</div></section>
  <section class="career" id="experience" aria-labelledby="career-title"><h2 class="section-label" id="career-title">EXPERIENCIA</h2><div class="career-layout"><div class="career-statement"><h3>Diseñar.<br>Resolver.<br><span>Evolucionar.</span></h3><a href="/assets/Diego-Cruz-CV.pdf" download>Descargar currículum <span>↓</span></a></div><div class="career-rows">
    <details open><summary><span class="job-date">DIC 2025 — ABR 2026</span><span><strong>Warner Institutional</strong><small>Diseñador gráfico</small></span><span class="expand">+</span></summary><p>Contenido para redes sociales y artes finales para marketing impreso. Desarrollo de aplicaciones de identidad para 5 a 7 clínicas dentales.</p></details>
    <details><summary><span class="job-date">NOV 2024 — NOV 2025</span><span><strong>Arte Divino</strong><small>Diseñador gráfico · Remoto</small></span><span class="expand">+</span></summary><p>Más de 200 piezas listas para imprenta. Estandarización de preprensa y plantillas reutilizables que redujeron los errores técnicos y retrabajos en 40%.</p></details>
    <details><summary><span class="job-date">ENE 2023 — DIC 2023</span><span><strong>Penipak 225</strong><small>Jefe de área de diseño</small></span><span class="expand">+</span></summary><p>Coordinación de un equipo de diseñadores y creadores de contenido. Mejora de procesos y reducción del 35% en los tiempos de entrega.</p></details>
  </div></div></section>
  <section class="education"><div><span class="eyebrow">FORMACIÓN</span><h3>Ingeniería en animación y<br>diseño de contenidos digitales</h3><p>Universidad Pablo Guardado Chávez · 2024</p></div><div><span class="eyebrow">CERTIFICACIONES</span><p>Storytelling en el Marketing Digital<br>Publicidad en redes sociales</p><small>Santander Open Academy · 2025</small></div><a href="https://www.linkedin.com/in/diego-arturo-cruz-esteban-3a944a294" target="_blank" rel="noopener">LinkedIn ↗</a></section>
</div>`;
}
export function mount(root) {
 const anchor = root.querySelector('[data-scroll]');
 const scroll = e => { e.preventDefault(); root.querySelector('#experience').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}); };
 anchor.addEventListener('click', scroll);
 const slides = [...root.querySelectorAll('.project-slide')];
 let current = 0;
 const timer = slides.length > 1 ? setInterval(() => {
  if (document.hidden) return;
  const outgoing = slides[current];
  current = (current + 1) % slides.length;
  const incoming = slides[current];
  incoming.style.transition = 'none';
  incoming.classList.remove('is-exiting', 'is-current');
  void incoming.offsetWidth;
  incoming.style.transition = '';
  outgoing.classList.remove('is-current');
  outgoing.classList.add('is-exiting');
  outgoing.setAttribute('aria-hidden','true');
  incoming.classList.add('is-current');
  incoming.setAttribute('aria-hidden','false');
 }, 4000) : null;
 return () => { anchor.removeEventListener('click',scroll); clearInterval(timer); };
}
