import { CommonModule, SlicePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MoviesService } from '../content/services/movies.service';
import { SwiperDirective } from '../../shared/directives/swiper.directive';
import { SwiperOptions } from 'swiper/types';
import { MovieSliderModel } from '../content/interfaces/movie-slider';
import { PosterCardComponent } from "../../shared/components/poster-card/poster-card.component";
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
    grabCursor: true,
    effect: 'coverflow', 
    centeredSlides: true,
    initialSlide: 2,
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 50,
      modifier: 1,
      slideShadows: false,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      992: {slidesPerView: 5, spaceBetween: 20, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
      768: {slidesPerView: 3, spaceBetween: 15, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
      576: {slidesPerView: 3, spaceBetween: 15, slidesOffsetBefore: 0, slidesOffsetAfter: 0}, 
      320: {slidesPerView: 1, spaceBetween: 10, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
    },
    on: {
      init: () => {
        const swiperEl = document.querySelector('swiper-container');
        if (swiperEl) {
          swiperEl.classList.add('fade-in');
        }
      }
    }
  };

  private moviesService = inject(MoviesService);
  movieTabList = ['Películas de estreno', 'Películas recién actualizadas'];
  moviesList: Array<MovieSliderModel> = [];
  selectedMovieTab = 0;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getSliderMovies('0');
    }, 0);
  }

  private async getSliderMovies(type: string) {
    try {
      const { data } = await this.moviesService.getSliderMovies('movies', type) as { data: MovieSliderModel[] };
      this.moviesList = data;
    } catch (error) {
      console.error(error);
    }
  }

  tabMovieChange({ index }: { index: number; }) {
    this.selectedMovieTab = index;
    const movieTypes = ['0', 'true'];
    const selectedType = movieTypes[index];
    if (selectedType) {
      this.getSliderMovies(selectedType);
    }
  }
}
