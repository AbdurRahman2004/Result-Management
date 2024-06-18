import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/student-results'; // Example endpoint URL

  constructor(private http: HttpClient) {}

  // Define getStudents method to fetch all students
  

  // Example of method to get a student by roll number
  getStudentByRollNumber(rollNumber: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?rollNumber=${rollNumber}`);
  }

  // getStudents(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }
}
