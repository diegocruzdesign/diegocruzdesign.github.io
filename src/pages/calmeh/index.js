const A = '/assets/calmeh/';
const tools = [
 ['Affinity by Canva','<path d="M6 31 21 5l14 26H6ZM13 31l11-19M18 22h12M10 26h7"/>'],
 ['Blender','<path d="M5 12h18M8 6l17 9M4 24l12-12"/><ellipse cx="24" cy="23" rx="13" ry="10"/><ellipse cx="24" cy="23" rx="6" ry="4"/>'],
 ['Fotografía','<path d="M5 12h8l3-5h9l3 5h7v22H5Z"/><circle cx="20" cy="23" r="7"/>'],
];
const zoom = (file, alt, cls='') => `<button class="cal-image ${cls}" data-view="${A}${file}.webp" data-caption="${alt}" aria-label="Ampliar: ${alt}"><img src="${A}${file}.webp" alt="${alt}" loading="lazy" /></button>`;
export function render() {
 return `<div class="cal-page">
  <section class="cal-intro" aria-labelledby="cal-title">
   <div class="cal-brand"><img src="${A}brand.webp" alt="Cal.Meh" /></div>
   <div class="cal-manifesto"><h1 id="cal-title">El agave<br>del pueblo.</h1><p>Una raíz compartida. Una identidad que nace de la comunidad.</p></div>
   <div class="cal-product"><img src="${A}bottle-studio.webp" alt="Render del destilado de agave Cal.Meh con su etiqueta" fetchpriority="high" /></div>
   <div class="cal-tools" aria-label="Herramientas del proyecto">${tools.map(([name,path])=>`<div><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">${path}</svg><span>${name}</span></div>`).join('')}</div>
  </section>
  <section class="cal-origin" aria-labelledby="cal-origin-title">
   <div class="cal-section-heading"><h2 id="cal-origin-title">Dos palabras.<br>Una raíz común.</h2><p>El nombre une comunidad y agave. Una combinación inspirada en el náhuatl que expresa la idea detrás de la marca.</p></div>
   <div class="cal-name-parts"><div><h3>Calpulli</h3><p>Comunidad</p></div><span aria-hidden="true">+</span><div><h3>Metl</h3><p>Agave o maguey</p></div></div>
   <div class="cal-name-result"><img src="${A}wordmark-white.webp" alt="Cal.Meh" /><p>El agave del pueblo.</p></div>
  </section>
  <section class="cal-symbol-story" aria-labelledby="cal-symbol-title">
   <div class="cal-section-heading"><h2 id="cal-symbol-title">De la tierra<br>al símbolo.</h2><p>La forma del agave encuentra un lenguaje geométrico: líneas que se conectan, se repiten y construyen una identidad común.</p></div>
   <div class="cal-symbol-pair">${zoom('agave','Fotografía de agave, referencia natural de Cal.Meh')}<div class="cal-symbol"><img src="${A}icon.webp" alt="Isologo geométrico de Cal.Meh" /></div></div>
  </section>
  <section class="cal-universe" aria-labelledby="cal-universe-title">
   <div class="cal-section-heading"><h2 id="cal-universe-title">Un lenguaje<br>que se comparte.</h2><p>Símbolos, color y tipografía trabajan como un sistema. Los motivos de la etiqueta dan ritmo a un universo que puede crecer.</p></div>
   <div class="cal-system-grid"><div class="cal-patterns">${[1,2].map(n=>`<div class="cal-pattern-item"><img src="${A}patron_${n}_1.webp" alt="Patrón ${n} de Cal.Meh, arena sobre olivo" loading="lazy" /><button type="button" data-pattern="${n}" aria-pressed="false">Invertir colores</button></div>`).join('')}</div><div class="cal-type"><span class="cal-type-display">Cal.Meh</span><p>Young Serif</p><span class="cal-type-sans">Tierra. Agave. Comunidad.</span><p>Uncut Sans</p></div></div>
   <div class="cal-colors" aria-label="Paleta de la marca"><div style="--color:#657153;--text:#fff4e2"><span>Olivo</span><span>#657153</span></div><div style="--color:#F9C376;--text:#303a28"><span>Arena</span><span>#F9C376</span></div><div style="--color:#FE5F55;--text:#303a28"><span>Coral</span><span>#FE5F55</span></div></div>
  </section>
  <section class="cal-packaging" aria-labelledby="cal-packaging-title"><div class="cal-section-heading"><h2 id="cal-packaging-title">La identidad<br>toma forma.</h2><p>El destilado de agave es la primera expresión del proyecto. La etiqueta reúne el nombre, el símbolo y el carácter visual de Cal.Meh.</p></div><div class="cal-packaging-grid">${zoom('label','Etiqueta del destilado de agave Cal.Meh','cal-label')}${zoom('bottle-studio','Render de la botella de Cal.Meh en estudio','cal-studio')}</div></section>
  <section class="cal-field">${zoom('bottle-field','Render de Cal.Meh en un entorno de cultivo de agave')}<div><h2>Un origen.<br>Muchas posibilidades.</h2><p>Hoy, destilado de agave. Una marca preparada para nuevos derivados, con la comunidad como punto de partida.</p></div></section>
  <div class="cal-closing"><img src="${A}icon.webp" alt="" /><p>Del agave, para la comunidad.</p></div>
 </div>`;
}

export function mount(root) {
 const change = e => {
  const button = e.target.closest('[data-pattern]');
  if (!button) return;
  const inverted = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', String(inverted));
  const img = button.parentElement.querySelector('img');
  img.src = `${A}patron_${button.dataset.pattern}_${inverted ? 2 : 1}.webp`;
  img.alt = `Patrón ${button.dataset.pattern} de Cal.Meh, ${inverted ? 'olivo sobre arena' : 'arena sobre olivo'}`;
 };
 root.addEventListener('click', change);
 return () => root.removeEventListener('click', change);
}
