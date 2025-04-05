import { HttpClient, HttpParams } from '@angular/common/http';
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

  /**
   *  Get paginated movies
   * @param page
   * @param genres
   * @param years
   * @param order
  */
  getAllMovies(params: HttpParams) {
    //const $response = this.http.get(this.baseUrl + `listing?post_type=movies&page=${page}&genres=${genres}&years=${years}&order=${order}`);
    const $response = this.http.get(this.baseUrl + `listing?post_type=movies`, { params });
    return lastValueFrom($response);
  }

  /**
   * Get generes
   */
  getGeneres() {
    const $response = this.http.get<any>(`/generes/generes.json`);
    return lastValueFrom($response);
  }
}