export interface MovieSliderModel {
    _id: number;
    title: string;
    overview: string;
    slug: string;
    images: MovieImage;
    trailer: string;
    rating: string;
    genres: number[];
    years: number[];
    type: string;
    release_date: string;
    last_update: string;
    vote_count: string;
    runtime: string;
    original_title: string;
    gallery: string;
    tagline: string;
}

interface MovieImage {
    poster: string;
    backdrop: string;
    logo: string;
  }