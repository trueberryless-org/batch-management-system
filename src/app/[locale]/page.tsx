"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

import Hero from "@/components/hero";
import { BreadcrumbItem, useBreadcrumb } from "@/components/page-header/breadcrumb-context";

export default function Index() {
    const t = useTranslations("dashboard");
    const { setBreadcrumbItems } = useBreadcrumb();

    useEffect(() => {
        const items: BreadcrumbItem[] = [{ name: t("title"), isLast: true }];
        setBreadcrumbItems(items);
    }, [setBreadcrumbItems]);

    return (
        <>
            <Hero />
        </>
    );
}
