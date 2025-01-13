import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(1, {
        message: "password is required"
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(8, {
        message: "Minimum 8 characters required"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    })
});

export const NewProjectSchema = z.object({
    titre: z.string({ message: "Le titre est obligatoire" }),
    description: z.string().optional(),
    mobile: z.string().regex(/^\d+$/, { message: "Le téléphone est obligatoire" }),
    email: z.union([z.string().email({ message: "L'email doit être valide" }), z.literal('')]).optional(),
});