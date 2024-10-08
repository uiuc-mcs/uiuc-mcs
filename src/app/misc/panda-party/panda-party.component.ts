import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-panda-party',
  templateUrl: './panda-party.component.html',
  styleUrls: ['./panda-party.component.scss'],
  standalone: true,
  imports: [RouterModule, MatCardModule]
})
export class PandaPartyComponent {
  @Input() title: string = ""
  @Input() src: string = ""
  @Input() altText: string = ""
  @Input() link: string = "/"
  @Input() subtitle: string = ""
  constructor() { }
}
