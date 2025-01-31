export interface Project {
    cardId: string;
    title: string;
    description?: string;
    mobile: string;
    email?: string;
    createdAt?: Date;
    [key: string]: any;
}