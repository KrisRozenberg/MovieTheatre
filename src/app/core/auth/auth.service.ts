import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthUtils } from './auth.utils';
import { JwtResponse, SingleResponse } from '../models/response.model';
import { jwtDecode } from "jwt-decode";
import { JwtDecodedAccessableInfo } from '../models/helper.model';
import { ACCESS_TOKEN } from '../helpers/consts-helper';
import { SignInOneFactor } from '../models/auth.model';
import { UserShort } from '../models/user.model';

@Injectable()
export class AuthService {
  private _authenticated = false;

  private _initialize = ((): void => {
      const jwtTokenStorage = JSON.parse(
          localStorage.getItem(ACCESS_TOKEN) || 'null'
      );
      this._authenticated = !!jwtTokenStorage?.token;

  })();

  get accessToken(): string {
      return localStorage.getItem(ACCESS_TOKEN) ?? '';
  }
  set accessToken(token: string) {
      localStorage.setItem(ACCESS_TOKEN, token);
  }

  parseJwtResponse(jwtResponse: JwtResponse): void {
    localStorage.removeItem(ACCESS_TOKEN);
      this.accessToken = jwtResponse.token;
      this._authenticated = true;
  }

// TOKEN DECODED
// {
//     "issuer": "MovieTheatre",
//     "iss": "2025-04-09T08:28:16.590Z",
//     "exp": "2025-04-11T08:28:16.590Z",
//     "username": "Admin",
//     "role": "Admin",
//     "userId": "3643a56e-1097-4341-bbd1-cdc02bdbfd45"
// }
  signIn(form: SignInOneFactor): Observable<SingleResponse<JwtResponse>> {
    if (form.username === 'Admin' && form.password === 'Pass_1') {
        return of({
            Response: true,
            model: {
                token: "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQWRtaW4iLCJpc3MiOiIyMDI1LTA0LTA5VDA4OjQ5OjQ0LjgwMVoiLCJleHAiOiIyMDI1LTA0LTExVDA4OjQ5OjQ0LjgwMVoiLCJ1c2VySWQiOiIzNjQzYTU2ZS0xMDk3LTQzNDEtYmJkMS1jZGMwMmJkYmZkNDUiLCJpc3N1ZXIiOiJNb3ZpZVRoZWF0cmUiLCJ1c2VybmFtZSI6IkFkbWluIn0.LewqzsihMSeFXUZsIzXBRLXlT70n5CgsOuCRKUhOlBM"
            }
        } as SingleResponse<JwtResponse>)
    }
    else {
        throw new HttpErrorResponse({ error: 'Invalid username or password', status: 400 });
    }
  }

  signOut(): Observable<boolean> {
    localStorage.removeItem(ACCESS_TOKEN);
    this._authenticated = false;
    return of(true);
  }

  checkIfAuthenticated(): boolean {
    if (this._authenticated) {
        return true;
    }

    if (
        !this.accessToken ||
        (this.accessToken && AuthUtils.isTokenExpired(this.accessToken))
    ) {
        return false;
    }

    this._authenticated = true;
    return true;
  }

  isAuthenticated(): boolean {
    return this._authenticated;
  }

  //is needed for user profile
  getUserInfoFromToken(token: string): UserShort {
    const jwtDecoded = jwtDecode(token) as JwtDecodedAccessableInfo;
    return (jwtDecoded as UserShort);
  }
}
