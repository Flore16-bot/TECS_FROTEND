// src/app/services/chart.service.ts
import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() {}

  getCommonOptions(): ChartConfiguration['options'] {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      }
    };
  }

  getPopulationChartData(careers: any[]): ChartData<'bar'> {
    const labels = careers.map(c => 
      c.nombre.length > 20 ? c.nombre.substring(0, 20) + '...' : c.nombre
    );
    
    const esperada = careers.map(c => c.poblacionEsperada || 0);
    const real = careers.map(c => c.poblacionReal || 0);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Población Esperada',
          data: esperada,
          backgroundColor: '#006847',
          borderColor: '#006847',
          borderWidth: 1
        },
        {
          label: 'Población Real',
          data: real,
          backgroundColor: '#009c3b',
          borderColor: '#009c3b',
          borderWidth: 1
        }
      ]
    };
  }

  getModalidadChartData(careers: any[]): ChartData<'pie'> {
    const modalidades = ['Escolarizada', 'Mixta', 'Virtual'];
    const counts = [0, 0, 0];
    
    careers.forEach(career => {
      if (career.modalidad === 'Escolarizada') counts[0]++;
      else if (career.modalidad === 'Mixta') counts[1]++;
      else if (career.modalidad === 'Virtual') counts[2]++;
    });

    return {
      labels: modalidades,
      datasets: [{
        data: counts,
        backgroundColor: ['#006847', '#009c3b', '#ffcc00'],
        borderWidth: 1
      }]
    };
  }

  getTurnoChartData(careers: any[]): ChartData<'doughnut'> {
    const turnos = ['Matutino', 'Vespertino', 'Nocturno', 'Mixto'];
    const counts = [0, 0, 0, 0];
    
    careers.forEach(career => {
      if (career.turno === 'Matutino') counts[0]++;
      else if (career.turno === 'Vespertino') counts[1]++;
      else if (career.turno === 'Nocturno') counts[2]++;
      else if (career.turno === 'Mixto') counts[3]++;
    });

    return {
      labels: turnos,
      datasets: [{
        data: counts,
        backgroundColor: ['#006847', '#009c3b', '#ffcc00', '#ce1126'],
        borderWidth: 1
      }]
    };
  }

  getTrendChartData(data: any[]): ChartData<'line'> {
    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);

    return {
      labels: labels,
      datasets: [{
        label: 'Tendencia',
        data: values,
        fill: false,
        borderColor: '#006847',
        tension: 0.4
      }]
    };
  }

  downloadChart(canvasId: string, filename: string): void {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `${filename}-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  }
}