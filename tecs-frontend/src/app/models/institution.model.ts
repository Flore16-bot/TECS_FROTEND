// src/app/models/institution.model.ts
export interface Institution {
  id: number;
  userId: number;
  nombre: string;
  claveCCT: string;
  telefono?: string;
  extension?: string;
  correo?: string;
  nombreRepresentante?: string;
  puestoRepresentante?: string;
  direccion?: string;
  logo?: string;
  estado: 'active' | 'inactive';
  carreras?: any[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InstitutionFormData {
  nombre: string;
  claveCCT: string;
  telefono?: string;
  extension?: string;
  correo?: string;
  nombreRepresentante?: string;
  puestoRepresentante?: string;
  direccion?: string;
  logo?: string;
  estado?: 'active' | 'inactive';
  carreras?: number[];
}

export interface InstitutionStats {
  totalInstitutions: number;
  activeInstitutions: number;
  institutionsWithCareers: number;
}