import { Component, input } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  imports: [],
  templateUrl: './circular-progress.component.html',
  styleUrl: './circular-progress.component.css'
})
export class CircularProgressComponent {
  public rating = input<number>(0.00);
}
