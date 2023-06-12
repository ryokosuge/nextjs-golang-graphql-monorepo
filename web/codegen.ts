import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../schema/**/*.graphqls",
  generates: {
    "src/generated/gql/type.ts": {
      plugins: ["typescript"],
    },
  },
};

export default config;
