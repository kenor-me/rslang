import BaseComponent from './BaseComponent';

class Preloader extends BaseComponent {
  row: BaseComponent = new BaseComponent(this.node, 'div', 'preloader__row', '');

  item1: BaseComponent = new BaseComponent(this.row.node, 'div', 'preloader__item', '');

  item2: BaseComponent = new BaseComponent(this.row.node, 'div', 'preloader__item', '');

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'preloader');
  }
}

export default Preloader;
