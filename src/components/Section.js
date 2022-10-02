export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = selector;
  }

  //добавляет карточку в начало
  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  render(item) {
    this._renderer(item);
  }
}
