import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavInfo } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterModule, MatIconModule, MatToolbarModule]
})
export class NavbarComponent implements OnInit {
  @Input() drawerFunc: any
  @Output() menuClicked: EventEmitter<boolean> = new EventEmitter<boolean>()
  isLoggedIn: boolean = false
  navInfo = NavInfo
  
  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.auth.isLoggedIn.subscribe(state => {
      this.isLoggedIn = state
    })
  }

  doMenuClick(): void {
    this.menuClicked.emit()
  }
  
  logout() {
    this.auth.logout()
  }
}
