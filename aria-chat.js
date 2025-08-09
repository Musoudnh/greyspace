// Simple Aria chat for static pages
(function(){
  function $(sel, ctx=document){ return ctx.querySelector(sel); }
  function el(tag, cls){ const e=document.createElement(tag); if(cls) e.className=cls; return e; }

  // Build chat elements
  const fabWrap = el('div','aria-toggle');
  const fab = el('button','aria-fab'); fab.textContent = 'A';
  fabWrap.appendChild(fab);

  const panel = el('div','aria-panel');
  const header = el('div','aria-header');
  header.innerHTML = '<div class="aria-dot"></div><div class="aria-title">Aria</div><div style="margin-left:auto;color:#5b6166;font-size:12px">online</div>';
  const body = el('div','aria-body');
  const input = el('div','aria-input');
  input.innerHTML = '<input id="ariaInput" placeholder="Ask me about KPIs, budgets, forecasts..."><button id="ariaSend">Send</button>';

  const seed = el('div','aria-msg aria');
  seed.textContent = 'Hi! I’m Aria — your AI CFO. Ask me anything — try “Why did GM dip in May?”';
  body.appendChild(seed);

  panel.appendChild(header); panel.appendChild(body); panel.appendChild(input);

  document.body.appendChild(panel);
  document.body.appendChild(fabWrap);

  let open=false;
  fab.addEventListener('click', ()=>{
    open=!open;
    panel.style.display = open ? 'flex' : 'none';
  });

  function respond(q){
    const a = el('div','aria-msg aria');
    const lower = q.toLowerCase();
    if(lower.includes('gross margin') || lower.includes('gm')){
      a.textContent = 'GM dipped due to a COGS uptick on SKUs 1024/1071 and mild FX headwinds. Want me to model a 1.5% supplier discount and 1% price nudge?';
    } else if(lower.includes('revenue') || lower.includes('mtd')){
      a.textContent = 'Revenue MTD is tracking +8.2% vs trend, driven by enterprise deals closed early and improved win-rate.';
    } else if(lower.includes('forecast') || lower.includes('scenario')){
      a.textContent = 'Base, Upside (+3% price, -1% COGS), and Downside (volume -7%). I can synthesize a new scenario if you specify the drivers.';
    } else if(lower.includes('budget') || lower.includes('approval')){
      a.textContent = 'Marketing has changes requested; Sales is pending approval; Ops in draft. Would you like me to nudge owners on Slack?';
    } else {
      a.textContent = 'I’ll learn more once your data is connected. For now, I can explain KPIs, simulate simple scenarios, and draft next actions.';
    }
    body.appendChild(a);
    body.scrollTop = body.scrollHeight;
  }

  $('#ariaSend').addEventListener('click', ()=>{
    const inputEl = $('#ariaInput');
    const val = inputEl.value.trim();
    if(!val) return;
    const m = el('div','aria-msg user'); m.textContent = val; body.appendChild(m);
    inputEl.value=''; body.scrollTop = body.scrollHeight;
    setTimeout(()=>respond(val), 300);
  });

  $('#ariaInput').addEventListener('keydown', (e)=>{
    if(e.key==='Enter'){ $('#ariaSend').click(); }
  });
})();