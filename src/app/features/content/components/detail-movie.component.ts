import { Component, inject, input, signal } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { DetailMedia } from '../interfaces/detail.interface';
import { environment } from '../../../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-movie',
  imports: [
    DatePipe
  ],
  templateUrl: './detail-movie.component.html',
  styleUrl: './detail-movie.component.css'
})
export class DetailMovieComponent {
    private moviesService = inject(MoviesService);
    public slug = input<string>();
    public genres = input<any[]>();
    public isLoading = signal(false);
    public dataDetail! : DetailMedia;
    public imageUrl!: string;
    public showFullDescription = false;
    private readonly baseUrl = environment.urlBase + 'wp-content/uploads';

  ngOnChanges() {
    this.getMovieBySlugDetail(this.slug()!);
  }

  private async getMovieBySlugDetail(slug: string) {
    this.isLoading.set(true);
    try {
      const data = await this.moviesService.getMovieBySlug(slug) as { data: DetailMedia };
      this.dataDetail = data.data;
      await this.loadImage();
      this.isLoading.set(false);
    } catch (error) {
      console.error(error);
      this.isLoading.set(false);
    }
  }

  async loadImage() {
    const uuid = this.dataDetail.images?.poster;
    this.imageUrl = uuid ? `${this.baseUrl}${uuid}` : '/assets/img/fallback.webp';
  }

  onImageError() {
    this.imageUrl = '/assets/img/fallback.webp';
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
