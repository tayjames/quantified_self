# Quantified Self [![Build Status](https://travis-ci.org/tayjames/quantified_self.svg?branch=master)](https://travis-ci.org/tayjames/quantified_self)

## Authors
[Tay DeHerrera](https://github.com/tayjames) and [Paul Schlattmann](https://github.com/pschlatt)

## Initial Setup

- Determine postgres username in CLI with ```$ psql```

- Update /config/config.json with

|Provided      | Fill With    |
|------------- | -------------
|"dialect":    | "postgres"   |
|"username":   | "<your_username>"|



- ```$ npx sequelize db:create```

- ```$ npx sequelize db:migrate```

- ```$ npm install```

## Running Local Server/Tests

- Server: ```$ npm start```

- Tests: ```$ npm test```


## Schema
![Database Schema Diagram](Untitled.png)
