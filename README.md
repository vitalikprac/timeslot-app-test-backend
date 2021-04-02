# TimeSlot Test App Backend

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install all dependencies.

```bash
npm install 
```
Or use the package manager [yarn](https://yarnpkg.com/)
```bash
yarn install 
```

## Before start
Restore backup initial database from file 
```
db/TimeSlot.sql
```

Set in .env file :
```dotenv
SECRET=XXXXX  
PORT=4000
PGHOST=localhost
PGUSER=postgres
PGDATABASE=TimeSlot
PGPASSWORD=123
PGPORT=5432
```

```text
SECRET: Secret JWT code
PORT: Application port
PGHOST,PGUSER,PGDATABASE,PGPASSWORD,PGPORT: 
Credentials for postgresql database
```



## Start app
**Development** 
```bash
npm start:dev
```
or
```bash
yarn start:dev
```

**Production**
```bash
npm start
```
or 
```bash
yarn start
```
