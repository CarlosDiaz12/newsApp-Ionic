import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Article } from '../models/Article';
@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  constructor(private http: HttpClient) { }

  getTopHeadlines(page: number = 1): Observable<any> {
    return this.http.get(`${environment.API_BASE_URL}${environment.API_KEY}&page=${page}`).pipe(catchError(this.handleError));
  }

  getTopHeadlinesPerCategory(page: number = 1, category: string): Observable<any> {
    return this.http.get(`${environment.API_BASE_URL}${environment.API_KEY}&page=${page}&category=${category}`)
    .pipe(catchError(this.handleError));
  }


  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
