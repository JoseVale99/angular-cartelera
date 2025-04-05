import { Component, inject, input, OnChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  private router = inject(Router);
  model = input<any>();
  isMovie = input<boolean>();
  private readonly baseUrl = environment.urlBase + 'wp-content/uploads';
  linkPath: string = '/';
  imageUrl: string = 'assets/img/fallback.webp';

  ngOnChanges() {
    this.loadImage();
    this.getLinkPath();
  }

  getLinkPath() {
    const id = this.model()?._id;
    this.linkPath = id ? (this.isMovie() ? `/movies/${id}` : `/tv-shows/${id}`) : '/';
  }

  loadImage() {
    const uuid = this.model()?.images?.poster;
    this.imageUrl = uuid ? `${this.baseUrl}${uuid}` : '/assets/img/fallback.webp';
  }

  onImageError() {
    this.imageUrl = '/assets/img/fallback.webp';
  }
}
