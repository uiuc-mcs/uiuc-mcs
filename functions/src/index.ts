import * as functions from "firebase-functions";
import admin = require("firebase-admin");
admin.initializeApp();

// const db = admin.firestore();
const fruitTrigger = functions.firestore.document("Reviews/{id}");

export const onUpdate = fruitTrigger.onUpdate((_doc, context) =>
  updateCount(context.eventId, +1)
);

export const onCreate = fruitTrigger.onCreate((_doc, context) =>
  updateCount(context.eventId, +1)
);

export const onDelete = fruitTrigger.onDelete((_doc, context) =>
  updateCount(context.eventId, -1)
);

/**
 * Test
 * @event
 * @delta
 */
async function updateCount(eventId: string, delta: number) {
  try {
    console.log("here");
  } catch (error) {
    console.log(error);
  }
}
