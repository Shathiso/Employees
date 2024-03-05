# Project Setup

## employees-backend

### cd into the backend
```sh
cd employees-backend
```

### Update the db connect setting in the employees-backend -> env -> DB_CONNECTION section eg.

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=33061
DB_DATABASE=employee
DB_USERNAME=user
DB_PASSWORD=password


### Insert the db tables

```sh
php artisan migrate
```

### Run the backend api

```sh
php artisan serve
```

## employees-frontend

### open a different terminal, whilst keeping the backend api running

### cd into the frontend
```sh
cd employees-backend
```

### Install the node modules

```sh
npm install
```

### Run the frontend and access the given URL

```sh
npm run dev
```

### Optionally Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```