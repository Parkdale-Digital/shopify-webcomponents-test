import shopify from "vite-plugin-shopify";
import globs from "rollup-plugin-globlin";
import cleanup from "@by-association-only/vite-plugin-shopify-clean";

export default {
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  plugins: [
    cleanup(),
    shopify({ versionNumbers: true }),
    globs.default({
      globs: ["frontend/web/**/sections/*.liquid"],
      dest: "sections",
      clean: false,
    }),
    globs.default({
      globs: ["frontend/web/**/snippets/*.liquid"],
      dest: "snippets",
      clean: false,
    }),
    globs.default({
      globs: ["frontend/web/**/scripts/*.js"],
      dest: "assets",
      clean: false,
    }),
    globs.default({
      globs: ["frontend/web/**/styles/*.scss"],
      dest: "assets",
      clean: false,
    }),
  ],
};
