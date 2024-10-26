"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { BreadcrumbItem, useBreadcrumb } from "@/components/page-header/breadcrumb-context";

export default function Page() {
    const [ingredients, setIngredients] = useState<any[] | null>(null);
    const t = useTranslations("ingredients");

    const { setBreadcrumbItems } = useBreadcrumb();

    useEffect(() => {
        const items: BreadcrumbItem[] = [{ name: t("title"), isLast: true }];
        setBreadcrumbItems(items);
    }, [setBreadcrumbItems]);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch("/api/ingredients");
            const data = await response.json();
            setIngredients(data);
        };
        getData();
    }, []);

    return <pre>{JSON.stringify(ingredients, null, 2)}</pre>;
}
