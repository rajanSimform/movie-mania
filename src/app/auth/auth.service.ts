import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  statusCode: number;
  message: string;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUserSubject = new BehaviorSubject<User>(null);
  expirationTimer: any;

  constructor(private http: HttpClient) {}

  login(loginData: LoginData) {
    return this.http.post<AuthResponse>(
      'http://localhost:8080/auth/login',
      loginData
    );
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (!user) {
      return;
    }
    const loggedUser = new User(user._id, user.email, user.name, user._token);

    const expirationTime = (loggedUser.expiresIn - new Date().getTime()) / 1000;

    console.log('token exprires in:', expirationTime, 'seconds');

    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, expirationTime * 1000);

    if (loggedUser.token) {
      // console.log('logged in User', loggedUser);
      this.authUserSubject.next(loggedUser);
    }
  }

  logout() {
    this.authUserSubject.next(null);
    localStorage.removeItem('userData');
  }
}
