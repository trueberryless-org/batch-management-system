"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

import NextLogo from "@/components/next-logo";
import { BreadcrumbItem, useBreadcrumb } from "@/components/page-header/breadcrumb-context";
import SupabaseLogo from "@/components/supabase-logo";

export default function Imprint() {
    const t = useTranslations("legalMatters");
    const { setBreadcrumbItems } = useBreadcrumb();

    useEffect(() => {
        const items: BreadcrumbItem[] = [
            { name: t("title"), isLast: false },
            { name: t("imprint.title"), isLast: true },
        ];
        setBreadcrumbItems(items);
    }, [setBreadcrumbItems]);

    return (
        <div className="flex flex-col gap-16 items-center justify-center h-full">
            <div className="flex gap-8 justify-center items-center">
                <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    rel="noreferrer"
                >
                    <SupabaseLogo />
                </a>
                <span className="border-l rotate-45 h-6" />
                <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
                    <NextLogo />
                </a>
            </div>
        </div>
    );
}
