# ESLint

[**ESLint**](https://eslint.org/) is a formatter for JS language. It's very useful, especially with JS frameworks. You can configure it with some IDE and here, we will see how to install it with [**Visual Studio Code**](https://code.visualstudio.com/):

::: tip
To install Visual Studio Code TODO
:::

## Install globally ESLint

```bash
npm install -g eslint
```

## Visual Studio Code configuration

Download [**ESLint extension**](https://github.com/Microsoft/vscode-eslint) for VSCode, to do this, go to `Extensions` panel of VSCode and search ESLint (it have orange logo) and download it.

Use shortcut <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>P</kbd> and search `JSON` to select `Preferences: Open Settings(JSON)`. This will open JSON configuration of Visual Studo Code, you have just to add this on your current config:

<code-heading type="json" path="settings.json"></code-heading>
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

## .eslintrc.js & .prettierrc

