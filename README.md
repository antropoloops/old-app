# Antropoloops

See it here: https://antropoloops.github.io/app

This app is composed by modules. Currently:

* app-control: send keyboard events via OSC
* keyboard: convert keyboard events into OSC messages
* server: a server that allows offline usage
* webapp: the web application

## Installation

It requires `yarn` because it uses [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) (npm won't work)

1.  Clone this repo: `git clone git@github.com:antropoloops/app.git`
2.  Install dependencies: `yarn`

Optionally (to server audio files from local server):

1.  Clone the antropoloops audiosets repo inside `/data` directory: `cd data && git clone git@github.com:antropoloops/audiosets.git`

## Development

Start the development server: `yarn start` (see package.json scripts)
