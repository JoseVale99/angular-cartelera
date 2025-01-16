import { SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    //MovieCardComponent,
    RouterLink,
    //SwiperDirective,
    SlicePipe,
    MatTabGroup,
    MatTab,
    MatIcon
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  movies = [
    {
      title: 'Transformers Uno (2024)',
      year: 2024,
      rating: 8.2,
      genres: ['Familia', 'Animación', 'Aventura'],
      image: 'path/to/transformers.jpg',
    },
    {
      title: 'La sustancia (2024)',
      year: 2024,
      rating: 7.3,
      genres: ['Drama', 'Terror', 'Ciencia ficción'],
      image: 'path/to/la-sustancia.jpg',
    },
    {
      title: 'Guasón 2: Folie à Deux (2024)',
      year: 2024,
      rating: 5.7,
      genres: ['Crimen', 'Drama', 'Suspense'],
      image: 'path/to/guason.jpg',
    },
    {
      title: 'Hellboy: The Crooked Man (2024)',
      year: 2024,
      rating: 5.0,
      genres: ['Fantasía', 'Acción', 'Terror'],
      image: 'path/to/hellboy.jpg',
    },
    {
      title: 'Robot salvaje (2024)',
      year: 2024,
      rating: 8.2,
      genres: ['Familia', 'Animación', 'Ciencia ficción'],
      image: 'path/to/robot.jpg',
    },
    {
      title: 'Alien: Romulus (2024)',
      year: 2024,
      rating: 7.0,
      genres: ['Acción', 'Terror', 'Ciencia ficción'],
      image: 'path/to/alien.jpg',
    },
  ];
}
