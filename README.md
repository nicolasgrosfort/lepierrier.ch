# lepierrier.ch

## Setup

> 💡 Run first mysql server

```bash
# Please use yarn
$ yarn install

# Dev mode
$ yarn dev

# Prod mode (with build)
$ yarn prod
```

---

## Config

### IP

-   **Client** : set the node.js server ip [App.tsx]
-   **Server** : set the vite.js server ip [index.js|

### PORT

-   **Server-Node**: 5121
-   **Client-Dev**: 5122
-   **Client-Prod**: 5123

---

## Add new paquets

```bash
# Client
$ yarn workspace client add socket.io-client

# Server
$ yarn workspace server add socket.io
```

---

## Documentation

-   [API](./doc/md/api.md)
-   [Concept](./doc/md/concept.md)
-   [Data](./doc/md/data.md)

---

## SQL

-   [Data](./doc/sql/data.sql)
