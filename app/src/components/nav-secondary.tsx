import * as React from "react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import SidebarLanguageSwitcher from "./switches/sidebar-language-switcher";
import SidebarModeSwitcher from "./switches/sidebar-mode-switcher";
import SidebarThemeSwitcher from "./switches/sidebar-theme-switcher";

export function NavSecondary({
  ...props
}: {} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarLanguageSwitcher />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarModeSwitcher />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarThemeSwitcher />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
