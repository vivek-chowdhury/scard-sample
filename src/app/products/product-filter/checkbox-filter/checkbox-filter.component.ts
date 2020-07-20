import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import {  } from '@angular/core';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.scss'],
})
export class CheckboxFilterComponent implements OnInit {
  @Input() sectionTitle: string;
  @Input() filters: [];
  @Output() filterSelected: EventEmitter<any> = new EventEmitter();
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

  /**
   * @description This method is invoked when user selects any filter from the filter list.
   * @param filter Contain reference of selected filter
   */
  handleFilterSelection(filter): void {
    this.filterSelected.emit(filter);
  }
}
