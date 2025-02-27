import { Component, computed, EventEmitter, HostListener, inject, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, NgForOf } from '@angular/common';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { themeColors } from '../../constants/theme-colors';
import { Color } from '../../enums/colors.enum';
import { MatIconModule } from '@angular/material/icon';
import { ProgressBarService } from '../../../shared/service/progress-bar.service';
import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-navbar',
  imports: [
    MatMenuModule,
    RouterLinkActive,
    CommonModule,
    NgForOf,
    MatIconModule,
    MatAnchor,
    MatIconButton,
    RouterLink,
    ProgressBarComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() changeColorTheme: EventEmitter<string> = new EventEmitter();
  private progressBarService = inject(ProgressBarService);
  public isLoading = computed(() => this.progressBarService.isLoading());

  isMenuOpen = false;

  themeColorList = themeColors;
  themeColorInit: string = Color.RED;

  isScrolled = false;

  @HostListener('window:scroll')
  scrollEvent() {
    this.isScrolled = window.scrollY >= 30;
  }
  
  setColorTheme(color: string) {
    this.themeColorInit = color;
    this.changeColorTheme.emit(color);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
