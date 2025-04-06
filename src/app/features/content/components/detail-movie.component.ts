import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, signal } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { DetailMedia } from '../interfaces/detail.interface';
import { environment } from '../../../../environments/environment';
import { DatePipe } from '@angular/common';
import { SwiperDirective } from '../../../shared/directives/swiper.directive';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-detail-movie',
  imports: [
    DatePipe
    
  ],
  templateUrl: './detail-movie.component.html',
  styleUrl: './detail-movie.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailMovieComponent {
    private moviesService = inject(MoviesService);
    public slug = input<string>();
    public genres = input<any[]>();
    public isLoading = signal(false);
    public dataDetail! : DetailMedia;
    public imageUrl!: string;
    public logoUrl!: string;
    private readonly baseUrl = environment.urlBase + 'wp-content/uploads';
    public urlGallery = environment.urlGallery;
    public showFullDescription = false;
    public imageGallery: string[] = [];

    ngOnInit() {
    this.getMovieBySlugDetail(this.slug()!);
  }

  swiperConfig:  SwiperOptions = {
    initialSlide: 0,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  };

  private async getMovieBySlugDetail(slug: string) {
    this.isLoading.set(true);
    try {
      const data = await this.moviesService.getMovieBySlug(slug) as { data: DetailMedia };
      this.dataDetail = data.data;
      this.logoUrl = this.loadImage(this.dataDetail.images?.logo);
      this.imageUrl = this.loadImage(this.dataDetail.images?.poster);
      this.imageGallery = this.dataDetail.gallery.split('\n').map(url => url.trim()).filter(trimmedUrl => trimmedUrl).map(trimmedUrl => this.urlGallery + trimmedUrl);
      console.log(this.imageGallery);
      this.isLoading.set(false);
    } catch (error) {
      console.error(error);
      this.isLoading.set(false);
    }
  }

  private loadImage(uuid: string) {
    return `${this.baseUrl}${uuid}`;
  }

  onImageError() {
    this.imageUrl = '/assets/img/fallback.webp';
  }

  onImageErrorLogo() {
    this.logoUrl = '';
  }

  getGenreName(id: number): string {
    return this.genres()?.find(genre => genre.id === id)?.name || '';
  }

  getFormattedRuntime(runtime: string): string {
    const totalMinutes = parseFloat(runtime);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours}h ${minutes}m`;
  }
}
