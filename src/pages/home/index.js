let introduced = false;
export function render() {
 return `<div class="home-page"><section class="home-scene" aria-label="Portafolio visual de Diego Cruz"><svg class="home-art" width="100%" height="100%" aria-hidden="true"><defs>
<filter id="home-subtract" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncR type="linear" slope="1" intercept="-0.5019607843"/><feFuncG type="linear" slope="1" intercept="-0.5019607843"/><feFuncB type="linear" slope="1" intercept="-0.5019607843"/></feComponentTransfer></filter>
<filter id="home-refraction" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".009" numOctaves="2" seed="8" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" result="warped"/><feOffset in="warped" dx="2" result="redshift"/><feColorMatrix in="redshift" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red"/><feOffset in="warped" dx="-2" result="blueshift"/><feColorMatrix in="blueshift" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" result="cyan"/><feBlend in="red" in2="cyan" mode="screen"/></filter>
<linearGradient id="home-rim" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".8"/><stop offset=".35" stop-color="#80eaff" stop-opacity=".65"/><stop offset=".7" stop-color="#e4a1ff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity=".65"/></linearGradient>
<clipPath id="home-bubble-clip"><path class="home-bubble-path"/></clipPath>
<mask id="home-edge-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%"><path class="home-edge-path" fill="none" stroke="white" stroke-width="16"/></mask>
<mask id="home-title-mask" maskUnits="userSpaceOnUse"><text class="home-mask-text" fill="white" dominant-baseline="text-before-edge"></text></mask>
<g id="home-landscape"><image href="/assets/home/mono.webp?v=2" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"/><g class="home-bubble"><g clip-path="url(#home-bubble-clip)"><image href="/assets/home/color.webp?v=2" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"/><g mask="url(#home-edge-mask)"><image href="/assets/home/color.webp?v=2" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" filter="url(#home-refraction)"/></g></g><path class="home-bubble-rim" fill="none" stroke="url(#home-rim)" stroke-width="3.5"/></g></g>
</defs><use href="#home-landscape"/><use href="#home-landscape" filter="url(#home-subtract)" mask="url(#home-title-mask)"/></svg><h1 aria-label="NO SOLO CREATIVO"><span class="home-type" aria-hidden="true">${introduced ? 'NO SOLO CREATIVO' : ''}</span></h1></section><section class="home-contact" aria-labelledby="home-contact-title"><h2 id="home-contact-title">Diego Arturo Cruz Esteban</h2><p>Tuxtla Gutiérrez, Chiapas, México</p><div class="home-contact-links"><a href="mailto:dace.anim@gmail.com"><span>dace.anim@gmail.com ↗</span></a><a href="tel:+529614298829"><span>961 429 8829 ↗</span></a><a href="https://www.linkedin.com/in/diego-arturo-cruz-esteban-3a944a294" target="_blank" rel="noopener"><span>LinkedIn ↗</span></a></div></section></div>`;
}
export function mount(root) {
 const scene = root.querySelector('.home-scene');
 const heading = root.querySelector('.home-type');
 const maskText = root.querySelector('.home-mask-text');
 const path = root.querySelector('.home-bubble-path');
 const rim = root.querySelector('.home-bubble-rim');
 const edge = root.querySelector('.home-edge-path');
 const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
 let stopped = false, timer, frame, visible = false, x = 0, y = 0, targetX = 0, targetY = 0, lastTime = 0;
 const syncTitle = () => {
  const h = heading.parentElement, css = getComputedStyle(h);
  maskText.setAttribute('x',h.offsetLeft);
  maskText.setAttribute('y',h.offsetTop + scene.getBoundingClientRect().top);
  maskText.style.font = css.font;
  maskText.style.letterSpacing = css.letterSpacing;
  maskText.textContent = heading.textContent;
 };
 const resize = new ResizeObserver(syncTitle); resize.observe(scene); resize.observe(heading.parentElement);
 document.fonts.ready.then(() => { if (!stopped) syncTitle(); });
 const tick = time => {
  if (!visible || stopped) return;
  const dt = Math.min((time-lastTime)/16.67 || 1,3); lastTime=time;
  const dx=targetX-x, dy=targetY-y;
  x += dx*(1-Math.pow(.65,dt)); y += dy*(1-Math.pow(.65,dt));
  const radius=parseFloat(getComputedStyle(scene).getPropertyValue('--radius'));
  const stretch=reduced?0:Math.min(Math.hypot(dx,dy)/450,.19), angle=Math.atan2(dy,dx);
  const points=[];
  for(let i=0;i<80;i++) {
   const a=i/80*Math.PI*2;
   const wave=reduced?0:Math.sin(a*3+time*.0018)*.018+Math.sin(a*5-time*.0013)*.009;
   const r=radius*(1+wave), px=Math.cos(a-angle)*r*(1+stretch), py=Math.sin(a-angle)*r*(1-stretch*.55);
   points.push(`${i?'L':'M'}${(x+px*Math.cos(angle)-py*Math.sin(angle)).toFixed(2)},${(y+px*Math.sin(angle)+py*Math.cos(angle)).toFixed(2)}`);
  }
  const d=points.join(' ')+'Z'; path.setAttribute('d',d);rim.setAttribute('d',d);edge.setAttribute('d',d);
  frame=requestAnimationFrame(tick);
 };
 const move = e => {
  const rect=scene.getBoundingClientRect(); targetX=e.clientX-rect.left;targetY=e.clientY;
  if(!visible) {x=targetX;y=targetY;visible=true;lastTime=0;scene.classList.add('has-pointer');root.querySelector('.home-bubble').style.opacity='1';frame=requestAnimationFrame(tick);}
 };
 const leave = () => {visible=false;cancelAnimationFrame(frame);scene.classList.remove('has-pointer');root.querySelector('.home-bubble').style.opacity='0';};
 const scroll = () => { syncTitle(); leave(); };
 window.addEventListener('scroll',scroll,{passive:true});
 scene.addEventListener('pointermove',move);
 scene.addEventListener('pointerdown',move);
 scene.addEventListener('pointerleave',leave);
 scene.addEventListener('pointercancel',leave);
 syncTitle();
 if (!introduced) {
  let length = 0;
  const text = 'NO SOLO CREATIVO';
  const type = () => {
   if (stopped) return;
   heading.textContent = text.slice(0,++length); syncTitle();
   if (length < text.length) timer = setTimeout(type,90);
   else introduced = true;
  };
  timer = setTimeout(type,1000);
 }
 return () => { stopped = true; window.removeEventListener('scroll',scroll); resize.disconnect(); clearTimeout(timer); cancelAnimationFrame(frame); scene.removeEventListener('pointermove',move); scene.removeEventListener('pointerdown',move); scene.removeEventListener('pointerleave',leave); scene.removeEventListener('pointercancel',leave); };
}
