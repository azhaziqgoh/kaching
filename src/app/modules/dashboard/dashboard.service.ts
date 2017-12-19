import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';

import { Ledger } from '../ledger/ledger';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DashboardService {

  private ledgerEntriesUrl = 'api/ledgerEntries';

  constructor(
    private http: HttpClient) { }

  /** GET ledger entries from the server */
  getLedgerEntries (): Observable<Ledger[]> {
    return this.http.get<Ledger[]>(this.ledgerEntriesUrl)
      .pipe(
        catchError(this.handleError('getLedgers', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}