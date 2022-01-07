import { Injectable } from '@angular/core';
import { ClassData } from 'src/app/shared/class/class';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private _classes: ReplaySubject<ClassData[]> = new ReplaySubject()
  public classes: Observable<ClassData[]> = this._classes.asObservable()


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
