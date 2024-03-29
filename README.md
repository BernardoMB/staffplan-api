# StaffPlanner

## Getting Started

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

### Installation

You'll need to have Node v8.1.X or later on your machine.

 Clone staffplan project repository :

```sh
$ git clone https://staffplandev@bitbucket.org/staffplanteam/staffplan.git


```

Install dependencies library :

```sh
$ cd staffplan/svc
$ npm install
```

After Run:

```sh
$ npm install -g nodemon
```

```sh
$ cd staffplan/public/
$ npm install
```

You'll need to install MySQL Database Client (phpMyAdmin/MySQL Workbench, etc.)

    - Open phpMyAdmin and create new DATABASE with name `Staff_Planner`
    - Open db directory on your root directory of staffplan project
    - Import Staff_Planner.sql in `Staff_Planner` database

### Development server

Start node API local server to connect DATABASE: Open Terminal and go to root directory of staffplan project.

```sh
$ nodemon
```

Start Staffplaner website local server: Open Second Terminal and go to root directory of staffplan project :

```sh
$ ng serve
```
Command `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Restarting the server

1. netstat -ano | findstr :<PORT>
2. taskkill /PID <PROCESS_ID> /F