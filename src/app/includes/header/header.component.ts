import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { LoginComponent } from 'src/app/includes/login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog, private authService: AuthService) {}

  authUser: User = null;

  ngOnInit(): void {
    this.authService.authUserSubject.subscribe((data) => {
      this.authUser = data;
    });
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }

  openSignupDialog() {
    this.dialog.open(SignupComponent);
  }
}
