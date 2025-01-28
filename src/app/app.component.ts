import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { NgClass } from '@angular/common';
import { themeColors } from './core/constants/theme-colors';
import { Color } from './core/enums/colors.enum';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  themeColorList = themeColors;
  themeColorEnum = Color;
  themeColorInit: string = Color.RED;

  constructor( private router: Router) {}

  changeColorTheme(color: string): void {
    this.themeColorInit = color;
  }
  checkSelectedTheme(color: string) {
    return this.themeColorInit === color;
  }

}
