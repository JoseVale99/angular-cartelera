import { Component, computed, input, signal } from '@angular/core';
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
  private imageError = signal(false);
  linkPath = computed(() => {
    const slug = this.model()?.slug;
    return slug  ? this.isMovie() ? `/movies/${slug}` : `/tvshows/${slug}` : '/';
  });

  imageUrl = computed(() => {
    const uuid = this.model()?.images?.poster;
    return uuid ? `${this.baseUrl}${uuid}` : '/assets/img/fallback.webp';
  });

  displayedImageUrl = computed(() => { 
    return this.imageError() ? '/assets/img/fallback.webp' : this.imageUrl(); 
  });

  onImageError() {
    this.imageError.set(true);
  }
}
