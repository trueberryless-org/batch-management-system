"use client";

import { Link } from "@/i18n/routing";
import {
  ChevronRight,
  Croissant,
  Fingerprint,
  type LucideIcon,
  ScrollText,
  Wheat,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain() {
  const t = useTranslations("header.navigation");
  const pathname = usePathname();

  const items: {
    title: string;
    items: {
      title: string;
      url: string;
      icon: LucideIcon;
      isActive?: boolean;
      items?: {
        title: string;
        url: string;
      }[];
    }[];
  }[] = [
    {
      title: "General",
      items: [
        {
          title: t("recipes.title"),
          url: "/recipes",
          icon: ScrollText,
          isActive: pathname?.includes("recipes"),
          items: [
            {
              title: t("recipes.overview.title"),
              url: "/recipes",
            },
            {
              title: t("recipes.list.title"),
              url: "/recipes/list",
            },
            {
              title: t("recipes.create.title"),
              url: "/recipes/create",
            },
            {
              title: t("recipes.edit.title"),
              url: "/recipes/edit",
            },
          ],
        },
        {
          title: t("batches.title"),
          url: "/batches",
          icon: Fingerprint,
          isActive: pathname?.includes("batches"),
          items: [
            {
              title: t("batches.overview.title"),
              url: "/batches",
            },
            {
              title: t("batches.list.title"),
              url: "/batches/list",
            },
            {
              title: t("batches.create.title"),
              url: "/batches/create",
            },
            {
              title: t("batches.edit.title"),
              url: "/batches/edit",
            },
          ],
        },
      ],
    },
    {
      title: "Stammdaten",
      items: [
        {
          title: t("ingredients.title"),
          url: "/ingredients",
          icon: Wheat,
          isActive: pathname?.includes("ingredients"),
          items: [
            {
              title: t("ingredients.overview.title"),
              url: "/ingredients",
            },
            {
              title: t("ingredients.list.title"),
              url: "/ingredients/list",
            },
            {
              title: t("ingredients.create.title"),
              url: "/ingredients/create",
            },
            {
              title: t("ingredients.edit.title"),
              url: "/ingredients/edit",
            },
          ],
        },
        {
          title: t("products.title"),
          url: "/products",
          icon: Croissant,
          isActive: pathname?.includes("products"),
          items: [
            {
              title: t("products.overview.title"),
              url: "/products",
            },
            {
              title: t("products.list.title"),
              url: "/products/list",
            },
            {
              title: t("products.create.title"),
              url: "/products/create",
            },
            {
              title: t("products.edit.title"),
              url: "/products/edit",
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      {items.map((item) => (
        <SidebarGroup key={item.title}>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
          <SidebarMenu>
            {item.items.map((item) => (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
