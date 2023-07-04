import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, map, shareReplay, tap } from 'rxjs';
import { RegisterUser } from '../models/registerUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url = "http://15.236.90.107:3000/auth";
  private subject = new BehaviorSubject<User|null>(null);

  user$: Observable<User|null> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient) {

    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));

    const token = localStorage.getItem('token');
    if(token){
      this.getUser(token).pipe(map(res => <User>{username: res.username, access_token: token} )).subscribe({
        next: user => this.subject.next(user)
      });
    }
  }

  login(login: string, password: string) {
    return this.http.post<User>(this.url + '/login', { username: login, password})
      .pipe(
        tap(
          (user) => { 
            this.subject.next(user);
            localStorage.setItem('token', user.access_token);
            console.log(user)
          }),
        shareReplay()
      );
  }

  register(user: RegisterUser) {
    return this.http.post(this.url + '/register', user);
  }

  logout(){
    this.subject.next(null);
    localStorage.removeItem('token');
  }

  private getUser(token: string){
    return this.http.get<User>(this.url + '/user',{headers: { Authorization: 'Bearer '+ token}});
  }
}
