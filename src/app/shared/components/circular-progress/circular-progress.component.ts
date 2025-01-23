import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  imports: [CommonModule],
  templateUrl: './circular-progress.component.html',
  styleUrl: './circular-progress.component.css'
})
export class CircularProgressComponent {
  @Input() rating: number = 0;

  get getColorRating(): string {
    return this.rating < 6 ? 'text-red-600' : 'text-green-600';
  }
}
