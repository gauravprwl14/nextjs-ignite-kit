"use server";

import { z } from "zod";

const ContactFormSchema = z.object({
    email: z.string().email(),
    message: z.string().min(10),
});

export type ContactFormState = {
    success?: boolean;
    errors?: {
        email?: string[];
        message?: string[];
    };
    message?: string;
} | null;

export async function submitContact(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
    const validatedFields = ContactFormSchema.safeParse({
        email: formData.get("email"),
        message: formData.get("message"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to submit.",
        };
    }

    // Simulate delay and "sending"
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Contact Form Submitted:", validatedFields.data);

    return {
        success: true,
        message: "Thanks! I'll be in touch soon.",
    };
}
