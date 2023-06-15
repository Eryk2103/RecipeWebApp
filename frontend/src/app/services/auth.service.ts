import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Token } from '../models/token';
import { BehaviorSubject } from 'rxjs';
import { CurrentUser } from '../models/currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = "http://15.236.90.107:3000/auth";

  username = new BehaviorSubject<string | undefined>(undefined);

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post<Token>(this.url + '/login', user);
  }

  register(user: User) {
    return this.http.post(this.url + '/register', user);
  }
  getUser(){
    const token = this.getToken();
    return this.http.get<CurrentUser>(this.url + '/user',{headers: { Authorization: 'Bearer '+ token}});
  }
  setToken(token: string){
    localStorage.setItem('token', token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('token');
  }
}
