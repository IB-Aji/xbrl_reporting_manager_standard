import { Injectable } from '@angular/core';
import { TaxonomyMasterForm } from '../model/taxonomy-masterform';
import { HttpClient } from '@angular/common/http';
import { map, catchError, } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class TaxonomyMasterFormService {

  private apiUrl = environment.apiUrl + '/taxonomy/form';

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

  saveTaxonomyMasterForm(taxonomyMasterForm: TaxonomyMasterForm): Observable<any> {

    return this.http.post(this.apiUrl, taxonomyMasterForm)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )

  }

  deleteTaxonomyMasterFormById(id: number): Observable<any> {
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

  updateTaxonomyMasterForm(taxonomyMasterForm: TaxonomyMasterForm): Observable<any> {
    return this.http.put(this.apiUrl, taxonomyMasterForm)
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



  getTables(taxonomyMasterForm: TaxonomyMasterForm): Observable<any[]> {
    return this.http.post(this.apiUrl + '/get-tables', taxonomyMasterForm)
      .pipe(
        map(((res: any[]) => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )
  }

  getColumns(taxonomyMasterForm: TaxonomyMasterForm): Observable<any[]> {
    return this.http.post(this.apiUrl + '/get-columns', taxonomyMasterForm)
      .pipe(
        map(((res: any[]) => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )
  }

  getFormMapping(taxonomyMasterForm: TaxonomyMasterForm): Observable<any[]> {
    return this.http.post(this.apiUrl + '/get-mapping', taxonomyMasterForm)
      .pipe(
        map(((res: any[]) => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )
  }

  findWithprocessLogByPeriod(requestParameter: any): Observable<any[]> {
    return this.http.post(this.apiUrl+'/processLogbyPeriod', requestParameter)
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
