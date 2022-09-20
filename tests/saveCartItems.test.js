const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('se é uma funçao', () => {
    // expect.assertions(1);
    expect(typeof (saveCartItems)).toBe('function');
    });
  
  it('se o método localStorage.setItem é chamado', () => {
    // expect.assertions(1);
    saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  
  it('se a função o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro a chave `cartItems` e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    // expect.assertions(1);
    saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems, item');
  });
});

// fail('Teste vazio');
