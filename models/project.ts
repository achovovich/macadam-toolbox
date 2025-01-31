import { ObjectId, Db, Collection, MongoClient } from 'mongodb';
import clientPromise from "@/lib/mongodb";
import { Project } from "@/interfaces/project";
import { InsertResult } from "@/interfaces/insertResult";

const dbName = process.env.MONGODB_DB;
const collectionName = process.env.MONGODB_COLLECTION_PROJECTS || 'defaultCollectionName';

const getProjectCollection = async (): Promise<Collection<Project>> => {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db(dbName);
    return db.collection<Project>(collectionName);
};

export const createProject = async (project: Project): Promise<InsertResult> => {

    const collection = await getProjectCollection();

    // Vérification de la connexion et de la collection
    if (!collection) {
        throw new Error("Failed to get the collection. Connection might not be established.");
    }
    console.log("Connection to MongoDB established and collection accessed.");

    const result = await collection.insertOne({
        ...project,
        createdAt: new Date(),
    });

    return result;
};

export const getProjectById = async (id: string): Promise<Project | null> => {
    const collection = await getProjectCollection();

    const project = await collection.findOne({ _id: new ObjectId(id) });

    return project ? (project as Project) : null;
};
