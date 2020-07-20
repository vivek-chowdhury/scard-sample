import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.scss'],
})
export class CheckboxFilterComponent implements OnInit {
  @Input() sectionTitle: string;
  constructor() {}

  ngOnInit(): void {}
}
