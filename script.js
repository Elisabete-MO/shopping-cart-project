// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
 const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsáve  l por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const items = document.querySelector('.itens');
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  items.appendChild(section);
  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('.span.id').innerText;

const cartItemClickListener = () => {};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
 const createCartItemElement = ({ title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart-item';
  li.innerText = `${title}
  $ ${parseFloat(price).toFixed(2)}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const carrinho = document.querySelector('.cart__items');
const btnEsvaziar = document.querySelector('.empty-cart');

/* remover itens ao carrinho */ 
const excCartItem = (li) => {
  carrinho.removeChild(li);
  localStorage.removeItem('cartItems', `${li}`);
};

/* adicionar itens ao carrinho */ 
const addCartItem = (li) => {
  carrinho.appendChild(li);
  if (getSavedCartItems() !== null) {
    const storage = getSavedCartItems();
    const conc = `${storage};${li.innerText}`;
    saveCartItems(conc);
  } else {
    saveCartItems(li.innerText);
  }
  li.addEventListener('click', () => {
    excCartItem(li);
  });
};

/* selecionar itens para o carrinho */
const selecItens = async (pr) => {
  const data = await fetchItem(pr);
  const li = createCartItemElement(data);
  addCartItem(li);
};

/* funçao responsavel por adicionar evento listener aos botoes */
const criarBotoes = () => {
  const listaBotoes = document.querySelectorAll('.item__add');
  listaBotoes.forEach((botao) => botao.addEventListener('click', (aux) => {
    const secao = (aux.target).parentNode;
    const produto = secao.querySelector('.item_id').innerText;
    selecItens(produto);
  }));
};

const getTableProducts = async () => {
  const { results } = await fetchProducts();
  results.forEach((e) => {
    createProductItemElement({ id: e.id, title: e.title, thumbnail: e.thumbnail });
  });
  criarBotoes();
};

const esvaziarCarrinho = () => {
  const lista = document.querySelectorAll('li');
  console.log(lista);
  lista.forEach((li) => {
    excCartItem(li);
  });
  localStorage.clear();
};

window.onload = () => { 
  getTableProducts();
  if (getSavedCartItems() !== null) {
    const aux1 = (getSavedCartItems());
    const cars = aux1.split(';');
    cars.forEach((cart) => {
      const li = document.createElement('li');
      li.addEventListener('click', () => {
        excCartItem(li);
      });
      li.className = 'cart-item';
      li.innerHTML = cart;
      carrinho.appendChild(li);
    });
  }
  btnEsvaziar.addEventListener('click', () => esvaziarCarrinho());
};
