import { Component, inject, signal } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import { PosterCardComponent } from '../../../shared/components/poster-card/poster-card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MoviesService } from '../services/movies.service';
import { MatPaginatorIntl } from '@angular/material/paginator';


@Component({
  selector: 'app-content-main',
  imports: [
    MatPaginatorModule,
    MatCardModule,
    PosterCardComponent
  ],
  templateUrl: './content-main.component.html',
  styleUrl: './content-main.component.css'
})
export class ContentMainComponent {
  private moviesService = inject(MoviesService);
  moviesList: any[] = [];
  totalResults: number = 0;
  perPage: number = 0;
  private matPaginatorIntl = inject(MatPaginatorIntl);
  public isLoading = signal(false);
  
  
  ngAfterViewInit(): void {
    this.setConfigPaginator();
    setTimeout(() => {
      this.getMovies(1, '', '', 'latest');
    }, 0);
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

  changePage(event: PageEvent) {
    this.getMovies(event.pageIndex + 1, '', '', 'latest');
  }
}
