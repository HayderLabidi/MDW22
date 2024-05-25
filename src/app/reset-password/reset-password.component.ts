import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetId: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  resetPassword(event: Event) {
    event.preventDefault();

    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const resetData = {
      id: this.resetId,
      password: this.newPassword
    };

    this.http.patch(`http://localhost:3000/signup/${this.resetId}`, resetData)
      .subscribe(response => {
        alert('Password has been successfully reset.');
        this.router.navigate(['/login']); // Navigate to the login page after reset
      }, error => {
        console.error('Error resetting password:', error);
        alert('An error occurred while resetting the password. Please try again later.');
      });
  }
}
