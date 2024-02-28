import esbuildServe from "esbuild-serve";
import inlineImage from "esbuild-plugin-inline-image";

esbuildServe(
    {
        logLevel: "info",
        entryPoints: ["src/main.ts"],
        bundle: true,
        sourcemap: true,
        define: {
            'process.env.RELEASE': false,
            'process.env.DEBUG': true,
        },
        minify: false,
        outfile: "public/bundle.min.js",
        plugins: [ inlineImage() ]
    },
    { root: "public", port: 8080 },
);