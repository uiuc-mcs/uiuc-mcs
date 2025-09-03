import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.scss'],
    imports: [MatCardModule]
})
export class PrivacyComponent implements OnInit {
  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
