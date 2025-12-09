// src/app/components/charts/population-chart.component.ts - CORREGIDO
import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-population-chart',
  templateUrl: './population-chart.component.html',
  styleUrls: ['./population-chart.component.css']
})
export class PopulationChartComponent implements OnChanges {
  @Input() careers: any[] = [];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public chartData: ChartData<'bar' | 'line'> = {
    labels: [],
    datasets: []
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value} alumnos`;
          },
          afterLabel: (context: any) => {
            const career = this.careers[context.dataIndex];
            if (career) {
              const porcentaje = career.poblacionEsperada > 0 
                ? (career.poblacionReal / career.poblacionEsperada) * 100 
                : 0;
              return `Cumplimiento: ${porcentaje.toFixed(1)}%`;
            }
            return '';
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Alumnos',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    }
  };

  public chartType: ChartType = 'bar';

  ngOnChanges(): void {
    this.updateChart();
  }

  updateChart(): void {
    if (!this.careers || this.careers.length === 0) {
      this.chartData = {
        labels: ['Sin datos'],
        datasets: [
          { data: [0], label: 'Población Esperada', backgroundColor: '#006847' },
          { data: [0], label: 'Población Real', backgroundColor: '#009c3b' }
        ]
      };
      return;
    }

    const labels = this.careers.map(c => 
      c.nombre.length > 20 ? c.nombre.substring(0, 20) + '...' : c.nombre
    );
    
    const esperada = this.careers.map(c => c.poblacionEsperada || 0);
    const real = this.careers.map(c => c.poblacionReal || 0);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Población Esperada',
          data: esperada,
          backgroundColor: '#006847',
          borderColor: '#006847',
          borderWidth: 1,
          type: 'bar'
        },
        {
          label: 'Población Real',
          data: real,
          backgroundColor: '#009c3b',
          borderColor: '#009c3b',
          borderWidth: 1,
          type: 'bar'
        }
      ]
    };

    this.chart?.update();
  }

  downloadChart(): void {
    const canvas = document.getElementById('populationChart') as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `grafico-poblacion-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  }

  toggleChartType(): void {
    this.chartType = this.chartType === 'bar' ? 'line' : 'bar';
  }
}