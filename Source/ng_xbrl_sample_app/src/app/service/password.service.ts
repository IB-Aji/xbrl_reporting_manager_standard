import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PasswordPolicy } from '../model/password-policy';

@Injectable()
export class PasswordService {

  private apiUrl = environment.apiUrl + '/settings/password';

  constructor(private http: HttpClient) { }

  findAll(): Observable<any[]> {
    return this.http.get(this.apiUrl)
      .pipe(
        map(((res: any[]) => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )
  }

  savePasswordPolicy(passwordPolicy: PasswordPolicy): Observable<any> {
    return this.http.post(this.apiUrl, passwordPolicy)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }

  updatePasswordPolicy(PasswordPolicy: PasswordPolicy): Observable<any> {
    return this.http.put(this.apiUrl, PasswordPolicy)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }
  
}
