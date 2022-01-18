import { Injectable, NgZone } from '@angular/core';
import {
    Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail, signInWithEmailAndPassword, signOut,
    updateCurrentUser, updateProfile
} from '@angular/fire/auth';

import { Firestore, doc, getDoc, enableIndexedDbPersistence, increment, setDoc, 
    updateDoc
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { reviewFeedbackType } from 'src/app/shared/review/review';
import { FbUser } from '../../shared/user/user'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _userData: ReplaySubject<FbUser|undefined> = new ReplaySubject(1)
    public userData: Observable<FbUser|undefined> = this._userData.asObservable()
    private _isLoggedIn: ReplaySubject<boolean> = new ReplaySubject(1)
    public isLoggedIn: Observable<boolean> = this._isLoggedIn.asObservable()
    private _isVerified: ReplaySubject<boolean> = new ReplaySubject(1)
    public isVerified: Observable<boolean> = this._isVerified.asObservable()
    private readonly auth: Auth

    constructor(
        private afs: Firestore,
        public router: Router,
        public ngZone: NgZone,
    ) {
        this.auth = getAuth()
        enableIndexedDbPersistence(this.afs).catch((err: any) => {
            if (err.code == 'failed-precondition') {
                console.error("Persistence failed to enable, error:", err)
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
            } else if (err.code == 'unimplemented') {
                console.error("Persistence failed to enable, error:", err)
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
        });

        let localData = localStorage.getItem('user')
        if (localData != 'null' && localData) {
            this._isLoggedIn.next(true)
            let parsedData = JSON.parse(localData)
            this._userData.next(parsedData)
            this._isVerified.next(parsedData.emailVerified)
        }

        onAuthStateChanged(this.auth, user => {
            if (user) {
                this.setUserData(user as FbUser)
                this._isLoggedIn.next(true)
                this._isVerified.next(user.emailVerified)
            } else {
                this._isLoggedIn.next(false)
                this._isVerified.next(false)
                this._userData.next(undefined)
                localStorage.setItem('user', JSON.stringify(null))
            }
        })
    }

    async setUserData(user: FbUser | null) {
        if (!user) {
            localStorage.setItem('user', JSON.stringify(null))
            return
        }
        const docRef = doc(this.afs, "UserExtraData", user?.uid as string)
        const docSnap = await getDoc(docRef)

        const data: FbUser = docSnap.data() as FbUser
        user.firstSemester = data?.firstSemester
        user.firstName = data?.firstName
        user.lastName = data?.lastName
        user.reviewFeedback = data?.reviewFeedback
        localStorage.setItem('user', JSON.stringify(user))
        this._userData.next(user)
    }

    async signIn(email: string, password: string) {
        const result = (await signInWithEmailAndPassword(this.auth, email, password));

        this.ngZone.run(() => {
            this.router.navigate([''])
        })
        this.setUserData(result.user as FbUser)
    }

    signUp(email: string, password: string, firstName: string, lastName: string, firstSemester: string) {
        return createUserWithEmailAndPassword(this.auth, email, password)
            .then(async (userCredential) => {
                var cred_user = userCredential.user as FbUser
                this.setUserData(cred_user)
                sendEmailVerification(cred_user)
                updateProfile(cred_user,
                    { displayName: `${firstName} ${lastName}` })
                const docRef = doc(this.afs, "UserExtraData", userCredential.user?.uid as string)
                await setDoc(docRef,
                    {
                        uid: userCredential.user?.uid,
                        firstSemester: firstSemester,
                        firstName: firstName,
                        lastName: lastName,
                        reviewFeedback: {}
                    }
                )
                this.router.navigate(['verifyEmail'])
            })
    }

    logout() {
        return signOut(this.auth).then(() => {
            this.setUserData(null)
            this._isLoggedIn.next(false)
            this._userData.next(undefined)
        }).then(_ => {
            this.router.navigate(['logout'])
        }).catch((error) => { console.error("Auth: logout - ", error) })
    }

    forgotPassword(email: string) {
        return sendPasswordResetEmail(this.auth, email)
            .then(_ => {
                window.alert('Password reset email has been sent. Check your email inbox to proceed.')
                this.router.navigate(['login'])
            }).catch(error => { window.alert(error) })
    }

    async updateUserExtraData(firstName: string, lastName: string, firstSemester: string) {
        await updateCurrentUser(this.auth, this.auth.currentUser)
        var loc_user = this.auth.currentUser as FbUser
        if (loc_user) {
            const displayName = `${firstName} ${lastName}`
            updateProfile(loc_user, { displayName: displayName })
            const docRef = doc(this.afs, "UserExtraData", loc_user.uid as string)
            await updateDoc(docRef, {
                firstSemester: firstSemester,
                firstName: firstName,
                lastName: lastName
            })
            this.setUserData(loc_user)
            this.router.navigate(['settings'])
        }
        return
    }

    async resendVerification() {
        await updateCurrentUser(this.auth, this.auth.currentUser)
        if (this.auth.currentUser) {
            sendEmailVerification(this.auth.currentUser)
        }
    }

    async setReviewFeedback(reviewId: string, vote: reviewFeedbackType): Promise<boolean> {
        function undoOldVote(oldVote: boolean, helpful: { positive: number, negative: number }): { positive: number, negative: number } {
            if (oldVote === true) helpful.positive -= 1
            else if (oldVote === false) helpful.negative -= 1
            return helpful
        }
        await updateCurrentUser(this.auth, this.auth.currentUser)
        var user = this.auth.currentUser as FbUser
        if (user) {
            if (!user || !user?.emailVerified) return false
            if (!user.reviewFeedback) user.reviewFeedback = {}

            let helpful = { positive: 0, negative: 0 }
            let oldVal = (reviewId in user.reviewFeedback) ? user.reviewFeedback[reviewId] : undefined
            if (oldVal != undefined) helpful = undoOldVote(oldVal, helpful)
            if (vote === reviewFeedbackType.positive) {
                helpful.positive += 1
                user.reviewFeedback[reviewId] = true
            } else if (vote === reviewFeedbackType.negative) {
                helpful.negative += 1
                user.reviewFeedback[reviewId] = false
            } else {
                delete user.reviewFeedback[reviewId]
            }
            const docRef = doc(this.afs, "UserExtraData", user?.uid as string)
            await updateDoc(docRef, { reviewFeedback: user.reviewFeedback })
            const ref = doc(this.afs, "Reviews", reviewId as string)
            const rev = await updateDoc(ref,
                {
                    'helpfulPositive': increment(helpful.positive),
                    'helpfulNegative': increment(helpful.negative),
                })
            return true
        }
        return false
    }
}
