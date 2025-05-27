import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CircularProgressComponent } from '../circular-progress/circular-progress.component';
import { ImageFallbackComponent } from "../image-fallback/image-fallback.component";

@Component({
  selector: 'app-poster-card',
  imports: [
    CircularProgressComponent,
    RouterLink,
    DatePipe,
    ImageFallbackComponent
],
  templateUrl: './poster-card.component.html',
  styleUrl: './poster-card.component.css'
})
export class PosterCardComponent {
  model = input<any>();
  isMovie = input<boolean>();
  linkPath = computed(() => {
    const slug = this.model()?.slug;
    return slug  ? this.isMovie() ? `/movies/${slug}` : `/tvshows/${slug}` : '/';
  });
}
