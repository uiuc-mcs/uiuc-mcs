import { Injectable } from '@angular/core';
import { ClassData } from 'src/app/shared/class/class';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClassService {
    private _classes: ReplaySubject<ClassData[]> = new ReplaySubject()
    public classes: Observable<ClassData[]> = this._classes.asObservable()

    constructor(
        private afs: Firestore,
    ) {
        const ref = collection(this.afs, 'Class')
        const unsubscribe = onSnapshot(ref, (querySnapshot) => {
            const cities: ClassData[] = [];
            querySnapshot.forEach((doc) => {
                var data = doc.data()
                data['courseId'] = doc.id
                cities.push(data as ClassData);
            });
            this._classes.next(cities)
        });
    }
}
