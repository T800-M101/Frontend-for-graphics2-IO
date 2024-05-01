import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-grafica',
  standalone: true,
  imports: [BaseChartDirective, HttpClientModule],
  templateUrl: './grafica.component.html',
  styleUrl: './grafica.component.css'
})
export class GraficaComponent implements OnInit, OnDestroy {

  private socket = new Socket({ url: 'http://localhost:5000' });
  private socketSub$!: Subscription;

  public barChartData: ChartData<'bar'> = {
    labels: ['Question 1', 'Question 2', 'Question 3', 'Question 4'],
    datasets: [
      { data: [8, 5, 0, 0], label: 'Questions' },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 4,
        max: 18
      },
    },
    plugins: {
      legend: {
        display: true,
      },
     
    },
  };

  constructor(private http: HttpClient) { }
  
  ngOnDestroy(): void {
    if (this.socketSub$) {
      this.socketSub$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getData();
    this.listenSocket();
  }


  getData(): any {
    this.http.get('http://localhost:5000/api/graphic').subscribe((data: any) => {
      this.barChartData = { ...data };
    });
  }

  listenSocket(): void {
    this.socketSub$ = this.socket.fromEvent('change-graphic').subscribe((data: any) => {
      this.barChartData = data;
    });
  }
}
