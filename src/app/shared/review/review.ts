import { Timestamp } from '@angular/fire/firestore';

export interface SemesterYear {
  semester: string;
  year: number;
}

export interface Review {
  classId: string,
  classNumber: string,
  course: string,
  difficulty: number,
  rating: number,
  difficultyString: string,
  ratingString: string,
  helpfulNegative?: number,
  helpfulPositive?: number,
  lastUpdated: Timestamp,
  review: string,
  semyear: SemesterYear,
  year: number,
  semester: string,
  title: string,
  timestamp: Timestamp,
  workload: number,
  userId?: string,
  reviewId?: string,
  wilsonScore?: number,
}

export enum reviewFeedbackType {
  positive = "yes",
  negative = "no",
  undoFeedback = "",
}

export function courseRouterLink(review: Review): string {
  var ret = `/courses/${review.classNumber}-${review.course}`
  ret = ret.replace(/ /g, '-')
  return ret
}

function ratingNumToString(num: number): string {
  switch (num) {
    case 5: return 'Strongly Liked';
    case 4: return 'Liked';
    case 3: return 'Neutral';
    case 2: return 'Disliked';
    case 1: return 'Strongly Disliked';
  }
  // console.warn('bad rating number')
  return ''
}

function difficultyNumToString(num: number): string {
  switch (num) {
    case 5: return 'Very Hard';
    case 4: return 'Hard';
    case 3: return 'Medium';
    case 2: return 'Easy';
    case 1: return 'Very Easy';
  }
  // console.warn('bad difficulty number')
  return ''
}

export function ratingsToStrings(reviews: Review[]) {
  for (let rev of reviews) {
    rev.difficultyString = difficultyNumToString(rev.difficulty)
    rev.ratingString = ratingNumToString(rev.rating)
  }
  return reviews
}