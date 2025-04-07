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
   * @param params
  */
  getAllMovies(params: HttpParams) {
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
  
  /**
   * Search movies 
   * @param params
   */
  searchMovies(params: HttpParams) {
    const $response = this.http.get(this.baseUrl + `search?post_type=movies`, { params }); 
    return lastValueFrom($response);
  }

  /**
   * Get movie by slug
   * @param slug
   */
  getMovieBySlug(slug: string) {
    const $response = this.http.get(this.baseUrl + `single?post_name=${slug}&post_type=movies`);
    return lastValueFrom($response);
  }

  /**
   * Get player
   * @param id
   */
  getUrlsPlayer(id: number) {
    const $response = this.http.get(this.baseUrl + `player?post_id=${id}`);
    return lastValueFrom($response);
  }
}