import { Component, inject, signal, ViewChild } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import { PosterCardComponent } from '../../shared/components/poster-card/poster-card.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { MediaService } from './services/media.service';
@Component({
  selector: 'app-content-main',
  imports: [
    MatPaginatorModule,
    MatCardModule,
    PosterCardComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentMainComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private mediaService = inject(MediaService);
  private matPaginatorIntl = inject(MatPaginatorIntl);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  public isLoading = signal(false);
  mediaList: any[] = [];
  totalResults = signal(0);
  perPage = signal(1);
  httpParams = new HttpParams();
  contentType = '';
  genres: any[] = [];
  years: any[] = [];
  selectedGenres: string[] = [];
  selectedYears: string[] = [];
  selectedOrder: string = 'latest';
  searchForm!: FormGroup;

  constructor() {
    this.contentType = this.router.url.split('/')[1];
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.setConfigPaginator();
    this.getGeneres();
   this.setHttpParams();
   this.getMedia();
  }

  crearFormulario() {
    this.searchForm = this.fb.group({
      searchType: ['all']
    });

    this.searchForm.get('searchType')?.valueChanges.subscribe(type => {
      if (type === 'all') {
        this.searchForm.removeControl('searchQuery');
        this.selectedGenres = [];
        this.selectedYears = [];
        this.selectedOrder = 'latest';
        this.perPage.set(1);
        this.setPage(0);
        this.setHttpParams();
        this.getMedia();
      } else if (type === 'name') {
        this.searchForm.addControl('searchQuery', this.fb.control('', [Validators.required, Validators.minLength(3)]));
      }
    });
  }

  setConfigPaginator() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Películas por página:';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente';
    this.matPaginatorIntl.previousPageLabel = 'Anterior';
    this.matPaginatorIntl.firstPageLabel = 'Primera página';
    this.matPaginatorIntl.lastPageLabel = 'Última página';
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => `${page * pageSize + 1} – ${Math.min((page + 1) * pageSize, length)} de ${length}`;
  }

  public async onSearch() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    if (this.searchForm.get('searchType')?.value === 'name') {
      this.selectedGenres = [];
      this.selectedYears = [];
      this.selectedOrder = 'latest';
      this.perPage.set(1);
      this.setPage(0);
      this.setHttpParams();
      await this.searchMedia();
    }
  }

  private async searchMedia() {
    this.isLoading.set(true);
    try {
      const { data } = await this.mediaService.searchMedia(this.httpParams) as any;
      this.mediaList = data.posts;
      this.totalResults.set(data.pagination.total);
      this.perPage.set(data.pagination.per_page);
      this.isLoading.set(false);
    } catch (error) {
      console.error(error);
      this.isLoading.set(false);
    }
  }

  private async getGeneres() {
    const data = await this.mediaService.getGeneres() as any;
    this.genres = data.data.genres;
    this.years = data.data.years;
  }

  setHttpParams() {
    this.httpParams = new HttpParams()
      .set('query', this.searchForm.get('searchQuery')?.value || '')
      .set('post_type', this.contentType)
      .set('genres', this.selectedGenres.join(',') || '')
      .set('years', this.selectedYears.join(',') || '')
      .set('order', this.selectedOrder);
  }

  private async getMedia() {
    this.isLoading.set(true);
    try {
      const { data } = await this.mediaService.getAllMedia(this.httpParams) as any;
      this.mediaList = data.posts;
      this.totalResults.set(data.pagination.total);
      this.perPage.set(data.pagination.per_page);
      this.isLoading.set(false);
    } catch (error) {
      console.error(error);
      this.isLoading.set(false);
    }
  }

  filterContent(): void {
    this.setHttpParams();
    this.getMedia();
  }

  find(e: PageEvent) {
    const currentPage = e.pageIndex + 1;
    if (currentPage !== this.perPage()) {
      this.perPage.set(currentPage);
      const updatedParams = this.httpParams.set('page', this.perPage());
      this.httpParams = updatedParams;
      if(this.contentType === 'movies'){
        this.searchForm.get('searchType')?.value === 'name' && this.searchForm.get('searchQuery')?.value ? this.searchMedia() : this.getMedia();
      }else if(this.contentType === 'tvshows'){
        this.searchForm.get('searchType')?.value === 'name' && this.searchForm.get('searchQuery')?.value ? this.searchMedia() : this.getMedia();
      }
    }
  }

  setPage(index: number) {
    if (this.paginator) {
      this.paginator.pageIndex = index;
    }
  }
}
