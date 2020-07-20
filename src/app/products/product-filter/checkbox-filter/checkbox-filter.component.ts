import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.scss'],
})
export class CheckboxFilterComponent implements OnInit {
  @Input() sectionTitle: string;
  @Input() filters: [];
  constructor() {}

  ngOnInit(): void {}

  /**
   * @description This method is used for track by modifier
   *
   * @param index contains index of element
   * @param el contains reference of element
   * @return number
   */
  trackByModifier(index: number, el: any): number {
    return el.id;
  }
}
