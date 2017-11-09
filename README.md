# Robotkodarn Chrome App

## Description
A Chrome app using avrgirl-arduino for sending Arduino code in a Chrome browser. Forked from noopkat/avrgirl-chrome-app. 🙏

A published version of this app is found in [Chrome Web Store](https://chrome.google.com/webstore/detail/robotkodarn-chrome-app/aemhpfbekflgehjcjgdoljofdcglmmmg).

## Aren't Google removing the support for Chrome apps?
Yes, Google will end support for Chrome apps on Windows, Mac, and Linux, but they will still remain on Chrome OS for the "forseeable future". As a long term plan, it's not a good idea to build a Chrome App (unless you are targeting only Chrome OS).

## Setup
To start project:

```bash
# Install dependencies
$ npm install

```

## Adjustments
Before running this app locally, you usually need to updated the following things in your `manifest.json`:

1. Add your site's URL in `externally_connectable`.
2. Add `key` that correlates with your Chrome App ID. This will make sure that your users always get the same app ID when using the Chrome App locally.

## Getting a key that correlates with your Chrome App ID
1. Visit `chrome://extensions/` and chose `Pack Extension`
2. Upload the generated CRX file on [`CRX Viewer`](https://robwu.nl/crxviewer/)
3. Inspect the page and navigate to `Console`. Here you will find the following: `Public key (paste into manifest.json to preserve extension ID)`.
4. Add the key in your `manifest.json` (as `key`)
5. Voilà! You now have a key that matches your app ID. This means that the app ID always will be the same.


## Bundle
```bash
# Make a bundle of background.js if changes has been made
$ npm run bundle

```
## Use the Chrome App locally
1. In your Chrome browser, visit `chrome://extensions`
2. Click `Load unpacked extension`
3. Navigate to your repo, and click `Select`
4. Click `Launch` when you see the extension appear at the top of the extensions list
5. Copy the `id` value of the extension. This is your `extensionid`.
6. Now you can play with you app! 🎉
