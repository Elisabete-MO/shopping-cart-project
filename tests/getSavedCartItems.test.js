const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('se é uma funçao', () => {
    // expect.assertions(1);
    expect(typeof (getSavedCartItems)).toBe('function');
    });
  
  it('se o método localStorage.setItem é chamado', () => {
    // expect.assertions(1);
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  
  it('se a função o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro a chave `cartItems` e o segundo sendo o valor passado como argumento para saveCartItems', () => {    
    // expect.assertions(1);
    getSavedCartItems('cartItems, item');
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems, item');
  });
});
  // fail('Teste vazio');

