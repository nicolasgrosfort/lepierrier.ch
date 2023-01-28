# API

> Look at on [data](data.md) documentation for data structure

## HOLDS

| Method | URL            | WS           | Infos                   |
| ------ | -------------- | ------------ | ----------------------- |
| POST   | /api/holds     | holds:create | Create a new hold       |
| GET    | /api/holds     | holds:list   | Get all holds           |
| GET    | /api/holds/:id | holds:read   | Get an existing hold    |
| PUT    | /api/holds/:id | holds:update | Update an existing hold |
| DELETE | /api/holds/:id | holds:delete | Delete an existing hold |
| DELETE | /api/holds     | holds:list   | Delete all holds        |

## Problems

| Method | URL           | Infos                |
| ------ | ------------- | -------------------- |
| POST   | /api/problems | Create a new problem |
