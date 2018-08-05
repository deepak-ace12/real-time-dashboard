import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from '../../../node_modules/rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as io from 'socket.io-client';

const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type':  'application/json',
    // 'Authorization': 'Bearer'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private url = 'http://kaboom.rksv.net/watch';  //'ws://kaboom.rksv.net/
  private socket;

  constructor(
    private http: HttpClient
  ) {
    this.socket = io(this.url);
  }

  /** Get historical data*/
  getHistory(): Observable<any> {
    let url = 'http://kaboom.rksv.net/api/historical'
    return this.http.get(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  /**Subscribe to sub event */
  public getSubs = () => {
    return Observable.create((observer) => {
      console.log(this.socket.connected);
      this.socket.emit('sub', { state: true });
      this.socket.on('sub',
        (message) => {
          console.log(message, "messagemessage")
          observer.next(message);
        });
    });
  }

  /**Unubscribe to sub event */
  public unSubscribe = () => {
    return Observable.create((observer) => {
      console.log(this.socket.connected);
      this.socket.emit('sub', { state: false });
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


}
