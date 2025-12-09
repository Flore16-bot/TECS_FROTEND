// src/app/services/institution.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api-url';

export interface Institution {
  id: number;
  userId: number;
  nombre: string;
  claveCCT: string;
  telefono: string;
  extension?: string;
  correo: string;
  nombreRepresentante?: string;
  puestoRepresentante?: string;
  direccion?: string;
  logo?: string;
  estado: 'active' | 'inactive';
  carreras?: any[];
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  constructor(private http: HttpClient) {}

  getMyInstitutions(): Observable<any> {
    return this.http.get(`${API_URL}/institutions/my`);
  }

  getAllInstitutions(): Observable<any> {
    return this.http.get(`${API_URL}/institutions/all`);
  }

  getInstitution(id: number): Observable<any> {
    return this.http.get(`${API_URL}/institutions/${id}`);
  }

  createInstitution(institution: any): Observable<any> {
    return this.http.post(`${API_URL}/institutions`, institution);
  }

  updateInstitution(id: number, institution: any): Observable<any> {
    return this.http.put(`${API_URL}/institutions/${id}`, institution);
  }

  deleteInstitution(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/institutions/${id}`);
  }

  searchInstitutions(searchTerm: string): Observable<any> {
    return this.http.get(`${API_URL}/institutions/search?search=${searchTerm}`);
  }

  getStatistics(): Observable<any> {
    return this.http.get(`${API_URL}/institutions/stats`);
  }

  assignCareerToInstitution(institutionId: number, careerId: number): Observable<any> {
    return this.http.post(`${API_URL}/institutions/institution-careers`, {
      institutionId,
      careerId
    });
  }

  getInstitutionCareers(): Observable<any> {
    return this.http.get(`${API_URL}/institutions/institution-careers`);
  }

  exportToExcel(): Observable<any> {
    return this.http.get(`${API_URL}/institutions/download/excel`, {
      responseType: 'blob'
    });
  }

  exportToJson(): Observable<any> {
    return this.http.get(`${API_URL}/institutions/download/json`, {
      responseType: 'blob'
    });
  }

  exportCompleteToExcel(): Observable<any> {
    return this.http.get(`${API_URL}/institutions/download/complete/excel`, {
      responseType: 'blob'
    });
  }

  exportCompleteToJson(): Observable<any> {
    return this.http.get(`${API_URL}/institutions/download/complete/json`, {
      responseType: 'blob'
    });
  }

  downloadExampleExcel(): Observable<any> {
    return this.http.get(`${API_URL}/institutions/download-example-excel`, {
      responseType: 'blob'
    });
  }

  getPreRegisteredInstitutions(): Observable<any> {
    return this.http.get(`${API_URL}/institutions/pre-registered/list`);
  }

  loadPreRegisteredInstitutions(): Observable<any> {
    return this.http.post(`${API_URL}/institutions/pre-registered/load`, {});
  }

  getDiagnostic(): Observable<any> {
    return this.http.get(`${API_URL}/institutions/diagnostic`);
  }
}