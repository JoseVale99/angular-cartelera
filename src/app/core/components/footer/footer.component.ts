import { NgForOf, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  socialData = [
    { name: 'GitHub', url: 'https://github.com/JoseVale99', img: 'assets/svg/github.svg' },
    { name: 'Twitter', url: 'https://twitter.com/ZarateCarreno', img: 'assets/svg/twitter.svg' },
  ];
}
