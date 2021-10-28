import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public user: User;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/authenticate2`, { username, password })
      .pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('tokenDate', new Date().toString());
        this.currentUserSubject.next(user);
        return user;
      }), catchError(error => {
        return throwError(error);
      })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('tokenDate');
    localStorage.removeItem('userData');
    this.currentUserSubject = null;
  }

  isMenuAvailable(path: string, type: string): boolean {
    const userStr = localStorage.getItem("userData");
    let found: boolean = false;
    if (userStr != null) {
      this.user = JSON.parse(userStr);

      if (this.user.roles) {
        for (var role of this.user.roles) {
          if (!found) {
            for (var access of role.access) {
              if (path == access.path && type == access.type) {
                found = true;
                break;
              }
            }
          } else {
            break;
          }
        }
      }
      return found;
    } else {
      return false;
    }
  }
}
