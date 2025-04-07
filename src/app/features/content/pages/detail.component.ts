import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { DetailMovieComponent } from '../components/detail-movie.component';

@Component({
  selector: 'app-detail',
  imports: [
    DetailMovieComponent
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  private moviesService = inject(MoviesService);
  private router = inject(Router);
  public contentType! : string;
  public genres: any[] = [];

  constructor() {
    this.contentType = this.router.url.split('/')[1];
  }

  ngOnInit() {
    this.getAllGeneres();
  }

  private async getAllGeneres() {
    const data = await this.moviesService.getGeneres() as any;
    this.genres = data.data.genres;
  }
}
