// sign-in.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const emailPattern = /^[a-zA-Z]+\d+[a-zA-Z]+\d+@kongu.edu$/;

    if (!emailPattern.test(this.email)) {
      alert('Invalid email format. Email must be in the format <name><year><dept><rollno>@kongu.edu');
      return;
    }

    this.http.post('http://localhost:3000/register', { email: this.email, password: this.password })
      .subscribe(
        (response: any) => {
          if (response.success) {
            alert('Registration successful');
            this.router.navigate(['/login']);
          } else {
            alert('Registration failed: ' + response.message);
          }
        },
        error => {
          alert('Registration failed');
        }
      );
  }
}
