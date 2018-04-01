# Antropoloops

See it here: https://antropoloops.github.io/app

This app is composed by modules. Currently:

* webapp: the web application
* visuals: Espe's visuals
* server: a server that allows offline usage

## Setup

It requires `yarn` because it uses [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)

1.  Clone this repo: `git clone git@github.com:antropoloops/app.git`
2.  Install dependencies: `npm install` o `yarn`

Optionally (to server audio files from local server):

1.  Clone the antropoloops audiosets repo inside `/data` directory: `cd data && git clone git@github.com:antropoloops/audiosets.git`

## Start

If you want to load audio files from local, you must start the server

#### Webapp

* `cd modules/webapp`
* **Start**: `yarn start`
* **Deploy**: `yarn deploy`

#### Server

* `cd modules/server`
* **Start**: `yarn start`
