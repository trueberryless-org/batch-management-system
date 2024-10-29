"use client";

import { useEffect } from "react";

import { BreadcrumbItem, useBreadcrumb } from "@/components/page-header/breadcrumb-context";

export default function BreadcrumbContextSetter({ breadcrumbItems }: { breadcrumbItems: BreadcrumbItem[] }) {
    const { setBreadcrumbItems } = useBreadcrumb();

    useEffect(() => {
        setBreadcrumbItems(breadcrumbItems);
    }, [setBreadcrumbItems]);

    return null;
}
