/* =========================================================
   LAÇOS QUE ACOLHEM — Lógica do jogo
   ========================================================= */

(() => {
  'use strict';

  /* ---------- Elementos ---------- */
  const screens = {
    start: document.getElementById('screen-start'),
    game:  document.getElementById('screen-game'),
    end:   document.getElementById('screen-end')
  };
  const board        = document.getElementById('board');
  const toast        = document.getElementById('toast');
  const pairsCounter = document.getElementById('pairs-counter');
  const btnStart     = document.getElementById('btn-start');
  const btnSound     = document.getElementById('btn-sound');
  const btnRestart   = document.getElementById('btn-restart');
  const btnMuteGame  = document.getElementById('btn-mute-game');
  const btnPlayAgain = document.getElementById('btn-play-again');
  const btnMore      = document.getElementById('btn-more');
  const btnShare     = document.getElementById('btn-share');
  const modalMore    = document.getElementById('modal-more');
  const btnCloseMore = document.getElementById('btn-close-more');

  /* ---------- Estado ---------- */
  let state = {
    deck: [],
    firstCard: null,
    secondCard: null,
    lockBoard: false,
    matchedPairs: 0,
    totalPairs: 8,
    soundOn: true
  };

  /* ---------- Áudio (Web Audio API — sem arquivos externos) ---------- */
  let audioCtx = null;
  function ensureAudio(){
    if (!audioCtx){
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch(e){ audioCtx = null; }
    }
  }
  function playTone(freq, duration = 0.25, type = 'sine', vol = 0.08){
    if (!state.soundOn) return;
    ensureAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = vol;
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.stop(audioCtx.currentTime + duration);
  }
  const sfx = {
    flip:    () => playTone(520, 0.12, 'sine', 0.05),
    match:   () => { playTone(660, 0.35, 'sine', 0.07); setTimeout(()=>playTone(880,0.35,'sine',0.06), 100); },
    miss:    () => playTone(220, 0.2, 'sine', 0.05),
    win:     () => { [523,659,784,1046].forEach((f,i)=>setTimeout(()=>playTone(f,0.5,'sine',0.07), i*140)); }
  };

  /* ---------- Utilitários ---------- */
  function shuffle(arr){
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function showScreen(name){
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showToast(msg, soft = false, ms = 2200){
    toast.textContent = msg;
    toast.classList.toggle('soft', soft);
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), ms);
  }

  /* ---------- Construção do tabuleiro ---------- */
  function buildBoard(){
    board.innerHTML = '';
    state.deck = shuffle(CARDS_DATA);

    state.deck.forEach(card => {
      const btn = document.createElement('button');
      btn.className = 'card';
      btn.dataset.id = card.id;
      btn.dataset.pair = card.pair;
      btn.setAttribute('aria-label', 'Carta virada. Toque para revelar.');
      btn.innerHTML = `
        <div class="card-inner">
          <div class="card-face card-back" aria-hidden="true"></div>
          <div class="card-face card-front ${card.type}">
            <span class="icon" aria-hidden="true">${card.icon}</span>
            <span class="txt">${card.text}</span>
          </div>
        </div>
      `;
      btn.addEventListener('click', () => flipCard(btn, card));
      board.appendChild(btn);
    });
  }

  /* ---------- Lógica de virar carta ---------- */
  function flipCard(el, card){
    if (state.lockBoard) return;
    if (el.classList.contains('flipped') || el.classList.contains('matched')) return;

    el.classList.add('flipped');
    sfx.flip();

    if (!state.firstCard){
      state.firstCard = { el, card };
      return;
    }

    state.secondCard = { el, card };
    state.lockBoard = true;
    checkMatch();
  }

  function checkMatch(){
    const a = state.firstCard;
    const b = state.secondCard;

    if (a.card.pair === b.card.pair){
      // Acerto
      setTimeout(() => {
        a.el.classList.add('matched');
        b.el.classList.add('matched');
        a.el.setAttribute('aria-label', 'Par encontrado: ' + a.card.text);
        b.el.setAttribute('aria-label', 'Par encontrado: ' + b.card.text);

        state.matchedPairs++;
        pairsCounter.textContent = `Pares: ${state.matchedPairs} / ${state.totalPairs}`;

        sfx.match();
        showToast(PAIR_MESSAGES[a.card.pair], true, 2600);

        resetTurn();

        if (state.matchedPairs === state.totalPairs){
          setTimeout(endGame, 1400);
        }
      }, 350);
    } else {
      // Erro — feedback gentil
      setTimeout(() => {
        sfx.miss();
        showToast('Sem pressa. Respire e tente de novo.', false, 1800);
        setTimeout(() => {
          a.el.classList.remove('flipped');
          b.el.classList.remove('flipped');
          resetTurn();
        }, 900);
      }, 500);
    }
  }

  function resetTurn(){
    state.firstCard = null;
    state.secondCard = null;
    state.lockBoard = false;
  }

  /* ---------- Fim de jogo ---------- */
  function endGame(){
    sfx.win();
    showScreen('end');
  }

  /* ---------- Reiniciar ---------- */
  function restartGame(){
    state = {
      deck: [],
      firstCard: null,
      secondCard: null,
      lockBoard: false,
      matchedPairs: 0,
      totalPairs: 8,
      soundOn: state.soundOn
    };
    pairsCounter.textContent = `Pares: 0 / ${state.totalPairs}`;
    buildBoard();
    showScreen('game');
  }

  /* ---------- Alternar som ---------- */
  function toggleSound(){
    state.soundOn = !state.soundOn;
    const label = state.soundOn ? '🔈' : '🔇';
    const txt   = state.soundOn ? '🔈 Som: ativado' : '🔇 Som: desativado';
    btnMuteGame.textContent = label;
    btnMuteGame.setAttribute('aria-pressed', String(!state.soundOn));
    if (btnSound) btnSound.textContent = txt;
  }

  /* ---------- Compartilhar ---------- */
  async function shareGame(){
    const data = {
      title: 'Laços que Acolhem — Setembro Amarelo',
      text: 'Jogue este jogo da memória sobre cuidado e esperança. Se precisar conversar: CVV 188.',
      url: window.location.href
    };
    try {
      if (navigator.share){
        await navigator.share(data);
      } else if (navigator.clipboard){
        await navigator.clipboard.writeText(`${data.text} ${data.url}`);
        showToast('💛 Link copiado! Compartilhe com carinho.', true);
      } else {
        showToast('Copie o link da página para compartilhar.', false);
      }
    } catch(e){ /* usuário cancelou */ }
  }

  /* ---------- Eventos ---------- */
  btnStart.addEventListener('click', () => { ensureAudio(); restartGame(); });
  btnRestart.addEventListener('click', restartGame);
  btnPlayAgain.addEventListener('click', restartGame);
  btnMuteGame.addEventListener('click', toggleSound);
  if (btnSound) btnSound.addEventListener('click', toggleSound);

  btnMore.addEventListener('click', () => modalMore.classList.add('active'));
  btnCloseMore.addEventListener('click', () => modalMore.classList.remove('active'));
  modalMore.addEventListener('click', (e) => {
    if (e.target === modalMore) modalMore.classList.remove('active');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modalMore.classList.remove('active');
  });

  btnShare.addEventListener('click', shareGame);

})();
