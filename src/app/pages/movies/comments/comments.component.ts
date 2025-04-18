import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MovieService } from '../../../core/services/movie.service';
import { Store } from '@ngrx/store';
import { Movie } from '../../../core/models/movie.model';
import { selectedMovie } from '../../../core/state/selectedMovie/selectedMovie.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments',
  imports: [FormsModule, ReactiveFormsModule, MatFormField, MatInput, MatLabel, MatDivider, MatButton],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent implements OnInit, OnDestroy {
  comments: string[];
  commentControl: FormControl = new FormControl('');

  private _subscription = new Subscription();

  constructor(
    private _movieService: MovieService,
    private _store: Store
  ) {}

  ngOnInit(): void {
    this._subscription = this._store.select<Movie>(selectedMovie)
      .subscribe((movie) => {
        this.comments = movie.comments;
      });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  addComment(): void {
    const commentToAdd = this.commentControl.value;
    if (!commentToAdd) return;

    this._movieService.addComment(commentToAdd);
    this.commentControl.reset();
  }
}
