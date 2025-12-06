const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;

    this.tituloPagina = page.locator('[data-test="title"]');
    this.nomeItem = page.locator('.inventory_item_name');

    this.btnRemoveMochila = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.itensCarrinho = page.locator('.cart_item');

    this.btnCheckout = page.locator('[data-test="checkout"]');
  }

  async validarPaginaCarrinho() {
    await expect(this.tituloPagina).toHaveText('Your Cart');
  }

  async validarItemNoCarrinho(nome) {
    await expect(this.nomeItem).toHaveText(nome);
  }

  async removerMochila() {
    await this.btnRemoveMochila.click();
  }

  async validarCarrinhoVazio() {
    await expect(this.itensCarrinho).toHaveCount(0);
  }

  async clicarCheckout() {
    await this.btnCheckout.click();
  }
}

module.exports = { CartPage };
