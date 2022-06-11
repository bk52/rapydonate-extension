# Rapydonate Extension

[![Watch the video](https://user-images.githubusercontent.com/24523985/173189490-13c0b4b9-ea14-43ea-b30d-94e7f3bbc4f3.jpg)](https://www.youtube.com/watch?v=RLvf2w61VeQ)

Rapydonate is a platform-independent fintech project that provides content creators with income. It consists of project management panel, browser extension and donation page components.

For detail info please visit [Rapydonate](https://github.com/bk52/rapydonate).

## Table of Contents
  - [How It Works?](#howitworks)
  - [Installation](#installation)

<h2 id="howitworks">How It Works?</h2>

By installing this chrome extension, users can easily donate without logging in or sharing personal data. The extension runs in the background, querying whether the site in the current tab is asking for donations.

If the site is registered to the system, the icon of the extension will change and warn the user.

![Chrome Extension](https://user-images.githubusercontent.com/24523985/173199917-d9c2c972-c69d-44cc-b4f9-ce3e4a01748a.jpg)

When the user clicks on the add-on button, a popup opens, showing the information about the page, the content producer's message and donation options to the user.

![Page Info](https://user-images.githubusercontent.com/24523985/173199977-b4b97ff1-34b3-445a-9f8e-ce74f081ea2d.jpg)


Here, the user selects the donation option they want and makes the payment without leaving the current page.

Payment options may differ depending on the country of users. The payable amount is automatically converted into the currency of the user's country.

![Payment](https://user-images.githubusercontent.com/24523985/173200023-ec8864e8-bf9e-42bd-a114-144dd1f2260e.jpg)

Failed and success payment
![Payment Success or Error](https://user-images.githubusercontent.com/24523985/173200064-3d4a58e8-3820-441a-90a9-8870f1df486a.jpg)

<h2 id="installation">Installation</h2>

1. Install and start [Rapydonate](https://github.com/bk52/rapydonate) project
2. Clone repository  
- git clone https://github.com/bk52/rapydonate-extension
3. npm run build
4. Then install dist folder as an extension. [How to install unpacked extension?](https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked)

