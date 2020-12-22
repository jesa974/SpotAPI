# /!\ Before everything for authentication /!\

## We need to delete everything concerning "read_birthdate" in spotify-auth in nodes_modules

Delete this line in "spotify-auth.js" in "nodes_modules" : READ_BIRTHDATE: 'user-read-birthdate'.

Delete this parameter from "spotify-auth.metadata.json" in "nodes_modules" : "READ_BIRTHDATE":"user-read-birthdate".
________________________________________________________________________________________________________________________________________________________________________________________

# SpotAPI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

________________________________________________________________________________________________________________________________________________________________________________________


# Features

## User info

Find all the informations available about the current user

## Top info

### Top Tracks

Find top tracks of the current user

### Top Artists

Find top artists of the current user

## Albums info

Find albums saved by the current user

## Playlists info

Find playlists saved by the currend user

## Search for another user

### Another user's informations

Find informations about another user

### Another user's playlists

Find playlists about another user
