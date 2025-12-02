
const postersData = [
  {id:1, title:'Night Chase', img:'https://images.unsplash.com/photo-1505682634904-d7c6b2f6b2b9?auto=format&fit=crop&w=800&q=60', desc:'A high-octane thriller.'},
  {id:2, title:'Island Dreams', img:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60', desc:'Heartwarming drama.'},
  {id:3, title:'Cyber Run', img:'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=60', desc:'Futuristic action.'},
  {id:4, title:'Lost in Time', img:'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=60', desc:'Sci-fi mystery.'},
  {id:5, title:'Comedy Club', img:'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=60', desc:'Laughs guaranteed.'},
  {id:6, title:'Documentary: Earth', img:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=60', desc:'Nature documentary.'}
];

function mkPoster(p){
  const el = document.createElement('div');
  el.className = 'poster';
  el.innerHTML = `
    <img loading="lazy" src="${p.img}" alt="${p.title}" />
    <div class="caption">${p.title}</div>
  `;
  el.addEventListener('click', ()=> openModal(p));
  return el;
}

function fillRow(id, data){
  const row = document.getElementById(id);
  data.forEach(d=> row.appendChild(mkPoster(d)));
}

document.addEventListener('DOMContentLoaded', ()=>{
  // hero background - use first poster
  const hero = document.querySelector('.hero');
  hero.style.backgroundImage = 'linear-gradient(90deg, rgba(0,0,0,0.65), rgba(0,0,0,0.1)), url("cyber.jpeg")';

  fillRow('row1', postersData.slice(0,5));
  fillRow('row2', postersData.slice(2));

  document.querySelectorAll('.btn.info, .btn.play').forEach(b=> b.addEventListener('click', ()=>{
    const id = b.dataset.id || 1;
    const p = postersData.find(x=> ''+x.id === ''+id) || postersData[0];
    openModal(p);
  }));

  // search
  document.getElementById('search').addEventListener('input', function(e){
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.poster').forEach(p=> {
      const title = p.querySelector('img').alt.toLowerCase();
      p.style.display = title.includes(q) ? '' : 'none';
    });
  });

  // modal close
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', (e)=> { if(e.target.id==='modal') closeModal(); });
});

function openModal(p){
  const modal = document.getElementById('modal');
  modal.setAttribute('aria-hidden','false');
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <h2 style="margin-top:0">${p.title}</h2>
    <p style="color:var(--muted)">${p.desc}</p>
    <div style="height:0;padding-bottom:56%;position:relative;margin-top:12px;background:#000;border-radius:6px;overflow:hidden">
      <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Trailer" style="position:absolute;inset:0;border:0;width:100%;height:100%" allowfullscreen></iframe>
    </div>
    <p style="margin-top:12px"><strong>Click poster to close.</strong></p>
  `;
}

function closeModal(){
  const modal = document.getElementById('modal');
  modal.setAttribute('aria-hidden','true');
  document.getElementById('modalContent').innerHTML='';
}





