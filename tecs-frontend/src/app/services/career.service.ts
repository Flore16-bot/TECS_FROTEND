// src/app/services/career.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api-url';

export interface Career {
  id: number;
  userId: number;
  nombre: string;
  numeroCarrera: string;
  cantidadAlumnos: number;
  duracionSemestres: number;
  modalidad: 'Escolarizada' | 'Mixta' | 'Virtual';
  turno: 'Matutino' | 'Vespertino' | 'Nocturno' | 'Mixto';
  fechaRegistro: string;
  descripcion: string;
  activa: boolean;
  poblacionEsperada: number;
  poblacionReal: number;
  logo?: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  constructor(private http: HttpClient) {}

  getMyCareers(): Observable<any> {
    return this.http.get(`${API_URL}/careers/my-careers`);
  }

  getAvailableCareers(): Observable<any> {
    return this.http.get(`${API_URL}/careers/available`);
  }

  getAllCareers(): Observable<any> {
    return this.http.get(`${API_URL}/careers`);
  }

  getCareer(id: number): Observable<any> {
    return this.http.get(`${API_URL}/careers/${id}`);
  }

  createCareer(career: any): Observable<any> {
    return this.http.post(`${API_URL}/careers`, career);
  }

  updateCareer(id: number, career: any): Observable<any> {
    return this.http.put(`${API_URL}/careers/${id}`, career);
  }

  deleteCareer(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/careers/${id}`);
  }

  searchCareers(searchTerm: string): Observable<any> {
    return this.http.get(`${API_URL}/careers/search?search=${searchTerm}`);
  }

  updateMetrics(id: number, metrics: { poblacionEsperada: number, poblacionReal: number }): Observable<any> {
    return this.http.put(`${API_URL}/careers/${id}/metrics`, metrics);
  }

  updateLogo(id: number, logo: string): Observable<any> {
    return this.http.put(`${API_URL}/careers/${id}/logo`, { logo });
  }

  exportToExcel(): Observable<any> {
    return this.http.get(`${API_URL}/careers/export/excel`, {
      responseType: 'blob'
    });
  }

  exportToJson(): Observable<any> {
    return this.http.get(`${API_URL}/careers/export/json`, {
      responseType: 'blob'
    });
  }

  getStats(): Observable<any> {
    return this.http.get(`${API_URL}/careers/stats/stats`);
  }
}