import { Action } from '@ngrx/store';

export enum FilterActionTypes {
  LoadFilters = '[FILTER REQUEST] LOAD AVAILABLE FILTERS',
  LoadFiltersSuccess = '[FILTER RESPONSE] SUCCESSFULLY LOADED FILTERS',
  LoadFiltersFailure = '[FILTER RESPONSE] FILTERS FAILED TO LOAD',
  UpdateSelectedFilter = '[FILTER SELECTED CHANGED] UPDATE FILTER SELECTION',
}

export class LoadFilters implements Action {
  readonly type = FilterActionTypes.LoadFilters;
  constructor() {}
}

export class LoadFiltersSuccess implements Action {
  readonly type = FilterActionTypes.LoadFiltersSuccess;
  constructor(public filters: any) {}
}

export class LoadFiltersFailure implements Action {
  readonly type = FilterActionTypes.LoadFiltersFailure;
  constructor(public error: any) {}
}

export class UpdateSelectedFilter implements Action {
  readonly type = FilterActionTypes.UpdateSelectedFilter;
  constructor(public option: any) {}
}

export type FilterAction =
  | LoadFilters
  | LoadFiltersSuccess
  | LoadFiltersFailure
  | UpdateSelectedFilter;
