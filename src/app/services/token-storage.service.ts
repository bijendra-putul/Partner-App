import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  logOut() {
    window.localStorage.clear();
  }

  saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

   getToken(): any{
    return localStorage.getItem(TOKEN_KEY);
    //sessionStorage.getItem(TOKEN_KEY);
  }

   saveUser(user) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

   getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
}
