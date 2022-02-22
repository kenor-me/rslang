import BaseComponent from './BaseComponent';
import { PageSwitcher } from './PageSwitcher';
import { SelectSwitcher } from './SelectSwitcher';

export class Navigation extends BaseComponent {
  leftBlock: BaseComponent = new BaseComponent(this.node, 'div', 'nav-left', '');

  logo: BaseComponent<HTMLAnchorElement> = new BaseComponent(this.leftBlock.node, 'a', 'book-page-nav-logo', '');

  sprintButton: BaseComponent<HTMLAnchorElement> = new BaseComponent(this.node, 'a', 'book-page-nav-sprint', '');

  pageSwitcher: PageSwitcher = new PageSwitcher(this.node);

  audioCallButton: BaseComponent<HTMLAnchorElement> = new BaseComponent(this.node, 'a', 'book-page-nav-audio', '');

  rightBlock: BaseComponent = new BaseComponent(this.node, 'div', 'nav-right', '');

  select: SelectSwitcher;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'navigation');
    this.sprintButton.node.innerHTML = '<div></div><span>Спринт</span>';
    this.sprintButton.node.href = '#sprint';
    this.audioCallButton.node.innerHTML = '<div></div><span>Аудиовызов</span>';
    this.audioCallButton.node.href = '#audiocall';
    this.select = new SelectSwitcher(this.rightBlock.node);
    this.logo.node.href = '';
  }
}
