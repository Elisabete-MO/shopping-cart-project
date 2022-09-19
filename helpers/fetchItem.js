const fetchItem = async (aux) => {
  if (aux !== ' ') {
    const url = `https://api.mercadolibre.com/items/${aux}`;
    const request = await fetch(url);
    const json = await request.json();
    return json;
  }
  return new Error('You must provide an url');
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
