"use client";

import { routing } from "@/i18n/routing";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import * as React from "react";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarMenuButton } from "../ui/sidebar";

export default function SidebarLanguageSwitcher() {
  const t = useTranslations("header.localeSwitcher");
  const locale = useLocale();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(nextLocale: Locale) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size="sm" tooltip={t("label")}>
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span>{t("label")}</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="end" defaultValue={locale}>
        {routing.locales.map((cur) => (
          <DropdownMenuItem
            onClick={() => onSelectChange(cur)}
            key={cur}
            disabled={isPending}
          >
            {t("locale", { locale: cur })}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
