import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { ProgressBarService } from '../service/progress-bar.service';
import { inject } from '@angular/core';

export const progressBarInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const progressBarService = inject(ProgressBarService);

  progressBarService.show();

  return next(req).pipe(
    finalize(() => progressBarService.hide())
  );
};
