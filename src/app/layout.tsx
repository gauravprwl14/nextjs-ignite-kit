import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header, Footer } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { COOKIE_NAMES, DEFAULT_LOCALE, SITE_METADATA, Locale } from "@/lib/constants";
import { isSupportedLocale } from "@/lib/i18n/config";
import { cookies } from "next/headers";

const geistSans = GeistSans;

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

/**
 * Global metadata configuration for the application.
 * Sourced from lib/constants.ts for easy management.
 */
export const metadata: Metadata = {
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
  const locale: Locale = localeValue && isSupportedLocale(localeValue) ? localeValue : DEFAULT_LOCALE;

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
