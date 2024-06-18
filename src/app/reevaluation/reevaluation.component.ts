import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reevaluation',
  templateUrl: './reevaluation.component.html',
  styleUrls: ['./reevaluation.component.css']
})
export class ReevaluationComponent {
  reevaluation: any = {};
  plan: any;
  buttonWidth = 100;
  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:3000/reevaluation', this.reevaluation)
      .subscribe(
        response => {
          alert('Reevaluation request submitted successfully');
        },
        error => {
          alert('Error submitting reevaluation request');
        }
      );
  }
  onLoadPaymentData(event: any) {
    console.log(event, '>>Data');
  }
}
