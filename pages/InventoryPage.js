const { expect } = require('@playwright/test');

class InventoryPage {
  constructor(page) {
    this.page = page;

    this.cardProduto = (nome) =>
      page.locator('.inventory_item').filter({ hasText: nome });

    this.nomeProduto = (nome) =>
      this.cardProduto(nome).locator('[data-test="inventory-item-name"]');

    this.precoProduto = (nome) =>
      this.cardProduto(nome).locator('[data-test="inventory-item-price"]');

    this.btnAddMochila = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');

    this.badgeCarrinho = page.locator('[data-test="shopping-cart-badge"]');
    this.linkCarrinho = page.locator('.shopping_cart_link');
  }

  async validarProduto(nome, preco) {
    await expect(this.nomeProduto(nome)).toHaveText(nome);
    await expect(this.precoProduto(nome)).toHaveText(preco);
  }

  async adicionarMochilaAoCarrinho() {
    await this.btnAddMochila.click();
  }

  async validarQtdCarrinho(qtd) {
    await expect(this.badgeCarrinho).toHaveText(qtd);
  }

  async irParaCarrinho() {
    await this.linkCarrinho.click();
  }
}

module.exports = { InventoryPage };
