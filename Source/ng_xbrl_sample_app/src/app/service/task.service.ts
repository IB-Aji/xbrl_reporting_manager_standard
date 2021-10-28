import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { map, catchError, } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class TaskService {

  private apiUrl = environment.apiUrl + '/task';

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


  findAll(): Observable<any[]> {
    return this.http.get(this.apiUrl)
      .pipe(
        map(((res: any[]) => {
          let resObj: any;
          for (let i = 0; i < res.length; i++) {
            try {
              resObj = res[i]['objectVal'];
              resObj = JSON.parse(resObj);
              res[i]['objectVal'] = resObj;
            } catch (ex) {

            }
          }
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )
  }

}
