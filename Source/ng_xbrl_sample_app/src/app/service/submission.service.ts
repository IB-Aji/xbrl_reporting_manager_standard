import { InstanceParameter } from './../model/instance-parameter';
import { Submission } from './../model/submission';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class SubmissionService {

  private apiUrl = environment.apiUrl + '/submission';

  constructor(private http: HttpClient) {
  }

  submitReporting(submission: Submission): Observable<any> {

    return this.http.post(this.apiUrl, submission)
      .pipe(
        map((res => {
          console.log(res);
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }

  findSubmission(parameter: InstanceParameter): Observable<any[]> {

    return this.http.post(this.apiUrl + '/summarybyparam/', parameter)
      .pipe(
        map(((res: any[]) => {
          console.log(res);
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }

  getCustomers(processId: string): Observable<any[]> {
    return this.http.get(this.apiUrl + '/summarycustomerbyparam/' + processId)
      .pipe(
        map(((res: any[]) => {
          console.log(res);
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }

  getAccounts(processId: string): Observable<any[]> {
    return this.http.get(this.apiUrl + '/summaryaccountbyparam/' + processId)
      .pipe(
        map(((res: any[]) => {
          console.log(res);
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }

  getTransactions(processId: string): Observable<any[]> {
    return this.http.get(this.apiUrl + '/summarytransactionbyparam/' + processId)
      .pipe(
        map(((res: any[]) => {
          console.log(res);
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }

}
