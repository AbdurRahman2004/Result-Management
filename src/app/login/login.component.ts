// // login.component.ts
// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { QuoteService } from '../quote.service'; // Adjust the path as needed

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   email: string = '';
//   password: string = '';
//   quote: string = '';
//   studentResults: any = null;

//   constructor(
//     private http: HttpClient,
//     private router: Router,
//     private quoteService: QuoteService
//   ) {}

//   ngOnInit(): void {
//     this.quoteService.getQuote().subscribe((data: any) => {
//       this.quote = data.content;
//     });
//   }

//   onSubmit(loginForm: any) {
//     const loginData = {
//       email: loginForm.value.email,
//       password: loginForm.value.password
//     };

//     this.http.post('http://localhost:3000/login', loginData)
//       .subscribe((response: any) => {
//         //this.fetchStudentResults(response.rollNumber);
//         if (response.success) {
//           this.fetchStudentResults(response.rollNumber);
//           localStorage.setItem('rollNumber', response.rollNumber);
          
//         } else {
//           alert('Login failed: ' + response.message);
//         }
//       });
//   }

//   fetchStudentResults(rollNumber: string) {
//     this.http.get(`http://localhost:3000/student-results?rollNumber=${rollNumber}`)
//       .subscribe(
//         (response: any) => {
//           if (response) {
//             this.studentResults = response;
//             this.router.navigate(['/student'], { state: { student: this.studentResults } });
//           } else {
//             alert('No student data found');
//           }
//         },
//         (error) => {
//           console.error('Error fetching student results:', error);
//           alert('Failed to fetch student results');
//         }
//       );
//   }

//   register() {
//     this.router.navigate(['/sign-in']);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { QuoteService } from '../quote.service'; // Adjust the path as needed

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: any = {};
  quote: string = '';
  studentResults: any = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private quoteService: QuoteService
  ) {}

  ngOnInit(): void {
    this.quoteService.getQuote().subscribe((data: any) => {
      this.quote = data.content;
    });
  }

  onSubmit(loginForm: any) {
        const loginData = {
          email: loginForm.value.email,
          password: loginForm.value.password
        };

        console.log(loginData);

    if (loginData.email === 'admin' && loginData.password === 'admin') {
      // Redirect to admin page if credentials match
      this.router.navigate(['/admin']);
    } else {
      // Proceed with normal login flow
      this.http.post('http://localhost:3000/login', this.loginData)
        .subscribe(
          (response: any) => {
            if (response.success) {
             // localStorage.setItem('rollNumber', response.rollNumber);
              this.fetchStudentResults(response.rollNumber);
              localStorage.setItem('rollNumber', response.rollNumber);
            } else {
              alert('Login failed: ' + response.message);
            }
          },
          error => {
            alert('Error logging in');
          }
        );
    }
  }

  fetchStudentResults(rollNumber: string) {
    this.http.get(`http://localhost:3000/student-results?rollNumber=${rollNumber}`)
      .subscribe(
        (response: any) => {
          if (response) {
            this.studentResults = response;
            this.router.navigate(['/student'], { state: { student: this.studentResults } });
          } else {
            alert('No student data found');
          }
        },
        (error) => {
          console.error('Error fetching student results:', error);
          alert('Failed to fetch student results');
        }
      );
  }

  register() {
    this.router.navigate(['/sign-in']);
  }
}
