import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() drawerFunc: any
  @Output() menuClicked: EventEmitter<boolean> = new EventEmitter<boolean>()
  public currentUrl: string = ''
  menuStatus = false
  logoUrl: string = "assets/images/logos/Colorwheel/Colorwheel-40-bcs.png"
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
  ) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url
  }

  doSearch(event: any) {
    alert(this.currentUrl)
  }

  doMenuClick(): void {
    this.menuClicked.emit()
  }

  donateLink(): void {
    window.location.href = "https://www.paypal.com/donate?hosted_button_id=8HUJHWGZD4MUG"
  }
}
