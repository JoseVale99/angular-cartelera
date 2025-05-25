import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input, signal } from '@angular/core';
import { PosterCardComponent } from '../../../../shared/components/poster-card/poster-card.component';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { SwiperOptions } from 'swiper/types';
import { DetailMedia } from '../../interfaces/detail.interface';
import { RelatedMedia } from '../../interfaces/related.interface';
import { MediaService } from '../../services/media.service';
import { Episode } from '../../interfaces/episodes.interface';
import { VideoPlayerComponent } from "../video-player/video-player.component";
import { ImageFallbackComponent } from '../../../../shared/components/image-fallback/image-fallback.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail-media',
  imports: [
    DatePipe,
    PosterCardComponent,
    VideoPlayerComponent,
    ImageFallbackComponent,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule
],
  templateUrl: './detail-media.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailMediaComponent {
  public type = input<string>();
  private mediaService = inject(MediaService);
  private route = inject(ActivatedRoute);
  public genres = input<any[]>();
  public isLoading = signal(false);
  public dataDetail!: DetailMedia;
  public urlGallery = environment.urlGallery;
  public showFullDescription = false;
  public imageGallery: string[] = [];
  public selectedOption!: string;
  public relatedMovies: RelatedMedia[] = [];
  public  episodes = signal<Episode[]>([]);
  seasons: number[] = [];
  selectedSeason = signal<number | null>(null);
  public  filteredEpisodes = computed(() => {
    const season = this.selectedSeason();
    const allEpisodes = this.episodes();
    if (season === null) return [];
    return allEpisodes.filter(e => e.season_number === season).sort((a, b) => a.episode_number - b.episode_number);
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug')!;
      this.getMovieBySlugDetail(slug);
    });
  }

  swiperConfig: SwiperOptions = {
    initialSlide: 0,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  };

  private async getMovieBySlugDetail(slug: string) {
    this.isLoading.set(true);
    try {
      const data = await this.mediaService.getMediaBySlug(slug, this.type()!) as { data: DetailMedia };
      this.dataDetail = data.data;
      this.imageGallery = this.dataDetail.gallery.split('\n').map(url => url.trim()).filter(
        trimmedUrl => trimmedUrl).map(trimmedUrl => this.urlGallery + trimmedUrl
        );
      this.isLoading.set(false);
      if(data?.data?.type ==="tvshows"){
        this.getEpisodes(this.dataDetail._id)
      }
      this.getRelatedMovie(this.dataDetail._id);
    } catch (error) {
      console.error(error);
      this.isLoading.set(false);
    }
  }

  private async getEpisodes(id: number){
    this.isLoading.set(true);
    try {
      const data = await this.mediaService.getEpisodes(id) as { data: Episode[] };
      this.episodes.set(data.data)
      this.isLoading.set(false);
      const seasonTvShows = new Set(data.data.map(e => e.season_number));
      this.seasons = Array.from(seasonTvShows).sort((a, b) => a - b);
      this.selectedSeason.set(this.seasons[0]);
    } catch (error) {
      console.error(error);
      this.isLoading.set(false);
    }
  }
  

  playEpisode(episode: any) {
    console.log("Reproduciendo:", episode.title);
    // Aquí puedes redirigir o abrir el reproductor
  }

  private async getRelatedMovie(id: number) {
    this.isLoading.set(true);
    try {
      const data = await this.mediaService.getRelatedMedia(id, this.type()!) as { data: RelatedMedia[] };
      this.relatedMovies = data.data;
      this.isLoading.set(false);
    } catch (error) {
      console.error(error);
      this.isLoading.set(false);
    }
  }

  getGenreName(id: number): string {
    return this.genres()?.find(genre => genre.id === id)?.name || '';
  }

  getFormattedRuntime(runtime: string): string {
    const totalMinutes = parseFloat(runtime);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours}h ${minutes}m`;
  }
}