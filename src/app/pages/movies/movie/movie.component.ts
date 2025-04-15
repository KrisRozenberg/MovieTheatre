import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MovieService } from '../../../core/services/movie.service';
import { Movie, Ticket } from '../../../core/models/movie.model';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RatingChangeEvent, StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookingComponent } from '../booking/booking.component';

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
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._movieService.selectedMovie$.subscribe((movie) => {
      this.movie = movie!;
    });
  }

  openBookDialog() {
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

  openCommentsDialog() {
    // implement dialog (?? maybe smth else) with comments list & textarea for adding new comment
  }

  saveRated(event: RatingChangeEvent) {
    if (event.rating === this.movie.personalRating) return;
    this.movie.personalRating = event.rating;
    this._movieService.rateMovie(this.movie);
  }
}
