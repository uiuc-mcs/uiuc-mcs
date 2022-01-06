import * as functions from "firebase-functions";
import { Change, EventContext } from "firebase-functions";

import * as admin from "firebase-admin";
import { firestore } from "firebase-admin";

admin.initializeApp();
// const db = admin.database();
const classes = admin.firestore().collection('Class');

function intersect(a: string[], b: string[]): string[] {
  var setB = new Set(b);
  return [...new Set(a)].filter(x => setB.has(x));
}

const countsMap: any = {
//   bookUsefulness: 'BookUsefulnessCount',
  difficulty: 'DifficultyCount',
//   lectureQuality: 'LectureQualityCount',
//   piazzaCommunity: 'PiazzaCommunityCount',
//   professorQuality: 'ProfessorQualityCount',
  rating: 'RatingCount',
  workload: 'WorkloadCount',
}

const avgMap: any = {
//   bookUsefulness: 'BookUsefulnessAvg',
  difficulty: 'DifficultyAvg',
//   lectureQuality: 'LectureQualityAvg',
//   piazzaCommunity: 'PiazzaCommunityAvg',
//   professorQuality: 'ProfessorQualityAvg',
  rating: 'RatingAvg',
  workload: 'WorkloadAvg',
}

/**
 * Test
 * @event
 * @delta
 */
async function updateCounts(doc: firestore.DocumentReference,
  data: any, changeData: any, delta: number) {
  const reviewKeys: string[] = Object.keys(data)
  const updatedKeys: string[] = intersect(reviewKeys, Object.keys(countsMap));
  const snap = await doc.get()

  console.log(`reviewKeys: ${reviewKeys}`)
  var obj: any = {}
  for (const key of updatedKeys) {
    if (delta != 0) { // create or delete a review
      obj[countsMap[key]] = firestore.FieldValue.increment(delta);

      const oldCount = snap.get(countsMap[key])
      const newCount = oldCount + delta
      var newAvg = 0
      if (newCount > 0) {
        const oldAvg = snap.get(avgMap[key])
        newAvg = ((oldCount * oldAvg) + (delta * data[key])) / newCount
      }
      obj[avgMap[key]] = newAvg
    } else { // just updating our average ratings
      const count = snap.get(countsMap[key])
      const avg = snap.get(avgMap[key])
      const oldReviewAvg = data[key]
      const newReviewAvg = changeData[key]
      console.log(`oldReviewAvg: ${oldReviewAvg} newReviewAvg: ${newReviewAvg}`)
      newAvg = (count * avg - oldReviewAvg + newReviewAvg) / count
      obj[avgMap[key]] = newAvg
    }
  }
  console.log(`updatedKeys: ${updatedKeys}`)
  console.log(`obj: ${JSON.stringify(obj)}`)
  await doc.set(obj, { merge: true });
}

export const documentWriteListener = functions.firestore
  .document('Reviews/{id}')
  .onWrite(async (change: Change<firestore.DocumentSnapshot>,
    context: EventContext) => {
    try {
      if (!change.before.exists) { // new
        const doc = classes.doc(change.after.data()?.classId)
        updateCounts(doc, change.after.data(), {}, +1)
      } else if (change.before.exists && change.after.exists) { // update
        const doc = classes.doc(change.after.data()?.classId)
        updateCounts(doc, change.before.data(), change.after.data(), +0)
      } else if (!change.after.exists) { // delete
        const doc = classes.doc(change.before.data()?.classId)
        updateCounts(doc, change.before.data(), {}, -1)
      } else { // should never be here
        console.log(`in documentWriteListener, change: ${change}`);
      }
    } catch (error) {
      console.log(error);
    }
  });
