import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-duplicate-imports": "error", // 중복된 import 경고
      "no-console": "warn", // console.log() 경고
      "no-unused-vars": "warn", // 사용하지않는 변수 경고
      "@typescript-eslint/no-unused-vars": "warn", // 타입스크립트 사용하지않는 변수 경고
      "react/react-in-jsx-scope": "off", // jsx를 사용하려면 import React from 'react'가 필요하다는 경고를 끔
      "react/self-closing-comp": "warn", // 태그가 닫히지 않은 경우에 대한 경고
      "react/no-direct-mutation-state": "error", // state 직접변경 에러
      "react/jsx-no-useless-fragment": "warn", // 불필요한 fragment 경고
      "react/jsx-curly-brace-presence": "warn", // jsx 내 불필요한 중괄호 경고
    },
  }
);
