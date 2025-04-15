import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MovieService } from '../../../core/services/movie.service';

@Component({
  selector: 'app-comments',
  imports: [FormsModule, ReactiveFormsModule, MatFormField, MatInput, MatLabel, MatDivider, MatButton],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent {
  commentControl: FormControl = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { comments: string[] },
    private _movieService: MovieService
  ) {}

  addComment(): void {
    const commentToAdd = this.commentControl.value;
    if (!commentToAdd) return;

    this._movieService.addComment(commentToAdd);
    this.commentControl.reset();
  }
}
