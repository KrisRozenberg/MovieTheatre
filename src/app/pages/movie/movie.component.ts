import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../core/models/movie.model';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RatingChangeEvent, StarRatingConfigService, StarRatingModule } from 'angular-star-rating';

@Component({
  selector: 'app-movie',
  imports: [MatButton, MatIcon, StarRatingModule],
  providers: [StarRatingConfigService],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit {
  movie: Movie;

  constructor(private _movieService: MovieService) {}

  ngOnInit(): void {
    this._movieService.selectedMovie$.subscribe((movie) => {
      this.movie = movie;
    });
  }

  openBookDialog() {
    // implement dialog for booking seats
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
