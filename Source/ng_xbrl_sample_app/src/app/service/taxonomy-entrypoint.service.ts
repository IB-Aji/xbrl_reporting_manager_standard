import { TaxonomyEntrypoint } from './../model/taxonomy-entrypoint';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class TaxonomyEntrypointService {

  private apiUrl = environment.apiUrl + '/taxonomy/entrypoint';

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

  saveTaxonomyEntrypoint(taxonomyEntrypoint: TaxonomyEntrypoint): Observable<any> {

    return this.http.post(this.apiUrl, taxonomyEntrypoint)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )

  }


  saveListTaxonomyEntrypoint(taxonomyEntrypoints: TaxonomyEntrypoint[]): Observable<any> {

    return this.http.post(this.apiUrl+ '/save-list' , taxonomyEntrypoints)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )

  }

  updateListTaxonomyEntrypoint(taxonomyEntrypoints: TaxonomyEntrypoint[]): Observable<any> {

    return this.http.put(this.apiUrl+ '/save-list' , taxonomyEntrypoints)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )

  }

  getMasterForm(taxonomyEntrypoint: TaxonomyEntrypoint): Observable<any[]> {
    return this.http.post(this.apiUrl+'/getMasterForm', taxonomyEntrypoint)
      .pipe(
        map((res: any[]) => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        );
  }



  deleteTaxonomyEntrypointById(id: number): Observable<any> {
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

  updateTaxonomyEntrypoint(taxonomyEntrypoint: TaxonomyEntrypoint): Observable<any> {
    return this.http.put(this.apiUrl, taxonomyEntrypoint)
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

  getAllEntryPoint(): Observable<any[]> {
    return this.http.get(this.apiUrl + '/getAllEntryPoint')
      .pipe(
        map((res: any[]) => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        );
  }

  getTaxonomyEntryPoint(taxonomyReleaseId: number, institutionCode: string, sector: string, frequency: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${taxonomyReleaseId}/${institutionCode}/${sector}/${frequency}`)
      .pipe(
        map((res: any) => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        );
  }

}
