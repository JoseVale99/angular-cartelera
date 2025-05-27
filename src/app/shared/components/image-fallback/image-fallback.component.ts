import { Component, input, signal, computed } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-image-fallback',
  standalone: true,
  template: `
  @if (!shouldHideImage()) {
    @if (!hasError()) {
      <img [src]="fullUrl()" [alt]="alt()" (error)="handleError()" />
    } @else {
      <div class="w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-700 via-gray-900 to-black text-gray-400 rounded-xl select-none overflow-hidden">
        <span class="material-icons text-6xl mb-3 text-gray-500 select-none">
          image_not_supported
        </span>
        <span class="text-sm font-semibold truncate max-w-[90%] text-center">
          {{ alt() }}
        </span>
      </div>
    }
  }
  `,
})
export class ImageFallbackComponent {
  uuid = input.required<string>();
  type = input('');
  alt = input('Imagen');
  hideOnError = input(false);
  private baseUrlDefault = environment.urlBase + 'wp-content/uploads';
  private baseUrlEpisodes = 'https://image.tmdb.org/t/p/w780';

  private currentErrorUrl = signal<string | null>(null);

  fullUrl = computed(() => {
    const trimmedUuid = this.uuid()?.trim();
    if (!trimmedUuid) return '';
    return this.type() === 'episodes' ?
      `${this.baseUrlEpisodes}${trimmedUuid}` : `${this.baseUrlDefault}${trimmedUuid}`;
  });

  hasError = computed(() => this.currentErrorUrl() === this.fullUrl());

  shouldHideImage = computed(() => this.hideOnError() && this.hasError());

  handleError() {
    this.currentErrorUrl.set(this.fullUrl());
  }
}
