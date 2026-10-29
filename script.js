(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const config = window.BLUBBA_CONFIG || {};
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // Navigation and Leonida (Eastern) local clock.
  const nav = $('#nav');
  const toggle = $('#menuToggle');
  const links = $('#navLinks');
  const onScroll = () => nav.classList.toggle('is-sticky', window.scrollY > 85);
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  toggle?.addEventListener('click', () => {
    const open = !links.classList.contains('is-open');
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));
  const clock = $('#leonidaClock');
  const setTime = () => {
    if (clock) clock.textContent = new Intl.DateTimeFormat('en-US', {
      timeZone:'America/New_York',hour:'2-digit',minute:'2-digit',hour12:false
    }).format(new Date());
  };
  setTime(); setInterval(setTime, 30000);
  $('#year').textContent = new Date().getFullYear();

  const chapterData = [
    {num:'01',time:'06:42 PM',title:'FIRST SIGHTING',photo:'01',text:'Jason spots a whale offshore. Lucia spots a whale wallet on Ethereum. Different sightings. Same enormous problem.'},
    {num:'02',time:'09:15 PM',title:'NEON CRUISE',photo:'02',text:'Silver convertible, indigo nights. Blubba is going nowhere fast and somehow arriving everywhere.'},
    {num:'03',time:'07:30 PM',title:'THE YACHT',photo:'03',text:'He owns a little fishing boat. His friends own the marina. Nobody asks who paid for the champagne.'},
    {num:'04',time:'04:20 PM',title:'THE MURAL',photo:'04',text:'Vice City put his face on a wall. Somebody added the words: BIG WALLET. SMALL BOAT.'},
    {num:'05',time:'11:58 PM',title:'ARCADE ROW',photo:'05',text:'High score: BLUBBA. His strategy? Press one button, collect coins, pretend it was skill.'},
    {num:'06',time:'01:00 PM',title:'POOL DAY',photo:'06',text:'The resort said no whales allowed. Blubba said the flamingo float was already booked.'},
    {num:'07',time:'07:55 PM',title:'COASTAL ESCAPE',photo:'07',text:'The cops follow the splashes. Blubba follows the tide. The jet ski has much more horsepower than the little boat.'},
    {num:'08',time:'10:10 PM',title:'AFTER HOURS',photo:'08',text:'A drink for the crew. A toast to the ocean. A reminder that market whales can buy big and sell big.'},
    {num:'09',time:'02:00 AM',title:'THE DEEP END',photo:'12',text:'Everybody wants the luxury life. Blubba just wants one more quiet hour by the water.'}
  ];
  const track = $('#chapterTrack');
  const viewport = $('#chapterViewport');
  const renderChapters = () => {
    track.innerHTML = chapterData.map((c) => `
      <article class="chapter" aria-label="Chapter ${escapeHTML(c.num)}: ${escapeHTML(c.title)}">
        <div class="chapter__media">
          <picture><source srcset="assets/meme-${c.photo}-1280.webp" media="(min-width:760px)"><img src="assets/meme-${c.photo}-800.webp" width="800" height="450" alt="Blubba: ${escapeHTML(c.title.toLowerCase())}" loading="lazy" draggable="false"></picture>
          <div class="chapter__number">CHAPTER ${c.num}</div>
        </div>
        <div class="chapter__body"><small>${c.num} / ${c.time} / LEONIDA</small><h3>${c.title}</h3><p>${c.text}</p></div>
      </article>`).join('');
  };
  renderChapters();
  const updateChapterMeter = () => {
    const cards = $$('.chapter', track);
    if (!cards.length) return;
    const midpoint = viewport.scrollLeft + viewport.clientWidth/2;
    let closest=0,dist=Infinity;
    cards.forEach((c,i) => {const d=Math.abs(c.offsetLeft + c.offsetWidth/2 - midpoint);if(d<dist){dist=d;closest=i;}});
    $('#chapterCounter').textContent = String(closest+1).padStart(2,'0') + ' / 09';
    $('#chapterMeter').style.width = ((closest+1)/cards.length *100)+'%';
  };
  let chapterTimer;
  viewport.addEventListener('scroll', () => { clearTimeout(chapterTimer); chapterTimer = setTimeout(updateChapterMeter, 60); }, {passive:true});
  const moveChapter = (dir) => {
    const card = $('.chapter',track);
    if (!card) return;
    viewport.scrollBy({left:dir*(card.getBoundingClientRect().width+20),behavior:reduceMotion?'instant':'smooth'});
  };
  $('#chapPrev')?.addEventListener('click', () => moveChapter(-1));
  $('#chapNext')?.addEventListener('click', () => moveChapter(1));
  viewport.addEventListener('keydown', e => {if(e.key==='ArrowRight'){e.preventDefault();moveChapter(1)}if(e.key==='ArrowLeft'){e.preventDefault();moveChapter(-1)}});
  let dragging=false,startedX=0,startedScroll=0;
  viewport.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button===0){dragging=true;startedX=e.clientX;startedScroll=viewport.scrollLeft;viewport.style.scrollSnapType='none';}});
  window.addEventListener('pointermove',e=>{if(dragging){viewport.scrollLeft=startedScroll-(e.clientX-startedX)*1.12;}});
  const endDrag=()=>{if(dragging){dragging=false;viewport.style.scrollSnapType='';updateChapterMeter();}};
  window.addEventListener('pointerup',endDrag);window.addEventListener('pointercancel',endDrag);
  window.addEventListener('resize',updateChapterMeter,{passive:true});
  requestAnimationFrame(updateChapterMeter);

  // All nine missions are fictional and take place only inside the page.
  const missions = [
    {name:'THE FIRST SIGHTING',place:'Vice Beach',x:35,y:31,brief:'Jason sees a real whale. Lucia sees a wallet moving millions. Decide which lead is worth following.',done:'Two whales spotted. One very confused Jason.'},
    {name:'FOLLOW THE WAKE',place:'Harbor Point',x:53,y:39,brief:'Trace the wake of a mysterious yacht without waking up its extremely rich owner.',done:'Yacht identified. Its owner remains suspiciously relaxed.'},
    {name:'THE SMALL BOAT',place:'Old Marina',x:30,y:48,brief:'Find Blubba’s legendary tiny fishing boat among a fleet of extravagant superyachts.',done:'One tiny boat recovered. Infinite excuses included.'},
    {name:'THE BIG SPLASH',place:'South Pier',x:57,y:58,brief:'A breaching whale interrupts a private investor party. Photograph the sea, not the order book.',done:'Splash confirmed. Dry clothing not included.'},
    {name:'NIGHT DRIVE',place:'Vice Strip',x:19,y:58,brief:'Cruise the neon strip and locate the missing cap before the coastal sunrise.',done:'Cap retrieved. Gold tooth still intact.'},
    {name:'THE ARCADE',place:'Downtown',x:42,y:22,brief:'Beat the local arcade high score before Blubba claims yet another victory.',done:'High score erased. Blubba is claiming victory anyway.'},
    {name:'WHALE WATCH',place:'Outer Keys',x:74,y:70,brief:'Search the open waters for a real whale and remember that actual wildlife cannot move a crypto price.',done:'Whale sighted. Market prices remain anyone’s guess.'},
    {name:'MURAL RUN',place:'Art District',x:18,y:40,brief:'Find the enormous wall mural that brought Blubba’s gold tooth to the attention of the whole city.',done:'Mural located. Street-art legend unlocked.'},
    {name:'THE LAST WAVE',place:'Deepwater Cove',x:88,y:46,brief:'Return to the docks before dawn, with the crew intact and both kinds of whales accounted for.',done:'Coast complete. Officially unofficial Whale Watcher.'}
  ];
  const missionKey='blubba-mission-progress-v1';
  let completed;
  try{const saved=JSON.parse(localStorage.getItem(missionKey)||'[]');completed=new Set(Array.isArray(saved)?saved.filter(n=>Number.isInteger(n)&&n>=0&&n<9):[])}catch{completed=new Set()}
  let activeMission=-1;
  const pinContainer=$('#missionPins');
  pinContainer.innerHTML=missions.map((m,i)=>`<button type="button" class="pin" data-index="${i}" style="left:${m.x}%;top:${m.y}%" aria-label="Mission ${i+1}, ${escapeHTML(m.place)}" title="${escapeHTML(m.place)}">${i+1}</button>`).join('');
  const missionResult=$('#missionResult'),unlock=$('#missionUnlocked');
  const updateMissionUI=()=>{
    $$('.pin',pinContainer).forEach((pin,i)=>{
      pin.classList.toggle('is-done',completed.has(i));
      pin.classList.toggle('is-selected',activeMission===i);
      pin.setAttribute('aria-pressed',String(activeMission===i));
    });
    $('#missionFraction').textContent=`${completed.size} / 9 DONE`;
    $('#missionFill').style.width=(completed.size/9*100)+'%';
    unlock.hidden=completed.size!==missions.length;
    if(activeMission<0){
      $('#missionId').textContent='MISSION 001 / SELECT A PIN';
      $('#missionName').textContent='Your next score is out there.';
      $('#missionDescription').textContent='Tap one of the numbered markers on Leonida’s map to inspect a fictional mission. Complete all nine to unlock Whale Watcher status.';
      $('#missionStatus').textContent='AWAITING ORDERS';
      $('#missionStart').disabled=true;$('#missionStart').innerHTML='SELECT A MISSION <span>↗</span>';
      return;
    }
    const m=missions[activeMission],done=completed.has(activeMission);
    $('#missionId').textContent=`MISSION ${String(activeMission+1).padStart(3,'0')} / ${m.place.toUpperCase()}`;
    $('#missionName').textContent=m.name;
    $('#missionDescription').textContent=m.brief;
    $('#missionStatus').textContent=done?'COMPLETE ◆':'READY TO RUN';
    $('#missionStart').disabled=done;
    $('#missionStart').innerHTML=done?'MISSION CLEARED ✓':'START MISSION <span>↗</span>';
  };
  pinContainer.addEventListener('click',e=>{
    const p=e.target.closest('.pin');if(!p)return;
    activeMission=Number(p.dataset.index);
    missionResult.hidden=true;
    updateMissionUI();
  });
  $('#missionStart').addEventListener('click',()=>{
    if(activeMission<0||completed.has(activeMission))return;
    completed.add(activeMission);
    try{localStorage.setItem(missionKey,JSON.stringify([...completed]))}catch{}
    $('#missionResultText').textContent=missions[activeMission].done;
    missionResult.hidden=false;updateMissionUI();
    showToast('MISSION CLEARED + RESPECT');
  });
  $('#missionNext').addEventListener('click',()=>{
    const next=missions.findIndex((m,i)=>!completed.has(i));
    activeMission=next===-1?-1:next;missionResult.hidden=true;updateMissionUI();
    if(next===-1)unlock.scrollIntoView({block:'nearest',behavior:reduceMotion?'instant':'smooth'});
  });
  $('#missionReset').addEventListener('click',()=>{
    completed.clear();activeMission=-1;missionResult.hidden=true;unlock.hidden=true;
    try{localStorage.removeItem(missionKey)}catch{}
    updateMissionUI();showToast('MISSION BOARD RESET');
  });
  updateMissionUI();

  // Gallery and full-screen lightbox.
  const media = [
    {name:'THE BIG WHALE',image:'meme-09-1024.webp'},
    {name:'VICE COAST',image:'meme-01-1280.webp'},
    {name:'LEONIDA POSTCARD',image:'meme-11-1280.webp'},
    {name:'NEON CRUISE',image:'meme-02-1280.webp'},
    {name:'THE YACHT',image:'meme-03-1280.webp'},
    {name:'THE MURAL',image:'meme-04-1280.webp'},
    {name:'ARCADE ROW',image:'meme-05-1280.webp'},
    {name:'POOL DAY',image:'meme-06-1280.webp'},
    {name:'COASTAL ESCAPE',image:'meme-07-1280.webp'},
    {name:'AFTER HOURS',image:'meme-08-1280.webp'},
    {name:'NO SMALL TRADES',image:'meme-10-1024.webp'},
    {name:'THE DEEP END',image:'meme-12-1280.webp'},
    {name:'THE BANNER',image:'banner-1500.webp'},
    {name:'THE WHALE',image:'pfp-500.webp'}
  ];
  $('#gallery').innerHTML=media.map((m,i)=>`<button type="button" class="gallery-item ${i===12?'gallery-item--wide':''}" data-media="${i}" aria-label="Open artwork ${escapeHTML(m.name)}"><img loading="lazy" src="assets/${m.image}" alt="Blubba artwork: ${escapeHTML(m.name.toLowerCase())}"><span class="gallery-item__label">${escapeHTML(m.name)}<b>↗</b></span></button>`).join('');
  const lightbox=$('#lightbox');let currentMedia=0;
  const setLightbox=(index)=>{
    currentMedia=(index+media.length)%media.length;
    const m=media[currentMedia];
    $('#lightboxImage').src='assets/'+m.image;
    $('#lightboxImage').alt=m.name+' — Blubba artwork';
    $('#lightboxCaption').textContent=`${String(currentMedia+1).padStart(2,'0')} / ${String(media.length).padStart(2,'0')} — ${m.name}`;
    $('#lightboxDownload').href='assets/'+m.image;
    $('#lightboxDownload').download=m.image;
  };
  const openLightbox=(i)=>{setLightbox(i);if(!lightbox.open)lightbox.showModal();};
  $('#gallery').addEventListener('click',e=>{const b=e.target.closest('[data-media]');if(b)openLightbox(Number(b.dataset.media))});
  $$('.poster-open').forEach((b)=>b.addEventListener('click',()=>{
    const i=media.findIndex(m=>('assets/'+m.image)===b.dataset.image);openLightbox(i<0?0:i);
  }));
  $('#lightboxClose').addEventListener('click',()=>lightbox.close());
  $('#lightboxPrev').addEventListener('click',()=>setLightbox(currentMedia-1));
  $('#lightboxNext').addEventListener('click',()=>setLightbox(currentMedia+1));
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});
  document.addEventListener('keydown',e=>{
    if(!lightbox.open)return;
    if(e.key==='ArrowLeft')setLightbox(currentMedia-1);
    if(e.key==='ArrowRight')setLightbox(currentMedia+1);
  });

  // Ethereum mainnet only. No fake CA or purchase link is ever inserted.
  const ca=String(config.contractAddress||'').trim();
  const hasCA=config.chainId===1 && /^0x[a-fA-F0-9]{40}$/.test(ca) && !/^0x0{40}$/i.test(ca);
  if(hasCA){
    $('#contractDisplay').textContent=ca;
    const copy=$('#copyContract');copy.disabled=false;
    copy.addEventListener('click',async()=>{
      try{await navigator.clipboard.writeText(ca);showToast('CONTRACT ADDRESS COPIED');}
      catch{
        const selection=window.getSelection();const range=document.createRange();range.selectNodeContents($('#contractDisplay'));selection.removeAllRanges();selection.addRange(range);showToast('ADDRESS SELECTED — COPY IT');
      }
    });
    const routes={
      uniswapLink:config.customUniswapUrl||`https://app.uniswap.org/swap?chain=mainnet&outputCurrency=${ca}`,
      chartLink:config.customChartUrl||`https://dexscreener.com/ethereum/${ca}`,
      etherscanLink:`https://etherscan.io/token/${ca}`
    };
    Object.entries(routes).forEach(([id,url])=>{
      const a=$('#'+id);a.href=url;a.target='_blank';a.rel='noopener noreferrer';
      a.classList.remove('is-disabled');a.removeAttribute('aria-disabled');
    });
    $('.contract-panel small').textContent='Always confirm that this address matches the verified official project channels.';
  }else{
    $$('.buy-link.is-disabled').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showToast('WAITING FOR A VERIFIED ETHEREUM CONTRACT ADDRESS')}));
  }
  // Optional links, disabled until the owner supplies real URLs.
  const bottom=$('.footer__bottom>div');
  [['xUrl','X'],['telegramUrl','TELEGRAM']].forEach(([key,label])=>{
    const raw=String(config[key]||'').trim();
    if(!/^https:\/\//i.test(raw))return;
    try{const u=new URL(raw);if(!['https:'].includes(u.protocol))return;
      const a=document.createElement('a');a.href=u.href;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label;bottom.prepend(a);
    }catch{}
  });

  // Lightweight reveal animations, safe fallback for browsers without IntersectionObserver.
  if('IntersectionObserver' in window && !reduceMotion){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}});
    },{threshold:.07,rootMargin:'0px 0px 20px 0px'});
    $$('.appear').forEach(el=>observer.observe(el));
  }else{$$('.appear').forEach(el=>el.classList.add('is-visible'))}
  let toastTimer;
  function showToast(message){
    const toast=$('#toast');toast.textContent=message;toast.classList.add('is-visible');
    clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('is-visible'),2600);
  }
})();
