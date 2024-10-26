"use client";

import { Fragment, Suspense } from "react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Skeleton } from "../ui/skeleton";
import { useBreadcrumb } from "./breadcrumb-context";

export default function AppBreadcrumbNavigator() {
    const { breadcrumbItems } = useBreadcrumb();

    return (
        <Suspense fallback={<Skeleton className="h-4 w-[200px]" />}>
            {breadcrumbItems.length === 0 ? (
                <Breadcrumb>
                    <BreadcrumbList>
                        <Skeleton className="hidden md:block h-4 w-[150px]" />
                        <BreadcrumbSeparator className="hidden md:block" />
                        <Skeleton className="h-4 w-[100px]" />
                    </BreadcrumbList>
                </Breadcrumb>
            ) : (
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbItems.map((item) => (
                            <Fragment key={item.name}>
                                <BreadcrumbItem className={item.isLast ? "hidden md:block" : ""}>
                                    {!item.isLast ? (
                                        item.href ? (
                                            <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
                                        ) : (
                                            item.name
                                        )
                                    ) : (
                                        <BreadcrumbPage>{item.name}</BreadcrumbPage>
                                    )}
                                </BreadcrumbItem>
                                {!item.isLast && <BreadcrumbSeparator className="hidden md:block" />}
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            )}
        </Suspense>
    );
}
