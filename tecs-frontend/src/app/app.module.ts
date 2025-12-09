// src/app/app.module.ts - COMPLETO Y CORREGIDO
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Importaciones de ng2-charts corregidas
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

// Headers
import { GobiernoHeaderComponent } from './components/headers/gobierno-header.component';
import { MainHeaderComponent } from './components/headers/main-header.component';

// Componentes de autenticación
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';

// Componentes principales
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InstitutionListComponent } from './components/institutions/institution-list.component';
import { InstitutionFormComponent } from './components/institutions/institution-form.component';
import { CareerListComponent } from './components/careers/career-list.component';
import { CareerFormComponent } from './components/careers/career-form.component';
import { UserListComponent } from './components/users/user-list.component';
import { UserFormComponent } from './components/users/user-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportsComponent } from './components/reports/reports.component';

// Componentes de gráficos
import { PopulationChartComponent } from './components/charts/population-chart.component';
import { ModalidadChartComponent } from './components/charts/modalidad-chart.component';

// Componentes utilitarios
import { ExcelUploadComponent } from './components/excel/excel-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    GobiernoHeaderComponent,
    MainHeaderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    InstitutionListComponent,
    InstitutionFormComponent,
    CareerListComponent,
    CareerFormComponent,
    UserListComponent,
    UserFormComponent,
    ProfileComponent,
    ReportsComponent,
    PopulationChartComponent,
    ModalidadChartComponent,
    ExcelUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BaseChartDirective
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }