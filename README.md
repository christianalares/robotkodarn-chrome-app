# Robotkodarn Chrome App

## Description
A Chrome app using avrgirl-arduino for sending Arduino code in a Chrome browser. Forked from noopkat/avrgirl-chrome-app. 🙏

## Aren't Google removing the support for Chrome apps?
Yes, but we are not there yet. Google will end support for Chrome apps on Windows, Mac, and Linux, but they are will still remain on Chrome OS for the "forseeable future". As a long term plan, it's probably a bad idea to build a Chrome App, but as a short term plan, a Chrome app keeps the [`Robotkodarn project`](https://github.com/Vinnovera/robotkodarn) going.

## Setup
To start project:

```bash
# Install dependencies
$ npm install

```

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
