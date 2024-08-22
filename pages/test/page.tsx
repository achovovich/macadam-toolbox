'use client';
import { useState } from 'react';
import config from '../../utils/poll-config';
import { redirect } from 'next/navigation';
import { doc } from '../../services/google-spreadsheet';

import submitVote from './submit-vote';

interface PageProps {
    searchParams: {
        error?: string;
    } | null;
}

export default function Page({ searchParams }: PageProps) {

    const error = searchParams?.error;
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleClick(id: string) {

        // submitVote(id);

        if (!id) {
            redirect('/?error=true');
        }

        try {
            await doc.loadInfo();
            // const sheet = doc.sheetsByIndex[0];
            // const rows = await sheet.getRows();

            // rows[0].set(id, Number(rows[0].get(id)) + 1);
            // await rows[0].save();
        } catch (error) {
            console.error(error);
            redirect('/?error=true');
        }
        redirect('/results');

        setIsSubmitting(true);
    };

    return (
        <>
            <h1>Vote</h1>
            <ul>
                {config.map((item, index) => {
                    const { name, id } = item;

                    return (
                        <li key={index}>
                            <button onClick={() => handleClick(id)} disabled={isSubmitting}>
                                <span>{name}</span>
                            </button>
                        </li>
                    );
                })}

                {error ? <p>Server error</p> : null}
            </ul>
        </>
    );
}