const A = '/assets/corneteria/';
const renders = [['carrito','Carrito de venta'],['servilleta','Servilleta'],['taza','Taza Cornito'],['totebag','Tote bag'],['cornitos','Cornitos']];
function galleryItems(duplicate = false) {
 return renders.map(([file,label]) => `<figure><button class="image-expand" ${duplicate ? 'tabindex="-1"' : ''} data-view="${A}renders/${file}.webp" data-caption="${label} · La Cornetería" aria-label="Ampliar ${label}"><img src="${A}renders/${file}.webp" alt="${duplicate ? '' : label + ' de La Cornetería'}" /><span class="expand-image-icon">↗</span></button></figure>`).join('');
}
const projectTools = [
 ['Affinity by Canva', '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 31 21 5l14 26H6ZM13 31l11-19M18 22h12M10 26h7"/></svg>'],
 ['Blender', '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h18M8 6l17 9M4 24l12-12"/><ellipse cx="24" cy="23" rx="13" ry="10"/><ellipse cx="24" cy="23" rx="6" ry="4"/></svg>'],
 ['ChatGPT', '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8"><g transform="translate(20 20)"><path id="petal" d="M0-5C-14-18-21 2-9 7L0 2V-5Z"/><use href="#petal" transform="rotate(60)"/><use href="#petal" transform="rotate(120)"/><use href="#petal" transform="rotate(180)"/><use href="#petal" transform="rotate(240)"/><use href="#petal" transform="rotate(300)"/></g></svg>'],
 ['Photoshop', '<span class="project-ps">Ps</span>'],
 ['Fotografía', '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h8l3-5h9l3 5h7v22H5Z"/><circle cx="20" cy="23" r="7"/><path d="M29 17h2"/></svg>'],
];
export function render() {
return `<div class="corneteria-page">
  <section class="corn-intro-grid" aria-labelledby="corn-title"><div class="corn-intro-logo"><img src="${A}logo.webp" alt="La Cornetería — Cornitos Rellenos" /></div><div class="corn-intro-description"><h1 id="corn-title">Un producto conocido.<br>Una identidad <em>propia.</em></h1><p>Del «cuernito» que se confunde con el croissant al Cornito: un nombre y una marca para reconocerlo.</p></div><div class="corn-intro-photo"><img src="${A}cornito.webp" alt="Cornito de hojaldre de forma cónica" fetchpriority="high" /></div><div class="corn-intro-tools" aria-label="Herramientas utilizadas en el proyecto">${projectTools.map(([name,icon])=>`<div class="project-tool"><span aria-hidden="true">${icon}</span><p>${name}</p></div>`).join('')}</div></section>
  <div class="corn-marquee"><span>Cuerno &nbsp; • &nbsp; Cono &nbsp; • &nbsp; Corneto &nbsp; • &nbsp; Cornet &nbsp; • &nbsp; Canutillo</span></div>
  <section class="corn-birth" aria-labelledby="birth-title"><div class="story-heading"><h2 id="birth-title">Primero el producto.<br>Después, <em>su nombre.</em></h2><p>La búsqueda parte del Cornet à la crème como antecedente. De esa referencia nace una denominación propia: Cornito.</p></div><div class="naming-moment"><span>Cornet à la crème</span><span class="naming-arrow" aria-hidden="true">↓</span><strong>Cornito</strong></div><div class="identity-path"><span>Un producto existente</span><b aria-hidden="true">→</b><span>Una nueva denominación</span><b aria-hidden="true">→</b><span>Una nueva identidad</span></div></section>
  <section class="corn-brand-story" aria-labelledby="brand-story-title"><div class="story-heading"><h2 id="brand-story-title">Nace el Cornito.<br>Nace <em>La Cornetería.</em></h2><p>La marca surge para posicionar el nuevo nombre y construir un universo alrededor del producto. La curiosidad abre la puerta al reconocimiento.</p></div><div class="discovery-questions"><div><h3>¿Qué es un Cornito?</h3><p>El nombre que da identidad propia a un producto existente.</p></div><div><h3>¿Qué es una Cornetería?</h3><p>La marca que lo presenta, lo reúne y lo hace reconocible.</p></div></div></section>
  <section class="corn-identity" aria-label="Sistema de identidad"><div class="corn-symbol"><div class="symbol-guides"></div><img src="${A}icon.webp" alt="Isologo de La Cornetería en chocolate y amarillo" /></div><div class="corn-logo-lab"><div class="logo-lab-top"><div class="logo-switch" role="group" aria-label="Variantes del logotipo"><button data-variant="light" aria-label="Logotipo sobre fondo claro" aria-pressed="true" style="--swatch:#E5E6F1"></button><button data-variant="dark" aria-label="Logotipo sobre fondo chocolate" aria-pressed="false" style="--swatch:#531A13"></button><button data-variant="yellow" aria-label="Logotipo sobre fondo amarillo" aria-pressed="false" style="--swatch:#FDA10D"></button></div></div><img id="brand-variant" src="${A}logo.webp" alt="Logotipo de La Cornetería sobre fondo claro" /></div></section>
  <section class="corn-palette" aria-labelledby="palette-title"><div class="palette-heading"><h2 id="palette-title">El sabor tiene color.</h2></div><div class="palette-colors">${[['#531A13','Chocolate'],['#FDA10D','Amarillo'],['#1A0D16','Oscuro'],['#E5E6F1','Claro']].map(([hex,name])=>`<div class="color-block" style="background:${hex};color:${hex==='#FDA10D'||hex==='#E5E6F1'?'#531A13':'#E5E6F1'}"><span>${name}</span><strong>${hex}</strong></div>`).join('')}</div></section>
  <section class="corn-family" aria-labelledby="family-title"><div class="story-heading"><h2 id="family-title">Una forma.<br><em>Más posibilidades.</em></h2><p>Experimentar con rellenos amplía la identidad del Cornito hasta convertirlo en una familia de productos.</p></div><div class="filling-grid">${[['crema','Crema pastelera','El tradicional'],['chocolate','Chocolate',''],['manzana','Mermelada de manzana',''],['dulce-leche','Dulce de leche','']].map(([file,label,note])=>`<figure><img src="${A}filling-${file}-transparent.png" loading="lazy" alt="Relleno de ${label.toLowerCase()} en manga pastelera con el símbolo de La Cornetería" /><figcaption><h3>${label}</h3>${note ? `<p>${note}</p>` : ''}</figcaption></figure>`).join('')}</div><p class="family-principle">Una misma forma, una misma identidad,<br><em>diferentes experiencias.</em></p></section>
  <section class="corn-applications" aria-labelledby="gallery-title"><div class="corn-app-heading"><h2 id="gallery-title">Una identidad<br>que <em>sale a la calle.</em></h2></div><div class="render-gallery" tabindex="0" role="region" aria-label="Galería automática de La Cornetería. Se pausa al colocar el cursor encima o enfocar una imagen."><div class="gallery-track"><div class="gallery-group">${galleryItems()}</div><div class="gallery-group" aria-hidden="true">${galleryItems(true)}</div></div></div></section>
  <section class="corn-end"><img src="${A}icon.webp" alt="" /><h2>Siempre estuvo ahí.<br>Ahora se llama <em>Cornito.</em></h2><p class="story-conclusion">Un producto existente. Un nombre, una identidad<br>y una forma propia de ser reconocido.</p></section>

</div>`;
}
export function mount(root) {
 const lab = root.querySelector('.corn-logo-lab');
 const variants = {light:['logo.webp','claro'],dark:['logo-white.webp','chocolate'],yellow:['logo-black.webp','amarillo']};
 const change = e => {
  const button = e.target.closest('[data-variant]'); if (!button) return;
  const variant = button.dataset.variant;
  lab.dataset.variant = variant;
  lab.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed',String(b===button)));
  const image = lab.querySelector('#brand-variant'); image.src = A + variants[variant][0]; image.alt = `Logotipo de La Cornetería sobre fondo ${variants[variant][1]}`;
 };
 lab.addEventListener('click', change);
 return () => lab.removeEventListener('click',change);
}
