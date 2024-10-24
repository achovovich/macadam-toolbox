"use client"

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link"

const links = [
    { href: '/project/newMoto', title: 'Moto' },
    { href: '/project/newMaro', title: 'Maroquinerie' },
    { href: '/project/newAmeublement', title: 'Ameublement' },
    { href: '/project/newDefault', title: 'Autre' },
];

export const NewProjectDispatcher = () => {

    return (
        <CardWrapper
            headerLabel="nouveau"
            headerTitle="Project"
            backButtonLabel="Accueil"
            backButtonHref="/"
        >
            <div>
                {links.map((link, index) => (
                    <Button asChild className="w-full block mb-2" key={index}>
                        <Link href={link.href} className="w-full block text-center">{link.title}</Link>
                    </Button>
                ))}
            </div>
        </CardWrapper >
    );
}