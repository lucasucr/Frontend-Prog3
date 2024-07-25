import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Usuario } from 'src/model/Usuario';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedIn: Observable<boolean> = this.loggedInSubject.asObservable();
  

  constructor(private apiService: ApiService) { }

  login(username: any, password: any): Observable<boolean> {
    localStorage.setItem('user', btoa(username + ":" + password))
    const obs: Observable<boolean> = this.apiService.login(username, password);
    obs.subscribe((res) => {
      if(!res) {
        localStorage.removeItem('user')
      }
      this.loggedInSubject.next(res)
    })
    return obs
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  logout() {
    this.loggedInSubject.next(false)
    localStorage.removeItem('user')
  }
}
