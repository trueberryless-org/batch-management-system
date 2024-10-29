import { useTranslations } from "next-intl";

import Hero from "@/components/hero";
import BreadcrumbContextSetter from "@/components/page-header/breadcrumb-context-setter";
import { BreadcrumbItemType } from "@/components/page-header/breadcrumb-navigator";

export default function Index() {
    const t = useTranslations("dashboard");

    const breadcrumbItems: BreadcrumbItemType[] = [{ name: t("title"), isLast: true }];

    return (
        <>
            <BreadcrumbContextSetter breadcrumbItems={breadcrumbItems} />
            <Hero />
        </>
    );
}
