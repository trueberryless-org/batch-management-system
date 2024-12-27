import "../globals.css";
import clsx from "clsx";
import { GeistSans } from "geist/font/sans";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";

import { BreadcrumbProvider } from "@/components/page-header/breadcrumb-context";
import Header from "@/components/page-header/header";
import { AppSidebar } from "@/components/sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Batch Management System",
  description:
    "Manage incoming and outgoing batches with ease. Developed for Richter Glutenfreie Backwaren.",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={clsx(GeistSans.className, "h-full")}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground h-full relative">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SidebarProvider>
              <BreadcrumbProvider>
                <AppSidebar />
                <SidebarInset>
                  <Header />
                  {children}
                </SidebarInset>
              </BreadcrumbProvider>
            </SidebarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
