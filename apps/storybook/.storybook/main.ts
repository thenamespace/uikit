// .storybook/main.ts
import tsconfigPaths from "vite-tsconfig-paths";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: { name: "@storybook/react-vite", options: {} },
  stories: ["../src/stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
  core: { disableTelemetry: true },
  typescript: { reactDocgen: false },
  viteFinal: async viteConfig => {
    viteConfig.plugins = [...(viteConfig.plugins || []), tsconfigPaths()];
    viteConfig.optimizeDeps = {
      ...viteConfig.optimizeDeps,
      exclude: [
        ...(viteConfig.optimizeDeps?.exclude ?? []),
        "@thenamespace/ens-components",
      ],
    };
    return viteConfig;
  },
};
export default config;
