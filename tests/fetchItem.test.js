require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('se é uma funçao', () => {
    expect.assertions(1);
    expect(typeof (fetchItem)).toBe('function');
    });
  
    it('se a funçao fetch foi chamada', async () => {
      expect.assertions(1);
      await fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalled();
    });
  
    it('se a função fetch foi chamada com o endpoint correto', async () => {
      expect.assertions(1);
      await fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
    });
  
    it('se o retorno é uma estrutura de dados igual ao objeto computadorSearch', async () => {
      expect.assertions(1);
      const result = await fetchItem('MLB1615760527');
      expect(result).toEqual(item);
    });
  
    it('se o retorno da função sem argumento é um erro com a mensagem: \'You must provide an url\'', async () => {
      expect.assertions(1);
      expect(await fetchItem(' ')).toStrictEqual(new Error('You must provide an url'));
    });
  });
  
    //  fail('Teste vazio');
