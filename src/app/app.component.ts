// app.component.ts

import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service'; // Adjust path as needed

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  students: any[] = []; // Define students array

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
  }

  
}
