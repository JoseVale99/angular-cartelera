import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  private moviesService = inject(MoviesService);
  private router = inject(Router);
  private contentType! : string;
  public isLoading = signal(false);
  public dataDetail: any;

  constructor() {
    this.contentType = this.router.url.split('/')[1];
  }


  ngOnInit() {
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


  private async getMovieBySlugDetail(slug: string) {
    this.isLoading.set(true);
    try {
      const data = await this.moviesService.getMovieBySlug(slug) as any;
      this.dataDetail = data.data;
      this.isLoading.set(false);
    } catch (error) {
      console.error(error);
      this.isLoading.set(false);
    }
  }
}
