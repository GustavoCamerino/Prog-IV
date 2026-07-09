/**
 * Dados dos personagens do universo Hello Kitty.
 * Fonte única usada tanto na seção "Personagens" quanto na "Galeria".
 *
 * @author Gustavo Camerino
 */

/**
 * @typedef {Object} Personagem
 * @property {string} nome
 * @property {string} descricao - descrição curta com emoji
 * @property {string} imagem - URL da imagem para a galeria
 */

/** @type {Personagem[]} */
const PERSONAGENS = [
  {
    nome: 'Hello Kitty',
    descricao: 'Gentil e adorável 🎀',
    imagem:
      'https://static.wikia.nocookie.net/hellokitty/images/5/52/Sanrio_Characters_Hello_Kitty_Image026.png/revision/latest/top-crop/width/200/height/150?cb=20250110105831',
  },
  {
    nome: 'My Melody',
    descricao: 'Doce e amigável 🐰',
    imagem:
      'https://static.wikia.nocookie.net/hellokitty/images/2/23/Sanrio_Characters_My_Melody_Image030.png/revision/latest/top-crop/width/200/height/150?cb=20170407005355',
  },
  {
    nome: 'Kuromi',
    descricao: 'Travessa e estilosa 🖤',
    imagem:
      'https://static.wikia.nocookie.net/hellokitty/images/6/6d/List-kuromi.png/revision/latest/top-crop/width/200/height/150?cb=20250922232527',
  },
  {
    nome: 'Cinnamoroll',
    descricao: 'Fofo e tímido 🌧️',
    imagem:
      'https://static.wikia.nocookie.net/hellokitty/images/a/a5/Mv-cinnamon.png/revision/latest/top-crop/width/200/height/150?cb=20250930161135',
  },
  {
    nome: 'Pompompurin',
    descricao: 'Relaxado e fofo 🍮',
    imagem:
      'https://static.wikia.nocookie.net/hellokitty/images/3/30/Sanrio_Characters_Pompompurin_Image006.png/revision/latest/top-crop/width/200/height/150?cb=20170401200050',
  },
  {
    nome: 'Badtz-Maru',
    descricao: 'Rebelde e engraçado 🐧',
    imagem:
      'https://static.wikia.nocookie.net/hellokitty/images/b/b1/List-badtzmaru-1.png/revision/latest/top-crop/width/200/height/150?cb=20250927221332',
  },
  {
    nome: 'Keroppi',
    descricao: 'Alegre e aventureiro 🐸',
    imagem:
      'https://static.wikia.nocookie.net/hellokitty/images/c/c4/List-kerokerokeroppi.png/revision/latest/top-crop/width/200/height/150?cb=20251102192805',
  },
  {
    nome: 'Pochacco',
    descricao: 'Curioso e desajeitado 🐾',
    imagem:
      'https://static.wikia.nocookie.net/hellokitty/images/f/f4/List-Pochacco.png/revision/latest/top-crop/width/200/height/150?cb=20251005042623',
  },
];
