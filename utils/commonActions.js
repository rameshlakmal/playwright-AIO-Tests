export default class CommonAction {
  constructor(page) {
    this.page = page;
  }

  async clickElementByText(text, index = 0) {
    await this.page.getByText(text).nth(index).click();
  }
}
