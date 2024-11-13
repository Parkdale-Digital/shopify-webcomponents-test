import shopify from "vite-plugin-shopify";
import cleanup from '@by-association-only/vite-plugin-shopify-clean';
  import copy from 'rollup-plugin-copy';

export default {
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    emptyOutDir: false,
  },
  css: {
    devSourcemap: true,
  },
  plugins: [
    cleanup(),
    shopify({ versionNumbers: true }),
    copy({
      targets: [
        { src: 'frontend/web/**/sections/*.liquid', dest: 'sections' },
        { src: 'frontend/web/**/snippets/*.liquid', dest: 'snippets' },
      ],
      hook: 'writeBundle', // Use writeBundle hook to ensure files are copied after Vite build
      verbose: true,
    }),
  ],
};
