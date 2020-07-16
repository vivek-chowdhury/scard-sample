import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class BaseService {
  constructor(protected http: HttpClient) {}
  /**
   * @description This function is responsible for handling any error which may occure
   * during interaction with server.
   *
   * @return Observable<never>
   */
  protected handleError(err): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
