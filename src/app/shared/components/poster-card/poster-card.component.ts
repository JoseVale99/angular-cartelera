import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { CircularProgressComponent } from '../circular-progress/circular-progress.component';

@Component({
  selector: 'app-poster-card',
  imports: [
    CircularProgressComponent,
    RouterLink,
    DatePipe
  ],
  templateUrl: './poster-card.component.html',
  styleUrl: './poster-card.component.css'
})
export class PosterCardComponent {
  @Input() model!: any;
  @Input() isMovie!: boolean;
  posterUrl!: string;
  private readonly baseUrl = environment.urlBase + 'wp-content/uploads';

  imageBaseUrl(uuid: string): string {
    return this.baseUrl + uuid;
  }
}
