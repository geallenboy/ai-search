import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      // 关闭不允许使用 console 的规则
      "no-console": "off",
      "@next/next/no-html-link-for-pages": "off",
      // 允许使用 debugger
      "no-debugger": "off",

      // 关闭未使用变量的警告
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",

      // 允许 any 类型
      "@typescript-eslint/no-explicit-any": "off",

      // 不强制函数返回类型
      "@typescript-eslint/explicit-function-return-type": "off",

      // 关闭 import 顺序检查
      "import/order": "off",

      // 允许 JSX 写在 .js 或 .ts 文件中
      "react/jsx-filename-extension": "off",

      // 宽松的 React Hooks 依赖检查
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;
