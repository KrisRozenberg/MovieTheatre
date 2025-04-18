import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../../../core/services/movie.service';
import { MovieShort } from '../../../core/models/movie.model';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, Subject, take, takeUntil } from 'rxjs';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { moviesList } from '../../../core/state/moviesList/moviesList.selectors';
import { changeSearch, changeYear } from '../../../core/state/filterPagination/filterPagination.action';
import { FilterPagination } from '../../../core/models/helper.model';
import { filterPaginationState } from '../../../core/state/filterPagination/filterPagination.selectors';

@Component({
  selector: 'app-movies-list',
  imports: [FormsModule, ReactiveFormsModule, MatFormField, MatInputModule, MatLabel, MatError],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListComponent implements OnInit, OnDestroy {
  movies: MovieShort[];
  search: FormControl;
  year: FormControl;

  private readonly _unsubscribeAll = new Subject();

  constructor(
    public movieService: MovieService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _store: Store
  ) {}

  ngOnInit(): void {
    this._store.select<MovieShort[]>(moviesList)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((movies) => {
        this.movies = movies;
        this._changeDetectorRef.markForCheck();
      });

    this._store.select<FilterPagination>(filterPaginationState)
      .pipe(take(1))
      .subscribe((filterPagination) => {
        this.search = new FormControl(filterPagination.search);
        this.year = new FormControl(
          filterPagination.year ?? '', 
          Validators.compose([
            Validators.min(1910), 
            Validators.max(2025),
            this.firefoxNumberInputValidator
          ])
        );
      })

    this.search.valueChanges.pipe(
      debounceTime(600),
      takeUntil(this._unsubscribeAll)
    ).subscribe((value) => {
      this._store.dispatch(changeSearch({ search: value ?? '' }));
    });

    this.year.valueChanges.pipe(
      debounceTime(600),
      takeUntil(this._unsubscribeAll)
    ).subscribe((value) => {
      if (this.year.valid) {
        this._store.dispatch(changeYear({ year: value }));
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  firefoxNumberInputValidator(control: AbstractControl): { notNumber: boolean } | null {
    return control.value && isNaN(Number(control.value)) 
      ? { notNumber: true } 
      : null;
  }

  goToMovie(id: string): void {
    this._router.navigate([`movies/${id}`]);
  }
}
