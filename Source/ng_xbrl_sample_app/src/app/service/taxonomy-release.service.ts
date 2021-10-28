import { TaxonomyRelease } from './../model/taxonomy-release';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class TaxonomyReleaseService {

  private apiUrl = environment.apiUrl + '/taxonomy/release';

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
      )
  }

  saveTaxonomyRelease(taxonomyRelease: TaxonomyRelease): Observable<any> {

    return this.http.post(this.apiUrl, taxonomyRelease)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )

  }

  deleteTaxonomyReleaseById(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )
  }

  updateTaxonomyRelease(taxonomyRelease: TaxonomyRelease): Observable<any> {
    return this.http.put(this.apiUrl, taxonomyRelease)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )

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
      )
  }


  findEntryPath(id: number): Observable<any[]> {
    return this.http.get(this.apiUrl+ '/entrypath/' + id)
      .pipe(
        map(((res: any[]) => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )
  }
}
