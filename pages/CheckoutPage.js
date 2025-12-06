const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.inputFirstName = page.locator('[data-test="firstName"]');
    this.inputLastName = page.locator('[data-test="lastName"]');
    this.inputPostalCode = page.locator('[data-test="postalCode"]');

    this.btnContinue = page.locator('[data-test="continue"]');
    this.btnFinish = page.locator('[data-test="finish"]');

    this.sucessoPedido = page.locator('.complete-header');
  }

  async preencherDados(nome, sobrenome, cep) {
    await this.inputFirstName.fill(nome);
    await this.inputLastName.fill(sobrenome);
    await this.inputPostalCode.fill(cep);
    await this.btnContinue.click();
  }

  async finalizarCompra() {
    await this.btnFinish.click();
  }

  async validarFinalizacao() {
    await expect(this.sucessoPedido).toHaveText('Thank you for your order!');
  }
}

module.exports = { CheckoutPage };
