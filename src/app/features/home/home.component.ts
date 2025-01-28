import { CommonModule, SlicePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MoviesService } from '../content/services/movies.service';
import { SwiperDirective } from '../../shared/directives/swiper.directive';
import { SwiperOptions } from 'swiper/types';
import { MovieSliderModel } from '../content/interfaces/movie-slider';
import { PosterCardComponent } from "../../shared/components/poster-card/poster-card.component";
import { TvShowSliderModel } from '../content/interfaces/tv-show-slider.interface';
import { TvShowsService } from '../content/services/tv-shows.service';
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
    initialSlide: 5,
    coverflowEffect: {
      rotate: 12,
      stretch: 0,
      depth: 40,
      modifier: 1,
      slideShadows: false,
    },
    breakpoints: {
      1440: {slidesPerView:9, spaceBetween: 25, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
      992: {slidesPerView: 6, spaceBetween: 25, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
      768: {slidesPerView: 4, spaceBetween: 25, slidesOffsetBefore: 0, slidesOffsetAfter: 0}, 
      576: {slidesPerView: 2, spaceBetween: 25, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
      320: {slidesPerView: 2, spaceBetween: 25, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
    }
  };

  private moviesService = inject(MoviesService);
  private tvShowsService = inject(TvShowsService);
  movieTabList = ['Películas de estreno', 'Películas recén actualizadas'];
  moviesList: Array<MovieSliderModel> = [];
  selectedMovieTab = 0;
  tvShowsTabList = ['Series recén actualizadas'];
  tvShowsList: Array<TvShowSliderModel> = [];
  selectedTVTab = 0;
  public isLoading = signal(false);

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getSliderMovies('0');
      this.getSliderTvShows('true');
    }, 0);
  }

  private async getSliderMovies(type: string) {
    try {
      this.isLoading.set(true);
      const { data } = await this.moviesService.getSliderMovies('movies', type) as { data: MovieSliderModel[] };
      this.moviesList = data;
      this.isLoading.set(false);
    } catch (error) {
      console.error(error);
      this.isLoading.set(false);
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

  private async getSliderTvShows(type: string) {
    try {
      this.isLoading.set(true);
      const { data } = await this.tvShowsService.getSliderTvShows('tvshows', type) as { data: TvShowSliderModel[] };
      this.tvShowsList = data;
      this.isLoading.set(false);
    } catch (error) {
      console.error(error);
      this.isLoading.set(false);
    }
  }

  tabTVChange({ index }: { index: number; }) {
    this.selectedTVTab = index;
    const tvShowTypes = ['true'];
    const selectedType = tvShowTypes[index];
    if (selectedType) {
      this.getSliderTvShows(selectedType);
    }
  }
}
