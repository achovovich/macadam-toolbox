"use client"

import { CardWrapper } from "@/components/auth/card-wrapper";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        console.log(values)
    }

    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocials
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
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
                                            id="email"
                                            type="email"
                                            placeholder="john.doe@email.com">

                                        </Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                        </FormField>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            {...Input}
                                            id="password"
                                            type="password"
                                            placeholder="12346">

                                        </Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                        </FormField>
                    </div>
                    <FormError message="" />
                    <FormSuccess message="" />
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>


            </Form>
        </CardWrapper >
    );
}