import { Injectable } from '@angular/core';
import { ClassData } from 'src/app/shared/class/class';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Observable, ReplaySubject } from 'rxjs';

import { collection, onSnapshot } from 'firebase/firestore';

@Injectable({
    providedIn: 'root'
})
export class ClassService {
    private _classes: ReplaySubject<ClassData[]> = new ReplaySubject()
    public classes: Observable<ClassData[]> = this._classes.asObservable()


    constructor(
        // private afs: AngularFirestore  
        private afs: Firestore,
    ) {
        this.updateCourseData()
    }

    async updateCourseData() {
        const ref = collection(this.afs, 'Class')
        const unsubscribe = onSnapshot(ref, (querySnapshot) => {
            const cities: ClassData[] = [];
            querySnapshot.forEach((doc) => {
                cities.push(doc.data() as ClassData);
            });
            // console.log("change in ClassData");
            this._classes.next(cities)
        });
    }
}
