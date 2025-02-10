'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import OptionsMoto from "@/components/project/optionsMoto";

const OptionsMotoPage = () => {
    const params = useParams();
    const { id } = params;

    const [cardId, setCardId] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            setCardId(id as string);
        }
    }, [id]);

    return (
        <>
        <p>{cardId}</p>
        <OptionsMoto />
        </>
    )
}

export default OptionsMotoPage;