import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Movie } from '../../core/models/movie.model';
import { MovieService } from '../../core/services/movie.service';
import { RatingChangeEvent, StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-profile',
  imports: [MatTabsModule, StarRatingModule, MatDividerModule, MatIconModule, MatButtonModule, MatTooltipModule],
  providers: [StarRatingConfigService],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  ratedMovies: Movie[];
  bookedMovies: Movie[];

  constructor(public movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.ratedMovies$.subscribe((movies) => {
      this.ratedMovies = movies;
    });

    this.movieService.bookedMovies$.subscribe((movies) => {
      this.bookedMovies = movies;
    })
  }

  saveRated(event: RatingChangeEvent, movie: Movie) {
    if (event.rating === movie.personalRating) return;
    movie.personalRating = event.rating;
    this.movieService.rateMovie(movie);
  }
}
