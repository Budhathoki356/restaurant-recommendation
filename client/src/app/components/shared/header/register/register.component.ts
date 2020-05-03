import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup; // form variable of form group type
  submitting: boolean = false;
  message;
  messageClass;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router : Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {

  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      username: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validatePass

      ])],
      phoneNo: ['', Validators.required], // number
      location: ['', Validators.required],
    })
  }

  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) return null;
    return { 'validateEmail': true };
  }

  validatePass(controls) {
    const regExp = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
    if (regExp.test(controls.value)) return null;
    return { 'validatePass': true };
  }

  onRegisterSubmit() {
    this.submitting = true;
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value,
      phoneNo: this.form.get('phoneNo').value,
      location: this.form.get('location').value,
      email: this.form.get('email').value
    }
    this.authService.registerUser(user).subscribe((data: Object) => {
       if (!data['success']) {
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = data['message']; // Set an error message
        this.submitting = false; // Re-enable submit button
      } else {
        this.messageClass = 'alert alert-success'; // Set a success class
        this.message = data['message']; // Set a success message
        // After 2 second timeout, navigate to the login page
        setTimeout(() => {
          this.router.navigate(['/login']); // Redirect to login view
        }, 2000);
      }
    })
  }

}
