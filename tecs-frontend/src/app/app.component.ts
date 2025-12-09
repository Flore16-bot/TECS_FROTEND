// src/app/app.component.ts - COMPLETO
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sistema TECS';
  isAuthenticated = false;
  currentYear = new Date().getFullYear();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }
}