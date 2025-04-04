import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import { PosterCardComponent } from '../../../shared/components/poster-card/poster-card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MoviesService } from '../services/movies.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-content-main',
  imports: [
    MatPaginatorModule,
    MatCardModule,
    PosterCardComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './content-main.component.html',
  styleUrl: './content-main.component.css'
})
export class ContentMainComponent  implements OnInit {
  private moviesService = inject(MoviesService);
  private matPaginatorIntl = inject(MatPaginatorIntl);
  private router = inject(Router);
  public isLoading = signal(false);
  moviesList: any[] = [];
  totalResults: number = 0;
  perPage: number = 0;
  contentType = '';
  genres: any[] = [];
  years: any[] = [];
  selectedGenres: string[] = [];
  selectedYears: string[] = [];
  selectedOrder: string = 'latest';
  

  constructor(){
    this.contentType = this.router.url.split('/')[1];
  }

  ngOnInit(): void {
    this.setConfigPaginator();
    this.getGeneres();
      if(this.contentType === 'movies') {
        this.getMovies(1, '', '', this.selectedOrder);
      }
  }

  private async getGeneres() {
    const data = await this.moviesService.getGeneres() as any;
    this.genres = data.data.genres;
    this.years = data.data.years;
  }

  setConfigPaginator() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Películas por página:';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente';
    this.matPaginatorIntl.previousPageLabel = 'Anterior';
    this.matPaginatorIntl.firstPageLabel = 'Primera página';
    this.matPaginatorIntl.lastPageLabel = 'Última página';
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => `${page * pageSize + 1} – ${Math.min((page + 1) * pageSize, length)} de ${length}`;
  }

  private async getMovies(page: number, genres: string, years: string, order: string) {
    this.isLoading.set(true);
    try {
      const { data } = await this.moviesService.getAllMovies(page, genres, years, order) as any;
      this.moviesList = data.posts;
      this.totalResults = data.pagination.total;
      this.perPage = data.pagination.per_page;
      this.isLoading.set(false);
    } catch (error) {
      console.error(error);
      this.isLoading.set(false);
    }
  }

  filterContent(): void {
    this.getMovies(1, this.selectedGenres.join(','), this.selectedYears.join(','), this.selectedOrder);
  }

  changePage(event: PageEvent) {
    this.getMovies(event.pageIndex + 1, this.selectedGenres.join(','), this.selectedYears.join(','), this.selectedOrder);
  }
}
