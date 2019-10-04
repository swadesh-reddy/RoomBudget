import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    authToken: any;
    user: any
    token: any
    public url = "http://localhost:3100/users/";
    public _headers = new HttpHeaders({
        "cache-control": 'no-cache',
    });
    redirectUrl = "/login";
    constructor(private http: HttpClient) { }

    Login(data) {
        return this.http.post(this.url + '/login', data, { headers: this._headers });
    }

   
    loadToken() {
        const token = localStorage.getItem('token');
        this.authToken = token;
        return token;
    }
  
    storageUserData(data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        this.authToken = data.token;

    }
    logout() {
        this.authToken = '';
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        localStorage.clear();
    }
}
