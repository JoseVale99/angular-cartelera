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
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    }
  `,
  styles: ``
})
export class ProgressBarComponent {
  private progressBarService = inject(ProgressBarService);
  public isLoading = computed(() => this.progressBarService.isLoading());
}
