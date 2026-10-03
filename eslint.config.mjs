import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // โฟลเดอร์ build สำรองจากการ audit — เป็นโค้ดที่ถูก compile แล้ว ไม่ใช่ซอร์ส
    ".next-audit/**",
  ]),
]);

export default eslintConfig;
