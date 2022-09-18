require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('se é uma funçao', () => {
    expect.assertions(1);
    expect(typeof (fetchProducts)).toBe('function');
  });

  it('se a funçao fetch foi chamada', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('se a função fetch foi chamada com o endpoint correto', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('se o retorno é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect.assertions(1);
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });

  it('se o retorno da função sem argumento é um erro com a mensagem: \'You must provide an url\'', async () => {
    expect.assertions(1);
    expect(await fetchProducts(' ')).toStrictEqual(new Error('You must provide an url'));
  });
});

  //  fail('Teste vazio');