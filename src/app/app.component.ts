import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GraficaComponent } from './components/grafica/grafica.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GraficaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Grafica';
}
