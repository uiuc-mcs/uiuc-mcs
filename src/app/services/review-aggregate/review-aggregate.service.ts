import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';

interface ReviewAggregateTarget {
  classId?: string | null;
  courseName: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewAggregateService {
  constructor(private afs: Firestore) {}

  async syncCourseStats(target: ReviewAggregateTarget): Promise<void> {
    const classRef = await this.getClassRef(target);
    if (!classRef) {
      throw new Error(`Unable to find Class document for "${target.courseName}"`);
    }

    const reviewRef = collection(this.afs, 'Reviews');
    const reviewSnapshot = await getDocs(query(reviewRef, where('course', '==', target.courseName)));

    const reviewCount = reviewSnapshot.docs.length;
    let ratingTotal = 0;
    let difficultyTotal = 0;
    let workloadTotal = 0;

    for (const item of reviewSnapshot.docs) {
      const data = item.data();
      ratingTotal += Number(data['rating'] || 0);
      difficultyTotal += Number(data['difficulty'] || 0);
      workloadTotal += Number(data['workload'] || 0);
    }

    await updateDoc(classRef, {
      RatingCount: reviewCount,
      DifficultyCount: reviewCount,
      WorkloadCount: reviewCount,
      RatingAvg: reviewCount ? ratingTotal / reviewCount : 0,
      DifficultyAvg: reviewCount ? difficultyTotal / reviewCount : 0,
      WorkloadAvg: reviewCount ? workloadTotal / reviewCount : 0,
    });
  }

  private async getClassRef(target: ReviewAggregateTarget) {
    if (target.classId) {
      return doc(this.afs, 'Class', target.classId);
    }

    const classCollection = collection(this.afs, 'Class');
    const snapshot = await getDocs(
      query(classCollection, where('ClassName', '==', target.courseName), limit(1)),
    );

    const match = snapshot.docs[0];
    return match ? doc(this.afs, 'Class', match.id) : null;
  }
}
