"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import BreadcrumbContextSetter from "@/components/page-header/breadcrumb-context-setter";
import { BreadcrumbItemType } from "@/components/page-header/breadcrumb-navigator";

export default function Page() {
  const [ingredients, setIngredients] = useState<any[] | null>(null);
  const t = useTranslations("ingredients");

  const breadcrumbItems: BreadcrumbItemType[] = [
    { name: t("title"), isLast: true },
  ];

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/ingredients");
      const data = await response.json();
      setIngredients(data);
    };
    getData();
  }, []);

  return (
    <>
      <BreadcrumbContextSetter breadcrumbItems={breadcrumbItems} />
      <pre>{JSON.stringify(ingredients, null, 2)}</pre>
    </>
  );
}
