const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;

    this.inputUsername = page.locator('[data-test="username"]');
    this.inputPassword = page.locator('[data-test="password"]');
    this.btnLogin = page.locator('[data-test="login-button"]');
    this.msgErro = page.locator('[data-test="error"]');
  }

  async acessar() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async preencherUsuario(usuario) {
    await this.inputUsername.fill(usuario);
  }

  async preencherSenha(senha) {
    await this.inputPassword.fill(senha);
  }

  async clicarLogin() {
    await this.btnLogin.click();
  }

  async realizarLogin(usuario, senha) {
    await this.preencherUsuario(usuario);
    await this.preencherSenha(senha);
    await this.clicarLogin();
  }

  async validarLoginSucesso() {
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  async validarErroLogin(mensagem) {
    await expect(this.msgErro).toHaveText(mensagem);
  }
}

module.exports = { LoginPage };
