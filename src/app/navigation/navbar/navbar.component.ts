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
  // logoUrl: string = "assets/images/logos/Colorwheel/Colorwheel-40-bcs.png"
  navInfo = {
    home: {title: 'List', url: '/home'},
    courses: {title: 'Grid', url: '/courses'},
    reviews: {title: 'Reviews', url: '/reviews'},
    login: {title: 'Login', url: '/login'},
    logout: {title: 'Log Out', url: '/logout'},
    settings: {title: 'Profile', url: '/settings'},
    register: {title: 'Register', url: '/register'},
    createReview: {title: 'Create Review', url: '/createReview'},
  }
  
  public readonly website: string = "computerScience"
  public readonly degreeName: string = "Computer Science"
  public readonly websiteName: string = "UIUC MCS"
  public readonly properName: string = "uiucmcs.org"
  public readonly socialName: string = "Slack"
  public readonly socialURL: string = ""
  public readonly socialLogo: string = "logos:slack"
  public readonly redditName: string = "/r/UIUC_MCS"
  public readonly redditURL: string = "https://www.reddit.com/r/UIUC_MCS"
  public readonly githubURL: string = "https://github.com/uiuc-mcs/uiuc-mcs"

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

  // donateLink(): void {
  //   window.location.href = "https://www.paypal.com/donate?hosted_button_id=8HUJHWGZD4MUG"
  // }
  
  logout() {
    this.auth.logout()
  }
}
