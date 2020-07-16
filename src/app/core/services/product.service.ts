import { IProduct } from './../../shared/interfaces/product';
import { environment } from './../../../environments/environment';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * @description This method is responsible for fetching list of production from server.
   *
   * @return Observable<IProduct[]>
   */
  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(environment.baseUrl + '/products').pipe(
      tap((data) => console.log('Fetched product list from server !')),
      map((response) => {
        return response;
      }),
      catchError((error) => {
        return this.handleError(error);
      })
    );
  }
}
