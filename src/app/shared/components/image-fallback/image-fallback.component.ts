import { Component, input, signal, computed } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-image-fallback',
  standalone: true,
  template: `
    <img
      [src]="currentSrc()"
      [alt]="alt()"
      [class]="imgClass()"
      (error)="handleError()"
    />
  `
})
export class ImageFallbackComponent {
  uuid = input.required<string>();
  type = input('');
  fallback = input('/assets/img/fallback.webp');
  alt = input('Imagen');
  imgClass = input('object-cover w-full h-auto rounded-xl');
  private hasError = signal(false);
  private baseUrlDefault = environment.urlBase + 'wp-content/uploads/';
  private baseUrlEpisodes = 'https://image.tmdb.org/t/p/w780';

  private fullUrl = computed(() => {
    const trimmedUuid = this.uuid()?.trim();
    if (!trimmedUuid) {
      return this.fallback();
    }
    if (this.type() === 'episodes') {
      return `${this.baseUrlEpisodes}${trimmedUuid}`;
    }
    return `${this.baseUrlDefault}${trimmedUuid}`;
  });

  currentSrc = computed(() => this.hasError() ? this.fallback() : this.fullUrl());

  handleError() {
    this.hasError.set(true);
  }
}
