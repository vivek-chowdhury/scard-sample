import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilterService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * @description This method is responsible for fetching list of production from server.
   *
   * @return Observable<IProduct[]>
   */
  public getFitlers(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + '/filters').pipe(
      tap((data) => console.log('Fetched filter list from server !')),
      map((response) => {
        return response;
      }),
      catchError((error) => {
        return this.handleError(error);
      })
    );
  }
}
