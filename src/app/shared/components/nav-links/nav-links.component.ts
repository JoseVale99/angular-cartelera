import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-links',
  imports: [
    RouterLinkActive,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './nav-links.component.html',
  styles: `
  `
})
export class NavLinksComponent {
  link = input.required<string>();
  label = input.required<string>();
}
