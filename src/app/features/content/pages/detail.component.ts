import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private contentType! : string;


  constructor() {
    this.contentType = this.router.url.split('/')[1];
  }


  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const id = params['id'];
        console.log(id);
        if (this.contentType === 'movies') {
        } else if (this.contentType === 'tv-shows') {
        }
      }
    );
  }
}
