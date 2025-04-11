import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { MovieShort } from '../../core/models/movie.model';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { initialFilterPagination } from '../../core/helpers/consts-helper';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, ReactiveFormsModule, MatFormField, MatInputModule, MatLabel, MatError],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
  movies: MovieShort[];
  search = new FormControl(initialFilterPagination.search);
  year = new FormControl('', Validators.compose([
    Validators.min(1910), 
    Validators.max(2025),
    this.firefoxNumberInputValidator
  ]));

  private readonly _uncubscribeAll = new Subject();

  constructor(
    public movieService: MovieService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.movieService.movies$.subscribe((movies) => {
      this.movies = movies;
    });

    this.search.valueChanges.pipe(
      debounceTime(600),
      takeUntil(this._uncubscribeAll)
    ).subscribe((value) => {
      this.movieService.filterPagination.search = value ?? '';
      this.movieService.getMoviesPaginated().subscribe(() => this._changeDetectorRef.markForCheck());
    });

    this.year.valueChanges.pipe(
      debounceTime(600),
      takeUntil(this._uncubscribeAll)
    ).subscribe((value) => {
      if (this.year.valid) {
        if (value) {
          this.movieService.filterPagination.year = Number(value);
        }
        else {
          delete this.movieService.filterPagination.year;
        }
        this.movieService.getMoviesPaginated().subscribe(() => this._changeDetectorRef.markForCheck());
        
      }
    });
  }

  ngOnDestroy(): void {
    this._uncubscribeAll.next(null);
    this._uncubscribeAll.complete();
  }

  firefoxNumberInputValidator(control: AbstractControl): { notNumber: boolean } | null {
    return control.value && isNaN(Number(control.value)) 
      ? { notNumber: true } 
      : null;
  }

  goToMovie(id: string) {
    this._router.navigate([`movie/${id}`]);
  }
}
