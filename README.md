# betterdo-ui

The frontend for BetterDo. This repository contains the frontend user interface for the app.

It's recommended you run this with the REST API Server. See [betterdo-api](https://github.com/brandon-pereira/betterdo-api).

## Features

-   ⚛️ React Application leveraging Hooks and SWR.
-   👷‍♂️ Leverages a Service Worker for offline support, push notifications, and an installable PWA.
-   ❄️ Uses SnowPack for blazing fast development and builds

## Running Locally

```bash
npm install
npm start
```

If both server and UI are running, you'll have the option of visiting:

-   [http://localhost:8000/](http://localhost:8000/) for full user experience
-   [http://localhost:8080/](http://localhost:8080/) for front-end live reloading
