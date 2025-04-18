import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Movie } from '../../core/models/movie.model';
import { MovieService } from '../../core/services/movie.service';
import { RatingChangeEvent, StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { ratedMovies } from '../../core/state/ratedMovies/ratedMovies.selectors';
import { rateMovie } from '../../core/state/ratedMovies/ratedMovies.actions';
import { bookedMovies } from '../../core/state/bookedMovies/bookedMovies.selectors';
import { cancelBooking } from '../../core/state/bookedMovies/bookedMovies.actions';
import { updateSelectedMovie } from '../../core/state/selectedMovie/selectedMovie.actions';

@Component({
  selector: 'app-user-profile',
  imports: [MatTabsModule, StarRatingModule, MatDividerModule, MatIconModule, MatButtonModule, MatTooltipModule],
  providers: [StarRatingConfigService],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit, OnDestroy {
  ratedMovies: Movie[];
  bookedMovies: Movie[];
  private readonly _unsubscribeAll = new Subject();

  constructor(
    public movieService: MovieService,
    private _store: Store,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._store.select<Movie[]>(ratedMovies)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((movies) => {
        this.ratedMovies = movies;
        this._changeDetectorRef.markForCheck();
      });

    this._store.select<Movie[]>(bookedMovies)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((movies) => {
        this.bookedMovies = movies;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  saveRated(event: RatingChangeEvent, movieToRate: Movie): void {
    if (event.rating === movieToRate.personalRating) return;
    const movie = {...movieToRate, personalRating: event.rating};
    this._store.dispatch(rateMovie({ movie }));
    this._store.dispatch(updateSelectedMovie({ movie }));
  }

  cancelBooking(movieId: string): void {
    this._store.dispatch(cancelBooking({ movieId }));
  }
}
