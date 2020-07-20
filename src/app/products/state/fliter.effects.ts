import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { FilterService } from './../../core/services/filter.service';
import * as FilterActions from './filter.action';

@Injectable()
export class FilterEffects {
  constructor(private action$: Actions, private filterService: FilterService) {}

  @Effect()
  filterList$: Observable<Action> = this.action$.pipe(
    ofType(FilterActions.FilterActionTypes.LoadFilters),
    mergeMap(() =>
      this.filterService.getFitlers().pipe(
        map((products) => new FilterActions.LoadFiltersSuccess(products)),
        catchError((error) => of(new FilterActions.LoadFiltersFailure(error)))
      )
    )
  );
}
