"use client"

import { CardWrapper } from "@/components/card-wrapper";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { CreateCardSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";
import { useTransition, useState } from "react";


export const CreateForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CreateCardSchema>>({
        resolver: zodResolver(CreateCardSchema),
        defaultValues: {
            name: "",
            description: "",
            category:""
        },
    });

    const onSubmit = (values: z.infer<typeof CreateCardSchema>) => {
        setError("")
        setSuccess("")
        console.log(values)
        // startTransition(() => {
        //     register(values)
        //         .then((data) => {
        //             setError(data.error);
        //             setSuccess(data.success);
        //         })
        // })
        
    }

    return (
        <CardWrapper
            headerTitle="Trello"
            headerLabel="Creer une carte"
            backButtonLabel=""
            backButtonHref=""
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                    <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            {...Input}
                                            disabled={isPending}
                                            id="name">
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
                                        <Textarea
                                            {...field}
                                            {...Input}
                                            disabled={isPending}
                                            id="description"
                                            >
                                        </Textarea>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                        </FormField>
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="category">Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="null">Aucune</SelectItem>
                                        <SelectItem value="moto">Moto</SelectItem>
                                        <SelectItem value="auto">Auto</SelectItem>
                                        <SelectItem value="ameublement">Ameublement</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}>
                        </FormField>
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Create
                    </Button>
                </form>


            </Form>
        </CardWrapper >
    );
}