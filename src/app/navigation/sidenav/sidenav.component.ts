import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() routeSelected: EventEmitter<any> = new EventEmitter
  isLoggedIn: boolean = false
  links = {
    a_home: {title: "List", link: "/", show: true},
    b_courses: {title: "Grid", link: "/courses", show: true},
    c_reviews: {title: "Reviews", link: "/reviews", show: true},
    d_create: {title: "Create Review", link: "/createReview", show: true},
    e_settings: {title: "Profile", link: "/settings", show: this.isLoggedIn},
    // f_myReviews: {title: "My Reviews", link: "/user/reviews", show: this.isLoggedIn},
    g_logout: {title: "Sign out", link: "/logout", show: this.isLoggedIn},
    h_login: {title: "Sign in", link: "/login", show: !this.isLoggedIn},
  }

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.isLoggedIn.subscribe(state => {
      this.isLoggedIn = state
      this.updateLinkStatus()
    })
  }

  updateLinkStatus(): void {
    this.links.e_settings.show = this.isLoggedIn
    // this.links.f_myReviews.show = this.isLoggedIn
    this.links.g_logout.show = this.isLoggedIn
    this.links.h_login.show = !this.isLoggedIn
  }

  closeDrawer(): void {
    this.routeSelected.emit()
  }
}
