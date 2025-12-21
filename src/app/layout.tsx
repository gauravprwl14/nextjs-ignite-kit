import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header, Footer } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/components/providers/I18nProvider";
import {
  COOKIE_NAMES,
  DEFAULT_LOCALE,
  SITE_METADATA,
  Locale,
} from "@/lib/constants";
import { isSupportedLocale } from "@/lib/i18n/config";
import { cookies } from "next/headers";

const geistSans = GeistSans;

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

/**
 * Get the base URL for metadata resolution.
 *
 * @description Determines the base URL for resolving relative image URLs in metadata.
 * Priority order:
 * 1. NEXT_PUBLIC_SITE_URL environment variable (if set)
 * 2. VERCEL_URL (automatically set by Vercel)
 * 3. Production URL from constants
 * 4. Localhost for development
 *
 * @returns {URL} The base URL for the application
 */
function getMetadataBase(): URL {
  // Check for explicit site URL environment variable
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  }

  // Use Vercel URL if available (includes protocol)
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }

  // Use production URL from constants
  if (process.env.NODE_ENV === "production") {
    return new URL(SITE_METADATA.url);
  }

  // Default to localhost for development
  return new URL("http://localhost:3000");
}

/**
 * Global metadata configuration for the application.
 * Sourced from lib/constants.ts for easy management.
 *
 * @description Sets up SEO metadata including Open Graph and Twitter card images.
 * The metadataBase is used to resolve relative URLs for social media images.
 * It automatically adapts to the environment (development, staging, production).
 */
export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
};

/**
 * Root Layout component that provides global context providers and theme support.
 *
 * @param children - The page content to be rendered within the layout.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Retrieve the locale from cookies for server-side consistency
  const cookieStore = await cookies();
  const localeValue = cookieStore.get(COOKIE_NAMES.LOCALE)?.value;
  const locale: Locale =
    localeValue && isSupportedLocale(localeValue)
      ? localeValue
      : DEFAULT_LOCALE;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          spaceGrotesk.variable,
          "antialiased bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground"
        )}
        suppressHydrationWarning
      >
        <I18nProvider initialLocale={locale}>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
