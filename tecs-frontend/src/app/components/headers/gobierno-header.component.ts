import { Component } from '@angular/core';

@Component({
  selector: 'app-gobierno-header',
  templateUrl: './gobierno-header.component.html',
  styleUrls: ['./gobierno-header.component.css']
})
export class GobiernoHeaderComponent {
  currentDate = new Date();
}