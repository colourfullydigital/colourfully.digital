module.exports = {
  extends: ["turbo", "prettier"],
  rules: {
    "react/jsx-key": "warn",
    "react/jsx-no-target-blank": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
