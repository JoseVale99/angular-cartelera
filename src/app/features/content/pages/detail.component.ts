import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MediaService } from '../services/media.service';
import { DetailMovieComponent } from '../components/detail-movie/detail-movie.component';

@Component({
  selector: 'app-detail',
  imports: [
    DetailMovieComponent
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  private mediaService = inject(MediaService);
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
    const data = await this.mediaService.getGeneres() as any;
    this.genres = data.data.genres;
  }
}
