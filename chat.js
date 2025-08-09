(function(){
  const panel = document.getElementById('chatPanel');
  const toggle = document.getElementById('chatToggle');
  const body = document.getElementById('chatBody');
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');

  if(!panel || !toggle) return;

  toggle.addEventListener('click', ()=>{
    panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
    if(panel.style.display !== 'flex'){ panel.style.display = 'flex'; }
  });

  function addMsg(text, who){
    const div = document.createElement('div');
    div.className = 'msg ' + (who || 'aria');
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function reply(q){
    const t = q.toLowerCase();
    if(t.includes('gross') || t.includes('gm')){
      return 'Gross margin dipped due to a 2.4% COGS increase on SKUs 1024/1071 and light FX headwinds. Want me to model a 1.5% supplier discount and 1% price nudge?';
    }
    if(t.includes('revenue')){
      return 'Revenue trend is up ~8.2% MTD, driven by volume and price mix. The quarter projects +$94k vs plan.';
    }
    if(t.includes('scenario') || t.includes('upside') || t.includes('downside')){
      return 'Okay — for Upside: +1% price, -0.8% COGS, +2 FTE in Sales. I can generate a draft scenario in the Forecast page.';
    }
    if(t.includes('approve') || t.includes('approval')){
      return 'Approvals live in the Approvals page. You can say: “approve Marketing budget” or “request changes on Sales”.';
    }
    if(t.includes('report') || t.includes('deck') || t.includes('ppt')){
      return 'I can assemble a Monthly Executive Report or a Board Deck from the Reports page. Export to PDF/PPTX is stubbed here.';
    }
    return 'I can help with revenue, GM%, cash, anomalies, scenarios, and approvals. Try: “why did GM dip?” or “run upside scenario”.';
  }

  function handleSend(){
    const q = input.value.trim();
    if(!q) return;
    addMsg(q, 'user');
    setTimeout(()=> addMsg(reply(q), 'aria'), 300);
    input.value='';
  }

  send.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e)=>{
    if(e.key==='Enter'){ handleSend(); }
  });
})();