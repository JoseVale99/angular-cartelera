import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  public isLoading = signal(false);

  public show() {
    this.isLoading.set(true);
  }

  public hide() {
    this.isLoading.set(false);
  }
}
