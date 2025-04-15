import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MovieService } from '../../../core/services/movie.service';
import { Movie, Ticket } from '../../../core/models/movie.model';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RatingChangeEvent, StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookingComponent } from '../booking/booking.component';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-movie',
  imports: [MatButton, MatIcon, StarRatingModule, MatDialogModule],
  providers: [StarRatingConfigService],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit {
  movie: Movie;

  constructor(
    private _movieService: MovieService,
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._movieService.selectedMovie$.subscribe((movie) => {
      this.movie = movie!;
    });
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
        if (res.length) {
          this._movieService.bookTickets(res);
        }
      });
  }

  openCommentsDialog(): void {
    this._dialog
      .open(CommentsComponent, {
        minWidth: '400px',
        height: '500px',
        autoFocus: false,
        data: {
          comments: this.movie.comments
        }
      })
      .afterClosed()
      .subscribe(() => {
        this._cdr.markForCheck();
      });
  }

  saveRated(event: RatingChangeEvent): void {
    if (event.rating === this.movie.personalRating) return;
    this.movie.personalRating = event.rating;
    this._movieService.rateMovie(this.movie);
  }
}
