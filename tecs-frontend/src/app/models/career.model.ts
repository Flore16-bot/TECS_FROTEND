// src/app/models/career.model.ts
export interface Career {
  id: number;
  userId: number;
  nombre: string;
  numeroCarrera: string;
  cantidadAlumnos: number;
  duracionSemestres: number;
  modalidad: 'Escolarizada' | 'Mixta' | 'Virtual';
  turno: 'Matutino' | 'Vespertino' | 'Nocturno' | 'Mixto';
  fechaRegistro: Date;
  descripcion?: string;
  activa: boolean;
  poblacionEsperada: number;
  poblacionReal: number;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CareerFormData {
  nombre: string;
  numeroCarrera: string;
  cantidadAlumnos?: number;
  duracionSemestres?: number;
  modalidad?: 'Escolarizada' | 'Mixta' | 'Virtual';
  turno?: 'Matutino' | 'Vespertino' | 'Nocturno' | 'Mixto';
  descripcion?: string;
  activa?: boolean;
  poblacionEsperada?: number;
  poblacionReal?: number;
  logo?: string;
}

export interface CareerMetrics {
  poblacionEsperada: number;
  poblacionReal: number;
}

export interface CareerStats {
  totalCareers: number;
  activeCareers: number;
  totalPoblacionEsperada: number;
  totalPoblacionReal: number;
  promedioPoblacionEsperada: number;
  promedioPoblacionReal: number;
  porcentajeCumplimiento: number;
  careersByModalidad: { [key: string]: number };
  careersByTurno: { [key: string]: number };
}