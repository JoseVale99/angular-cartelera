import { Component, input, OnChanges } from '@angular/core';
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
export class PosterCardComponent implements OnChanges {
  model = input<any>();
  isMovie = input<boolean>();
  private readonly baseUrl = environment.urlBase + 'wp-content/uploads';
  linkPath: string = '/';
  imageUrl!: string;

  ngOnChanges() {
    this.loadImage();
    this.getLinkPath();
  }

  getLinkPath() {
    const slug = this.model()?.slug;
    this.linkPath = slug ? (this.isMovie() ? `/movies/${slug}` : `/tv-shows/${slug}`) : '/';
  }

  loadImage() {
    const uuid = this.model()?.images?.poster;
    this.imageUrl = uuid ? `${this.baseUrl}${uuid}` : '/assets/img/fallback.webp';
  }

  onImageError() {
    this.imageUrl = '/assets/img/fallback.webp';
  }
}
