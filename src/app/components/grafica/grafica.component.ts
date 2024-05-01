import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';

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

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [0, 0, 0, 0],
        label: 'Sales',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['January', 'February', 'March', 'April'],
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
      this.lineChartData = { ...data };
    });
  }

  listenSocket(): void {
    this.socketSub$ = this.socket.fromEvent('change-graphic').subscribe((data: any) => {
      this.lineChartData = data;
    });
  }
}
