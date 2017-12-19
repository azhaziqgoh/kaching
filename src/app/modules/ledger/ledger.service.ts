import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Ledger } from './ledger';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LedgerService {

  private ledgerEntriesUrl = 'api/ledgerEntries';
  private currentRunningNumber: number;

  constructor(
    private http: HttpClient) { }

  /** GET ledger entries from the server */
  getLedgerEntries (): Observable<Ledger[]> {
    return this.http.get<Ledger[]>(this.ledgerEntriesUrl)
      .pipe(
        tap(le => this.currentRunningNumber = this.currentRunningNumber ? this.currentRunningNumber : le[le.length -1].id),
        catchError(this.handleError('getLedgers', []))
      );
  }

  /** POST: add ledger entry to the server */
  addLedgerEntry (ledger: Ledger): Observable<Ledger> {

    ledger.id = ++this.currentRunningNumber;

    return this.http.post<Ledger>(this.ledgerEntriesUrl, ledger, httpOptions).pipe(
      catchError(this.handleError<Ledger>('addLedger'))
    );
  }

  /** DELETE: delete ledger entry from the server */
  deleteLedgerEntry (ledger: Ledger | number): Observable<Ledger> {
    const id = typeof ledger === 'number' ? ledger : ledger.id;
    const url = `${this.ledgerEntriesUrl}/${id}`;

    return this.http.delete<Ledger>(url, httpOptions).pipe(
      catchError(this.handleError<Ledger>('deleteLedger'))
    );
  }

  /** PUT: update ledger entry on the server */
  updateLedgerEntry (ledger: Ledger): Observable<any> {
    return this.http.put(this.ledgerEntriesUrl, ledger, httpOptions).pipe(
      catchError(this.handleError<any>('updateLedger'))
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