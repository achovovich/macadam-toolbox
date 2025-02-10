"use server";

import * as z from "zod";
import { NewProjectSchema } from "@/schemas";
import axios from "axios";
import { randomInt } from "crypto";
import { Project } from "@/interfaces/project";
import { InsertResult } from "@/interfaces/insertResult";
import { createProject } from "@/models/project";
import clientPromise, { closeClient } from '../lib/mongodb';

export const create = async (values: z.infer<typeof NewProjectSchema>) => {
    const validatedFields = NewProjectSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    let client;

    try {
        client = await clientPromise;

        const response = await axios.post(`https://api.trello.com/1/cards`, {
            key: process.env.REACT_APP_TRELLO_API_KEY,
            token: process.env.REACT_APP_TRELLO_TOKEN,
            idList: process.env.REACT_APP_TRELLO_LIST_DEVIS,
            name: values.titre,
            desc: values.description,
        });

        if (response.status === 200) {

            let cardId = response.data.id;

            const insertResult: InsertResult = await createProject({
                cardId: cardId,
                title: values.titre,
                description: values.description,
                mobile: values.mobile,
                email: values.email,
            });

            if (!insertResult.acknowledged) {
                return { error: "Failed to insert data into MongoDB" };
            }
            const linkToConfig = `${process.env.NEXT_PUBLIC_APP_URL_BASE}${process.env.NEXT_PUBLIC_APP_URL_MOTO_CONFIG}/${cardId}`;
            let commentText = `## Telephone : ${values.mobile}\n`;
            if (values.email != '') {
                commentText += `## Email : ${values.email}\n`;
            }
            commentText += `Configurateur : ${linkToConfig}\n`;
            const commentResponse = await axios.post(`https://api.trello.com/1/cards/${cardId}/actions/comments`, {

                key: process.env.REACT_APP_TRELLO_API_KEY,
                token: process.env.REACT_APP_TRELLO_TOKEN,
                text: commentText,
            });

            if (commentResponse.status === 200) {

                return {
                    success: "La carte a été créée avec succès dans Trello.",
                    link: cardId,
                };

            }

            return {
                error: "Une erreur s'est produite lors de l'enregistrement des informations de contact.",
                link: cardId
            }

        } else {
            return { error: "Une erreur s'est produite lors de la création de la carte." }
        }

    } catch (e) {
        return { error: `Une erreur s'est produite lors de la création de la carte : ${e.message}` }

    } finally {
        // await closeClient();
    }
};