/**
 * Lógica da Pokédex: busca dos dados na PokéAPI, renderização do
 * grid de cards, modal de detalhes, busca e filtro por tipo.
 *
 * @author Gustavo Camerino
 */

const BASE = 'https://pokeapi.co/api/v2';
const TOTAL = 151;

/** Lista completa carregada da API. */
let allPokemon = [];

/** Lista atualmente exibida (após busca/filtro). */
let filtered = [];

const grid = document.getElementById('pokeGrid');
const info = document.getElementById('resultsInfo');
const typeFilter = document.getElementById('typeFilter');
const searchIn = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const overlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');

/**
 * Mapeia o nome do tipo para a classe CSS do badge correspondente.
 *
 * @param {string} t - nome do tipo (ex.: "fire")
 * @returns {string} classe CSS
 */
const typeClass = t => ({
  dark: 't-dark', fire:'t-fire', water:'t-water', grass:'t-grass',
  electric:'t-electric', psychic:'t-psychic', ice:'t-ice', dragon:'t-dragon',
  fairy:'t-fairy', normal:'t-normal', fighting:'t-fighting', poison:'t-poison',
  ground:'t-ground', flying:'t-flying', bug:'t-bug', rock:'t-rock',
  ghost:'t-ghost', steel:'t-steel'
})[t] || 't-normal';

/**
 * Mapeia o nome técnico do stat para o rótulo exibido no modal.
 *
 * @param {string} s - nome do stat (ex.: "special-attack")
 * @returns {string} rótulo curto
 */
const statLabel = s => ({
  hp:'HP', attack:'ATK', defense:'DEF',
  'special-attack':'SP.ATK', 'special-defense':'SP.DEF', speed:'VEL'
})[s] || s;

/**
 * Busca os dados de um Pokémon na PokéAPI por ID ou nome.
 *
 * @param {number|string} id
 * @returns {Promise<Object>} dados do Pokémon
 */
async function fetchPokemon(id) {
  const r = await fetch(`${BASE}/pokemon/${id}`);
  if (!r.ok) throw new Error('not found');
  return r.json();
}

/**
 * Carrega os primeiros TOTAL Pokémons e renderiza o grid inicial.
 */
async function loadAll() {
  const promises = [];
  for (let i = 1; i <= TOTAL; i++) promises.push(fetchPokemon(i));
  const results = await Promise.allSettled(promises);
  allPokemon = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
  filtered = [...allPokemon];
  renderGrid(filtered);
}

/**
 * Renderiza a lista de Pokémons no grid, ou uma mensagem de
 * "nenhum resultado" quando a lista estiver vazia.
 *
 * @param {Object[]} list
 */
function renderGrid(list) {
  if (!list.length) {
    grid.innerHTML = `<div class="message"><h3>Nenhum resultado</h3><p>Tente outro nome, ID ou tipo.</p></div>`;
    info.textContent = '0 Pokémons';
    return;
  }
  info.textContent = `${list.length} Pokémons`;
  grid.innerHTML = list.map((p, i) => cardHTML(p, i)).join('');
  grid.querySelectorAll('.poke-card').forEach(card => {
    card.addEventListener('click', () => openModal(+card.dataset.id));
  });
}

/**
 * Monta o HTML de um card de Pokémon para o grid.
 *
 * @param {Object} p - dados do Pokémon
 * @param {number} i - índice na lista, usado para escalonar a animação
 * @returns {string} HTML do card
 */
function cardHTML(p, i) {
  const types = p.types.map(t => `<span class="type-badge ${typeClass(t.type.name)}">${t.type.name}</span>`).join('');
  const img = p.sprites.other?.['official-artwork']?.front_default
           || p.sprites.front_default
           || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`;
  return `
    <div class="poke-card" data-id="${p.id}" style="animation-delay:${Math.min(i * 30, 600)}ms">
      <span class="poke-id">#${String(p.id).padStart(3,'0')}</span>
      <div class="poke-img-wrap">
        <img class="poke-img" src="${img}" alt="${p.name}" loading="lazy">
      </div>
      <span class="poke-name">${p.name}</span>
      <div class="poke-types">${types}</div>
    </div>`;
}

/**
 * Abre o modal de detalhes de um Pokémon, buscando seus dados
 * completos na API e animando as barras de estatísticas.
 *
 * @param {number} id
 */
async function openModal(id) {
  overlay.classList.add('open');
  modalContent.innerHTML = '<div class="loading"><svg class="pokeball-loading" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="48" fill="white" stroke="#333" stroke-width="3"/><path d="M2 50 Q2 2 50 2 Q98 2 98 50" fill="#e3350d"/><rect x="2" y="47" width="96" height="6" fill="#333"/><circle cx="50" cy="50" r="14" fill="#333"/><circle cx="50" cy="50" r="10" fill="white"/><circle cx="50" cy="50" r="6" fill="white" stroke="#333" stroke-width="2"/></svg></div>';
  try {
    const p = await fetchPokemon(id);
    const img = p.sprites.other?.['official-artwork']?.front_default || p.sprites.front_default;
    const types = p.types.map(t => `<span class="type-badge ${typeClass(t.type.name)}">${t.type.name}</span>`).join('');
    const stats = p.stats.map(s => {
      const pct = Math.min(Math.round(s.base_stat / 255 * 100), 100);
      return `<div class="stat-row">
        <span class="stat-name">${statLabel(s.stat.name)}</span>
        <span class="stat-val">${s.base_stat}</span>
        <div class="stat-bar-track"><div class="stat-bar-fill" data-pct="${pct}" style="width:0%"></div></div>
      </div>`;
    }).join('');
    const abilities = p.abilities.map(a =>
      `<span class="ability-tag">${a.ability.name.replace('-',' ')}</span>`).join('');

    modalContent.innerHTML = `
      <div class="modal-header">
        <div class="modal-img-wrap"><img class="modal-img" src="${img}" alt="${p.name}"></div>
        <div class="modal-info">
          <h2>${p.name}</h2>
          <div class="modal-id">#${String(p.id).padStart(3,'0')}</div>
          <div class="modal-types">${types}</div>
        </div>
      </div>
      <div class="modal-section">
        <h3>Detalhes</h3>
        <div class="detail-grid">
          <div class="detail-item"><label>Altura</label><span>${(p.height/10).toFixed(1)} m</span></div>
          <div class="detail-item"><label>Peso</label><span>${(p.weight/10).toFixed(1)} kg</span></div>
          <div class="detail-item"><label>Exp. Base</label><span>${p.base_experience ?? '—'}</span></div>
          <div class="detail-item"><label>Espécies</label><span style="text-transform:capitalize">${p.species.name}</span></div>
        </div>
      </div>
      <div class="modal-section">
        <h3>Habilidades</h3>
        <div class="abilities-list">${abilities}</div>
      </div>
      <div class="modal-section">
        <h3>Estatísticas Base</h3>
        ${stats}
      </div>`;

    // animate bars after render
    requestAnimationFrame(() => {
      modalContent.querySelectorAll('.stat-bar-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.pct + '%'; }, 100);
      });
    });
  } catch {
    modalContent.innerHTML = `<div class="message"><h3>Erro!</h3><p>Não foi possível carregar as informações.</p></div>`;
  }
}

/**
 * Fecha o modal de detalhes.
 */
function closeModal() { overlay.classList.remove('open'); }
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
modalClose.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── SEARCH ──
/**
 * Executa a busca por nome ou ID digitado no campo de busca.
 * Tenta primeiro na lista já carregada; se não encontrar, busca
 * diretamente na API.
 */
async function doSearch() {
  const q = searchIn.value.trim().toLowerCase();
  if (!q) {
    filtered = typeFilter.value
      ? allPokemon.filter(p => p.types.some(t => t.type.name === typeFilter.value))
      : [...allPokemon];
    renderGrid(filtered);
    return;
  }

  // try local first
  const local = allPokemon.find(p => p.name === q || String(p.id) === q);
  if (local) {
    renderGrid([local]);
    return;
  }

  // fetch from API
  grid.innerHTML = '<div class="loading"><svg class="pokeball-loading" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="48" fill="white" stroke="#333" stroke-width="3"/><path d="M2 50 Q2 2 50 2 Q98 2 98 50" fill="#e3350d"/><rect x="2" y="47" width="96" height="6" fill="#333"/><circle cx="50" cy="50" r="14" fill="#333"/><circle cx="50" cy="50" r="10" fill="white"/><circle cx="50" cy="50" r="6" fill="white" stroke="#333" stroke-width="2"/></svg><p>Buscando...</p></div>';
  try {
    const p = await fetchPokemon(q);
    renderGrid([p]);
  } catch {
    grid.innerHTML = `<div class="message"><h3>Não encontrado</h3><p>Pokémon "<strong>${q}</strong>" não foi encontrado.</p></div>`;
    info.textContent = '0 Pokémons';
  }
}

searchBtn.addEventListener('click', doSearch);
searchIn.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

// ── FILTER ──
typeFilter.addEventListener('change', () => {
  const type = typeFilter.value;
  const src = searchIn.value.trim() ? filtered : allPokemon;
  filtered = type ? src.filter(p => p.types.some(t => t.type.name === type)) : [...allPokemon];
  renderGrid(filtered);
});

// ── INIT ──
loadAll();
