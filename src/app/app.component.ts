import { Component, computed, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { NgClass } from '@angular/common';
import { themeColors } from './core/constants/theme-colors';
import { Color } from './core/enums/colors.enum';
import { ProgressBarService } from './shared/service/progress-bar.service';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgClass, ProgressBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  themeColorList = themeColors;
  themeColorEnum = Color;
  themeColorInit: string = Color.RED;
  private progressBarService = inject(ProgressBarService);
  public isLoading = computed(() => this.progressBarService.isLoading());

  constructor( private router: Router) {}

  changeColorTheme(color: string): void {
    this.themeColorInit = color;
  }
  checkSelectedTheme(color: string) {
    return this.themeColorInit === color;
  }

}
