import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  hide: boolean = true;
  form: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required, Validators.pattern(/w/)],
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
}
