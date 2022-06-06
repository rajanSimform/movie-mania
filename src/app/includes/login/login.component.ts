import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, LoginData } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}
  hide: boolean = true;
  form: FormGroup;

  isLoading: boolean = false;
  isCompleted: boolean = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^[\w-+]+(?:\.[\w-]+)*@[\w-]+\.[\w'\-\s,#\\]*\.?(?:[A-Za-z]{2,3})$/
          ),
        ],
      ],
      password: [null, [Validators.required]],
    });
  }

  login(loginData: LoginData) {
    this.isLoading = true;

    this.authService.login(loginData).subscribe({
      next: (v) => {
        const { email, name, _id } = v.data.user;
        const _token = v.data.accessToken;
        const authUser = new User(_id, email, name, _token);
        console.log(authUser);
        this.authService.authUserSubject.next(authUser);
        this.openSnackBar(`Logged in Successfully as ${authUser.name}`, 'OK');
        localStorage.setItem('userData', JSON.stringify(authUser));
        this.isLoading = false;
        this.isCompleted = true;
      },
      error: (e) => {
        this.isLoading = false;
        this.isCompleted = true;
        console.error(e);
      },
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
    // close snakbar automatic after 3.5 sec
    setTimeout(() => {
      this._snackBar.dismiss();
    }, 3500);
  }
}
