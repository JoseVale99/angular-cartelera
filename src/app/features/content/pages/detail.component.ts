import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { DetailMedia } from '../interfaces/detail.interface';
import { environment } from '../../../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [
    DatePipe,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  private moviesService = inject(MoviesService);
  private router = inject(Router);
  private contentType! : string;
  public isLoading = signal(false);
  public dataDetail! : DetailMedia;
  public imageUrl!: string;
  private readonly baseUrl = environment.urlBase + 'wp-content/uploads';
  private genres: any[] = [];

  constructor() {
    this.contentType = this.router.url.split('/')[1];
  }

  ngOnInit() {
    this.getAllGeneres();
    this.route.params.subscribe(
      params => {
        const slug = params['slug'];
        if (this.contentType === 'movies') {
          this.getMovieBySlugDetail(slug);
        } else if (this.contentType === 'tv-shows') {
        }
      }
    );
  }

  private async getAllGeneres() {
    const data = await this.moviesService.getGeneres() as any;
    this.genres = data.data.genres;
  }
  
  private async getMovieBySlugDetail(slug: string) {
    this.isLoading.set(true);
    try {
      const data = await this.moviesService.getMovieBySlug(slug) as { data: DetailMedia };
      this.dataDetail = data.data;
      console.log(this.dataDetail);
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
    return this.genres.find(genre => genre.id === id)?.name || '';
  }

  getFormattedRuntime(runtime: string): string {
    const totalMinutes = parseFloat(runtime);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours}h ${minutes}m`;
  }
}
