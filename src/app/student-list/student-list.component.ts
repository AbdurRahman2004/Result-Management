import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, AfterViewInit {
  studentResults: any = null;
  rollNumber: string | null = '';

  @ViewChild('content', { static: false }) content!: ElementRef;

  constructor(
    private http: HttpClient,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.rollNumber = localStorage.getItem('rollNumber');

    if (this.rollNumber) {
      this.fetchStudentResults(this.rollNumber);
    } else {
      alert('No roll number found. Please log in again.');
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit(): void {
    // Content is now accessible here after view initialization
  }

  fetchStudentResults(rollNumber: string): void {
    this.studentService.getStudentByRollNumber(rollNumber)
      .subscribe(
        (response: any) => {
          this.studentResults = response;
        },
        (error) => {
          console.error('Error fetching student results:', error);
          alert('Failed to fetch student results');
        }
      );
  }

  pdfDownload(){
    var pdf=new jsPDF()

    autoTable(pdf,{ html: '.table-responsive' })
    pdf.output("dataurlnewwindow")
    // save pdf
    pdf.save("Exam Results.pdf")

  }

  reevaluation() {
    this.router.navigate(['/reevaluation']);
  }
}
