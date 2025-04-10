import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { SignInOneFactor } from '../../core/models/auth.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatIconButton,
    MatSuffix,
    MatIcon,
    MatButton,
    MatProgressSpinner,
    NgClass
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  isRequestSending = false;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9@$!%*?&_]{6,}$'),
        Validators.pattern('^.*[0-9]+.*$'),
        Validators.pattern('^.*[a-z]+.*$'),
        Validators.pattern('^.*[A-Z]+.*$'),
        Validators.pattern('^.*[@$!%*?&_]+.*$'),
      ]))
    });
  }

  signIn(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.isRequestSending = true;
    //try-catch block isn't needed with actual requests; investigate how to emulate request better
    try {
      this._authService.signIn(this.signInForm.value as SignInOneFactor)
        .subscribe({
          next: (res) => {
            this._authService.parseJwtResponse(res.model);
            this._router.navigate(['']);
          },
          error: () => {
            this.isRequestSending = false;
          }
        });
    }
    catch {
      this.isRequestSending = false;
    }
  }
}
