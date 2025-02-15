import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: "https://www.ultrusmods.me",
  image: {
    domains: [
      "cdn.modrinth.com",
      "media.forgecdn.net"
    ]
  },
  markdown: {
    shikiConfig: {
      theme: "dracula",
      langs: ["json"]
    }
  }
});
