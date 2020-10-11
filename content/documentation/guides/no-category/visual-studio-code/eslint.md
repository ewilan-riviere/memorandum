# ESLint

![eslint](/images/linux/eslint.png)

[**ESLint**](https://eslint.org/) is a formatter for JS language. It's very useful, especially with JS frameworks. You can configure it with some IDE and here, we will see how to install it with [**Visual Studio Code**](https://code.visualstudio.com/):

::: tip
To install Visual Studio Code TODO
:::

## I. Install globally ESLint

```bash
npm install -g eslint
# OR
yarn global add eslint
```

## II. Visual Studio Code configuration

Download [**ESLint extension**](https://github.com/Microsoft/vscode-eslint) for VSCode, to do this, go to `Extensions` panel of VSCode and search ESLint (it have orange logo) and download it.

Use shortcut <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>P</kbd> and search `JSON` to select `Preferences: Open Settings(JSON)`. This will open JSON configuration of Visual Studo Code, you have just to add this on your current config:

<vue-code-info ext="json" path="settings.json">
```json
{
    // ...
    "eslint.validate": [
        "vue",
        "html",
        "javascript",
        "typescript",
        "javascriptreact",
        "typescriptreact"
    ],
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    // ...

}

```
</vue-code-info>

## III. Configure your VueJS project (v2.6)

I advice to create a new VueJS repository with `vue create`, you will can choose eslint when you create your new project. You will have all basic config for ESLint with this command.

:::tip
To use `vue` command, install it with:

```bash
yarn global add @vue/cli
```

:::

### III. A. On existing project

If your project exist without ESLint, it's possible to add package to config it.

::: warning
This is an exemple, you can have different configurations with ESLint and VueJS
:::

To use ESLint, you need to add some packages to your project. This is basics packages, with ESLint and Prettier:

```bash
yarn add eslint prettier babel-eslint eslint-plugin-prettier eslint-plugin-vue @vue/eslint-config-prettier @vue/cli-plugin-eslint
```

After this, you have to create somes files at root of your project:

```
📦 vuejs-repository
 ┣ 📂 public
 ┣ 📂 src
 ┣ 📜 .browserslistrc
 ┣ 📜 .editorconfig
 ┣ 📜 .eslintrc.js
 ┣ 📜 .prettierrc
 ┣ 📜 babel.config.js
 ┣ 📜 package.json
 ```

<vue-code-info ext="js" path=".eslintrc.js">
```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
```
</vue-code-info>

<vue-code-info path=".prettierrc">
```
{
  "semi": false,
  "arrowParens": "always",
  "singleQuote": true
}
```
</vue-code-info>

<vue-code-info path=".browserslistrc">
```
> 1%
last 2 versions
not dead
```
</vue-code-info>

<vue-code-info ext="js" path="babel.config.js">
```js
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset']
}
```
</vue-code-info>

When you create these files: `.eslintrc.js`, `.prettierrc`, `.browserslistrc`, `babel.config.js`, you can remove any info about these entry into `package.json`. So clean your `package.json` if it's needed:

<vue-code-info ext="json" path="package.json">
```json
{
  "name": "my-app-classic",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "core-js": "^3.6.4",
    "vue": "^2.6.11"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.3.0",
    "@vue/cli-plugin-eslint": "~4.3.0",
    "@vue/cli-service": "~4.3.0",
    "@vue/eslint-config-prettier": "^6.0.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-prettier": "^3.1.1",
    "eslint-plugin-vue": "^6.2.2",
    "prettier": "^1.19.1",
    "vue-template-compiler": "^2.6.11"
  }
}
```
</vue-code-info>

If your `package.json` have some differences with this, it's not very important.

### III. B. Optional `.editorconfig`

Now, you can create another new file: `.editorconfig`. It config file used for keep same indent into all files for all developers on project. This is an example:

<vue-code-info path=".editorconfig">
```
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = tab
indent_size = tab
trim_trailing_whitespace = true

[*.yml]
indent_style = space
indent_size = 4

[*.vue]
indent_style = space
indent_size = 2

```

## Vuepress

```bash
yarn add -D @vue/eslint-config-prettier eslint eslint-config-standard eslint-config-vuepress eslint-plugin-import eslint-plugin-node eslint-plugin-prettier eslint-plugin-promise eslint-plugin-standard eslint-plugin-vue lint-staged prettier prettier-config-vuepress @vue/cli-plugin-eslint prettier-config-vuepress
```

</vue-code-info>
