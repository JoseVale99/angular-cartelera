export interface Images {
    poster: string;
    backdrop: string;
    logo: string;
}
export interface Episode {
    _id: number;
    title: string;
    slug: string;
    type: string;
    episode_type: string;
    overview: string;
    runtime: string;
    show_id: string;
    still_path: string;
    vote_average: string;
    vote_count: string;
    season_number: number;
    episode_number: number;
}
export interface Serie {
    _id: number;
    title: string;
    overview: string;
    slug: string;
    images: Images;
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

export interface EpisodeWithSerie {
    episode: Episode;
    serie: Serie;
}