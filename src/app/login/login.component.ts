import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TeamService } from '../services/team.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showSpinner = false;
  signup: FormGroup | any;
  login: FormGroup | any;
  signuser: any;
  showForgotPasswordModal: boolean = false;
  forgotEmail: string = '';
  constructor(private _http: HttpClient, private _route: Router, private _team: TeamService, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.signup = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    })
    this.login = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    })
    emailjs.init('ensVGC4FONLuL3Byc'); // Initialize EmailJS with your public key
  }
  signupdata(signup: FormGroup) {
    this.signuser = this.signup.value.email
    this._http.post<any>("http://localhost:3000/signup", this.signup.value)
      .subscribe(res => {
        alert('data added successfully');
        this.signup.reset();
      }, err => {
        alert('Somthing went wrong');
      })
  }

  logindata(login: FormGroup) {
    this.showSpinner = true;
    
    this._http.get<any>("http://localhost:3000/signup")
    .subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.login.value.email && a.password === this.login.value.password;
      });
      setTimeout(() => {
        this.showSpinner = false;
      }, 1500);
      
      if (user) {
        alert('You are successfully logged in');
        this.login.reset();
        this._route.navigate(['/home']);

        this._team.setLoggedInUserName(user.name);
      } else {
        alert('User Not Found or Incorrect credential');
      }
    }, err => {
      alert('Something went wrong');
    });
  } 
  openForgotPasswordModal(event: Event) {
    event.preventDefault();
    this.showForgotPasswordModal = true;

  }

  closeForgotPasswordModal() {
    this.showForgotPasswordModal = false;
  }

 sendPasswordResetEmail(event: Event) {
  event.preventDefault(); 

  this._http.get<any>(`http://localhost:3000/signup?email=${this.forgotEmail}`)
    .subscribe(res => {
      if (res.length > 0) {
        const userId = res[0].id; // Extract the ID from the first user object in the response

        emailjs.send('service_nvf3t3t', 'template_xiv9tnk', {
          to_email: this.forgotEmail,
          user_id: userId // Pass the user ID to the email template
        }).then(response => {
          console.log('Email sent:', response);
          alert('Password reset instructions have been sent to your registered email address.');
          this.closeForgotPasswordModal();
        }).catch(error => {
          console.error('Error sending email:', error);
          alert('An error occurred while sending the email. Please try again later.');
        });
      } else {
        alert('The email address does not exist in our records.');
      }
    }, err => {
      console.error('Error checking email:', err);
      alert('An error occurred while checking the email. Please try again later.');
    });
}

}
