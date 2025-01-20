import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImgMissingDirective } from '../../directives/img-missing.directive';
import { DatePipe, NgIf } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-poster-card',
  imports: [
    RouterLink,
    ImgMissingDirective,
    DatePipe,
    NgIf
  ],
  templateUrl: './poster-card.component.html',
  styleUrl: './poster-card.component.css'
})
export class PosterCardComponent {
  @Input() model!: any;
  @Input() isMovie!: boolean;
  posterUrl!: string;
  private readonly baseUrl = environment.BASE_URL + 'wp-content/uploads';

  imageBaseUrl(uuid: string): string {
    return this.baseUrl + uuid;
  }
}
