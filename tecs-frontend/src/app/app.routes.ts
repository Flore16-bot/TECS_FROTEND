
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InstitutionListComponent } from './components/institutions/institution-list.component';
import { InstitutionFormComponent } from './components/institutions/institution-form.component';
import { CareerListComponent } from './components/careers/career-list.component';
import { CareerFormComponent } from './components/careers/career-form.component';
import { UserListComponent } from './components/users/user-list.component';
import { UserFormComponent } from './components/users/user-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportsComponent } from './components/reports/reports.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Rutas protegidas
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'institutions', 
    component: InstitutionListComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'institutions/new', 
    component: InstitutionFormComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'institutions/edit/:id', 
    component: InstitutionFormComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'careers', 
    component: CareerListComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'careers/new', 
    component: CareerFormComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'careers/edit/:id', 
    component: CareerFormComponent, 
    canActivate: [AuthGuard] 
  },
  
  // Rutas solo para admin
  { 
    path: 'users', 
    component: UserListComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'users/new', 
    component: UserFormComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  
  { 
    path: 'profile', 
    component: ProfileComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'reports', 
    component: ReportsComponent, 
    canActivate: [AuthGuard] 
  },
  
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
