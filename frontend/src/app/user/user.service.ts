import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  //самият юзър като се логне
  private user$$ = new BehaviorSubject<User | undefined>(undefined);

  //публик за да може и от други места да го достъпваме
  user$ = this.user$$.asObservable();

  user: User | undefined;
  USER_KEY = '[user]';

  //когато нашия юзър се събскрайбне в конструктора и тук моментално показва дали e логнат
  get isLogged(): boolean {
    return !!this.user;
  }

  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  register(
    username: string,
    email: string,
    tel: string,
    password: string,
    rePassword: string,
  ) {
    return this.http
      .post<User>('/api/register', {
        username,
        email,
        tel,
        password,
        rePassword,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  login(username: string, password: string) {
    return this.http
      .post<User>('/api/login', { username, password })
      .pipe(tap((user) => this.user$$.next(user)));  
  }

  logout() {
    return this.http
      .post<User>('/api/logout', {})
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  getUser() {
    return this.http
      .get<User>('/api/users/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  editUserProfile(username: string, email: string, tel?: string) {
    return this.http
      .put<User>('/api/users/profile', { username, email, tel })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
