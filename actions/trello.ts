"use server";

import * as z from "zod";
import { NewProjectSchema } from "@/schemas";
import axios from "axios";

export const create = async (values: z.infer<typeof NewProjectSchema>) => {
    const validatedFields = NewProjectSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    try {
        console.log("Creating card in Trello...");

        const response = await axios.post(`https://api.trello.com/1/cards`, {
            key: process.env.REACT_APP_TRELLO_API_KEY,
            token: process.env.REACT_APP_TRELLO_TOKEN,
            idList: process.env.REACT_APP_TRELLO_LIST_DEVIS,
            name: values.titre,
            desc: values.description,
        });

        if (response.status === 200) {

            let cardId = response.data.id;

            const commentText = `## Telephone : ${values.mobile}\n## Email : ${values.email}\n`;
            const commentResponse = await axios.post(`https://api.trello.com/1/cards/${cardId}/actions/comments`, {

                key: process.env.REACT_APP_TRELLO_API_KEY,
                token: process.env.REACT_APP_TRELLO_TOKEN,
                text: commentText,
            });

            if (commentResponse.status === 200) {
                return {
                    success: "La carte a été créée avec succès dans Trello.",
                    link: `https://trello.com/c/${cardId}`,
                };

            }

            return {
                error: "Une erreur s'est produite lors de l'enregistrement des informations de contact.",
                link: `https://trello.com/c/${cardId}`
            }

        } else {
            return { error: "Une erreur s'est produite lors de la création de la carte." }
        }

    } catch (e) {
        return { error: `Une erreur s'est produite lors de la création de la carte : ${e.message}` }
    }
};