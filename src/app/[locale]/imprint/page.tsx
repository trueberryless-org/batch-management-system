import { useTranslations } from "next-intl";

import NextLogo from "@/components/next-logo";
import BreadcrumbContextSetter from "@/components/page-header/breadcrumb-context-setter";
import { BreadcrumbItemType } from "@/components/page-header/breadcrumb-navigator";
import SupabaseLogo from "@/components/supabase-logo";

export default function Imprint() {
  const t = useTranslations("legalMatters.imprint");
  const tParent = useTranslations("legalMatters");

  const breadcrumbItems: BreadcrumbItemType[] = [
    { name: tParent("title"), isLast: false },
    { name: t("title"), isLast: true },
  ];

  return (
    <>
      <BreadcrumbContextSetter breadcrumbItems={breadcrumbItems} />
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
    </>
  );
}
