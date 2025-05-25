import { Component, input, signal, computed } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-image-fallback',
  standalone: true,
  template: `
    <img  [src]="currentSrc()" [alt]="alt()" [class]="imgClass()" (error)="handleError()"/>
  `
})
export class ImageFallbackComponent {
  uuid = input.required<string>();
  type = input('');
  fallback = input('/assets/img/fallback.webp');
  alt = input('Imagen');
  imgClass = input('object-cover w-full h-auto rounded-xl');
  private currentErrorUrl = signal<string | null>(null);
  
  private baseUrlDefault = environment.urlBase + 'wp-content/uploads';
  private baseUrlEpisodes = 'https://image.tmdb.org/t/p/w780';

  private fullUrl = computed(() => {
    const trimmedUuid = this.uuid()?.trim();
    if (!trimmedUuid) return this.fallback();
    return this.type() === 'episodes' ?
    `${this.baseUrlEpisodes}${trimmedUuid}`: `${this.baseUrlDefault}${trimmedUuid}`;
  });

  currentSrc = computed(() => {
    const url = this.fullUrl();
    return this.currentErrorUrl() === url ? this.fallback() : url;
  });

  handleError() {
    this.currentErrorUrl.set(this.fullUrl());
  }
}