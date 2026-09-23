/* =========================================================
   LAÇOS QUE ACOLHEM — Dados das cartas
   16 cartas = 8 pares. Cada par tem uma mensagem pós-acerto.
   ========================================================= */

const CARDS_DATA = [
  /* Par 1 — Canal de ajuda */
  {
    id: "a1", pair: 1, type: "pergunta",
    icon: "📞",
    text: "Onde encontro alguém para conversar agora, de graça e com sigilo?"
  },
  {
    id: "b1", pair: 1, type: "resposta",
    icon: "💛",
    text: "CVV — Ligue 188 (24h, gratuito) ou converse pelo chat em cvv.org.br"
  },

  /* Par 2 — Mito x Verdade */
  {
    id: "a2", pair: 2, type: "mito",
    icon: "💭",
    text: "Mito: Falar sobre sentimentos difíceis piora a situação."
  },
  {
    id: "b2", pair: 2, type: "verdade",
    icon: "🌱",
    text: "Verdade: Falar com alguém de confiança alivia e abre caminhos para o cuidado."
  },

  /* Par 3 — Rede de apoio */
  {
    id: "a3", pair: 3, type: "pergunta",
    icon: "🤝",
    text: "Quem pode ser minha rede de apoio no dia a dia?"
  },
  {
    id: "b3", pair: 3, type: "resposta",
    icon: "👥",
    text: "Amigos, família, professores, profissionais de saúde e o CVV 188."
  },

  /* Par 4 — Autocuidado */
  {
    id: "a4", pair: 4, type: "pergunta",
    icon: "🌿",
    text: "O que é um pequeno gesto de autocuidado?"
  },
  {
    id: "b4", pair: 4, type: "resposta",
    icon: "☕",
    text: "Respeitar seu ritmo, dormir bem, pedir ajuda quando precisar."
  },

  /* Par 5 — Mito x Verdade */
  {
    id: "a5", pair: 5, type: "mito",
    icon: "💭",
    text: "Mito: Pedir ajuda é sinal de fraqueza."
  },
  {
    id: "b5", pair: 5, type: "verdade",
    icon: "✨",
    text: "Verdade: Pedir ajuda é um ato de coragem e inteligência emocional."
  },

  /* Par 6 — Sinais de alerta (sensível) */
  {
    id: "a6", pair: 6, type: "pergunta",
    icon: "🫂",
    text: "Quando alguém se afasta, fala pouco ou parece sobrecarregado, o que posso fazer?"
  },
  {
    id: "b6", pair: 6, type: "resposta",
    icon: "☕",
    text: "Oferecer presença, escuta sem julgamento e incentivar a busca por ajuda."
  },

  /* Par 7 — Fator de proteção */
  {
    id: "a7", pair: 7, type: "pergunta",
    icon: "🌞",
    text: "O que fortalece a saúde emocional?"
  },
  {
    id: "b7", pair: 7, type: "resposta",
    icon: "⛰️",
    text: "Vínculos afetivos, atividades que dão sentido, rotina gentil e apoio profissional."
  },

  /* Par 8 — Setembro Amarelo */
  {
    id: "a8", pair: 8, type: "pergunta",
    icon: "🎗️",
    text: "O que o Setembro Amarelo nos convida a fazer?"
  },
  {
    id: "b8", pair: 8, type: "resposta",
    icon: "🌻",
    text: "Falar com cuidado, ouvir com empatia e valorizar a vida — todos os meses do ano."
  }
];

/* Mensagens exibidas ao acertar cada par */
const PAIR_MESSAGES = {
  1: "💛 Pedir ajuda é um caminho. O 188 está sempre disponível.",
  2: "🌱 Falar alivia. Você merece ser ouvido(a).",
  3: "🤝 Ninguém precisa caminhar sozinho(a).",
  4: "🌿 Cuidar de si também é um gesto de coragem.",
  5: "✨ Pedir ajuda é força, não fraqueza.",
  6: "☕ Estar presente já é um enorme cuidado.",
  7: "🌞 Vínculos e sentido protegem a vida.",
  8: "💛 Setembro Amarelo: falar com cuidado, ouvir com o coração."
};
