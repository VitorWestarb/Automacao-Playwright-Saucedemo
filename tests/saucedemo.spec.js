const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('Sauce Demo', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.acessar();
    await login.realizarLogin('standard_user', 'secret_sauce');
  });

  test('Adicionar item ao carrinho', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.validarProduto('Sauce Labs Backpack', '$29.99');
    await inventory.adicionarMochilaAoCarrinho();
    await inventory.validarQtdCarrinho('1');
    await inventory.irParaCarrinho();

    await cart.validarPaginaCarrinho();
    await cart.validarItemNoCarrinho('Sauce Labs Backpack');
  });

  test('Remover item do carrinho', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.adicionarMochilaAoCarrinho();
    await inventory.irParaCarrinho();

    await cart.removerMochila();
    await cart.validarCarrinhoVazio();
  });

  test('Finalizar compra', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.adicionarMochilaAoCarrinho();
    await inventory.irParaCarrinho();
    await cart.clicarCheckout();

    await checkout.preencherDados('João', 'Silva', '12345-678');
    await checkout.finalizarCompra();
    await checkout.validarFinalizacao();
  });

});
