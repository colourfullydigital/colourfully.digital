module.exports = {
  extends: ["next/core-web-vitals", "turbo", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "warn",
    "react/jsx-no-target-blank": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
