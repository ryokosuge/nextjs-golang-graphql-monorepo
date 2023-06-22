import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../schema/**/*.graphqls",
  generates: {
    "src/graphql/type.ts": {
      plugins: ["typescript"],
    },
    "src/": {
      documents: "src/**/*.graphql",
      preset: "near-operation-file-preset",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "graphql/type.ts",
      },
      plugins: ["typescript-operations", "typescript-graphql-request"],
    },
  },
  hooks: { afterAllFileWrite: ["prettier --write"] },
};

export default config;
