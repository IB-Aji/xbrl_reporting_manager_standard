import { Injectable } from '@angular/core';
import { Location } from '../model/location';
import { HttpClient } from '@angular/common/http';
import { map, catchError, } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class LocationService {

  private apiUrl = environment.apiUrl + '/location';

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

  findByLevel(level: number): Observable<any> {
    return this.http.get(this.apiUrl + '/level/' + level)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }

  findByParentId(parentId: number): Observable<any> {
    return this.http.get(this.apiUrl + '/parent/' + parentId)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }

  saveLocation(location: Location): Observable<any> {

    return this.http.post(this.apiUrl, location)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );

  }

  deleteLocationById(id: number): Observable<any> {
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

  updateLocation(location: Location): Observable<any> {
    return this.http.put(this.apiUrl, location)
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

}
