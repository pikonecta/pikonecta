import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://8vzfl5om10.execute-api.us-west-2.amazonaws.com/test",
        changeOrigin: true,
        secure: false,
        rewrite: (thisPath) => thisPath.replace(/^\/api/, ""),
      },
    },
  },
});
