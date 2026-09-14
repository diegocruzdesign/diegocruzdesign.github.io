const A = '/assets/dentalmas/';
const imageSizes = {"brand-white": [413, 99], "brand": [413, 99], "brillo": [1400, 1400], "chiapas": [1400, 1400], "expanded-002": [1400, 1400], "expanded-003": [1400, 1400], "expanded-004": [1400, 1400], "expanded-005": [1400, 1400], "expanded-006": [1400, 1400], "expanded-011": [1400, 1400], "expanded-018": [1080, 1350], "expanded-019": [1080, 1350], "expanded-021": [1400, 1400], "expanded-022": [1400, 1400], "expanded-024": [1080, 1350], "expanded-025": [1400, 1400], "expanded-027": [1400, 1400], "expanded-028": [1080, 1350], "expanded-038": [1200, 1600], "expanded-043": [1400, 1400], "hero": [1400, 1400], "icon-white": [109, 99], "monstruos-a": [1400, 1400], "monstruos-b": [1400, 1400], "odontologo": [1400, 1400], "oscars": [1080, 1350], "precision": [1080, 1350], "sonrisas": [1080, 1350], "story-oscars": [900, 1600], "story-sonrisa": [900, 1600]}; 
const posts = [
 {file:'precision',title:'El detalle hace la diferencia',category:'servicios'},
 {file:'brillo',title:'Una sonrisa en primer plano',category:'servicios'},
 {file:'sonrisas',title:'Sonrisas que hablan por sí solas',category:'servicios'},
 {file:'odontologo',title:'Día del Odontólogo',category:'comunidad'},
 {file:'chiapas',title:'Presencia en Chiapas',category:'comunidad'},
 {file:'monstruos-a',title:'Hasta los monstruos le temen a las caries',category:'campanas'},
 {file:'monstruos-b',title:'El cepillado como protagonista',category:'campanas'},
 {file:'oscars',title:'Los Oscars de la Sonrisa',category:'campanas'},
 {"file": "expanded-002", "title": "Dientes apiñados", "category": "servicios"},
 {"file": "expanded-003", "title": "Alinear la sonrisa", "category": "servicios"},
 {"file": "expanded-006", "title": "Día Internacional de la Mujer", "category": "comunidad"},
 {"file": "expanded-011", "title": "Sucursal San Luis Río Colorado", "category": "comunidad"},
 {"file": "expanded-018", "title": "Proceso de limpieza dental", "category": "servicios"},
 {"file": "expanded-019", "title": "Detalle a detalle", "category": "servicios"},
 {"file": "expanded-021", "title": "Comunicación de ortodoncia", "category": "servicios"},
 {"file": "expanded-022", "title": "Día Mundial de la Salud Bucal", "category": "comunidad"},
 {"file": "expanded-024", "title": "Proceso de resina dental", "category": "servicios"},
 {"file": "expanded-025", "title": "Sucursal San Luis Potosí", "category": "comunidad"},
 {"file": "expanded-027", "title": "Color en la comunicación de brackets", "category": "campanas"},
 {"file": "expanded-028", "title": "Sensibilidad: una idea visual", "category": "campanas"},
 {"file": "expanded-038", "title": "Una sonrisa de otro mundo", "category": "campanas"},
 {"file": "expanded-043", "title": "Humor y cultura popular", "category": "campanas"},
 {"file": "expanded-005", "title": "La emoción de empezar", "category": "campanas"},
 {"file": "expanded-004", "title": "El helado como recurso visual", "category": "campanas"},
];
function piece(file,title) {
 return `<button class="dental-piece" data-view="${A}${file}.webp" data-caption="${title} · Dental Más" aria-label="Ampliar ${title}"><img src="${A}${file}.webp" width="${imageSizes[file][0]}" height="${imageSizes[file][1]}" alt="${title}: diseño de publicación para Dental Más" loading="lazy" /><span aria-hidden="true">↗</span></button>`;
}
export function render() {
 return `<div class="dental-page">
  <section class="dental-intro" aria-labelledby="dental-title">
   <div class="dental-brand"><img src="${A}brand-white.webp" alt="Dental Más" /></div>
   <div class="dental-intro-copy"><h1 id="dental-title">Sonrisas<br>que conectan.</h1><p>Contenido para redes que acerca la marca a las personas: servicios, comunidad y creatividad en cada publicación.</p></div>
   <div class="dental-hero dental-hero-mosaic" aria-label="Selección dinámica de publicaciones">${posts.slice(0,4).map(post=>`<div class="dental-hero-cell"><img src="${A}${post.file}.webp" alt="${post.title} · Dental Más" /></div>`).join('')}</div>
   <div class="dental-tools" aria-label="Herramientas del proyecto"><div><span class="dental-ps" aria-hidden="true">Ps</span><span>Photoshop</span></div><div><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h8l3-5h9l3 5h7v22H5Z"/><circle cx="20" cy="23" r="7"/></svg><span>Fotografía</span></div><div><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><g transform="translate(20 20)"><path id="dental-petal" d="M0-5C-14-18-21 2-9 7L0 2V-5Z"/><use href="#dental-petal" transform="rotate(60)"/><use href="#dental-petal" transform="rotate(120)"/><use href="#dental-petal" transform="rotate(180)"/><use href="#dental-petal" transform="rotate(240)"/><use href="#dental-petal" transform="rotate(300)"/></g></svg><span>ChatGPT</span></div></div>
  </section>
  <section class="dental-exhibition" aria-labelledby="dental-gallery-title"><div class="dental-section-heading"><h2 id="dental-gallery-title">Una marca.<br>Distintas conversaciones.</h2><p>Una selección de posteos del proyecto. Fotografía, composición e imagen digital al servicio de una presencia reconocible.</p></div>
   <div class="dental-gallery-toolbar"><div class="dental-filters" role="group" aria-label="Filtrar publicaciones">${[['all','Todos'],['servicios','Servicios'],['comunidad','Comunidad'],['campanas','Campañas']].map(([id,label])=>`<button data-filter="${id}" aria-pressed="${id==='all'}">${label}</button>`).join('')}</div><span class="dental-count" role="status">9 de ${posts.length} publicaciones</span></div>
   <div class="dental-post-grid" id="dental-posts">${posts.map((post,i)=>`<figure data-category="${post.category}" ${i >= 9 ? 'hidden' : ''}>${piece(post.file,post.title)}</figure>`).join('')}</div><div class="dental-more-wrap"><button class="dental-more" aria-controls="dental-posts">Ver más</button></div>
  </section>
  <section class="dental-stories" aria-labelledby="stories-title"><div class="dental-stories-copy"><h2 id="stories-title">La misma idea.<br>Otra pantalla.</h2><p>La campaña de los Oscars de la Sonrisa se extiende a historias. Una composición vertical que mantiene el tono y la identidad de la publicación.</p></div><div class="dental-story-pair">${piece('story-oscars','Los Oscars de la Sonrisa · Historia')}${piece('story-sonrisa','La mejor sonrisa · Historia')}</div></section>
  <div class="dental-end"><img src="${A}brand.webp" alt="Dental Más" /><p>Diseñar contenido.<br>Construir cercanía.</p></div>
 </div>`;
}
export function mount(root) {
 const heroImages = [...root.querySelectorAll('.dental-hero-cell img')];
 const activePosts = [0,1,2,3];
 let disposed = false;
 const busy = new Set();
 const heroTimers = heroImages.map((image, cell) => setInterval(async () => {
  if (document.hidden || busy.has(cell)) return;
  busy.add(cell);
  try {
  let next = (activePosts[cell] + 4) % posts.length;
  while (activePosts.includes(next)) next = (next + 1) % posts.length;
  const post = posts[next];
  const preload = new Image();
  preload.src = `${A}${post.file}.webp`;
  try { await preload.decode(); } catch { return; }
  if (disposed) return;
  const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 150;
  await image.animate([{opacity:1},{opacity:0}], {duration,fill:'forwards',easing:'ease-out'}).finished;
  if (disposed) return;
  activePosts[cell] = next;
  image.src = preload.src;
  image.alt = `${post.title} · Dental Más`;
  await image.decode();
  if (disposed) return;
  image.getAnimations().forEach(animation => animation.cancel());
  await image.animate([{opacity:0},{opacity:1}], {duration,easing:'ease-in'}).finished;
  } catch { /* La página puede desmontarse durante la transición. */ }
  finally { image.getAnimations().forEach(animation => animation.cancel()); busy.delete(cell); }
 }, [1900, 2500, 3100, 3700][cell]));
 const filters = root.querySelector('.dental-filters');
 const more = root.querySelector('.dental-more');
 const cards = [...root.querySelectorAll('[data-category]')];
 const grid = root.querySelector('.dental-post-grid');
 const layout = () => {
  const columns = Number(getComputedStyle(grid).getPropertyValue('--columns'));
  const gap = 10;
  const width = (grid.clientWidth - gap * (columns - 1)) / columns;
  const bottoms = Array(columns).fill(0);
  cards.filter(card => !card.hidden).forEach(card => {
   const column = bottoms.indexOf(Math.min(...bottoms));
   const image = card.querySelector('img');
   const height = width * Number(image.getAttribute('height')) / Number(image.getAttribute('width'));
   card.style.width = `${width}px`;
   card.style.left = `${column * (width + gap)}px`;
   card.style.top = `${bottoms[column]}px`;
   bottoms[column] += height + gap;
  });
  grid.style.height = `${Math.max(0, ...bottoms) - (bottoms.some(Boolean) ? gap : 0)}px`;
 };
 let lastWidth = -1;
 const resize = new ResizeObserver(() => {
  if (lastWidth === grid.clientWidth) return;
  lastWidth = grid.clientWidth;
  layout();
 });
 resize.observe(grid);
 let category = 'all', limit = 9;
 const update = () => {
  const matches = cards.filter(card => category === 'all' || card.dataset.category === category);
  cards.forEach(card => { card.hidden = true; });
  matches.slice(0,limit).forEach(card => { card.hidden = false; });
  root.querySelector('.dental-count').textContent = `${Math.min(limit,matches.length)} de ${matches.length} publicaciones`;
  more.hidden = limit >= matches.length;
  layout();
  return matches;
 };
 const change = e => {
  const button = e.target.closest('[data-filter]'); if (!button) return;
  filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  category = button.dataset.filter; limit = 9; update();
 };
 const expand = () => {
  const previous = limit; limit += 9;
  const matches = update();
  matches[previous]?.querySelector('button')?.focus({preventScroll:true});
 };
 filters.addEventListener('click',change);
 more.addEventListener('click',expand);
 update();
 return () => { disposed = true; heroTimers.forEach(clearInterval); resize.disconnect(); filters.removeEventListener('click',change); more.removeEventListener('click',expand); };
}
