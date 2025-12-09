// src/app/services/excel.service.ts - CORREGIDO
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

// Importación corregida
declare var saveAs: any; // O usa window.saveAs

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

  constructor() {}

  exportToExcel(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { 
      Sheets: { 'data': worksheet }, 
      SheetNames: ['data'] 
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    
    // Método alternativo sin file-saver
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  importFromExcel(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        resolve(jsonData);
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
      
      reader.readAsArrayBuffer(file);
    });
  }

  generateInstitutionsTemplate(): void {
    const template = [
      {
        'Nombre': 'Ejemplo: Tecnológico Nacional de México',
        'Clave CCT': 'Ejemplo: CCT001',
        'Teléfono': 'Ejemplo: 555-1000',
        'Extensión': 'Ejemplo: 101',
        'Correo': 'Ejemplo: contacto@tecnm.mx',
        'Nombre Representante': 'Ejemplo: Dr. Juan Pérez',
        'Puesto Representante': 'Ejemplo: Director General',
        'Dirección': 'Ejemplo: Av. Universidad 1000, CDMX',
        'Estado': 'active o inactive'
      }
    ];
    
    this.exportToExcel(template, 'plantilla_instituciones');
  }

  generateCareersTemplate(): void {
    const template = [
      {
        'Nombre': 'Ejemplo: Ingeniería en Sistemas Computacionales',
        'Número Carrera': 'Ejemplo: ISC-001',
        'Cantidad Alumnos': 'Ejemplo: 150',
        'Duración Semestres': 'Ejemplo: 9',
        'Modalidad': 'Escolarizada, Mixta o Virtual',
        'Turno': 'Matutino, Vespertino, Nocturno o Mixto',
        'Descripción': 'Ejemplo: Carrera enfocada en desarrollo de software y redes',
        'Activa': '1 para activa, 0 para inactiva',
        'Población Esperada': 'Ejemplo: 200',
        'Población Real': 'Ejemplo: 150'
      }
    ];
    
    this.exportToExcel(template, 'plantilla_carreras');
  }
}