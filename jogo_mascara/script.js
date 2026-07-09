/**
 * Lógica do jogo "Mask Yami - Caça às Máscaras".
 *
 * @author Gustavo Camerino
 */

/** Pontuação acumulada na partida atual. */
let pontos = 0;

/** Quantidade de máscaras clicadas com sucesso. */
let acertos = 0;

/** Tempo restante, em segundos. */
let tempo = 15;

/** Indica se a partida está em andamento. */
let rodando = false;

/** Referência do intervalo que gera novas máscaras. */
let intervaloMascara = null;

/** Referência do intervalo que decrementa o cronômetro. */
let intervaloTempo = null;

/**
 * Reinicia o estado do jogo e dispara os timers de geração de
 * máscaras e contagem regressiva.
 */
function iniciarJogo() {
  pontos = 0;
  acertos = 0;
  tempo = 15;
  rodando = true;

  document.getElementById('pontos').textContent = 0;
  document.getElementById('acertos').textContent = 0;
  document.getElementById('tempo').textContent = 15;
  document.getElementById('tela-inicio').style.display = 'none';
  document.getElementById('tela-fim').style.display = 'none';

  // Remove máscaras antigas
  document.querySelectorAll('.mascara').forEach(function (m) {
    m.remove();
  });

  // Gera máscaras continuamente
  intervaloMascara = setInterval(criarMascara, 800);

  // Contagem regressiva
  intervaloTempo = setInterval(function () {
    tempo--;
    document.getElementById('tempo').textContent = tempo;

    if (tempo <= 0) {
      encerrarJogo();
    }
  }, 1000);

  // Tempo total do jogo
  setTimeout(encerrarJogo, 15000);
}

/**
 * Cria uma máscara em posição aleatória dentro da área de jogo,
 * registra o clique de acerto e agenda seu desaparecimento automático.
 */
function criarMascara() {
  if (!rodando) return;

  var area = document.getElementById('area');
  var largura = area.offsetWidth;
  var altura = area.offsetHeight;

  // Cria o elemento da máscara
  var mascara = document.createElement('div');
  mascara.className = 'mascara';
  mascara.textContent = '🎭';

  // Posição aleatória
  var x = Math.random() * (largura - 70);
  var y = Math.random() * (altura - 70);

  mascara.style.left = x + 'px';
  mascara.style.top = y + 'px';

  // Evento de clique na máscara
  mascara.addEventListener('click', function () {
    if (!rodando) return;
    pontos += 10;
    acertos++;
    document.getElementById('pontos').textContent = pontos;
    document.getElementById('acertos').textContent = acertos;
    mostrarPonto(x + 30, y);
    mascara.remove();
  });

  // Adiciona a máscara na área
  area.appendChild(mascara);

  // Máscara some sozinha depois de um tempo
  setTimeout(function () {
    if (mascara.parentNode) {
      mascara.remove();
    }
  }, 1200);
}

/**
 * Exibe o texto flutuante "+10" na posição informada.
 *
 * @param {number} x
 * @param {number} y
 */
function mostrarPonto(x, y) {
  var area = document.getElementById('area');
  var el = document.createElement('div');
  el.className = 'ponto-flutuante';
  el.textContent = '+10';
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  area.appendChild(el);

  setTimeout(function () {
    el.remove();
  }, 800);
}

/**
 * Finaliza a partida, limpa os timers/máscaras e exibe a tela
 * de resultado com uma mensagem de acordo com a pontuação final.
 */
function encerrarJogo() {
  if (!rodando) return;
  rodando = false;

  clearInterval(intervaloMascara);
  clearInterval(intervaloTempo);

  // Remove máscaras restantes
  document.querySelectorAll('.mascara').forEach(function (m) {
    m.remove();
  });

  // Exibe pontuação final
  document.getElementById('resultado').textContent = pontos + ' pontos';

  // Mensagem baseada na pontuação
  var msg = '';
  if (pontos >= 100) {
    msg = '🏆 Incrível! Você é um mestre!';
  } else if (pontos >= 60) {
    msg = '👍 Muito bom! Continue assim!';
  } else if (pontos >= 30) {
    msg = '😅 Foi por pouco... tente de novo!';
  } else {
    msg = '💀 As máscaras venceram dessa vez...';
  }

  document.getElementById('mensagem-fim').textContent = msg;
  document.getElementById('tela-fim').style.display = 'flex';
}

// Rastro do mouse
document.addEventListener('mousemove', function (e) {
  var rastro = document.createElement('div');
  rastro.className = 'rastro';
  rastro.style.left = e.clientX + 'px';
  rastro.style.top = e.clientY + 'px';
  document.body.appendChild(rastro);

  setTimeout(function () {
    rastro.remove();
  }, 400);
});
