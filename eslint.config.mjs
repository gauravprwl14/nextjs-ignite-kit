import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "pages_backup/**",
      "coverage/**",
    ],
  },
  ...nextVitals,
  ...nextTs,
];

export default eslintConfig;
