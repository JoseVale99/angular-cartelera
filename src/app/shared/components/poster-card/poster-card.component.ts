import { Component, input } from '@angular/core';
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
  model = input<any>();
  isMovie = input<boolean>();
  private readonly baseUrl = environment.urlBase + 'wp-content/uploads';
  imageUrl: string = '/assets/img/fallback.webp';

  ngOnInit() {
    this.loadImageUrl();
  }

  loadImageUrl() {
    const uuid = this.model()?.images?.poster;
    this.imageUrl = uuid ? `${this.baseUrl}${uuid}` : '/assets/img/fallback.webp';
  }
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/img/fallback.webp';
  }
}
