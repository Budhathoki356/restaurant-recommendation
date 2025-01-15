import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from "src/app/guard/auth.guard";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitting = false;
  form: FormGroup;
  message;
  messageClass;
  previousUrl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLoginSubmit() {
    this.submitting = true;
    const user = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
    }

    this.authService.loginUser(user).subscribe(data => {
      if (!data['success']) {
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = data['message']; // Set an error message
        this.submitting = false; // Re-enable submit button
      } else {
        this.messageClass = 'alert alert-success'
        this.message = data['message']
        this.authService.storeUserData(data['token'], data['user'])
        if (this.previousUrl) {
          this.router.navigate([this.previousUrl])
        } else {
          this.authService.redirectToHome()
        }
      }
    });
  }

  ngOnInit(): void {
    if (this.authGuard.redirectUrl) {
      this.messageClass = 'alert alert-danger'
      this.message = "You must be logged in to view that page."
      this.previousUrl = this.authGuard.redirectUrl
      this.authGuard.redirectUrl = undefined
    }
  }

}
