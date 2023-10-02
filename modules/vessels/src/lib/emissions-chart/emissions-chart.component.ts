import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { Emissions } from '../models/emissions.model';
import { Vessel } from '../models/vessel.models';

@Component({
  selector: 'lib-emissions-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './emissions-chart.component.html',
  styleUrls: ['./emissions-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmissionsChartComponent implements OnInit {

  @Input({ required: true }) set emissions(emissions: Emissions) {
    this._emissions = emissions;
    this.updateChart();
  }

  @Input({ required: true }) set vessel(vessel: Vessel) {
    this._vessel = vessel;
    this.updateChart();
  }

  private _emissions!: Emissions;
  private _vessel!: Vessel;

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {}; // required
  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false
  runOutsideAngular = false; // optional boolean, defaults to false

  ngOnInit() {
    this.updateChart();
  }

  private updateChart() {
    let title = '';
    let categories: string[] = [];
    let co2_emissions: number[] = [];
    let ch4_emissions: number[] = [];
    let pm_emissions: number[] = [];
    let nox_emissions: number[] = [];
    let sox_emissions: number[] = [];

    if (this._emissions && this._vessel) {
      title = this._vessel.name;
      categories = this._emissions.timeSeries.map(item => new Date(item.report_from_utc).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric'
      }));
      co2_emissions = this._emissions.timeSeries.map(item => item.co2_emissions);
      ch4_emissions = this._emissions.timeSeries.map(item => item.ch4_emissions);
      pm_emissions = this._emissions.timeSeries.map(item => item.pm_emissions);
      nox_emissions = this._emissions.timeSeries.map(item => item.nox_emissions);
      sox_emissions = this._emissions.timeSeries.map(item => item.sox_emissions);
    }

    this.chartOptions = {
      title: {
        text: title
      },
      xAxis: {
        categories: categories,
        labels: {
          step: 20
        }
      },
      series: [
        {
          type: 'line',
          data: co2_emissions,
          name: 'Co2'
        },
        {
          type: 'line',
          data: ch4_emissions,
          name: 'ch4'
        },
        {
          type: 'line',
          data: pm_emissions,
          name: 'pm'
        },
        {
          type: 'line',
          data: nox_emissions,
          name: 'nox'
        },
        {
          type: 'line',
          data: sox_emissions,
          name: 'sox'
        }
      ]
    };

  }
}
