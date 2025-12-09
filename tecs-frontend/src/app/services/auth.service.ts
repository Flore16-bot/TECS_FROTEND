// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from './api-url';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  nombreCompleto: string;
  telefono: string;
  institucion: string;
  avatar: string | null;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${API_URL}/auth/login`, { email, password })
      .pipe(map(response => {
        if (response.success && response.token) {
          const user: User = {
            ...response.user,
            token: response.token
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }
        throw new Error(response.message || 'Login failed');
      }));
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${API_URL}/auth/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getProfile(): Observable<User> {
    return this.http.get<any>(`${API_URL}/auth/profile`)
      .pipe(map(response => response.user));
  }

  updateProfile(userData: any): Observable<any> {
    return this.http.put(`${API_URL}/auth/profile`, userData);
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.put(`${API_URL}/auth/change-password`, {
      currentPassword,
      newPassword
    });
  }

  updateAvatar(avatar: string): Observable<any> {
    return this.http.put(`${API_URL}/auth/avatar`, { avatar });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${API_URL}/auth/user`);
  }

  updateUserRole(userId: number, role: string, numeroTrabajador?: string): Observable<any> {
    const data: any = { role };
    if (numeroTrabajador) {
      data.numeroTrabajador = numeroTrabajador;
    }
    return this.http.put(`${API_URL}/auth/update-role/${userId}`, data);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${API_URL}/auth/users/${userId}`);
  }

  getAvatar(userId: number): Observable<any> {
    return this.http.get(`${API_URL}/auth/avatar/${userId}`, { responseType: 'blob' });
  }
}