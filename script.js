// Cursor
  const cur=document.getElementById('cur'),ring=document.getElementById('curRing');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
  (function a(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(a);})();
  document.querySelectorAll('a,button,input,textarea').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ring.style.width='56px';ring.style.height='56px';ring.style.opacity='.4';});
    el.addEventListener('mouseleave',()=>{ring.style.width='36px';ring.style.height='36px';ring.style.opacity='.7';});
  });

  // Nav scroll
  window.addEventListener('scroll',()=>document.getElementById('mainNav').classList.toggle('scrolled',scrollY>30));

  // Reveal
  const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:.1});
  document.querySelectorAll('.reveal,.ti').forEach(el=>obs.observe(el));

  // Stats counter
  const sobs=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target,raw=el.textContent,t=parseInt(raw);
    if(isNaN(t)){sobs.unobserve(el);return;}
    const sfx=raw.replace(/[0-9]/g,'');
    let st=null;
    (function c(ts){if(!st)st=ts;const p=Math.min((ts-st)/1200,1);el.textContent=Math.floor(p*t)+sfx;if(p<1)requestAnimationFrame(c);else{el.textContent=raw;sobs.unobserve(el);}})();
  }),{threshold:.5});
  document.querySelectorAll('.sn').forEach(el=>sobs.observe(el));