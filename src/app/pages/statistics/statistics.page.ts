import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  public token: string;

  constructor(private _tasksService: TasksService) { }

  ngOnInit() {
  }

  chartData: ChartDataSets[] = [{ data: [], label: 'Tasks created' }];
  chartLabels: Label[];

  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Historic tasks created'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };

  chartColors: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: '#ff00ff'
    }
  ];
  chartType = 'line';
  showLegend = false;
  stock = '';

  public getData() {
    this.token = localStorage.getItem('token');
    this._tasksService.getTasksByUser(this.token).subscribe((res: any) => {
      const history = res.tasks;

      this.chartLabels = [];
      this.chartData[0].data = [];

      for (let task of history) {
        this.chartLabels.push(task.date.split('T')[0]);
      }
    });
  }
}
