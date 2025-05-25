import { Component, inject, input, signal } from '@angular/core';
import { VideoSource } from '../../interfaces/player-video.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MediaService } from '../../services/media.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.component.html',
  styles: ``,
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class VideoPlayerComponent {
  public idPost = input.required<number>();
  public title = input.required<string>();
  private mediaService = inject(MediaService);
  private domSanitizer = inject(DomSanitizer);
  public selectedOption!: string;
  public isLoading = signal(false);
  private videoCache: Map<string, SafeResourceUrl> = new Map();
  showOptions = false;
  videoUrl!: SafeResourceUrl;
  opciones: VideoSource[] = [];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getUrlsPlayerVideo(this.idPost())
    }, 0);
  }
  private async getUrlsPlayerVideo(id: number) {
    this.isLoading.set(true);
    try {
      const data = await this.mediaService.getUrlsPlayer(id) as { data: VideoSource[] };
      this.opciones = data.data;
      this.videoUrl = this.sanitizeUrl(this.opciones[0].url);
      this.selectedOption = this.opciones[0].url;
      this.isLoading.set(false);
    } catch (error) {
      console.error(error);
      this.isLoading.set(false);
    }
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  changeVideoPlayer(url: string) {
    this.isLoading.set(true);
    if (this.videoCache.has(url)) {
      this.videoUrl = this.videoCache.get(url)!;
    } else {
      this.videoUrl = this.sanitizeUrl(url);
      this.videoCache.set(url, this.videoUrl);
    }
    this.selectedOption = url;
    this.showOptions = false;
    this.isLoading.set(false);
  }
}
