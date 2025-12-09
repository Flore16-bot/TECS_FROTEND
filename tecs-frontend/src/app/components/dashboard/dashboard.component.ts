import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { InstitutionService } from 'src/app/services/institution.service';
import { CareerService } from 'src/app/services/career.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: any = {};
  institutions: any[] = [];
  
  // Gráfico de población
  public populationChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Población Esperada',
        data: [],
        backgroundColor: '#006847',
        borderColor: '#006847',
        borderWidth: 1
      },
      {
        label: 'Población Real',
        data: [],
        backgroundColor: '#009c3b',
        borderColor: '#009c3b',
        borderWidth: 1
      }
    ]
  };

  public populationChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y} alumnos`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Alumnos'
        }
      }
    }
  };

  // Gráfico de modalidad
  public modalidadChartData: ChartData<'pie'> = {
    labels: ['Escolarizada', 'Mixta', 'Virtual'],
    datasets: [{
      data: [65, 25, 10],
      backgroundColor: ['#006847', '#009c3b', '#ffcc00'],
      borderWidth: 1
    }]
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  constructor(
    private institutionService: InstitutionService,
    private careerService: CareerService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.institutionService.getMyInstitutions().subscribe({
      next: (response) => {
        this.institutions = response.data || [];
        this.calculateStats();
      },
      error: (error) => console.error('Error loading institutions:', error)
    });

    this.careerService.getMyCareers().subscribe({
      next: (careers) => {
        this.updatePopulationChart(careers);
      }
    });
  }

  calculateStats(): void {
    this.stats = {
      institutions: this.institutions.length,
      careers: this.institutions.reduce((total, inst) => 
        total + (inst.carreras?.length || 0), 0),
      students: this.institutions.reduce((total, inst) => {
        return total + (inst.carreras?.reduce((sum: number, carrera: any) => 
          sum + (carrera.cantidadAlumnos || 0), 0) || 0);
      }, 0)
    };
  }

  updatePopulationChart(careers: any[]): void {
    const labels = careers.map(c => c.nombre.substring(0, 20) + (c.nombre.length > 20 ? '...' : ''));
    const esperada = careers.map(c => c.poblacionEsperada || 0);
    const real = careers.map(c => c.poblacionReal || 0);

    this.populationChartData = {
      labels: labels,
      datasets: [
        {
          ...this.populationChartData.datasets[0],
          data: esperada
        },
        {
          ...this.populationChartData.datasets[1],
          data: real
        }
      ]
    };
  }

  deleteInstitution(id: number): void {
    if (confirm('¿Está seguro de eliminar esta institución?')) {
      this.institutionService.deleteInstitution(id).subscribe({
        next: () => {
          this.institutions = this.institutions.filter(i => i.id !== id);
          this.calculateStats();
        },
        error: (error) => console.error('Error deleting institution:', error)
      });
    }
  }
}