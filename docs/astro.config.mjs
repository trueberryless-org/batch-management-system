// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightSidebarTopicsDropdown from "starlight-sidebar-topics-dropdown";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Batch Management System Documentation",
      logo: {
        light: "./src/assets/logo-name.svg",
        dark: "./src/assets/logo-name-dark.svg",
        replacesTitle: true,
      },
      social: {
        github: "https://github.com/withastro/starlight",
      },
      plugins: [
        starlightSidebarTopicsDropdown([
          {
            label: "Schema",
            link: "/schema/overview",
            icon: "information",
            items: [{ label: "", autogenerate: { directory: "schema" } }],
          },
          {
            label: "API",
            link: "/api/overview",
            icon: "open-book",
            items: [{ label: "", autogenerate: { directory: "api" } }],
          },
        ]),
      ],
    }),
  ],
});
