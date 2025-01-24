import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {
  private readonly baseUrl = environment.urlBase + 'api/rest/';
  private http = inject(HttpClient);

  /*
  * Get slider tv shows
  */
  getSliderTvShows(type: string, listen: string) {
    const $response = this.http.get(this.baseUrl + `sliders?type=${type}&listing=${listen}`);
    return lastValueFrom($response);
  }
}
