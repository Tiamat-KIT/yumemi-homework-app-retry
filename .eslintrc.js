// @ts-check
/**@typedef {import("eslint").ESLint.ConfigData} ConfigData*/
/**@type {ConfigData} */
module.exports = {
    root: true,
    extends: ["plugin:@typescript-eslint/recommended","next/core-web-vitals","prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
    plugins: ["unused-imports"],
    rules: {
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unsafe-call": "error",
        "@typescript-eslint/no-unsafe-member-access": "error",
        "@typescript-eslint/no-unsafe-return": "error",
        "unused-imports/no-unused-imports-ts": "warn",
        "import/order": [
            "error",
            {
                groups: ["builtin","external","internal","parent","sibling","index","object","type"],
                pathGroups: [
                    {
                    pattern: "{react,react-dom/**,react-router-dom}",
                    group: "builtin",
                    position: "before",
                    },
                ],
                pathGroupsExcludedImportTypes: ["builtin"],
                alphabetize: {
                    order: "asc",
                },
            },
        ],
    },
    ignorePatterns: ["node_modules/",".next/","out/","public/",".eslintrc.js","prettier.config.js","next.config.js",".gitignore",".gitattributes",".gitmodules",".gitkeep",".git"],
}