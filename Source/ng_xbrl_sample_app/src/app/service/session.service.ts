import { Injectable } from '@angular/core';
import { Session } from '../model/session';
import { Http, Response } from '@angular/http';
import { map, catchError, } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable()
export class SessionService {

  private apiUrl = environment.apiUrl + '/session';

  constructor(private http: Http) {
  }

  findById(id: number): Observable<Session> {
    return this.http.get(this.apiUrl + '/' + id)
      .pipe(
        map((res => {
          return res.json();
        }), catchError(error => {
          return throwError('error');
        })
        )
      )
  }

  saveUser(session: Session): Observable<Response> {

    return this.http.post(this.apiUrl, session)
      .pipe(
        map((res => {
          return res.json();
        }), catchError(error => {
          return throwError('error');
        })
        )
      )

  }

  deleteUserById(id: number): Observable<boolean> {
    return this.http.delete(this.apiUrl + '/' + id)
      .pipe(
        map((res => {
          return res.json();
        }), catchError(error => {
          return throwError('error');
        })
        )
      )
  }

  updateUser(session: Session): Observable<Session> {
    return this.http.put(this.apiUrl, session)
      .pipe(
        map((res => {
          return res.json();
        }), catchError(error => {
          return throwError('error');
        })
        )
      )

  }

  findAll(): Observable<Session[]> {
    return this.http.get(this.apiUrl)
      .pipe(
        map((res => {
          return res.json();
        }), catchError(error => {
          return throwError('error');
        })
        )
      )
  }

}
