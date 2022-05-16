import fs from "fs/promises";

export function jsxSyntaxInJsFiles() {
  return {
    name: "load-js-files-as-jsx",
    setup(build) {
      build.onLoad({ filter: /.*\.js?$/ }, async (args) => ({
        loader: "jsx",
        contents: await fs.readFile(args.path, "utf8"),
      }));
    },
  };
}
