import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "shadcn-layout": [
            "@/components/ui/accordion",
            "@/components/ui/avatar",
            "@/components/ui/badge",
            "@/components/ui/card",
            "@/components/ui/dialog",
            "@/components/ui/drawer",
            "@/components/ui/dropdown-menu",
          ],
          "shadcn-forms": [
            "@/components/ui/input",
            "@/components/ui/checkbox",
            "@/components/ui/button",
            "@/components/ui/label",
            "@/components/ui/tabs",
          ],
          "shadcn-chart": ["@/components/ui/chart"],
          "shadcn-other": [
            "@/components/ui/pagination",
            "@/components/ui/scroll-area",
            "@/components/ui/skeleton",
            "@/components/ui/sonner",
            "@/components/ui/table",
          ],
        },
      },
    },
  },
});
