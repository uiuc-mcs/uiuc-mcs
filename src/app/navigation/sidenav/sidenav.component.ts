import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavInfo, NavItem } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() routeSelected: EventEmitter<any> = new EventEmitter
  isLoggedIn: boolean = false
  links: Map<string, NavItem> = NavInfo

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.isLoggedIn.subscribe(state => {
      this.isLoggedIn = state
      this.updateLinkStatus()
    })
  }

  linksArray() {
    return Array.from(this.links.values())
  }

  updateLinkStatus(): void {
    this.links.get("settings")!.show = this.isLoggedIn
    this.links.get("logout")!.show = this.isLoggedIn
    this.links.get("login")!.show = !this.isLoggedIn
  }

  closeDrawer(): void {
    this.routeSelected.emit()
  }
}
