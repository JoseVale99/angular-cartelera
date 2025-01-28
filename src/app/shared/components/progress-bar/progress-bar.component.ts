import { Component, computed, inject } from '@angular/core';
import { ProgressBarService } from '../../service/progress-bar.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-progress-bar',
  imports: [
    MatProgressBarModule
  ],
  template: `
    @if (isLoading()) {
      <mat-progress-bar mode="indeterminate" class="custom-progress-bar">
      </mat-progress-bar>
    }
  `,
  styles: `
    .custom-progress-bar {
      --mdc-linear-progress-track-color: #e0e0e0;
      --mdc-linear-progress-active-indicator-color: #5a64ff;
    }`
})
export class ProgressBarComponent {
  private progressBarService = inject(ProgressBarService);
  public isLoading = computed(() => this.progressBarService.isLoading());
}
