# Data

> Data are stored in sql tables.

## Holds

Position of each holds on the wall

| fields    | type   | infos |
| :-------- | :----- | :---- |
| id        | number | 🔑    |
| pxs       | text   |
| pys       | text   |
| createdAt | date   |
| updatedAt | date   |

---

## Problems

Data about problems created by climbers

| fields    | type    | infos |
| :-------- | :------ | :---- |
| id        | number  | 🔑    |
| name      | string  |
| grade     | string  |
| setter    | string  |
| date      | date    |       |
| rate      | number  | [1-5] |
| success   | number  |
| feet      | boolean |
| createdAt | date    |
| updatedAt | date    |

---

## Holds-Problems

| fields      | type   | infos |
| :---------- | :----- | :---- |
| id          | number | 🔑    |
| id_holds    | number | 🔐    |
| id_problems | number | 🔐    |
