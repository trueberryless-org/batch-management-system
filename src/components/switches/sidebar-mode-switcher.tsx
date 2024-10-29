"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarMenuButton } from "../ui/sidebar";

export default function SidebarModeSwitcher() {
    const { setTheme } = useTheme();
    const t = useTranslations("header.modeSwitcher");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="sm" tooltip={t("label")}>
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span>{t("label")}</span>
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>{t("theme", { theme: "light" })}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>{t("theme", { theme: "dark" })}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    {t("theme", { theme: "system" })}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
