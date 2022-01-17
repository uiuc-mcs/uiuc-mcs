import { User } from 'firebase/auth';

export interface FbUser extends User{
    firstName?: string,
    lastName?: string,
    firstSemester?: string,
    reviewFeedback?: {[key: string]: boolean}
}