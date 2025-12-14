"use client";

import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContact } from "../actions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";

const formSchema = z.object({
    email: z.string().email(),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export function ContactSection() {
    const [state, formAction] = useFormState(submitContact, null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            message: "",
        },
    });

    return (
        <Section id="contact">
            <Container className="max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold font-heading mb-4">Get in Touch</h2>
                    <p className="text-muted-foreground">
                        Interested in working together? Drop me a line.
                    </p>
                </motion.div>

                <Form {...form}>
                    <form action={formAction} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="hello@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Tell me about your project..." className="min-h-[150px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {state?.message && (
                            <p className={state.success ? "text-green-500" : "text-destructive"}>
                                {state.message}
                            </p>
                        )}
                        <Button type="submit" className="w-full" size="lg">Send Message</Button>
                    </form>
                </Form>
            </Container>
        </Section>
    );
}
