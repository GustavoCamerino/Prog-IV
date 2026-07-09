/**
 * Renderização dinâmica das seções "Personagens" e "Galeria"
 * a partir da lista compartilhada em dados-personagens.js.
 *
 * @author Gustavo Camerino
 */

/**
 * Monta um card de personagem (seção "Personagens").
 *
 * @param {Personagem} personagem
 * @returns {string} HTML do card
 */
function criarCardPersonagem(personagem) {
  return `
    <div class="card">
        <strong>${personagem.nome}</strong>
        <p>${personagem.descricao}</p>
    </div>`;
}

/**
 * Monta um card de imagem (seção "Galeria").
 *
 * @param {Personagem} personagem
 * @returns {string} HTML do card
 */
function criarCardGaleria(personagem) {
  return `
    <div class="card-galeria">
        <img src="${personagem.imagem}" alt="${personagem.nome}">
    </div>`;
}

/**
 * Renderiza as duas seções de personagens na página assim que
 * o DOM estiver pronto.
 */
function renderizarPersonagens() {
  const cardsPersonagens = document.getElementById('cards-personagens');
  const cardsGaleria = document.getElementById('cards-galeria');

  cardsPersonagens.innerHTML = PERSONAGENS.map(criarCardPersonagem).join('');
  cardsGaleria.innerHTML = PERSONAGENS.map(criarCardGaleria).join('');
}

document.addEventListener('DOMContentLoaded', renderizarPersonagens);
