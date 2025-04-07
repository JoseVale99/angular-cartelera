import {  SlicePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { SwiperDirective } from '../../shared/directives/swiper.directive';
import { SwiperOptions } from 'swiper/types';
import { MediaSliderModel } from '../content/interfaces/media-slider';
import { PosterCardComponent } from "../../shared/components/poster-card/poster-card.component";
import { MediaService } from '../content/services/media.service';
@Component({
  selector: 'app-home',
  imports: [
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
export class HomeComponent {
  private mediaService = inject(MediaService);
  public movieTabList = ['Películas de estreno', 'Películas recén actualizadas'];
  public moviesList: Array<MediaSliderModel> = [];
  public selectedMovieTab = 0;
  public tvShowsTabList = ['Series recén actualizadas'];
  public tvShowsList: Array<MediaSliderModel> = [];
  public selectedTVTab = 0;
  public isLoading = signal(false);
  config: SwiperOptions = {
    watchSlidesProgress: true,
    grabCursor: true,
    effect: 'slide', 
    centeredSlides: false,
    initialSlide: 0,
    breakpoints: {
      1440: {slidesPerView:8, spaceBetween: 25, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
      992: {slidesPerView: 6, spaceBetween: 25, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
      768: {slidesPerView: 4, spaceBetween: 25, slidesOffsetBefore: 0, slidesOffsetAfter: 0}, 
      576: {slidesPerView: 2, spaceBetween: 25, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
      320: {slidesPerView: 2, spaceBetween: 25, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
    }
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getSliderMedia('movies', '0');
      this.getSliderMedia('tvshows', 'true');
    }, 0);
  }
  
    private async getSliderMedia(type: string, listen: string) {
      try {
        this.isLoading.set(true);
        const { data } = await this.mediaService.getSliderMedia(type, listen) as { data: MediaSliderModel[] };
        type === 'movies' ? this.moviesList = data : this.tvShowsList = data;
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
      this.getSliderMedia('movies', selectedType);
    }
  }

  tabTVChange({ index }: { index: number; }) {
    this.selectedTVTab = index;
    const tvShowTypes = ['true'];
    const selectedType = tvShowTypes[index];
    if (selectedType) {
      this.getSliderMedia('tvshows', selectedType);
    }
  }
}
