import BaseComponent from './BaseComponent';

export class PageSwitcher extends BaseComponent {
  prevButton: BaseComponent = new BaseComponent(this.node, 'div', 'pagination-prev', '');

  title:BaseComponent = new BaseComponent(this.node, 'div', 'book-page-number-page', '');

  nextButton: BaseComponent = new BaseComponent(this.node, 'div', 'pagination-next', '');

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'book-page-pagination');
  }

  setNumberPage(pageNumber: number): void {
    this.title.node.innerText = `Страница №${pageNumber + 1}`;
    pageNumber + 1 === 30 ? this.nextButton.node.style.visibility = 'hidden'
      : this.nextButton.node.style.visibility = 'visible';
    pageNumber + 1 === 1 ? this.prevButton.node.style.visibility = 'hidden'
      : this.prevButton.node.style.visibility = 'visible';
  }
}
