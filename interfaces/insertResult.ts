import { ObjectId } from 'mongodb';

export interface InsertResult {
    acknowledged: boolean;
    insertedId: ObjectId;
}