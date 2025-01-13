"use client"

import { CardWrapper } from "@/components/auth/card-wrapper";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NewProjectSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { create } from "@/actions/trello";
import { useTransition, useState } from "react";


export const NewMoto = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewProjectSchema>>({
        resolver: zodResolver(NewProjectSchema),
        defaultValues: {
            titre: "",
            description: "",
            mobile: "",
            email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof NewProjectSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            create(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.link);
                })
        })

    }

    return (
        <CardWrapper
            headerLabel="Creation du projet"
            headerTitle="Selle Moto"
            backButtonLabel=""
            backButtonHref="/project/new"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="titre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="titre">Titre</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            {...Input}
                                            disabled={isPending}
                                            id="titre"
                                            type="titre"
                                            placeholder="">

                                        </Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                        </FormField>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="description">Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            {...Input}
                                            disabled={isPending}
                                            id="description"
                                            type="description"
                                            placeholder="">

                                        </Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                        </FormField>
                        <FormField
                            control={form.control}
                            name="mobile"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="mobile">Numéro de téléphone</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            {...Input}
                                            disabled={isPending}
                                            id="mobile"
                                            type="mobile"
                                            placeholder="">

                                        </Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                        </FormField>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            {...Input}
                                            disabled={isPending}
                                            id="email"
                                            type="email"
                                            placeholder="">

                                        </Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                        </FormField>
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Creer
                    </Button>
                </form>


            </Form>
        </CardWrapper >
    );
}