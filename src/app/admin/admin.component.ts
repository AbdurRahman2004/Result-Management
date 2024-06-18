import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  student: any = {};

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:3000/students', this.student)
      .subscribe(
        response => {
          alert('Student result added successfully');
        },
        error => {
          alert('Error adding student result');
        }
      );
  }
}
