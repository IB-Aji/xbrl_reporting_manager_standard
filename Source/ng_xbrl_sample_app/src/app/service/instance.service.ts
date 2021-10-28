import { InstanceParameter } from './../model/instance-parameter';
import { Ljk } from './../model/ljk';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class InstanceService {

  private apiUrl = environment.apiUrl + '/instance';

  constructor(private http: HttpClient) { }

  findAll(): Observable<any[]> {
    return this.http.get(this.apiUrl + '/viewer')
      .pipe(
        map(((res: any[]) => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )
  }

  findById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/viewer/' + id)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )
  }

  findAccountBykdCifNasabah(kdCifNasabah: string): Observable<any> {
    return this.http.get(this.apiUrl + '/viewer/account/cif/' + kdCifNasabah)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )
  }

  findAccountById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/viewer/account/id/' + id)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )
  }

  findTransactionByAccount(accountNumber: string): Observable<any> {
    return this.http.get(this.apiUrl + '/viewer/account/transaction/acct/' + accountNumber)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )
  }

  findTaxonomyForm(parameter: InstanceParameter): Observable<any[]> {
    return this.http.post(this.apiUrl + '/formSearch/', parameter)
      .pipe(
        map(((res: any[]) => {
          return res;
        }), catchError(error => {
          return throwError(error);
        })
        )
      );
  }

  createInstance(parameter: InstanceParameter): Observable<any> {
    return this.http.post(this.apiUrl + '/create/', parameter)
      .pipe(
        map(((res: any) => {
          return res;
        }), catchError(error => {
          return throwError(error);
        })
        )
      );
  }

  validateInstance(parameter: InstanceParameter): Observable<any> {
    return this.http.post(this.apiUrl + '/validate/', parameter)
      .pipe(
        map(((res: any) => {
          return res;
        }), catchError(error => {
          return throwError(error);
        })
        )
      );
  }

  validateAllInstance(parameter: InstanceParameter): Observable<any> {
    return this.http.post(this.apiUrl + '/validateAll/', parameter)
      .pipe(
        map(((res: any) => {
          return res;
        }), catchError(error => {
          return throwError(error);
        })
        )
      );
  }

  compressInstance(parameter: InstanceParameter): Observable<any> {
    return this.http.post(this.apiUrl + '/compressandsent/', parameter)
      .pipe(
        map(((res: any) => {
          return res;
        }), catchError(error => {
          return throwError(error);
        })
        )
      );
  }

  downloadFile(parameter: InstanceParameter): Observable<any> {
    return this.http.post(this.apiUrl + '/downloadfile/', parameter, {responseType: 'blob', headers: new HttpHeaders().append("Content-Type", "application/vnd.ms-excel")})
  }

  findLogHeaderCreation(processId: number): Observable<any[]> {
    return this.http.get(this.apiUrl + '/logheadercreation/' + processId)
      .pipe(
        map(((res: any[]) => {
          return res;
        }), catchError(error => {
          return throwError(error);
        })
        )
      );
  }

  findLogHeaderValidation(processId: number): Observable<any[]> {
    return this.http.get(this.apiUrl + '/logheadervalidation/' + processId)
      .pipe(
        map(((res: any[]) => {
          return res;
        }), catchError(error => {
          return throwError(error);
        })
        )
      );
  }

  findLogHeader(processId: number): Observable<any[]> {
    return this.http.get(this.apiUrl + '/logheader/' + processId)
      .pipe(
        map(((res: any[]) => {
          return res;
        }), catchError(error => {
          return throwError(error);
        })
        )
      );
  }

  findLogDetail(headerId: number): Observable<any[]> {
    return this.http.get(this.apiUrl + '/logdetail/' + headerId)
      .pipe(
        map(((res: any[]) => {
          return res;
        }), catchError(error => {
          return throwError(error);
        })
        )
      );
  }
}
