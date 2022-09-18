const fetchProducts = async (i) => {
  if (i !== ' ') {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    const request = await fetch(url);
    const json = await request.json();
    return json;
  }
  return new Error('You must provide an url');
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
