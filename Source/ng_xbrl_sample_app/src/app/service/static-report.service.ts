import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StaticReportHeader } from '../model/static-report/static-report-header';

@Injectable()
export class StaticReportService {

  private apiUrl = environment.apiUrl + '/static-report-setup';

  constructor(private http: HttpClient) {
  }

  getAllFormsOfAnEntrypoint(entrypointId: number, unitCurrency: string): Observable<any> {
    const webMethodUri = `${this.apiUrl}/before-main/forms/${entrypointId}/${unitCurrency}`;
    return this.http.get(webMethodUri)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )
  }
  
  initialSubmit(staticReportHeader: StaticReportHeader): Observable<any> {
    const webMethodUri = `${this.apiUrl}/before-main/submit`;
    return this.http.post(webMethodUri, staticReportHeader)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }

  submitForValidation(staticReportHeader: StaticReportHeader) : Observable<any> {
    const webMethodUri = `${this.apiUrl}/main/submit`;
    const param = new StaticReportHeader();
    param.id = staticReportHeader.id;
    return this.http.post(webMethodUri, param)
      .pipe(
        map(() => {
          return "final submit is success";
        }), catchError(error => {
          return throwError('error');
        })
        );
  }

  validateStaticReport(headerId: number) : Observable<any> {
    const webMethodUri = `${this.apiUrl}/main/validate/${headerId}`;
    return this.http.post(webMethodUri, {})
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }

  getAllFormInfoByDocumentname(documentName: string) : Observable<any> {
    return null;
  }

  getWebFormDocument(documentName: string, formCode: string) : Observable<any> {
    const webMethodUri = `${this.apiUrl}/main/get-web-form-document/${documentName}/${formCode}`;
    return this.http.get(webMethodUri)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }

  saveForm(parameterMap: any, documentName: string, formCode: string) : Observable<any> {
    const webMethodUri = `${this.apiUrl}/main/save-form/${documentName}/${formCode}`;

    return this.http.post(webMethodUri, parameterMap)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      );
  }

  downloadExcelFile(documentName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/main/download-template-excel/${documentName}`, {responseType: 'blob', headers: new HttpHeaders().append("Content-Type", "application/zip")})
  }

  downloadInstanceFile(documentName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/main/download-template-instance/${documentName}`, {responseType: 'blob', headers: new HttpHeaders().append("Content-Type", "application/zip")})
  }

  generatePDFFile(documentName: string, listHTML: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/main/generatePDFFile/${documentName}/${listHTML}`, {responseType: 'blob', headers: new HttpHeaders().append("Content-Type", "application/pdf")})
  }


  uploadExcelFile(documentName: string, base64ExcelFileUpload: any) : Observable<any>{
    const header: StaticReportHeader = new StaticReportHeader();
    header.documentName = documentName;
    header.base64ExcelFileUpload = base64ExcelFileUpload;

    return this.http.post(`${this.apiUrl}/main/upload-excel`, header)
    .pipe(
      map((() => {
        return "upload excel is success";
      }), catchError(error => {
        return throwError('error');
      })
      )
    );
  } 


  uploadInstanceFile(documentName: string, base64InstanceFileUpload: any) : Observable<any>{
    const header: StaticReportHeader = new StaticReportHeader();
    header.documentName = documentName;
    header.base64InstanceFileUpload = base64InstanceFileUpload;

    return this.http.post(`${this.apiUrl}/main/upload-instance`, header)
    .pipe(
      map((() => {
        return "upload instance is success";
      }), catchError(error => {
        return throwError('error');
      })
      )
    );
  }


  findByLjk(ljkid: number) : Observable<any>{
    return this.http.get(`${this.apiUrl}/before-main/all-headers/${ljkid}`)
    .pipe(
      map((res => {
        return res;
      }), catchError(error => {
        return throwError('error');
      })
      )
    );
  }

  findValidationErrorItem(headerId: number): Observable<any> {
    const webMethodUri = `${this.apiUrl}/main/validation/result/error/${headerId}`;
    return this.http.get(webMethodUri)
      .pipe(
        map((res => {
          return res;
        }), catchError(error => {
          return throwError('error');
        })
        )
      )
  }

  findById(id: number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/main/header/${id}`).pipe(
      map((res  => {
        return res;
      }), catchError(error => {
        return throwError('error');
      })
      )
    );
  }

  deleteStaticReportById(id: number) : Observable<any> {
    return this.http.delete(`${this.apiUrl}/before-main/header/{id}`).pipe(
      map((res => {
        return res;
      }), catchError(error => {
        return throwError('error');
      })
      )
    );
  }

  doSimpleCorrection(headerId: number): Observable<any> {
    const webMethodUri = `${this.apiUrl}/main/simple-correction/${headerId}`;
    return this.http.post(webMethodUri, {})
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
