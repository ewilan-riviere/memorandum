---
title: Setup
description: 'How to setup MacOS'
position: 1
category: 'MacOS'
---

## Setup

- [**Windows app for OSX**](https://www.numerama.com/tech/726688-perdu-apres-votre-passage-sur-macos-retrouvez-vos-habitudes-windows-grace-a-ces-logiciels.html)

## Keyboard

- [**macOS Keyboard special**](https://www.macworld.co.uk/how-to/mac-keyboard-type-symbols-3504584/)

## Visual Studio Code

```json
// Place your key bindings in this file to override the defaults
[
    {
        "key": "alt+space",
        "command": "editor.action.triggerSuggest",
        "when": "editorHasCompletionItemProvider && editorTextFocus && !editorReadonly"
    },
    {
        "key": "alt+space",
        "command": "toggleSuggestionDetails",
        "when": "editorTextFocus && suggestWidgetVisible"
    },
    {
        "key": "ctrl+alt+space",
        "command": "toggleSuggestionFocus",
        "when": "editorTextFocus && suggestWidgetVisible"
    }
]
```

## Xcode

## Add certificate

Open Xcode, select **Xcode** into top menu, open **Preferences**, select **Accounts**, click on **+** at bottom left to add new account, use **Email** of *Apple Developer*. When new account is available, back to your project in **Project navigator**, **Targets** *Runner*, in **Signing & Capabilities**, choose account which have Distribution rights.

#### New certificate

**Get *CSR* file**

1. Launch the “Keychain Access” app from the Launchpad or Spotlight.
2. From the top menu, select Keychain Access -> Certificate Assistant -> Request a Certificate from a Certificate Authority
3. Fill in the first two fields User Email Address and Common Name. Leave the CA Email Address field blank and select the Saved to disk option below.
4. Press continue and then save the generated certSigningRequest file on your computer. You can now use this CSR file for the next step.

**Create certificate**

1. Login to the Apple Developer Portal at <https://developer.apple.com>
2. Select Certificates, IDs & Profiles -> Certificates from the left menu
3. Press the Plus (+) button next to the Certificates heading.
4. You can select one of the following certificate types that is relevant for iOS apps, depending on your use case:
   - Apple Development
   - Apple Distribution (only for the Developer Program)
   - iOS App Development
   - iOS Distribution (only for the Developer Program)
   - In-House and Ad Hoc (only for the Enterprise Program)
5. Press continue after selecting a certificate type. If you are unsure which certificate type to select, you can select iOS App Development for running your app on your registered iOS devices for development purposes.
6. In the next screen, upload your CSR file generated in the previous step and press continue.
7. Your certificate is now generated and ready for download. Just press the download button on the top right.

The cer file generated in the previous step cannot be used for codesigning alone. It must be installed back to the source from which the CSR was created to generate a private/public key pair.

## Tips

- For new MacOS, you need to set again iOS version minimal
