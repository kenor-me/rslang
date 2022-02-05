import { locationResolver } from '../main';
import BaseComponent from './BaseComponent';
import { PageSwitcher } from './PageSwitcher';
import { SelectSwitcher } from './SelectSwitcher';

export class Navigation extends BaseComponent {
  leftBlock: BaseComponent = new BaseComponent(this.node, 'div', 'nav-left', '');

  logo:BaseComponent = new BaseComponent(this.leftBlock.node, 'div', 'book-page-nav-logo', '');

  sprintButton:BaseComponent = new BaseComponent(this.node, 'div', 'book-page-nav-sprint', '');

  pageSwitcher:PageSwitcher = new PageSwitcher(this.node);

  audioCallButton:BaseComponent = new BaseComponent(this.node, 'div', 'book-page-nav-audio', '');

  rightBlock:BaseComponent = new BaseComponent(this.node, 'div', 'nav-right', '');

  select:SelectSwitcher;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'navigation');
    this.sprintButton.node.innerHTML = '<div></div><span>Спринт</span>';
    this.audioCallButton.node.innerHTML = '<div></div><span>Аудиовызов</span>';
    this.select = new SelectSwitcher(this.rightBlock.node);
    this.logo.node.addEventListener('click', () => {
      locationResolver('#/');
    });
  }
}
