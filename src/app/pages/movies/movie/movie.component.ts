import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Movie, Ticket } from '../../../core/models/movie.model';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RatingChangeEvent, StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookingComponent } from '../booking/booking.component';
import { CommentsComponent } from '../comments/comments.component';
import { Store } from '@ngrx/store';
import { selectedMovie } from '../../../core/state/selectedMovie/selectedMovie.selectors';
import { Subscription } from 'rxjs';
import { rateMovie } from '../../../core/state/ratedMovies/ratedMovies.actions';
import { bookMovie } from '../../../core/state/bookedMovies/bookedMovies.actions';
import { updateSelectedMovie } from '../../../core/state/selectedMovie/selectedMovie.actions';

@Component({
  selector: 'app-movie',
  imports: [MatButton, MatIcon, StarRatingModule, MatDialogModule],
  providers: [StarRatingConfigService],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: Movie;
  private _subscription = new Subscription();

  constructor(
    private _dialog: MatDialog,
    private _changeDetectorRef: ChangeDetectorRef,
    private _store: Store
  ) {}

  ngOnInit(): void {
    this._subscription = this._store.select<Movie>(selectedMovie)
      .subscribe((movie) => {
        this.movie = movie;
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  openBookDialog(): void {
    this._dialog
      .open(BookingComponent, {
        minWidth: '400px',
        height: '500px',
        autoFocus: false,
        data: {
          bookedTickets: this.movie.bookedTickets
        }
      })
      .afterClosed()
      .subscribe((res: Ticket[]) => {
        if (res && res.length) {
          const movie = {...this.movie, bookedTickets: res};
          this._store.dispatch(bookMovie({ movie }));
          this._store.dispatch(updateSelectedMovie({ movie }));
        }
      });
  }

  openCommentsDialog(): void {
    this._dialog
      .open(CommentsComponent, {
        minWidth: '400px',
        height: '500px',
        autoFocus: false
      })
      .afterClosed()
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });
  }

  saveRated(event: RatingChangeEvent): void {
    if (event.rating === this.movie.personalRating) return;
    const movie = {...this.movie, personalRating: event.rating};
    this._store.dispatch(rateMovie({ movie }));
    this._store.dispatch(updateSelectedMovie({ movie }));
  }
}
