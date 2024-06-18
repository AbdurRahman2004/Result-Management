import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/student-results'; // Correct endpoint URL

  constructor(private http: HttpClient) { }

  // Method to fetch student by roll number
  getStudentByRollNumber(rollNumber: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?rollNumber=${rollNumber}`);
  }
}
