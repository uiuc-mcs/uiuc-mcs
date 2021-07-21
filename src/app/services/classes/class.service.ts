import { Injectable } from '@angular/core';
import { ClassData } from 'src/app/shared/class/class';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, ReplaySubject } from 'rxjs';
// import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private _classes: ReplaySubject<ClassData[]> = new ReplaySubject()
  public classes: Observable<ClassData[]> = this._classes.asObservable()
  // public readonly website: string = "computerScience"
  public readonly degreeName: string = "Computer Science"
  public readonly websiteName: string = "UIUC MCS"
  public readonly properName: string = "uiucmcs.org"
  public readonly redditName: string = "/r/UIUC_MCS"
  public readonly redditURL: string = "https://www.reddit.com/r/UIUC_MCS"
  public readonly githubURL: string = "https://github.com/uiuc-mcs/uiuc-mcs"


  constructor(
    private afs: AngularFirestore  
  ) {
    this.updateCourseData()
  }

  updateCourseData(): void {
    let courseListener = this.afs.collection<ClassData>('Class')
    .valueChanges({idField: 'courseId'})
    .subscribe(data => {
      // data = data.filter(course => course.computerScience.isComputerScience)
      // data.forEach(course => course.category = course.computerScience.category || course.category)
      this._classes.next(data)
    })
  }
}
