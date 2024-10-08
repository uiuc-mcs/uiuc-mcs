import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
  standalone: true,
  imports: [MatCardModule]
})
export class TermsComponent implements OnInit {
  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
