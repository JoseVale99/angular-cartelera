import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly baseUrl = environment.urlBase + 'api/rest/';
  private http = inject(HttpClient);

  /*
  * Get slider movies
  */
  getSliderMovies(type: string, listen: string) {
    const $response = this.http.get(this.baseUrl + `sliders?type=${type}&listing=${listen}`);
    return lastValueFrom($response);
  }
}
