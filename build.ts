import esbuild from "esbuild";
import esbuildPluginTsc from "esbuild-plugin-tsc";

esbuild
  .build({
    entryPoints: ["./src/bin/www.ts"],
    bundle: true,
    platform: "node",
    target: "node14", // Choose a suitable target
    outfile: "./src/dist/server.js", // Output file
    plugins: [esbuildPluginTsc()], // Use the TypeScript esbuild plugin
  })
  .catch(() => process.exit(1));
