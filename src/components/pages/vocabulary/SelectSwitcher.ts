import { Token } from '../../types';
import BaseComponent from './BaseComponent';

export class SelectSwitcher extends BaseComponent<HTMLSelectElement> {
  MAX_COUNT_PART = 6;

  COLOR_FOR_PART = [
    '#a5e8d6',
    '#4e8dc0',
    '#6b66a6',
    '#d76565',
    '#e6cccb',
    '#d9bb63',
    '#fdfdc7',
  ];

  user:Token | null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'select', 'select-partition');
    this.node.id = 'part-number'; // name="part"
    for (let i = 1; i <= this.MAX_COUNT_PART; i++) {
      const option = document.createElement('option');
      option.value = (i - 1).toString();
      option.textContent = `part ${i}`;
      option.style.backgroundColor = this.COLOR_FOR_PART[i - 1];
      this.node.append(option);
    }
    this.user = JSON.parse(localStorage.getItem('userAuth') as string);
    if (this.user) {
      const option = document.createElement('option');
      option.value = this.MAX_COUNT_PART.toString();
      option.style.backgroundColor = this.COLOR_FOR_PART[this.MAX_COUNT_PART];
      option.textContent = 'Сложные';
      this.node.append(option);
    }
  }

  setColorSelect(color:string):void {
    this.node.style.backgroundColor = color;
  }
}
