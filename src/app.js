import { pages } from './registry.js';
import * as home from './pages/home/index.js';
const main = document.querySelector('main');
const topbar = document.querySelector('.topbar');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const slot = document.querySelector('#key-slot');
const slotIcon = document.querySelector('#slot-icon');
const keys = new Map();
let cleanup, active, version = 0, navigating = false;
const announce = text => { document.querySelector('#announcer').textContent = text; };
const headerResize = new ResizeObserver(() => document.documentElement.style.setProperty('--header-height', `${topbar.offsetHeight}px`));
headerResize.observe(document.querySelector('.topbar'));
function synchronizeKeys(id) {
 for (const [keyId,{button,dock}] of keys) {
  const inserted = id === keyId;
  (inserted ? slot : dock).append(button);
  button.classList.toggle('is-inserted', inserted);
  button.setAttribute('aria-label', inserted ? `Llave de ${button.dataset.label} insertada. Arrástrala a su lugar para volver al inicio.` : `Llave de ${button.dataset.label}. Arrástrala a la cerradura para abrir.`);
  dock.classList.toggle('is-empty',inserted);
 }
 slotIcon.hidden = id !== 'home';
 slot.classList.toggle('is-occupied',id !== 'home');
 const page = pages.find(p=>p.id===id);
 slot.style.setProperty('--active-color',page?.color || '#aaa');
 slot.setAttribute('aria-label', page ? `Cerradura con llave de ${page.label}` : 'Cerradura vacía');
 document.querySelector('.slot-caption').textContent = page ? 'DEVUELVE LA LLAVE PARA VOLVER' : 'INSERTA UNA LLAVE';
}
pages.forEach(page => {
 const dock = document.createElement('div');
 dock.className = 'key-dock'; dock.dataset.dock = page.id;
 dock.setAttribute('aria-label',`Lugar de la llave de ${page.label}`);
 dock.style.setProperty('--key-color',page.color);
 document.querySelector('#keys-right').append(dock);
 const button = document.createElement('button');
 button.className='key-choice';button.dataset.page=page.id;button.dataset.label=page.label;
 button.style.setProperty('--key-color',page.color);
 button.innerHTML=`<span class="key-diamond" data-key="${page.id}">${page.icon}</span>`;
 dock.append(button);keys.set(page.id,{button,dock});
 let drag;
 button.addEventListener('pointerdown',e=>{
  if(e.button!==0 || navigating) return;
  drag={x:e.clientX,y:e.clientY,fromLock:button.parentElement===slot,moved:false};
  button.setPointerCapture(e.pointerId);
 });
 button.addEventListener('pointermove',e=>{
  if(!drag) return;
  if(!drag.moved && Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>8){
   drag.moved=true;drag.ghost=button.querySelector('.key-diamond').cloneNode(true);
   drag.ghost.classList.add('drag-ghost');drag.ghost.style.setProperty('--key-color',page.color);
   document.body.append(drag.ghost);button.classList.add('key-being-dragged');document.body.classList.add('dragging-key');
  }
  if(!drag.moved) return;
  drag.ghost.style.left=`${e.clientX}px`;drag.ghost.style.top=`${e.clientY}px`;
  const target=drag.fromLock?dock:slot; const r=target.getBoundingClientRect();
  drag.over=e.clientX>=r.left-8&&e.clientX<=r.right+8&&e.clientY>=r.top-8&&e.clientY<=r.bottom+8;
  target.classList.toggle('drop-ready',drag.over);
 });
 const end=cancelled=>{
  if(!drag) return;
  const {moved,over,fromLock,ghost}=drag;drag=null;
  ghost?.remove();button.classList.remove('key-being-dragged');slot.classList.remove('drop-ready');dock.classList.remove('drop-ready');document.body.classList.remove('dragging-key');
  if(moved&&over&&!cancelled) navigate(fromLock?'home':page.id);
 };
 button.addEventListener('pointerup',()=>end(false));
 button.addEventListener('pointercancel',()=>end(true));
 button.addEventListener('lostpointercapture',()=>end(true));
});
async function navigate(id){
 if(navigating) return;
 navigating=true;
 try { await render(id); } finally { navigating=false; }
 if(id!=='home'){slot.classList.remove('key-inserted');void slot.offsetWidth;slot.classList.add('key-inserted');}
}
async function render(id){
 if(active===id)return;
 const page=pages.find(p=>p.id===id);
 const token=++version;
 try {
  const module=page?await page.load():home;
  if(token!==version)return;
  const previousBar = active ? topbar.getBoundingClientRect() : null;
  const navigation = topbar.querySelector('.key-navigation');
  const previousKeys = navigation.getBoundingClientRect();
  const barStyle = getComputedStyle(topbar);
  const previousSurface = { borderRadius: barStyle.borderRadius, backgroundColor: barStyle.backgroundColor, backdropFilter: barStyle.backdropFilter, border: barStyle.border };
  topbar.style.transition = 'none';
  cleanup?.();active=page?.id||'home';
  document.body.dataset.theme=active;
  document.title=`${page?.label||'No solo creativo'} — Diego Cruz`;
  document.querySelector('meta[name="theme-color"]').content=page?.color||'#f4f4f2';
  main.innerHTML=module.render();cleanup=module.mount?.(main);
  synchronizeKeys(active);
  announce(page?`Exposición ${page.label} abierta`:'Inicio');
  window.scrollTo({top:0,behavior:'instant'});
  main.classList.remove('enter');void main.offsetWidth;main.classList.add('enter');
  // Update the home layout before measuring its destination, including a return
  // from a scrolled project. The same live header keeps all key interactions.
  document.documentElement.style.setProperty('--header-height', `${topbar.offsetHeight}px`);
  if (previousBar && !reducedMotion.matches) {
   const nextBar = topbar.getBoundingClientRect();
   const nextKeys = navigation.getBoundingClientRect();
   const nextStyle = getComputedStyle(topbar);
   const nextSurface = { borderRadius: nextStyle.borderRadius, backgroundColor: nextStyle.backgroundColor, backdropFilter: nextStyle.backdropFilter, border: nextStyle.border };
   // Morph only the surface. Keep the live keys and text free of the wide,
   // non-uniform scaling that made the return to the home page look abrupt.
   const surface = document.createElement('div');
   surface.className = 'navigation-surface';
   surface.setAttribute('aria-hidden', 'true');
   Object.assign(surface.style, nextSurface);
   document.body.append(surface);
   topbar.classList.add('is-travelling');
   const geometry = rect => ({ left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` });
   const timing = { duration: 850, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'both' };
   const motions = [surface.animate([
    { ...geometry(previousBar), ...previousSurface },
    { ...geometry(nextBar), ...nextSurface }
   ], timing)];
   const dx = previousKeys.left + previousKeys.width / 2 - nextKeys.left - nextKeys.width / 2;
   const dy = previousKeys.top + previousKeys.height / 2 - nextKeys.top - nextKeys.height / 2;
   motions.push(navigation.animate([
    { translate: `${dx}px ${dy}px`, scale: `${previousKeys.width / nextKeys.width}` },
    { translate: '0px 0px', scale: '1' }
   ], timing));
   for (const hint of topbar.querySelectorAll('.navigation-hint, .home-hint, .wordmark')) {
    motions.push(hint.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 350, delay: 450, fill: 'both', easing: 'ease-out' }));
   }
   motions.push(main.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 550, easing: 'ease-out' }));
   const finishMotion = () => motions.forEach(motion => motion.cancel());
   window.addEventListener('resize', finishMotion, { once: true });
   const respectMotion = () => { if (reducedMotion.matches) finishMotion(); };
   reducedMotion.addEventListener('change', respectMotion);
   try { await Promise.all(motions.map(motion => motion.finished)); } catch { /* Cancellation uses the final layout. */ }
   finally {
    finishMotion();
    surface.remove();
    topbar.classList.remove('is-travelling');
    window.removeEventListener('resize', finishMotion);
    reducedMotion.removeEventListener('change', respectMotion);
   }
  }
 }catch{announce('No se pudo abrir la exposición. Inténtalo de nuevo.');}
 finally { topbar.style.removeProperty('transition'); }
}
const viewer = document.querySelector('#viewer');
let viewerTrigger;
document.addEventListener('click', e => {
  const target = e.target.closest('[data-view]');
  if (!target) return;
  viewerTrigger = target;
  viewer.querySelector('img').src = target.dataset.view;
  viewer.querySelector('img').alt = target.dataset.caption;
  viewer.querySelector('p').textContent = target.dataset.caption;
  viewer.showModal(); document.body.classList.add('viewer-open');
});
viewer.addEventListener('click', e => {
  const img = viewer.querySelector('img');
  if (!img.naturalWidth) { viewer.close(); return; }
  // El área visible puede ser menor que la caja por object-fit: contain.
  const box = img.getBoundingClientRect();
  const scale = Math.min(box.width / img.naturalWidth, box.height / img.naturalHeight);
  const width = img.naturalWidth * scale;
  const height = img.naturalHeight * scale;
  const left = box.left + (box.width - width) / 2;
  const top = box.top + (box.height - height) / 2;
  if (e.clientX < left || e.clientX > left + width || e.clientY < top || e.clientY > top + height) viewer.close();
});
viewer.addEventListener('close', () => { document.body.classList.remove('viewer-open'); viewerTrigger?.focus(); });
if(location.hash) history.replaceState(null,'',location.pathname+location.search);
render('home');
