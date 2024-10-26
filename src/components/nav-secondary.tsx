import { Link } from "@/i18n/routing";
import { type LucideIcon } from "lucide-react";
import * as React from "react";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import SidebarLanguageSwitcher from "./switches/sidebar-language-switcher";
import SidebarModeSwitcher from "./switches/sidebar-mode-switcher";
import SidebarThemeSwitcher from "./switches/sidebar-theme-switcher";

export function NavSecondary({ ...props }: {} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {/* {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))} */}
                    <SidebarMenuItem>
                        <SidebarLanguageSwitcher />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarThemeSwitcher />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarModeSwitcher />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
