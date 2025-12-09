import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
	selector: 'app-modalidad-chart',
	template: `
		<div style="height:300px">Gráfico de modalidad (placeholder)</div>
	`
})
export class ModalidadChartComponent implements OnChanges {
	@Input() data: any;
	ngOnChanges(): void {}
}
