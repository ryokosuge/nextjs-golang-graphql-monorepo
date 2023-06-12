import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../schema/**/*.graphqls",
  generates: {
    "src/generated/gql/type.ts": {
      plugins: ["typescript"],
    },
    "src/": {
      documents: "src/**/*.graphqls",
      preset: "near-operation-file-preset",
      presetConfig: {
        extention: ".generated.ts",
        baseTypesPath: "generated/gql/type.ts",
      },
      plugins: ["typescript-operations", "typescript-graphql-request"],
    },
  },
};

export default config;
