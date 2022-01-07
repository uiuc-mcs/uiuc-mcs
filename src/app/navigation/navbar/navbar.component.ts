import { AuthService } from 'src/app/services/auth/auth.service';
import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() drawerFunc: any
  @Output() menuClicked: EventEmitter<boolean> = new EventEmitter<boolean>()
  public currentUrl: string = ''
  isLoggedIn: boolean = false
  menuStatus = false
  navInfo = {
    home: {title: 'Courses', url: '/'},
    courses: {title: 'Grid', url: '/courses'},
    reviews: {title: 'Reviews', url: '/reviews'},
    login: {title: 'Sign in', url: '/login'},
    logout: {title: 'Sign out', url: '/logout'},
    settings: {title: 'Profile', url: '/settings'},
    register: {title: 'Register', url: '/register'},
    createReview: {title: 'Create Review', url: '/createReview'},
  }
  
  constructor(
    private router: Router,
    private location: Location,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    // this.currentUrl = this.router.url
    this.router.events.subscribe((val) => {
      this.currentUrl = this.location.path();
    });
    this.auth.isLoggedIn.subscribe(state => {
      this.isLoggedIn = state
    })
  }

  doSearch(event: any) {
    alert(this.currentUrl)
  }

  doMenuClick(): void {
    this.menuClicked.emit()
  }
  
  logout() {
    this.auth.logout()
  }
}
