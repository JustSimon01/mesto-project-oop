export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = selector;
  }

  setItem(element) {
    this._container.append(element);
  }
  //добавляет карточку в начало
  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  renderer() {
    this._renderer(this._renderedItems);
  }
}
