import { CommonModule, SlicePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MoviesService } from '../content/services/movies.service';
import { SwiperDirective } from '../../shared/directives/swiper.directive';
import { SwiperOptions } from 'swiper/types';
import { MovieSliderModel } from '../content/interfaces/movie-slider';
import { PosterCardComponent } from "../../shared/components/poster-card/poster-card.component";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    SwiperDirective,
    SlicePipe,
    MatTabGroup,
    MatTab,
    MatIcon,
    PosterCardComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent{

  config: SwiperOptions = {
    watchSlidesProgress: true,
    breakpoints: {
      992: {slidesPerView: 5, spaceBetween: 30, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
      768: {slidesPerView: 4, spaceBetween: 30, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
      576: {slidesPerView: 3, spaceBetween: 30, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
      320: {slidesPerView: 2, spaceBetween: 30, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
    }
  };

  private moviesService = inject(MoviesService);
  movieTabList = ['En cartelera', 'Próximamente', 'Populares'];
  moviesList: Array<MovieSliderModel> = [];
  selectedMovieTab = 0;

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.getSliderMovies();
    }, 0);
  }

  private async getSliderMovies() {
    console.log('getSliderMovies', environment.BASE_URL);
    try {
      const { data } = await this.moviesService.getSliderMovies('movies', 0) as { data: MovieSliderModel[] };
      this.moviesList = data;
    } catch (error) {
      console.error(error);
    }
  }
}
