import { Injectable } from '@angular/core';
import { Parameter } from '../model/parameter';
import { HttpClient } from '@angular/common/http';
import { map, catchError, } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ParameterService {

  private apiUrl = environment.apiUrl + '/parameter';

  constructor(private http: HttpClient) {
  }

  findById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }

  findByType(code: string): Observable<any> {
    return this.http.get(this.apiUrl + '/type/' + code)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }

  saveParameter(patameter: Parameter): Observable<any> {

    return this.http.post(this.apiUrl, patameter)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );

  }

  deleteParameterById(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }

  updateParameter(patameter: Parameter): Observable<any> {
    return this.http.put(this.apiUrl, patameter)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );

  }

  findAll(): Observable<any[]> {
    return this.http.get(this.apiUrl)
      .pipe(
        map(((res: any[]) => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }

    getTypes(): Observable<any[]> {
    return this.http.get(this.apiUrl+ '/types')
      .pipe(
        map(((res: any[]) => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }

}
