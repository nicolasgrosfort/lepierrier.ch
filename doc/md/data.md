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
| rate      | number  | [1-5] |
| success   | number  |
| feet      | boolean |
| createdAt | date    |
| updatedAt | date    |

---

## Paths

| fields    | type   | infos             |
| :-------- | :----- | :---------------- |
| id        | number | 🔑                |
| type      | string | [foot, hand, mix] |
| holdId    | number | 🔐                |
| problemId | number | 🔐                |
